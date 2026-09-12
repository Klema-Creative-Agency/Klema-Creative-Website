import express from "express";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, join, dirname } from "path";
import puppeteer from "puppeteer-core";

const DIST_DIR = resolve("dist/public");
const PORT = 4174;

async function getExecutablePath() {
  // CI (Vercel/Linux): use @sparticuz/chromium
  if (process.env.VERCEL || process.platform === "linux") {
    const chromium = await import("@sparticuz/chromium");
    return {
      executablePath: await chromium.default.executablePath(),
      args: chromium.default.args,
    };
  }
  // macOS local: find Chrome
  const paths = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
  ];
  // Also check Puppeteer cache
  const { execSync } = await import("child_process");
  try {
    const cached = execSync("find ~/.cache/puppeteer -name 'Google Chrome for Testing' -type f 2>/dev/null", { encoding: "utf-8" }).trim().split("\n")[0];
    if (cached) paths.unshift(cached);
  } catch {}

  const { existsSync } = await import("fs");
  for (const p of paths) {
    if (existsSync(p)) return { executablePath: p, args: [] };
  }
  throw new Error("Chrome not found. Install Chrome or run: npx puppeteer browsers install chrome");
}

async function prerender() {
  // 1. Serve the built output locally
  const app = express();
  app.use(express.static(DIST_DIR));
  app.get("*", (_req, res) => res.sendFile(join(DIST_DIR, "index.html")));
  const server = await new Promise((r) => {
    const s = app.listen(PORT, () => r(s));
  });
  console.log(`[prerender] Static server on http://localhost:${PORT}`);

  // 2. Launch browser
  const { executablePath, args } = await getExecutablePath();
  console.log(`[prerender] Using Chrome: ${executablePath}`);
  const browser = await puppeteer.launch({
    args,
    executablePath,
    headless: true,
  });
  // Routes to prerender. Each one gets its own HTML file so the client hydrates
  // against matching markup (no homepage flash on /services, no React #418).
  const ROUTES = [
    { path: "/", file: "index.html", waitFor: "#contact" },
    { path: "/services", file: "services/index.html", waitFor: "#pricing" },
    { path: "/websites", file: "websites/index.html", waitFor: "#contact" },
    { path: "/privacy-policy", file: "privacy-policy/index.html", waitFor: "main, footer" },
    { path: "/terms-and-conditions", file: "terms-and-conditions/index.html", waitFor: "main, footer" },
  ];

  const indexPath = join(DIST_DIR, "index.html");
  const shellHtml = readFileSync(indexPath, "utf-8");

  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(`http://localhost:${PORT}${route.path}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });
    await page.waitForSelector(route.waitFor, { timeout: 10000 });

    // Serialize the root. innerHTML merges adjacent text nodes, but React renders
    // `text{" "}<a>` as separate nodes and expects a `<!-- -->` separator between
    // them (exactly what renderToString emits). Without it hydration throws #418.
    let renderedContent = await page.evaluate(() => {
      const root = document.getElementById("root");
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
      const els = [root];
      let n;
      while ((n = walker.nextNode())) els.push(n);
      for (const el of els) {
        const kids = Array.from(el.childNodes);
        for (let i = 1; i < kids.length; i++) {
          if (kids[i - 1].nodeType === 3 && kids[i].nodeType === 3) {
            el.insertBefore(document.createComment(""), kids[i]);
          }
        }
      }
      return root.innerHTML;
    });
    // Strip reveal state so hydration starts from the same (hidden) state.
    renderedContent = renderedContent.replace(/ revealed/g, "").replace(/ kc-reveal in\b/g, " kc-reveal");
    const title = await page.title();
    await page.close();

    let html = shellHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${renderedContent}</div>`
    );
    if (route.path !== "/" && title) {
      html = html.replace(/<title>[^<]*<\/title>/, `<title>${title.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</title>`);
      html = html.replace('<link rel="canonical" href="https://klemacreative.com/" />', `<link rel="canonical" href="https://klemacreative.com${route.path}" />`);
    }
    const outPath = join(DIST_DIR, route.file);
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf-8");
    const sizeKB = (Buffer.byteLength(html, "utf-8") / 1024).toFixed(1);
    console.log(`[prerender] ${route.path} -> ${route.file} (${sizeKB}KB)`);
  }

  await browser.close();
  server.close();
}

prerender().catch((err) => {
  console.error("[prerender] Failed:", err);
  process.exit(1);
});

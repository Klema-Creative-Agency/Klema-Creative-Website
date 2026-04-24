import express from "express";
import { readFileSync, writeFileSync } from "fs";
import { resolve, join } from "path";
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
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}`, {
    waitUntil: "networkidle0",
    timeout: 30000,
  });

  // 3. Wait for deepest section to confirm full render
  await page.waitForSelector("#contact", { timeout: 10000 });

  // 4. Extract rendered content from #root
  let renderedContent = await page.evaluate(
    () => document.getElementById("root").innerHTML
  );

  // 5. Strip "revealed" classes so hydration starts from the same state (visible=false)
  renderedContent = renderedContent.replace(/ revealed/g, "");

  await browser.close();
  server.close();

  // 6. Inject into built index.html
  const indexPath = join(DIST_DIR, "index.html");
  let html = readFileSync(indexPath, "utf-8");
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${renderedContent}</div>`
  );
  writeFileSync(indexPath, html, "utf-8");

  const sizeKB = (Buffer.byteLength(html, "utf-8") / 1024).toFixed(1);
  console.log(`[prerender] Injected ${sizeKB}KB of pre-rendered HTML`);
}

prerender().catch((err) => {
  console.error("[prerender] Failed:", err);
  process.exit(1);
});

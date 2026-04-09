import express from "express";
import { readFileSync, writeFileSync } from "fs";
import { resolve, join } from "path";
import puppeteer from "puppeteer";

const DIST_DIR = resolve("dist/public");
const PORT = 4174;

async function prerender() {
  // 1. Serve the built output locally
  const app = express();
  app.use(express.static(DIST_DIR));
  app.get("*", (_req, res) => res.sendFile(join(DIST_DIR, "index.html")));
  const server = await new Promise((r) => {
    const s = app.listen(PORT, () => r(s));
  });
  console.log(`[prerender] Static server on http://localhost:${PORT}`);

  // 2. Launch browser and render
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}`, {
    waitUntil: "networkidle0",
    timeout: 30000,
  });

  // 3. Wait for deepest section to confirm full render
  await page.waitForSelector("#faq", { timeout: 10000 });

  // 4. Extract rendered content from #root
  let renderedContent = await page.evaluate(
    () => document.getElementById("root").innerHTML
  );

  // 5. Strip "revealed" classes so hydration starts from the same state (visible=false)
  //    The client's useReveal hook will re-add them via IntersectionObserver
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

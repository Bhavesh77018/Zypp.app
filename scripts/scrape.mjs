// One-off scraper: renders each live zypp.app page in headless Chromium and
// dumps the fully-rendered visible text to scripts/scraped.json.
// Run: node scripts/scrape.mjs
import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE = "https://www.zypp.app";
const SLUGS = [
  "/about",
  "/advertising",
  "/technologies",
  "/franchise",
  "/foco",
  "/esg-impact",
  "/environment",
  "/contact",
  "/zypp-evolve",
  "/2w-Service-Zypp-Pilot",
  "/3w-Service-Zypp-Pilot",
  "/zypp-rental",
  "/zypp-pilot",
  "/rent-to-own",
  "/ev-for-delivery",
  "/fofo",
  "/careers",
  "/life-at-zypp",
  "/zyppNews",
  "/term-and-conditions",
  "/privacy-policy",
];

const out = {};
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
const page = await ctx.newPage();

for (const slug of SLUGS) {
  try {
    await page.goto(BASE + slug, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(3000); // let CSR settle
    const text = await page.evaluate(() => document.body.innerText.replace(/\n{3,}/g, "\n\n").trim());
    out[slug] = text;
    console.log(`OK  ${slug}  (${text.length} chars)`);
  } catch (e) {
    out[slug] = `ERROR: ${e.message}`;
    console.log(`ERR ${slug}  ${e.message}`);
  }
}

const dest = path.join(process.cwd(), "scripts", "scraped.json");
fs.writeFileSync(dest, JSON.stringify(out, null, 2));
console.log(`\nWrote ${dest}`);
await browser.close();

/**
 * Full-site design export for Figma.
 *
 * Captures every public page as a full-page PNG in three variants:
 *   desktop-light (1440w), desktop-dark (1440w), mobile-light (390w).
 * Output: design-export/<variant>/<NN-page>.png — drag the folder into Figma.
 *
 * Usage: node scripts/design-export.mjs [baseUrl]   (default http://localhost:3001)
 */
import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { join } from "path";

const BASE = process.argv[2] ?? "http://localhost:3001";
const OUT = join(process.cwd(), "design-export");

const ROUTES = [
  ["home", "/"],
  ["about", "/about"],
  ["riders", "/riders"],
  ["zypp-pilot", "/zypp-pilot"],
  ["zypp-rental", "/zypp-rental"],
  ["rent-to-own", "/rent-to-own"],
  ["2w-services", "/2w-Service-Zypp-Pilot"],
  ["3w-loader", "/3w-Service-Zypp-Pilot"],
  ["ev-for-delivery", "/ev-for-delivery"],
  ["fleetease", "/fleetease"],
  ["franchise", "/franchise"],
  ["fofo", "/fofo"],
  ["foco", "/foco"],
  ["advertising", "/advertising"],
  ["technologies", "/technologies"],
  ["hustleos", "/hustleos"],
  ["environment", "/environment"],
  ["investors", "/investors"],
  ["careers", "/careers"],
  ["life-at-zypp", "/life-at-zypp"],
  ["zypp-evolve", "/zypp-evolve"],
  ["news", "/zyppNews"],
  ["contact", "/contact"],
  ["find-hub", "/find-hub"],
  ["privacy-policy", "/privacy-policy"],
  ["terms", "/term-and-conditions"],
  ["404", "/this-page-does-not-exist"],
];

const VARIANTS = [
  { name: "desktop-light", width: 1440, height: 900, theme: "light" },
  { name: "desktop-dark", width: 1440, height: 900, theme: "dark" },
  { name: "mobile-light", width: 390, height: 844, theme: "light" },
];

/** Scroll through the page so whileInView reveals fire, then return to top. */
async function triggerReveals(page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = "auto";
    const step = window.innerHeight * 0.7;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
}

const browser = await chromium.launch();
for (const v of VARIANTS) {
  const dir = join(OUT, v.name);
  mkdirSync(dir, { recursive: true });
  const ctx = await browser.newContext({
    viewport: { width: v.width, height: v.height },
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  await ctx.addInitScript((theme) => localStorage.setItem("theme", theme), v.theme);

  const page = await ctx.newPage();
  for (let i = 0; i < ROUTES.length; i++) {
    const [name, route] = ROUTES[i];
    const file = join(dir, `${String(i + 1).padStart(2, "0")}-${name}.png`);
    try {
      await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 60000 });
      await triggerReveals(page);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`✓ ${v.name}/${String(i + 1).padStart(2, "0")}-${name}`);
    } catch (e) {
      console.log(`✗ ${v.name}/${name}: ${e.message.split("\n")[0]}`);
    }
  }
  await ctx.close();
}
await browser.close();
console.log(`\nDone → ${OUT}`);

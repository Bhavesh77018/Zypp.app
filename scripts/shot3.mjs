import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 860 } });
await p.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(800);
// Scroll-story: land inside the pinned 300vh section (~beat 2)
await p.evaluate(() => window.scrollTo(0, window.innerHeight * 1.9));
await p.waitForTimeout(900);
await p.screenshot({ path: "scripts/story.png" });
// Live impact map
const found = await p.evaluate(() => {
  const el = [...document.querySelectorAll("h2")].find(h => /nationwide impact/i.test(h.textContent||""));
  if (el) { el.scrollIntoView({block:"center"}); return true; } return false;
});
await p.waitForTimeout(1400);
await p.screenshot({ path: "scripts/impact.png" });
await b.close(); console.log("found-map:", found);

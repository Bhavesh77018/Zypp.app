import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
// Home — services + why sections show the icons
await p.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
const h = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 450) { await p.evaluate((y)=>scrollTo(0,y), y); await p.waitForTimeout(120); }
await p.evaluate(()=>scrollTo(0, 760)); await p.waitForTimeout(900);
await p.screenshot({ path: "scripts/home-icons.png" });
await b.close(); console.log("ok");

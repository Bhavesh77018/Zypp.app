import { chromium } from "playwright";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1280, height: 950 }, colorScheme: "dark" });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/riders", { waitUntil: "domcontentloaded", timeout: 60000 });
await p.waitForTimeout(2500);
await p.evaluate(()=>scrollTo(0,520)); await p.waitForTimeout(700);
await p.screenshot({ path: "scripts/riders-dark.png" });
await b.close(); console.log("ok");

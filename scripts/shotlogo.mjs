import { chromium } from "playwright";
const b = await chromium.launch();
for (const scheme of ["light","dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 220 }, colorScheme: scheme });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await p.waitForTimeout(2000);
  await p.screenshot({ path: `scripts/nav-${scheme}.png` });
  await ctx.close();
}
// footer
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: "light" });
const p = await ctx.newPage();
await p.goto("http://localhost:3000/about", { waitUntil: "domcontentloaded", timeout: 60000 });
await p.waitForTimeout(2000);
await p.evaluate(()=>scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(800);
await p.screenshot({ path: "scripts/footer.png" });
await ctx.close();
await b.close(); console.log("ok");

import { chromium } from "playwright";
const b = await chromium.launch();
for (const scheme of ["light","dark"]) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 1000 }, colorScheme: scheme });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3000/find-hub", { waitUntil: "domcontentloaded", timeout: 60000 });
  await p.waitForTimeout(2500);
  const h=await p.evaluate(()=>document.body.scrollHeight); for(let y=0;y<h;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(100);} await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(600);
  await p.screenshot({ path: `scripts/findhub-${scheme}.png` });
  await ctx.close();
}
await b.close(); console.log("done");

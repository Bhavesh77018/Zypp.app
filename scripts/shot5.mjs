import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto("http://localhost:3001/investors", { waitUntil: "networkidle", timeout: 60000 });
const h = await p.evaluate(()=>document.body.scrollHeight);
for (let y=0;y<h;y+=500){ await p.evaluate(y=>scrollTo(0,y),y); await p.waitForTimeout(120);} 
await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(700);
await p.screenshot({ path: "scripts/investors-top.png" });
await p.evaluate(()=>scrollTo(0, 980)); await p.waitForTimeout(700);
await p.screenshot({ path: "scripts/investors-traction.png" });
await b.close(); console.log("ok");

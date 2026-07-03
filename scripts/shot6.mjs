import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 1000 } });
await p.goto("http://localhost:3000/find-hub", { waitUntil: "networkidle", timeout: 60000 });
const h=await p.evaluate(()=>document.body.scrollHeight); for(let y=0;y<h;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(100);} await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(700);
await p.screenshot({ path: "scripts/findhub.png", fullPage: true });
await b.close(); console.log("ok");

import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 860 } });
await p.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(700);
// locate the 300vh story section and scroll to ~45% through it (beat 2)
const top = await p.evaluate(() => {
  const sec = [...document.querySelectorAll("section")].find(s => s.className.includes("h-[300vh]"));
  if (!sec) return -1;
  const r = sec.getBoundingClientRect();
  const absTop = r.top + window.scrollY;
  window.scrollTo(0, absTop + sec.offsetHeight * 0.45);
  return absTop;
});
await p.waitForTimeout(1100);
await p.screenshot({ path: "scripts/story.png" });
await b.close(); console.log("storyTop:", top);

import { chromium } from "playwright";
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1280, height: 860 } });
await p.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(800);
const info = await p.evaluate(() => {
  const sec = [...document.querySelectorAll("section")].find(s => s.className.includes("300vh"));
  const sticky = sec?.querySelector(".sticky");
  const absTop = sec ? sec.getBoundingClientRect().top + scrollY : -1;
  window.scrollTo(0, absTop + (sec?.offsetHeight||0)*0.45);
  return new Promise(res => setTimeout(() => {
    res({
      secFound: !!sec,
      secHeight: sec?.offsetHeight,
      stickyTop: sticky ? Math.round(sticky.getBoundingClientRect().top) : "no-sticky",
      stickyPos: sticky ? getComputedStyle(sticky).position : "n/a",
      bodyOverflowY: getComputedStyle(document.body).overflowY,
      htmlOverflowY: getComputedStyle(document.documentElement).overflowY,
    });
  }, 700));
});
console.log(JSON.stringify(info, null, 2));
await b.close();

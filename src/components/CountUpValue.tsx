"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Animates the first number found in a stat string when it scrolls into view —
 * "₹35–45K" counts 0→35 and keeps "₹" / "–45K" as static text. Strings without
 * digits ("24/7" has them, "Pan-India" doesn't) render unchanged.
 */
export function CountUpValue({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = /([\d,]+(?:\.\d+)?)/.exec(value);
  const target = match ? parseFloat(match[1].replace(/,/g, "")) : 0;
  const decimals = match?.[1].split(".")[1]?.length ?? 0;
  const grouped = match ? match[1].includes(",") || target >= 1000 : false;

  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(eased * target);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  if (!match) return <span>{value}</span>;

  const formatted = grouped
    ? Math.round(n).toLocaleString("en-IN")
    : n.toFixed(decimals);

  return (
    <span ref={ref}>
      {value.slice(0, match.index)}
      {formatted}
      {value.slice(match.index + match[1].length)}
    </span>
  );
}

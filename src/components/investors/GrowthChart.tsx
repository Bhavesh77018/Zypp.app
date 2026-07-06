"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

// May-25 → May-26 monthly trajectory (illustrative interpolation between
// published actuals: NRR ₹126.9→₹243.2 Cr, EBITDA margin −4.6%→+10.08%).
const NRR = [126.9, 132, 139, 148, 158, 167, 178, 190, 201, 214, 226, 235, 243.2];
const EBITDA = [-4.6, -3.8, -2.9, -1.8, -0.6, 0.8, 2.1, 3.6, 5.0, 6.5, 7.9, 9.1, 10.08];
const MONTHS = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];

const W = 720, H = 300, PAD = 44;
const x = (i: number) => PAD + (i / (NRR.length - 1)) * (W - 2 * PAD);
const yN = (v: number) => H - PAD - ((v - 100) / 160) * (H - 2 * PAD);
const yE = (v: number) => H - PAD - ((v + 6) / 18) * (H - 2 * PAD);
const path = (data: number[], y: (v: number) => number) =>
  data.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

export default function GrowthChart() {
  const reduce = useReducedMotion();
  const draw = (delay: number) => ({
    initial: reduce ? undefined : { pathLength: 0 },
    whileInView: reduce ? undefined : { pathLength: 1 },
    viewport: { once: true },
    transition: { duration: 1.6, delay, ease: "easeInOut" as const },
  });

  return (
    <Reveal className="mt-10 rounded-3xl border border-border bg-white dark:bg-slate-950 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h3 className="font-black text-foreground">12-Month Trajectory · May-25 → May-26</h3>
        <div className="flex gap-5 text-xs font-bold">
          <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary" /> NRR (₹ Cr)</span>
          <span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500" /> EBITDA Margin (%)</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Zypp NRR and EBITDA growth May 2025 to May 2026">
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={PAD} x2={W - PAD} y1={PAD + (i * (H - 2 * PAD)) / 3} y2={PAD + (i * (H - 2 * PAD)) / 3} stroke="currentColor" className="text-border" strokeWidth="1" strokeDasharray="4 6" />
        ))}
        {/* zero line for EBITDA */}
        <line x1={PAD} x2={W - PAD} y1={yE(0)} y2={yE(0)} stroke="currentColor" className="text-blue-500/30" strokeWidth="1" />
        <motion.path d={path(NRR, yN)} fill="none" stroke="#00bc84" strokeWidth="3.5" strokeLinecap="round" {...draw(0)} />
        <motion.path d={path(EBITDA, yE)} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 0" {...draw(0.4)} />
        {/* end labels */}
        <circle cx={x(12)} cy={yN(243.2)} r="5" fill="#00bc84" />
        <text x={x(12) - 8} y={yN(243.2) - 12} textAnchor="end" fontSize="13" fontWeight="800" fill="#00bc84">₹243 Cr (+92%)</text>
        <circle cx={x(12)} cy={yE(10.08)} r="5" fill="#3b82f6" />
        <text x={x(12) - 8} y={yE(10.08) + 22} textAnchor="end" fontSize="13" fontWeight="800" fill="#3b82f6">+10.08%</text>
        <circle cx={x(0)} cy={yN(126.9)} r="4" fill="#00bc84" />
        <text x={x(0) + 8} y={yN(126.9) - 10} fontSize="12" fontWeight="700" fill="#00bc84">₹126.9 Cr</text>
        <circle cx={x(0)} cy={yE(-4.6)} r="4" fill="#3b82f6" />
        <text x={x(0) + 8} y={yE(-4.6) + 20} fontSize="12" fontWeight="700" fill="#3b82f6">−4.6%</text>
        {MONTHS.map((m, i) => i % 2 === 0 && (
          <text key={i} x={x(i)} y={H - 14} textAnchor="middle" fontSize="10" className="fill-current text-muted" fill="currentColor">{m}</text>
        ))}
      </svg>
      <p className="text-xs text-muted mt-3">No additional capital raised in this period · monthly points interpolated between published actuals.</p>
    </Reveal>
  );
}

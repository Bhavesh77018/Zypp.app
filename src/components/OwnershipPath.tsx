"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

// 52-week rent-to-own journey as a self-drawing road with milestones.
const STOPS = [
  { wk: "Week 1", label: "Pay ₹9,999 down", pct: 0 },
  { wk: "Week 13", label: "25% of the way", pct: 25 },
  { wk: "Week 26", label: "Halfway — keep riding", pct: 50 },
  { wk: "Week 39", label: "75% — almost yours", pct: 75 },
  { wk: "Week 52", label: "It's YOURS 🎉", pct: 100 },
];

const W = 900, H = 170, PAD = 60, Y = 80;
const x = (pct: number) => PAD + (pct / 100) * (W - 2 * PAD);

export default function OwnershipPath() {
  const reduce = useReducedMotion();
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 max-w-5xl">
        <Reveal className="text-center mb-10">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">The Road to Ownership</div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground">52 Weeks. <span className="text-primary">Then It&apos;s Yours.</span></h2>
          <p className="text-muted text-lg mt-4 max-w-2xl mx-auto">Every weekly rental you pay from your earnings is a step toward owning your scooter outright.</p>
        </Reveal>

        <Reveal className="rounded-3xl border border-border bg-gray-50 dark:bg-slate-900 p-4 md:p-8 overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[640px]" role="img" aria-label="52-week rent-to-own progress path">
            {/* base road */}
            <line x1={x(0)} y1={Y} x2={x(100)} y2={Y} stroke="currentColor" className="text-border" strokeWidth="6" strokeLinecap="round" />
            {/* progress draw */}
            <motion.line
              x1={x(0)} y1={Y} x2={x(100)} y2={Y} stroke="#00bc84" strokeWidth="6" strokeLinecap="round"
              initial={reduce ? undefined : { pathLength: 0 }}
              whileInView={reduce ? undefined : { pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            {STOPS.map((s, i) => (
              <g key={s.wk}>
                <motion.circle
                  cx={x(s.pct)} cy={Y} r={i === STOPS.length - 1 ? 13 : 9}
                  fill={i === STOPS.length - 1 ? "#00bc84" : "#fff"}
                  stroke="#00bc84" strokeWidth="3"
                  initial={reduce ? undefined : { scale: 0 }}
                  whileInView={reduce ? undefined : { scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.45, type: "spring", stiffness: 300 }}
                />
                <text x={x(s.pct)} y={Y - 26} textAnchor="middle" fontSize="13" fontWeight="800" fill="#00bc84">{s.wk}</text>
                <text x={x(s.pct)} y={Y + 38} textAnchor="middle" fontSize="12" fontWeight="600" fill="currentColor" className="fill-current text-muted">{s.label}</text>
              </g>
            ))}
            {/* scooter emoji riding the line */}
            {!reduce && (
              <motion.text
                y={Y - 14} fontSize="22" textAnchor="middle"
                initial={{ x: x(0) }}
                whileInView={{ x: x(100) }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              >🛵</motion.text>
            )}
          </svg>
        </Reveal>
      </div>
    </section>
  );
}

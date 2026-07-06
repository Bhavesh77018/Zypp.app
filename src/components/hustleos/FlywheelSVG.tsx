"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

// The HustleOS flywheel: riders → data → AI → earnings → riders.
const NODES = [
  { label: "More Riders", angle: -90 },
  { label: "Better Data", angle: -18 },
  { label: "Smarter AI", angle: 54 },
  { label: "Higher Earnings", angle: 126 },
  { label: "More Trust", angle: 198 },
];
const CX = 260, CY = 260, R = 170;
const pos = (deg: number) => ({ x: CX + R * Math.cos((deg * Math.PI) / 180), y: CY + R * Math.sin((deg * Math.PI) / 180) });

export default function FlywheelSVG() {
  const reduce = useReducedMotion();
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">The Flywheel</div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-5">Every Rider Makes<br /><span className="text-primary">Every Rider Richer.</span></h2>
          <p className="text-muted text-lg leading-relaxed">
            More riders generate better data. Better data trains smarter AI. Smarter AI raises every rider&apos;s earnings —
            and higher earnings bring more riders. The loop compounds; it can&apos;t be copied, only earned.
          </p>
        </Reveal>

        <Reveal className="flex justify-center">
          <svg viewBox="0 0 520 520" className="w-full max-w-[420px]" role="img" aria-label="HustleOS flywheel">
            {/* rotating dashed ring */}
            <motion.g
              style={{ originX: "260px", originY: "260px" }}
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            >
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="#00bc84" strokeOpacity="0.35" strokeWidth="2.5" strokeDasharray="10 12" />
              {/* direction arrows on the ring */}
              {[0, 72, 144, 216, 288].map((a) => {
                const p = pos(a - 90 + 36);
                return <circle key={a} cx={p.x} cy={p.y} r="4" fill="#00bc84" fillOpacity="0.6" />;
              })}
            </motion.g>
            {/* center */}
            <circle cx={CX} cy={CY} r="64" fill="#00bc84" fillOpacity="0.1" stroke="#00bc84" strokeWidth="2" />
            <text x={CX} y={CY - 4} textAnchor="middle" fontSize="18" fontWeight="900" fill="#00bc84">HustleOS</text>
            <text x={CX} y={CY + 16} textAnchor="middle" fontSize="11" fontWeight="600" fill="currentColor" className="fill-current text-muted">the gig engine</text>
            {/* nodes */}
            {NODES.map((n, i) => {
              const p = pos(n.angle);
              return (
                <motion.g key={n.label}
                  initial={reduce ? undefined : { scale: 0, opacity: 0 }}
                  whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.18, type: "spring", stiffness: 260 }}
                >
                  <circle cx={p.x} cy={p.y} r="44" fill="currentColor" className="text-white dark:text-slate-900" stroke="#00bc84" strokeWidth="2.5" />
                  {n.label.split(" ").map((w, j) => (
                    <text key={j} x={p.x} y={p.y + (j - (n.label.split(" ").length - 1) / 2) * 14 + 4} textAnchor="middle" fontSize="12" fontWeight="800" fill="#00bc84">{w}</text>
                  ))}
                </motion.g>
              );
            })}
          </svg>
        </Reveal>
      </div>
    </section>
  );
}

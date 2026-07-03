"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

type Beat = { eyebrow: string; title: string; value: string; desc: string; accent: string; glow: string };

const BEATS: Beat[] = [
  { eyebrow: "The Problem", title: "Petrol drains your earnings", value: "₹5,400", desc: "A typical delivery rider burns this much on fuel every single month.", accent: "text-red-400", glow: "rgba(239,68,68,0.35)" },
  { eyebrow: "The Switch", title: "Go 100% electric with Zypp", value: "₹1,000", desc: "Same distance, a fraction of the cost. No petrol, no maintenance headaches.", accent: "text-primary", glow: "rgba(16,185,129,0.4)" },
  { eyebrow: "The Reward", title: "Keep more. Earn more.", value: "₹40,000+", desc: "More take-home every month — and a cleaner city with every delivery.", accent: "text-emerald-400", glow: "rgba(52,211,153,0.45)" },
];

function BeatBlock({ beat, range, progress }: { beat: Beat; range: [number, number, number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [40, 0, 0, -40]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
      <div className="text-sm font-bold uppercase tracking-[0.2em] text-white/50 mb-4">{beat.eyebrow}</div>
      <div className={`text-6xl md:text-8xl font-black mb-4 ${beat.accent}`} style={{ textShadow: `0 0 60px ${beat.glow}` }}>{beat.value}</div>
      <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-3 max-w-2xl">{beat.title}</h3>
      <p className="text-white/60 text-lg max-w-md">{beat.desc}</p>
    </motion.div>
  );
}

export default function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const pathLength = useTransform(scrollYProgress, [0.05, 0.9], [0, 1]);
  const dotX = useTransform(scrollYProgress, [0.05, 0.9], [40, 760]);
  const dotY = useTransform(scrollYProgress, [0.05, 0.9], [240, 60]);

  if (reduce) {
    // Static, accessible fallback
    return (
      <section className="bg-slate-950 grain py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          {BEATS.map((b) => (
            <div key={b.title}>
              <div className={`text-5xl font-black mb-2 ${b.accent}`}>{b.value}</div>
              <h3 className="text-xl font-bold text-white mb-2">{b.title}</h3>
              <p className="text-white/60 text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[300vh] bg-slate-950">
      <div className="sticky top-0 h-screen overflow-hidden grain">
        {/* mesh + glow bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950" />
        <div className="absolute inset-0 bg-mesh opacity-60" />

        {/* drawing route line */}
        <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <defs>
            <linearGradient id="story-line" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="55%" stopColor="#00bc84" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          <motion.path
            d="M40 240 C 240 240, 300 170, 420 150 S 640 110, 760 60"
            fill="none"
            stroke="url(#story-line)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength }}
          />
          <motion.circle cx={dotX} cy={dotY} r="9" fill="#34d399" style={{ filter: "drop-shadow(0 0 10px rgba(52,211,153,0.9))" }} />
        </svg>

        {/* beats */}
        <div className="relative h-full">
          <BeatBlock beat={BEATS[0]} range={[0.0, 0.12, 0.28, 0.38]} progress={scrollYProgress} />
          <BeatBlock beat={BEATS[1]} range={[0.36, 0.46, 0.62, 0.72]} progress={scrollYProgress} />
          <BeatBlock beat={BEATS[2]} range={[0.7, 0.8, 0.95, 1.0]} progress={scrollYProgress} />
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 text-xs uppercase tracking-widest">Scroll the story</div>
      </div>
    </section>
  );
}

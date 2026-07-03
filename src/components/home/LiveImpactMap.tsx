"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { INDIA_PATH, INDIA_VIEWBOX, INDIA_CITIES } from "@/data/indiaMap";

// Accurate India silhouette + projected cities are generated from real
// boundary data — see scripts/gen-india-path.mjs (writes src/data/indiaMap.ts).
const CITIES = INDIA_CITIES;

// Subtle "delivery routes" radiating from the Delhi NCR HQ — story flourish.
const HQ = CITIES[0];

function useTicker(base: number, perTick: number, ms = 1500) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const id = setInterval(() => setV((x) => x + Math.round(perTick * (0.5 + Math.random()))), ms);
    return () => clearInterval(id);
  }, [base, perTick, ms]);
  return v;
}

function LiveStat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-[11px] uppercase tracking-widest text-white/40">Live</span>
      </div>
      <div className="text-3xl md:text-4xl font-black text-white tabular-nums">
        {value.toLocaleString("en-IN")}<span className="text-primary text-2xl">{suffix}</span>
      </div>
      <div className="text-white/50 text-sm mt-1">{label}</div>
    </div>
  );
}

export default function LiveImpactMap() {
  const reduce = useReducedMotion();
  // Live impact counters, ticking upward in real time. Priority order:
  // Lives Enabled → CO₂ saved → Active riders (Deliveries intentionally omitted).
  const lives = useTicker(250_000, 1, 4000);
  const co2 = useTicker(65_246_765, 3, 1200);
  const riders = useTicker(23_868, 1, 6000);

  return (
    <section className="relative py-24 bg-slate-950 grain overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950" />
      <div className="absolute inset-0 bg-mesh opacity-50" />

      <div className="relative z-10 container mx-auto px-4">
        <Reveal className="text-center mb-14">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Live Impact</div>
          <h2 className="text-3xl md:text-5xl font-black text-white">One fleet, nationwide impact</h2>
          <p className="text-white/50 mt-3 max-w-xl mx-auto">Real-time view of the change Zypp riders create across India, every second.</p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Map */}
          <Reveal direction="right" className="flex justify-center">
            <svg viewBox={INDIA_VIEWBOX} className="w-full max-w-sm" role="img" aria-label="Zypp live impact across India">
              <defs>
                <radialGradient id="map-glow" cx="42%" cy="40%" r="62%">
                  <stop offset="0%" stopColor="#00bc84" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#00bc84" stopOpacity="0" />
                </radialGradient>
                <filter id="map-edge" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00bc84" floodOpacity="0.6" />
                </filter>
              </defs>
              <circle cx="180" cy="250" r="210" fill="url(#map-glow)" />
              {/* Filled silhouette (state rings) with a soft emerald edge glow,
                  plus faint internal borders for a real "states" texture. */}
              <path d={INDIA_PATH} fillRule="evenodd" fill="#00bc84" fillOpacity="0.1" filter="url(#map-edge)" />
              <path d={INDIA_PATH} fill="none" stroke="#34d399" strokeOpacity="0.22" strokeWidth="0.6" strokeLinejoin="round" />

              {/* Delivery routes radiating from the HQ — animated dashes */}
              {!reduce && CITIES.slice(1).map((c, i) => (
                <motion.line
                  key={`route-${c.name}`}
                  x1={HQ.x} y1={HQ.y} x2={c.x} y2={c.y}
                  stroke="#34d399" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="3 5"
                  animate={{ strokeDashoffset: [0, -16] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: i * 0.15 }}
                />
              ))}

              {CITIES.map((c, i) => (
                <g key={c.name}>
                  {!reduce && (
                    <motion.circle
                      cx={c.x} cy={c.y} r="6" fill="#34d399" fillOpacity="0.4"
                      animate={{ r: [6, 18], opacity: [0.5, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: i * 0.3 }}
                    />
                  )}
                  <circle cx={c.x} cy={c.y} r={i === 0 ? 5 : 4} fill={i === 0 ? "#00bc84" : "#34d399"} style={{ filter: "drop-shadow(0 0 6px rgba(52,211,153,0.9))" }} />
                  <text x={c.x + 9} y={c.y + 4} fill="#ffffff" fillOpacity="0.72" fontSize="11" fontWeight="600">{c.name}</text>
                </g>
              ))}
            </svg>
          </Reveal>

          {/* Live counters — Lives Enabled leads; Deliveries intentionally omitted */}
          <Reveal direction="left" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <LiveStat value={lives} label="Lives enabled" suffix="+" />
            <LiveStat value={co2} label="Kgs of CO₂ saved" />
            <LiveStat value={riders} label="Active EV riders" suffix="+" />
            <div className="rounded-2xl bg-primary/15 border border-primary/30 p-5 flex flex-col justify-center">
              <div className="text-3xl md:text-4xl font-black text-primary">8</div>
              <div className="text-white/60 text-sm mt-1">Cities live &amp; expanding</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

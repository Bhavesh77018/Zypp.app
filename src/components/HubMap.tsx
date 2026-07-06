"use client";
import { motion, useReducedMotion } from "framer-motion";
import { INDIA_PATH, INDIA_VIEWBOX, INDIA_CITIES } from "@/data/indiaMap";
import { Reveal } from "@/components/motion/Reveal";

/** Accurate India map with pulsing hub-city pins — reuses the generated
 *  geographic data from src/data/indiaMap.ts. */
export default function HubMap() {
  const reduce = useReducedMotion();
  return (
    <Reveal className="container mx-auto px-4 max-w-4xl -mt-16 relative z-20">
      <div className="rounded-3xl border border-white/10 bg-slate-950 p-6 md:p-8 shadow-2xl">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          <h2 className="font-black text-white">Live on the Map</h2>
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> 8 cities & expanding
          </span>
        </div>
        <svg viewBox={INDIA_VIEWBOX} className="w-full max-h-[440px]" role="img" aria-label="Zypp hub cities across India">
          <path d={INDIA_PATH} fillRule="evenodd" fill="#10b981" fillOpacity="0.09" stroke="#34d399" strokeOpacity="0.35" strokeWidth="0.8" strokeLinejoin="round" />
          {INDIA_CITIES.map((c, i) => (
            <g key={c.name}>
              {!reduce && (
                <motion.circle cx={c.x} cy={c.y} r="6" fill="#34d399" fillOpacity="0.4"
                  animate={{ r: [6, 16], opacity: [0.5, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: i * 0.3 }} />
              )}
              <circle cx={c.x} cy={c.y} r="4" fill="#34d399" style={{ filter: "drop-shadow(0 0 6px rgba(52,211,153,0.9))" }} />
              <text x={c.x + 9} y={c.y + 4} fill="#fff" fillOpacity="0.75" fontSize="11" fontWeight="600">{c.name}</text>
            </g>
          ))}
        </svg>
      </div>
    </Reveal>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { INDIA_PATH, INDIA_VIEWBOX, INDIA_CITIES } from "@/data/indiaMap";
import { MapPin } from "lucide-react";

const CITIES = INDIA_CITIES;
const HQ = CITIES[0];

function useTicker(base: number, perTick: number, ms = 1500) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const id = setInterval(() => setV((x) => x + Math.round(perTick * (0.5 + Math.random()))), ms);
    return () => clearInterval(id);
  }, [base, perTick, ms]);
  return v;
}

function LiveStat({ value, label, suffix = "" }: { value: number; label: string; suffix?: string; }) {
  return (
    <RevealItem>
      <div className="rounded-2xl bg-[#0f171e] border border-white/5 p-6 md:p-8 h-full flex flex-col hover:border-white/10 transition-colors">
        <div className="flex items-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112a23] border border-[#1b3e34]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00bc84]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00bc84]">Live</span>
          </div>
        </div>
        <div className="mt-auto">
          <div className="text-3xl md:text-[32px] font-black text-white tabular-nums tracking-tight mb-1">
            {value.toLocaleString("en-IN")}<span className="text-[#00bc84] text-2xl md:text-[28px] ml-1 font-bold">{suffix}</span>
          </div>
          <div className="text-white/60 text-sm font-medium">{label}</div>
        </div>
      </div>
    </RevealItem>
  );
}

export default function LiveImpactMap() {
  const reduce = useReducedMotion();
  const lives = useTicker(250_042, 1, 4000);
  const co2 = useTicker(65_247_109, 3, 1200);
  const riders = useTicker(23_896, 1, 6000);

  return (
    <section className="relative py-24 md:py-32 bg-[#050b10] overflow-hidden">
      {/* Dark square grid background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-5xl mx-auto">
          
          {/* Map Side */}
          <Reveal direction="right" className="flex justify-center relative">
            {/* Concentric radar rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#00bc84]/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-[#00bc84]/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#00bc84]/5" />
            
            {/* Soft Green Glow Behind Map */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#00bc84]/20 blur-[100px]" />

            <div className="relative w-full max-w-[400px]">
              <svg viewBox={INDIA_VIEWBOX} className="w-full h-auto" role="img" aria-label="Zypp live impact across India">
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#00bc84" floodOpacity="0.4" />
                  </filter>
                </defs>
                {/* Filled map of India */}
                <path d={INDIA_PATH} fillRule="evenodd" fill="#03251c" stroke="#00bc84" strokeOpacity="0.2" strokeWidth="1" filter="url(#glow)" />

                {/* Delivery routes radiating from HQ */}
                {!reduce && CITIES.slice(1).map((c, i) => (
                  <motion.line
                    key={`route-${c.name}`}
                    x1={HQ.x} y1={HQ.y} x2={c.x} y2={c.y}
                    stroke="#00bc84" strokeWidth="1" strokeDasharray="3 5" strokeOpacity="0.3"
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
                  />
                ))}

                {/* City Nodes */}
                {CITIES.map((c, i) => (
                  <g key={c.name}>
                    {/* Ring animation */}
                    {!reduce && (
                      <motion.circle
                        cx={c.x} cy={c.y} r="6" fill="transparent" stroke="#00bc84" strokeWidth="1"
                        animate={{ r: [6, 16], opacity: [0.8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: i * 0.2 }}
                      />
                    )}
                    {/* Node Dot */}
                    <circle 
                      cx={c.x} cy={c.y} r="4.5" 
                      fill="transparent" 
                      stroke="#00bc84" strokeWidth="1.5"
                    />
                    <circle cx={c.x} cy={c.y} r="2" fill="#ffffff" />
                    {/* Node Label */}
                    <text 
                      x={c.x + 10} y={c.y + 4} 
                      fill="#ffffff" 
                      fontSize="12" fontWeight="700"
                    >
                      {c.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </Reveal>

          {/* Metrics Side */}
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4" stagger={0.1}>
            <LiveStat value={lives} label="Lives enabled" suffix="+" />
            <LiveStat value={co2} label="Kgs of CO₂ saved" />
            <LiveStat value={riders} label="Active EV riders" suffix="+" />
            
            <RevealItem>
              <div className="relative overflow-hidden rounded-2xl bg-[#091b17] border border-[#00bc84]/30 p-6 md:p-8 h-full flex flex-col hover:border-[#00bc84]/50 transition-colors">
                
                {/* Large Map Pin Watermark */}
                <div className="absolute top-1/2 -right-8 -translate-y-1/2 opacity-20 pointer-events-none">
                  <div className="w-[140px] h-[140px] rounded-full border-[16px] border-[#00bc84] rounded-br-none rotate-45 flex items-center justify-center">
                     <div className="w-10 h-10 rounded-full bg-[#00bc84]" />
                  </div>
                </div>

                <div className="relative z-10 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112a23] border border-[#1b3e34]">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#00bc84]">Expanding</span>
                  </div>
                </div>
                
                <div className="relative z-10 mt-auto">
                  <div className="text-3xl md:text-[32px] font-black text-white tracking-tight mb-2">8</div>
                  <div className="text-white/80 text-sm font-medium leading-snug">Cities live &amp; expanding<br/>rapidly across India</div>
                </div>
              </div>
            </RevealItem>
          </RevealStagger>

        </div>
      </div>
    </section>
  );
}

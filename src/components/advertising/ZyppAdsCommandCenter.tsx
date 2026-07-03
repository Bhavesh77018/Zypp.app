"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BrainCircuit, Eye, MapPin, Route, ScanSearch, Sparkles, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

function useCampaignMetric(base: number, increment: number, interval: number) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const timer = setInterval(() => setValue((current) => current + increment), interval);
    return () => clearInterval(timer);
  }, [increment, interval]);
  return value;
}

const ZONES = [
  { name: "Koramangala", score: 94, tone: "bg-orange-400" },
  { name: "HSR Layout", score: 88, tone: "bg-amber-300" },
  { name: "Indiranagar", score: 81, tone: "bg-emerald-400" },
];

export default function ZyppAdsCommandCenter() {
  const reduce = useReducedMotion();
  const impressions = useCampaignMetric(1246832, 47, 1600);
  const distance = useCampaignMetric(18421, 2, 2200);

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "linear-gradient(#fb923c 1px,transparent 1px),linear-gradient(90deg,#fb923c 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
      <div className="absolute -left-48 top-0 h-[560px] w-[560px] rounded-full bg-orange-500/15 blur-[130px]" />
      <div className="absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-emerald-400/10 blur-[130px]" />

      <div className="container relative mx-auto max-w-7xl px-4">
        <Reveal className="mb-12 grid items-end gap-8 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-orange-400"><BrainCircuit size={17} /> ZyppAds AI visibility</div>
            <h2 className="max-w-3xl text-3xl font-black leading-[1.05] md:text-5xl">See where your campaign moves.<br /><span className="text-orange-400">Know what to do next.</span></h2>
          </div>
          <p className="text-lg leading-relaxed text-slate-300">Track live deployment, active routes, zone coverage and estimated visibility from one campaign command center. AI highlights where reach is building and where the media plan can work harder.</p>
        </Reveal>

        <Reveal className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 md:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white"><ScanSearch size={19} /></div>
              <div><div className="text-sm font-black">ZyppAds Campaign OS</div><div className="text-[10px] uppercase tracking-[0.18em] text-white/40">Brand visibility command center</div></div>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-emerald-400"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Campaign live</div>
          </div>

          <div className="grid gap-4 p-4 md:p-6 lg:grid-cols-[0.95fr_1.35fr_0.8fr]">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <Eye className="mb-5 text-orange-400" size={19} />
                  <div className="text-xl font-black tabular-nums md:text-2xl">{impressions.toLocaleString("en-IN")}</div>
                  <div className="mt-1 text-[11px] text-white/45">Estimated impressions</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <Route className="mb-5 text-emerald-400" size={19} />
                  <div className="text-xl font-black tabular-nums md:text-2xl">{distance.toLocaleString("en-IN")} km</div>
                  <div className="mt-1 text-[11px] text-white/45">Campaign distance</div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="mb-4 flex items-center justify-between"><span className="text-xs font-black uppercase tracking-wider text-white/55">Zone visibility</span><TrendingUp size={16} className="text-orange-400" /></div>
                <div className="space-y-4">
                  {ZONES.map((zone, index) => (
                    <div key={zone.name}>
                      <div className="mb-1.5 flex justify-between text-[11px]"><span className="text-white/60">{zone.name}</span><span className="font-black text-white">{zone.score}%</span></div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div initial={reduce ? false : { width: 0 }} whileInView={{ width: `${zone.score}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: index * 0.12 }} className={`h-full rounded-full ${zone.tone}`} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a121e]">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle,#94a3b8 1px,transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="absolute left-[13%] top-[18%] h-40 w-40 rounded-full border border-orange-400/20 bg-orange-400/5" />
              <div className="absolute bottom-[10%] right-[12%] h-52 w-52 rounded-full border border-emerald-400/15 bg-emerald-400/5" />
              <svg viewBox="0 0 640 390" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <path d="M38 306 C130 246 151 84 254 116 S386 300 468 218 S538 75 614 92" fill="none" stroke="#fb923c" strokeWidth="6" strokeLinecap="round" strokeDasharray="10 13" opacity=".9" />
                <path d="M54 104 C145 166 230 268 327 231 S448 106 590 290" fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 12" opacity=".55" />
                {[{x:38,y:306},{x:254,y:116},{x:468,y:218},{x:614,y:92}].map((point, index) => <circle key={index} cx={point.x} cy={point.y} r="9" fill="#fb923c" stroke="#fff" strokeWidth="3" />)}
              </svg>
              <div className="absolute left-5 top-5 rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-white/55 backdrop-blur"><MapPin size={13} className="mr-1.5 inline text-orange-400" /> Bengaluru · live routes</div>
              <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
                {["128 EVs live", "14 zones", "92% active"].map((item) => <div key={item} className="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-center text-[10px] font-bold backdrop-blur">{item}</div>)}
              </div>
            </div>

            <div className="rounded-2xl border border-orange-400/20 bg-gradient-to-b from-orange-400/10 to-white/[0.03] p-5">
              <div className="mb-5 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-400"><Sparkles size={16} /> AI recommendations</div>
              <div className="space-y-3">
                {[
                  ["Shift 18 EVs to HSR", "Evening visibility is forecast to be 21% stronger."],
                  ["Extend office-hour window", "High-intent traffic is holding until 8:30 PM."],
                  ["Prioritise bag branding", "Doorstep exposure is outperforming the route baseline."],
                ].map(([title, body], index) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                    <div className="mb-2 flex items-center gap-2"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-400 text-[10px] font-black text-slate-950">{index + 1}</span><div className="text-sm font-black">{title}</div></div>
                    <p className="text-xs leading-relaxed text-white/45">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        <p className="mt-4 text-center text-xs text-white/35">Illustrative campaign view. Reporting fields are configured around the selected formats, cities and media plan.</p>
      </div>
    </section>
  );
}

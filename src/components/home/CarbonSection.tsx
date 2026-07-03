"use client";
import { Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/motion/Reveal";
import { getDefaults } from "@/lib/content";
import { AnimatePresence, motion } from "framer-motion";

type CarbonContent = {
  badge: string;
  label: string;
  baseValue: number;
  caption: string;
  stats: { end: number; suffix: string; label: string }[];
};

const FALLBACK = getDefaults("home").carbon as unknown as CarbonContent;

const ROTATING_METRICS = [
  { label: "CARBON SAVED", baseValue: 63454546.52, suffix: "kg", increment: 0.25, caption: "CO₂ emissions saved by Zypp riders across India" },
  { label: "DELIVERIES DONE", baseValue: 176543210.00, suffix: "+", increment: 1.5, caption: "Zero emission deliveries completed successfully" },
  { label: "TREES PLANTED", baseValue: 2500000.00, suffix: "+", increment: 0.05, caption: "Equivalent trees planted to offset our footprint" },
  { label: "ACTIVE RIDERS", baseValue: 26827, suffix: "+", increment: 0.01, caption: "Gig workers earning with Zypp EVs right now" },
  { label: "LIVES IMPACTED", baseValue: 250000, suffix: "+", increment: 0, caption: "Families empowered through gig economy opportunities" },
];

function LiveCounter({ base, increment, suffix }: { base: number; increment: number; suffix: string }) {
  const [value, setValue] = useState(base);
  
  useEffect(() => {
    setValue(base);
    if (increment === 0) return;
    const id = setInterval(() => {
      setValue((v) => parseFloat((v + increment + Math.random() * (increment * 0.5)).toFixed(2)));
    }, 1200);
    return () => clearInterval(id);
  }, [base, increment]);
  
  return (
    <span className="tabular-nums">
      {increment > 0 
        ? value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : value.toLocaleString("en-IN")}
      <span className="text-primary text-4xl md:text-5xl ml-2">{suffix}</span>
    </span>
  );
}

export default function CarbonSection({ content }: { content?: Partial<CarbonContent> }) {
  const c = { ...FALLBACK, ...content };
  const badgeText = c.badge.replace(/^[^\wA-Za-z]+/, "").trim();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ROTATING_METRICS.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const activeMetric = ROTATING_METRICS[activeIndex];

  return (
    <section className="relative w-full py-28 overflow-hidden flex items-center justify-center text-white">
      {/* Background Video — Nature/Trees */}
      <video
        className="absolute inset-0 w-full h-full object-cover saturate-[0.8] opacity-40 mix-blend-luminosity"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/media/nature-bg.mp4" type="video/mp4" />
      </video>
      
      {/* Background — dark green gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-emerald-950/70 to-slate-950/90" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, #00BC84 0%, transparent 50%), radial-gradient(circle at 70% 30%, #00a373 0%, transparent 40%)",
        }}
      />

      <Reveal className="relative z-10 container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-semibold mb-8 border border-white/20 uppercase tracking-widest backdrop-blur-md">
          <Leaf size={16} /> {badgeText || c.badge}
        </div>

        <div className="relative min-h-[160px] md:min-h-[200px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMetric.label}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="mb-4 text-white/60 text-lg font-semibold uppercase tracking-widest">
                {activeMetric.label}
              </div>
              <div className="text-[clamp(2.5rem,6vw,5.5rem)] font-black text-white mb-3 leading-none tracking-tight">
                <LiveCounter base={activeMetric.baseValue} increment={activeMetric.increment} suffix={activeMetric.suffix} />
              </div>
              <p className="text-white/60 text-lg">{activeMetric.caption}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
          {c.stats.map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:bg-white/10 transition-colors">
              <div className="text-3xl font-black text-primary mb-1">
                <AnimatedCounter end={s.end} suffix={s.suffix} />
              </div>
              <div className="text-white/70 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

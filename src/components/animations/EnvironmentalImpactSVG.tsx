"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import Image from "next/image";

export type EnvironmentProps = {
  heading: string;
  videoUrl: string;
  imageUrl: string;
  statValue: string;
  statLabel: string;
};

// Generates an SVG tree at a given position.
function SvgTree({ cx, cy, scale, delay }: { cx: number; cy: number; scale: number; delay: number }) {
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 100, damping: 10, delay }}
      style={{ originX: `${cx}px`, originY: `${cy}px`, transformBox: "fill-box" }}
    >
      {/* Trunk */}
      <rect x={cx - 2} y={cy - 20} width="4" height="20" fill="#78350f" />
      {/* Leaves */}
      <circle cx={cx} cy={cy - 30} r="15" fill="#00bc84" />
      <circle cx={cx - 10} cy={cy - 20} r="12" fill="#00a373" />
      <circle cx={cx + 10} cy={cy - 20} r="12" fill="#047857" />
    </motion.g>
  );
}

export default function EnvironmentalImpactSVG({ data }: { data: EnvironmentProps }) {
  return (
    <section className="relative w-full py-32 overflow-hidden bg-slate-900 text-white">
      {/* Abstract Background Forest Animation */}
      <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none opacity-30 md:opacity-50">
        <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full text-emerald-900">
          {/* Ground */}
          <path d="M0 150 Q 250 100 500 150 T 1000 150 L 1000 200 L 0 200 Z" fill="currentColor" />
          
          {/* Animated Trees (Scattered) */}
          <SvgTree cx={100} cy={160} scale={1.2} delay={0.2} />
          <SvgTree cx={180} cy={140} scale={0.8} delay={0.4} />
          <SvgTree cx={250} cy={135} scale={1.5} delay={0.1} />
          <SvgTree cx={400} cy={160} scale={1.1} delay={0.3} />
          <SvgTree cx={480} cy={145} scale={0.9} delay={0.5} />
          <SvgTree cx={650} cy={155} scale={1.4} delay={0.2} />
          <SvgTree cx={750} cy={170} scale={1.0} delay={0.6} />
          <SvgTree cx={850} cy={145} scale={1.3} delay={0.3} />
          <SvgTree cx={950} cy={165} scale={0.9} delay={0.1} />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6">{data.heading}</h2>
          <p className="text-xl text-emerald-400/80 max-w-2xl mx-auto">
            Our commitment to a greener planet isn't just a promise, it's baked into our core business model.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Massive Glowing Stat */}
          <Reveal direction="left" delay={0.2} className="flex flex-col justify-center text-center lg:text-left">
            <div className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 to-emerald-600 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              {data.statValue}
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mt-4 tracking-tight">
              {data.statLabel}
            </div>
            <p className="text-emerald-100/60 mt-6 text-lg max-w-md mx-auto lg:mx-0">
              Equivalent to planting over 2.5 million full-grown trees. Every electric mile driven on Zypp is a step towards cleaner air in Indian cities.
            </p>
          </Reveal>

          {/* Media Grid */}
          <Reveal direction="right" delay={0.4} className="relative">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative grid grid-cols-2 gap-4">
              {/* Video Player */}
              <div className="col-span-2 md:col-span-1 aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black relative group">
                <iframe
                  src={data.videoUrl}
                  title="Zypp Environmental Impact"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Image Overlay */}
              <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
                <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                  <Image src={data.imageUrl} alt="Zypp Impact" fill className="object-cover" />
                </div>
                <div className="flex-1 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 flex flex-col justify-center">
                  <div className="text-emerald-400 font-bold mb-2">Did You Know?</div>
                  <div className="text-sm text-emerald-100/80 leading-relaxed">
                    A single Zypp delivery rider replaces the carbon footprint of 2 petrol scooters running daily.
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

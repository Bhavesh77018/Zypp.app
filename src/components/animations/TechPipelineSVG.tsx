"use client";

import { motion, Variants } from "framer-motion";
import { Icon3D } from "@/components/Icon3D";
import { Reveal } from "@/components/motion/Reveal";

export default function TechPipelineSVG() {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 3, bounce: 0 },
        opacity: { duration: 0.5 }
      }
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12 lg:py-0 flex flex-col lg:block items-center justify-center lg:aspect-[2/1]">
      
      {/* Background SVG Canvas */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <svg viewBox="0 0 1200 600" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          {/* Path 1: IoT to AI (Left to Center) */}
          <motion.path
            d="M 250 300 C 400 300, 450 200, 600 200"
            fill="transparent"
            stroke="url(#gradient-blue-purple)"
            strokeWidth="4"
            strokeDasharray="8 8"
            variants={draw}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          />
          {/* Animated data packet 1 */}
          <motion.circle
            r="6"
            fill="#3b82f6"
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ filter: "blur(2px)", offsetPath: "path('M 250 300 C 400 300, 450 200, 600 200')" } as any}
          />

          {/* Path 2: AI to BMS (Center to Right) */}
          <motion.path
            d="M 600 200 C 750 200, 800 400, 950 400"
            fill="transparent"
            stroke="url(#gradient-purple-emerald)"
            strokeWidth="4"
            strokeDasharray="8 8"
            variants={draw}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          />
          {/* Animated data packet 2 */}
          <motion.circle
            r="6"
            fill="#00bc84"
            animate={{
              offsetDistance: ["0%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              delay: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ filter: "blur(2px)", offsetPath: "path('M 600 200 C 750 200, 800 400, 950 400')" } as any}
          />

          {/* Path 3: BMS back to IoT (Right to Left loop) */}
          <motion.path
            d="M 950 400 C 950 550, 250 550, 250 300"
            fill="transparent"
            stroke="url(#gradient-emerald-blue)"
            strokeWidth="2"
            strokeDasharray="4 12"
            opacity="0.3"
            variants={draw}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="gradient-blue-purple" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="gradient-purple-emerald" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#00bc84" />
            </linearGradient>
            <linearGradient id="gradient-emerald-blue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00bc84" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* HTML Overlays (Nodes) */}
      <div className="relative z-10 w-full h-full flex flex-col lg:block">
        
        {/* IoT Node */}
        <Reveal direction="left" delay={0.2} className="lg:absolute lg:top-[50%] lg:left-[20.83%] lg:-translate-x-1/2 lg:-translate-y-1/2 w-full lg:w-80 mb-12 lg:mb-0">
          <div className="bg-white dark:bg-slate-900 border border-blue-500/30 p-8 rounded-3xl shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]">
            <div className="flex items-center gap-4 mb-4">
              <Icon3D glyph="📡" size={48} tint="from-blue-500/30 to-transparent" />
              <h3 className="text-2xl font-black text-foreground">IoT Node</h3>
            </div>
            <p className="text-sm text-muted">Real-time telemetry, GPS, and component health from millions of EV miles.</p>
          </div>
        </Reveal>

        {/* AI Node */}
        <Reveal direction="up" delay={0.4} className="lg:absolute lg:top-[33.33%] lg:left-[50%] lg:-translate-x-1/2 lg:-translate-y-1/2 w-full lg:w-80 mb-12 lg:mb-0">
          <div className="bg-white dark:bg-slate-900 border border-purple-500/30 p-8 rounded-3xl shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]">
            <div className="flex items-center gap-4 mb-4">
              <Icon3D glyph="🧠" size={48} tint="from-purple-500/30 to-transparent" />
              <h3 className="text-2xl font-black text-foreground">AI Engine</h3>
            </div>
            <p className="text-sm text-muted">Processes big data to optimize routes, forecast demand, and match riders.</p>
          </div>
        </Reveal>

        {/* BMS Node */}
        <Reveal direction="right" delay={0.6} className="lg:absolute lg:top-[66.67%] lg:left-[79.17%] lg:-translate-x-1/2 lg:-translate-y-1/2 w-full lg:w-80">
          <div className="bg-white dark:bg-slate-900 border border-emerald-500/30 p-8 rounded-3xl shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]">
            <div className="flex items-center gap-4 mb-4">
              <Icon3D glyph="🔋" size={48} tint="from-emerald-500/30 to-transparent" />
              <h3 className="text-2xl font-black text-foreground">Smart BMS</h3>
            </div>
            <p className="text-sm text-muted">Thermal tracking and smart swapping algorithms to maximize battery lifespan.</p>
          </div>
        </Reveal>

      </div>
    </div>
  );
}

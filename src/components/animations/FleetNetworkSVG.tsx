"use client";

import { motion } from "framer-motion";
import { Icon3D } from "@/components/Icon3D";
import { Reveal } from "@/components/motion/Reveal";

export default function FleetNetworkSVG() {
  return (
    <div className="relative w-full max-w-7xl mx-auto py-12 lg:py-24 flex items-center justify-center min-h-[600px] overflow-hidden">
      
      {/* Background SVG Radar Canvas */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="w-full max-w-[1200px] aspect-square flex items-center justify-center opacity-40"
        >
          <svg viewBox="0 0 1000 1000" className="w-full h-full">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <circle cx="500" cy="500" r="200" fill="none" stroke="#06b6d4" strokeWidth="2" strokeOpacity="0.3" filter="url(#glow)" strokeDasharray="10 10" />
            <circle cx="500" cy="500" r="350" fill="none" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.2" />
            <circle cx="500" cy="500" r="480" fill="none" stroke="#10b981" strokeWidth="2" strokeOpacity="0.1" strokeDasharray="5 20" />
            
            {/* Crosshairs */}
            <line x1="500" y1="0" x2="500" y2="1000" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.1" />
            <line x1="0" y1="500" x2="1000" y2="500" stroke="#06b6d4" strokeWidth="1" strokeOpacity="0.1" />
          </svg>
        </motion.div>
      </div>

      {/* Grid Layout (Bulletproof Responsiveness) */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 px-4 items-center">
        
        {/* Left Column */}
        <div className="flex justify-center lg:justify-end w-full">
          {/* Assets Node */}
          <Reveal direction="left" delay={0.2} className="w-full max-w-[360px]">
            <div className="bg-slate-950/80 backdrop-blur-2xl border border-cyan-500/30 p-8 rounded-[2rem] hover:-translate-y-2 transition-all duration-300 shadow-[0_15px_40px_-15px_rgba(6,182,212,0.2)] hover:shadow-[0_20px_50px_-15px_rgba(6,182,212,0.3)] hover:border-cyan-500/60 group">
              <div className="flex items-center gap-5 mb-5">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                  <Icon3D glyph="📍" size={40} tint="from-cyan-500/40 to-transparent" />
                </div>
                <h3 className="text-xl font-bold text-white">Live Asset Tracking</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" /> GPS & Geofencing</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" /> Remote Immobilization</li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Center Column (Hub) */}
        <div className="flex justify-center w-full z-20">
          <Reveal delay={0.4} className="w-full max-w-[420px]">
            <div className="bg-slate-950/80 backdrop-blur-3xl border border-cyan-500/40 p-10 lg:p-12 rounded-[3rem] shadow-[0_0_100px_-20px_rgba(6,182,212,0.6)] text-center relative overflow-hidden group">
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />
              
              <Icon3D glyph="🖥️" size={96} tint="from-cyan-500/50 to-blue-500/20" className="mx-auto mb-8 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
              <h3 className="text-4xl font-black text-white mb-3">FleetEase OS</h3>
              <p className="text-cyan-400 font-black tracking-[0.2em] uppercase text-xs">Command Center</p>
            </div>
          </Reveal>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-8 justify-center lg:justify-start w-full max-w-[360px] mx-auto lg:mx-0">
          {/* Drivers Node */}
          <Reveal direction="right" delay={0.5} className="w-full">
            <div className="bg-slate-950/80 backdrop-blur-2xl border border-blue-500/30 p-8 rounded-[2rem] hover:-translate-y-2 transition-all duration-300 shadow-[0_15px_40px_-15px_rgba(59,130,246,0.2)] hover:shadow-[0_20px_50px_-15px_rgba(59,130,246,0.3)] hover:border-blue-500/60 group">
              <div className="flex items-center gap-5 mb-5">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                  <Icon3D glyph="👨‍✈️" size={40} tint="from-blue-500/40 to-transparent" />
                </div>
                <h3 className="text-xl font-bold text-white">Driver Management</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" /> Automated KYC</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" /> Shift & Attendance Tracking</li>
              </ul>
            </div>
          </Reveal>

          {/* Finance Node */}
          <Reveal direction="right" delay={0.6} className="w-full">
            <div className="bg-slate-950/80 backdrop-blur-2xl border border-emerald-500/30 p-8 rounded-[2rem] hover:-translate-y-2 transition-all duration-300 shadow-[0_15px_40px_-15px_rgba(16,185,129,0.2)] hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.3)] hover:border-emerald-500/60 group">
              <div className="flex items-center gap-5 mb-5">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                  <Icon3D glyph="🏦" size={40} tint="from-emerald-500/40 to-transparent" />
                </div>
                <h3 className="text-xl font-bold text-white">Financial Engine</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" /> Dynamic Billing & Invoicing</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" /> Automated Payouts</li>
              </ul>
            </div>
          </Reveal>
        </div>

      </div>
    </div>
  );
}

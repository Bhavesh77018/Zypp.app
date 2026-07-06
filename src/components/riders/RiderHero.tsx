"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type Stat = { icon: string; title: string; desc: string };
type Hero = {
  badge: string; titleLine1: string; titleHighlight: string; subtitle: string;
  primaryCtaLabel: string; primaryCtaLink: string; secondaryCtaLabel: string; secondaryCtaLink: string;
  earningsValue: string; earningsLabel: string; savingsValue: string; savingsLabel: string;
  stats: Stat[];
};

const fade = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1, ease: [0.21, 0.5, 0.27, 1] as const } }),
};

export default function RiderHero({ content }: { content: Hero }) {
  const c = content;
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 to-white dark:from-slate-900 dark:to-slate-950 pt-24 pb-16">
      {/* soft decorative blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute top-40 -left-24 w-80 h-80 rounded-full bg-emerald-300/20 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left — copy */}
          <div>
            <motion.div custom={0} initial="hidden" animate="show" variants={fade}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
              {c.badge}
            </motion.div>

            <motion.h1 custom={1} initial="hidden" animate="show" variants={fade}
              className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-5 text-gray-900 dark:text-white">
              {c.titleLine1}<br />
              <span className="text-primary">{c.titleHighlight}</span>
            </motion.h1>

            <motion.p custom={2} initial="hidden" animate="show" variants={fade}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-md mb-8">
              {c.subtitle}
            </motion.p>

            {/* stat chips */}
            <motion.div custom={3} initial="hidden" animate="show" variants={fade}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-xl">
              {c.stats.map((s) => (
                <div key={s.title} className="flex flex-col gap-1 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-3 shadow-sm">
                  <span className="text-xl">{s.icon}</span>
                  <span className="font-extrabold text-gray-900 dark:text-white text-sm leading-tight">{s.title}</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">{s.desc}</span>
                </div>
              ))}
            </motion.div>

            <motion.div custom={4} initial="hidden" animate="show" variants={fade} className="flex flex-wrap gap-3">
              <Link href={c.primaryCtaLink} data-track="Rider Start Earning"
                className="px-7 py-3.5 rounded-full bg-primary text-white font-bold hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/30 inline-flex items-center gap-2">
                {c.primaryCtaLabel} <ArrowRight size={18} />
              </Link>
              <Link href={c.secondaryCtaLink} data-track="Rider Calculate Savings"
                className="px-7 py-3.5 rounded-full bg-white dark:bg-slate-800 text-gray-900 dark:text-white font-bold border border-gray-200 dark:border-slate-700 hover:border-primary/50 transition-all inline-flex items-center gap-2">
                {c.secondaryCtaLabel}
              </Link>
            </motion.div>
          </div>

          {/* Right — animated SVG scene + floating cards */}
          <div className="relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-full max-w-md"
            >
              {/* Real Zypp hub photo — branded fleet under the #MissionZeroEmission wall */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-200/60 dark:border-slate-700">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/media/zypp-hub-real.jpg" alt="Zypp electric scooters lined up at a Zypp hub" className="w-full h-[380px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 via-transparent to-transparent" />
              </div>

              {/* Earnings card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -8, 0] }}
                transition={reduce ? { duration: 0.5, delay: 0.5 } : { y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.5, delay: 0.5 } }}
                className="absolute -top-2 -right-1 sm:right-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-black/10 border border-gray-100 dark:border-slate-700 p-4 w-44"
              >
                <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{c.earningsLabel}</div>
                <div className="text-2xl font-black text-gray-900 dark:text-white mb-2">{c.earningsValue}</div>
                <MiniChart reduce={!!reduce} />
              </motion.div>

              {/* Savings card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, 8, 0] }}
                transition={reduce ? { duration: 0.5, delay: 0.7 } : { y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }, opacity: { duration: 0.5, delay: 0.7 } }}
                className="absolute bottom-2 -left-1 sm:left-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl shadow-black/10 border border-gray-100 dark:border-slate-700 p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">⛽</div>
                <div>
                  <div className="text-lg font-black text-primary leading-none">{c.savingsValue}</div>
                  <div className="text-[11px] text-gray-500 dark:text-gray-400">{c.savingsLabel}</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Animated mini bar chart ───────────────────────────────────────────────
function MiniChart({ reduce }: { reduce: boolean }) {
  const bars = [40, 55, 48, 70, 90];
  return (
    <div className="flex items-end gap-1.5 h-10">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm bg-gradient-to-t from-primary to-emerald-400"
          initial={{ height: reduce ? `${h}%` : 4 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 + i * 0.08, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// ─── Animated SVG rider on scooter ─────────────────────────────────────────
function RiderScene({ reduce }: { reduce: boolean }) {
  const spin = reduce ? {} : { rotate: 360 };
  const spinT = { duration: 1.4, repeat: Infinity, ease: "linear" as const };

  return (
    <svg viewBox="0 0 420 360" className="w-full h-auto" role="img" aria-label="Rider on an electric scooter">
      <defs>
        <linearGradient id="rg-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00bc84" />
          <stop offset="100%" stopColor="#00a373" />
        </linearGradient>
        <radialGradient id="rg-bg" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#00bc84" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#00bc84" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* halo */}
      <circle cx="210" cy="170" r="160" fill="url(#rg-bg)" />

      {/* speed lines */}
      {!reduce && [0, 1, 2].map((i) => (
        <motion.line
          key={i}
          x1="20" x2="90" y1={150 + i * 26} y2={150 + i * 26}
          stroke="#00bc84" strokeOpacity="0.4" strokeWidth="4" strokeLinecap="round"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: [-30, 40], opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut", delay: i * 0.25 }}
        />
      ))}

      {/* whole rig gentle bob */}
      <motion.g
        animate={reduce ? {} : { y: [0, -5, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* ground shadow */}
        <ellipse cx="215" cy="300" rx="150" ry="14" fill="#000" opacity="0.08" />

        {/* scooter deck + front */}
        <path d="M120 250 L250 250 Q270 250 280 232 L300 196 L322 196" fill="none" stroke="url(#rg-body)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        {/* front handlebar stem */}
        <path d="M315 196 L330 150" stroke="#1f2937" strokeWidth="9" strokeLinecap="round" />
        <path d="M322 150 L348 142" stroke="#1f2937" strokeWidth="9" strokeLinecap="round" />
        {/* seat */}
        <path d="M120 240 L168 240 Q176 240 176 248 L176 250 L120 250 Z" fill="#1f2937" />
        {/* deck guard */}
        <path d="M150 252 L250 252 Q264 252 272 240" fill="none" stroke="#34d399" strokeWidth="5" strokeLinecap="round" opacity="0.8" />

        {/* rider */}
        <g>
          {/* leg */}
          <path d="M205 205 L210 248 L188 256" fill="none" stroke="#1f2937" strokeWidth="11" strokeLinecap="round" />
          {/* torso (jacket) */}
          <path d="M192 150 Q188 180 205 208 L232 198 Q224 168 220 150 Z" fill="url(#rg-body)" />
          {/* arm to handlebar */}
          <path d="M214 160 L300 158" fill="none" stroke="#00bc84" strokeWidth="10" strokeLinecap="round" />
          {/* head + helmet */}
          <circle cx="205" cy="132" r="22" fill="#fbbf24" />
          <path d="M183 130 a22 22 0 0 1 44 0 Z" fill="#1f2937" />
          <rect x="200" y="124" width="26" height="10" rx="4" fill="#34d399" opacity="0.85" />
          {/* backpack */}
          <rect x="176" y="150" width="22" height="30" rx="6" fill="#0f766e" />
        </g>

        {/* rear wheel */}
        <g>
          <circle cx="135" cy="278" r="34" fill="#111827" />
          <circle cx="135" cy="278" r="20" fill="#e5e7eb" />
          <motion.g style={{ originX: "135px", originY: "278px" }} animate={spin} transition={spinT}>
            {[0, 45, 90, 135].map((a) => (
              <line key={a} x1="135" y1="278" x2={135 + 18 * Math.cos((a * Math.PI) / 180)} y2={278 + 18 * Math.sin((a * Math.PI) / 180)} stroke="#9ca3af" strokeWidth="3" />
            ))}
          </motion.g>
          <circle cx="135" cy="278" r="5" fill="#00bc84" />
        </g>
        {/* front wheel */}
        <g>
          <circle cx="320" cy="278" r="34" fill="#111827" />
          <circle cx="320" cy="278" r="20" fill="#e5e7eb" />
          <motion.g style={{ originX: "320px", originY: "278px" }} animate={spin} transition={spinT}>
            {[0, 45, 90, 135].map((a) => (
              <line key={a} x1="320" y1="278" x2={320 + 18 * Math.cos((a * Math.PI) / 180)} y2={278 + 18 * Math.sin((a * Math.PI) / 180)} stroke="#9ca3af" strokeWidth="3" />
            ))}
          </motion.g>
          <circle cx="320" cy="278" r="5" fill="#00bc84" />
        </g>
      </motion.g>
    </svg>
  );
}

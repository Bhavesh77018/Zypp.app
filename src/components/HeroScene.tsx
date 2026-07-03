"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated decorative SVG hero scene — orbiting energy rings around a glowing
 * EV core, with drifting "leaf" and "bolt" satellites. Pure SVG + Framer Motion,
 * no WebGL. Sits as a low-opacity background layer behind hero text.
 */
export default function HeroScene() {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 800 800" className="absolute inset-0 w-full h-full opacity-[0.55]" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#00bc84" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00bc84" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#00bc84" stopOpacity="0.05" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Glowing core */}
      <circle cx="400" cy="400" r="240" fill="url(#core)" />

      {/* Orbit rings */}
      {[150, 220, 300].map((r, i) => (
        <motion.g
          key={r}
          style={{ originX: "400px", originY: "400px" }}
          animate={reduce ? undefined : { rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 40 + i * 18, repeat: Infinity, ease: "linear" }}
        >
          <ellipse cx="400" cy="400" rx={r} ry={r * 0.62} fill="none" stroke="url(#ring)" strokeWidth="1.5" strokeDasharray={i === 1 ? "6 10" : undefined} />
          {/* satellite node riding the ring */}
          <circle cx={400 + r} cy="400" r={i === 0 ? 9 : 6} fill="#34d399" filter="url(#glow)" />
        </motion.g>
      ))}

      {/* Drifting satellites */}
      {!reduce &&
        [
          { x: 180, y: 220, d: 7 },
          { x: 620, y: 250, d: 9 },
          { x: 250, y: 600, d: 8 },
          { x: 580, y: 580, d: 6 },
        ].map((s, i) => (
          <motion.circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.d}
            fill="#00bc84"
            opacity={0.5}
            filter="url(#glow)"
            animate={{ y: [0, -28, 0], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          />
        ))}
    </svg>
  );
}

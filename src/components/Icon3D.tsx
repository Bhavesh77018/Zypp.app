"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useRef } from "react";
import { iconFor } from "@/components/icons/iconMap";

/**
 * Premium 3D icon chip. Renders a professional Lucide icon (mapped from an emoji
 * glyph) inside a glossy, beveled, glowing tile that tilts toward the cursor.
 * Falls back to the raw emoji/children when no icon mapping exists. Pure CSS/SVG.
 */
export function Icon3D({
  glyph,
  children,
  size = 56,
  className = "",
  tint = "from-primary/20 via-primary/10 to-transparent",
}: {
  glyph?: string;
  children?: ReactNode;
  size?: number;
  className?: string;
  tint?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 200, damping: 14 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 200, damping: 14 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const Icon = iconFor(glyph);
  const iconSize = Math.round(size * 0.46);

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ perspective: 700 }} className={`group/icon ${className}`}>
      <motion.div
        style={{ width: size, height: size, rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={`relative rounded-[28%] bg-gradient-to-br ${tint} ring-1 ring-inset ring-primary/25 dark:ring-primary/20 shadow-[0_8px_20px_-8px_rgba(16,185,129,0.45)] flex items-center justify-center`}
      >
        {/* glossy top highlight */}
        <div className="absolute inset-0 rounded-[28%] bg-gradient-to-b from-white/60 to-transparent opacity-70 dark:from-white/10" />
        {/* soft hover glow */}
        <div className="absolute -inset-1 rounded-[28%] bg-primary/30 blur-lg opacity-0 group-hover/icon:opacity-60 transition-opacity duration-300" />
        {/* icon, lifted on its own 3D layer */}
        <div style={{ transform: "translateZ(22px)" }} className="relative leading-none select-none">
          {Icon ? (
            <Icon size={iconSize} strokeWidth={2.1} className="text-primary drop-shadow-[0_3px_5px_rgba(16,185,129,0.35)]" />
          ) : (
            <span style={{ fontSize: size * 0.42 }} className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]">{children ?? glyph}</span>
          )}
        </div>
      </motion.div>
    </div>
  );
}

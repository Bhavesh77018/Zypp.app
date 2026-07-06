"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type HeroVideoBackdropProps = {
  image?: string;
  video?: string;
  accent?: "green" | "orange" | "blue" | "violet";
  videoOpacity?: number;
};

const TINTS = {
  green: "from-slate-950/55 via-emerald-950/40 to-slate-950/80",
  orange: "from-slate-950/60 via-orange-950/35 to-slate-950/85",
  blue: "from-slate-950/55 via-blue-950/35 to-slate-950/85",
  violet: "from-slate-950/55 via-violet-950/35 to-slate-950/85",
};

export default function HeroVideoBackdrop({ image, video, accent = "green", videoOpacity = 0.32 }: HeroVideoBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll-linked parallax: as the hero scrolls away, the media layer drifts
  // down slower than the page and eases from a slight zoom back to rest —
  // the subtle depth effect of premium scooter/product sites.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <div ref={ref} className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div className="absolute inset-0 will-change-transform" style={reduce ? undefined : { y, scale }}>
        {video && (
          <video
            className="h-full w-full object-cover saturate-[0.8]"
            style={{ opacity: videoOpacity }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={video} type="video/mp4" />
          </video>
        )}
        {/* When no video plays, the photo carries the hero — keep it present
            (Cowboy-style full-bleed) and rely on the tint gradient for contrast. */}
        {image && (
          <div
            className={`absolute inset-0 bg-cover bg-center ${video ? "opacity-[0.18] mix-blend-luminosity" : "opacity-[0.45] saturate-[0.85]"}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        )}
      </motion.div>
      <div className={`absolute inset-0 bg-gradient-to-br ${TINTS[accent]}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,188,132,0.18),transparent_48%)]" />
    </div>
  );
}

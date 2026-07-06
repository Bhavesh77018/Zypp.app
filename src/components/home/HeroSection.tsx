"use client";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getDefaults } from "@/lib/content";
import HeroScene from "@/components/HeroScene";
import MagneticButton from "@/components/MagneticButton";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";

type HeroContent = {
  bgImage: string;
  badge: string;
  titleLine1: string;
  titleHighlight: string;
  titleLine2: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
  stats: { value: string; label: string }[];
};

const FALLBACK = getDefaults("home").hero as unknown as HeroContent;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.21, 0.5, 0.27, 1] as const },
  }),
};

export default function HeroSection({ content }: { content?: Partial<HeroContent> }) {
  const c = { ...FALLBACK, ...content };
  const pathname = usePathname();

  return (
    <section className="relative w-full min-h-[calc(100svh-64px)] flex flex-col items-center justify-center overflow-hidden pt-20 md:pt-24">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-black">
        {c.bgImage && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${c.bgImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950" />
        <HeroVideoBackdrop
          video="/media/city-traffic.mp4"
          image={pathname === "/fleetease" || pathname === "/technologies" ? "/media/zypp-fleetease-real.jpg" : "/media/zypp-hub-real.jpg"}
          accent={pathname === "/technologies" ? "blue" : "green"}
          videoOpacity={0.34}
        />
        <div className="absolute inset-0 bg-black/30" />
        {/* The original animated mobility scene remains the page-specific visual layer. */}
        {!c.bgImage && <div className="absolute inset-0 opacity-70"><HeroScene /></div>}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/20 blur-xl"
                style={{
                  width: `${40 + (i * 23) % 120}px`,
                  height: `${40 + (i * 23) % 120}px`,
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 53) % 100}%`,
                }}
                animate={{ y: [0, -24, 0], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: (i * 0.3) % 3 }}
              />
            ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center justify-center px-5 py-16 text-center md:py-24 lg:py-28">
        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary font-semibold text-sm mb-6 border border-primary/30 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {c.badge}
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="max-w-5xl text-[clamp(2.1rem,4.6vw,3.8rem)] font-black text-white leading-[0.98] mb-7 tracking-[-0.04em]"
        >
          {c.titleLine1}{" "}
          <span className="text-primary">{c.titleHighlight}</span>
          {c.titleLine2 && <><br /><span className="text-white/90 text-[0.68em] font-bold tracking-[-0.025em]">{c.titleLine2}</span></>}
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-base md:text-xl text-white/70 max-w-3xl mb-9 leading-relaxed"
        >
          {c.subtitle}
        </motion.p>

        <motion.div custom={3} initial="hidden" animate="show" variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
          <MagneticButton
            href={c.primaryCtaLink}
            dataTrack="Contact Us Hero"
            className="px-7 py-3.5 md:px-8 md:py-4 rounded-full bg-primary text-white font-bold text-base md:text-lg hover:bg-primary/90 transition-all shadow-2xl shadow-primary/40 inline-flex items-center gap-2"
          >
            {c.primaryCtaLabel} <ArrowRight size={20} />
          </MagneticButton>
          <a
            href={c.secondaryCtaLink}
            target="_blank"
            rel="noopener"
            data-track="Get the App Hero"
            className="px-7 py-3.5 md:px-8 md:py-4 rounded-full bg-white/10 text-white font-bold text-base md:text-lg hover:bg-white/20 hover:-translate-y-1 transition-all border border-white/20 backdrop-blur-md"
          >
            {c.secondaryCtaLabel}
          </a>
        </motion.div>

        {/* Live impact stats */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10 mt-12 w-full max-w-4xl"
        >
          {c.stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-4xl font-black text-primary">{s.value}</span>
              <span className="text-xs md:text-sm text-white/60 font-medium text-center">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/40 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-white/0 to-white/40" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, Mic } from "lucide-react";
import { getContent } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import PartnerCO2Breakdown from "@/components/environment/PartnerCO2Breakdown";
import HumanImpact from "@/components/environment/HumanImpact";
type Stat = { val: string; unit: string; label: string };
type SDG = { num: string; title: string; desc: string };
type Goal = { year: string; title: string; progress: number };

export const metadata = {
  title: "ESG & Environment | Zypp Electric",
  description: "Zypp's measurable impact on carbon reduction, sustainability goals, and gig worker livelihoods.",
};

export default function EnvironmentPage() {
  const c = getContent("environment");
  const hero = c.hero as Record<string, string>;
  const counter = c.counter as Record<string, string>;
  const impactSec = c.impactStats as Record<string, unknown>;
  const sdgSec = c.sdg as Record<string, unknown>;
  const goalsSec = c.goals as Record<string, unknown>;
  const cta = c.ctaBanner as Record<string, string>;
  const impact = (impactSec.items ?? []) as Stat[];
  const sdg = (sdgSec.items ?? []) as SDG[];
  const goals = (goalsSec.items ?? []) as Goal[];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[calc(100svh-64px)] flex items-center overflow-hidden bg-slate-900 pt-24 pb-16 md:pt-28 md:pb-20">
        {/* Subtle nature background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline aria-hidden="true"
        >
          <source src="/media/nature-bg.mp4" type="video/mp4" />
        </video>
        {/* Darkening + brand tint layers keep the video subtle and text legible */}
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-emerald-950/70 to-slate-900/85" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #00BC84 0%, transparent 60%)" }} />
        <Reveal className="relative z-10 container mx-auto px-4 py-10 md:py-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-black uppercase tracking-widest mb-6 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ESG & Environment
          </div>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-[0.95] tracking-[-0.04em] text-white mb-7">
            {hero.titlePrefix}<span className="text-emerald-400">{hero.titleHighlight}</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">{hero.subtitle}</p>
        </Reveal>
      </section>

      {/* Live Carbon Counter - Dashboard Style */}
      <section className="relative z-20 -mt-10 mb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Reveal className="rounded-[2rem] border border-emerald-500/20 bg-slate-900/90 p-10 text-center backdrop-blur-xl shadow-2xl shadow-emerald-900/20">
            <div className="text-emerald-400 font-black uppercase tracking-[0.2em] text-sm mb-6 flex items-center justify-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Live Impact Counter
            </div>
            <div className="text-[clamp(3.5rem,8vw,6rem)] font-black text-white mb-2 leading-none tracking-tight">
              {counter.value} <span className="text-emerald-500 text-[clamp(2rem,4vw,3rem)]">{counter.unit}</span>
            </div>
            <p className="text-white/60 text-lg md:text-xl font-medium mt-4">{counter.caption}</p>
          </Reveal>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <RevealStagger className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {impact.map((s) => (
              <RevealItem key={s.label} className="group bg-background border border-border rounded-3xl p-8 text-center hover:border-emerald-500/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl font-black text-emerald-500 mb-2 group-hover:scale-105 transition-transform origin-center">{s.val} <span className="text-xl">{s.unit}</span></div>
                <div className="text-sm font-bold text-muted uppercase tracking-wider">{s.label}</div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Partner CO₂ breakdown — animated bars */}
      <PartnerCO2Breakdown />

      {/* Detailed Human Impact & Rider Stories */}
      <HumanImpact />

      {/* SDG Goals */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-3">{String(sdgSec.eyebrow)}</div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground">{String(sdgSec.heading)}</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {sdg.map((g) => (
              <RevealItem key={g.num} className="group bg-background border border-border rounded-3xl p-8 hover:border-emerald-500/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-black text-xl mx-auto mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">{g.num}</div>
                <h3 className="text-lg font-black text-foreground mb-3">{g.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{g.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* 2030 Goals */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-3xl">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-3">{String(goalsSec.eyebrow)}</div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground">{String(goalsSec.heading)}</h2>
          </Reveal>
          <div className="flex flex-col gap-5">
            {goals.map((g) => (
              <div key={g.year} className="group bg-background border border-border rounded-3xl p-7 transition-all hover:border-emerald-500/30 hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-black text-xs uppercase tracking-widest mb-2">{g.year}</span>
                    <h3 className="text-lg font-black text-foreground">{g.title}</h3>
                  </div>
                  <span className="text-emerald-500 font-black text-3xl">{g.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full transition-all duration-1000 ease-out group-hover:opacity-90" style={{ width: `${g.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-600 text-white text-center border-t border-emerald-500/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] leading-tight font-black mb-5 tracking-tight">{cta.heading}</h2>
          <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto">{cta.body}</p>
          <Link href={cta.ctaLink} data-track="Environment CTA" className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-emerald-600 font-black hover:bg-emerald-50 hover:scale-105 transition-all shadow-2xl shadow-emerald-900/30">
            {cta.ctaLabel} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}

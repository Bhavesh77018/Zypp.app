import Link from "next/link";
import { ArrowRight, Mic } from "lucide-react";
import { getContent } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import PartnerCO2Breakdown from "@/components/environment/PartnerCO2Breakdown";
import HumanImpact from "@/components/environment/HumanImpact";
type Stat = { val: string; unit: string; label: string };
type SDG = { num: string; title: string; desc: string };
type Goal = { year: string; title: string; progress: number };

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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/30">
            {hero.badge}
          </div>
          <h1 className="text-[clamp(2.75rem,6vw,5rem)] font-black leading-[0.98] tracking-[-0.04em] text-white mb-7">
            {hero.titlePrefix}<span className="text-primary">{hero.titleHighlight}</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">{hero.subtitle}</p>
        </Reveal>
      </section>

      {/* Live Carbon Counter */}
      <section className="py-20 bg-emerald-900 text-white text-center">
        <div className="container mx-auto px-4">
          <div className="text-primary font-bold uppercase tracking-widest text-sm mb-4">{counter.eyebrow}</div>
          <div className="text-6xl md:text-8xl font-black text-white mb-3">{counter.value} <span className="text-primary text-4xl">{counter.unit}</span></div>
          <p className="text-white/60 text-lg">{counter.caption}</p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <RevealStagger className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {impact.map((s) => (
              <RevealItem key={s.label} className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 text-center hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="text-3xl font-black text-primary mb-1">{s.val} <span className="text-lg">{s.unit}</span></div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
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
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(sdgSec.eyebrow)}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{String(sdgSec.heading)}</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {sdg.map((g) => (
              <RevealItem key={g.num} className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 text-center">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-black text-xs mx-auto mb-4">{g.num}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{g.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{g.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* 2030 Goals */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-3xl">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(goalsSec.eyebrow)}</div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{String(goalsSec.heading)}</h2>
          </Reveal>
          <div className="flex flex-col gap-6">
            {goals.map((g) => (
              <div key={g.year} className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-primary font-bold text-sm">{g.year}</span>
                    <h3 className="font-bold text-gray-900 dark:text-white">{g.title}</h3>
                  </div>
                  <span className="text-primary font-black text-lg">{g.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all duration-700" style={{ width: `${g.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-4">{cta.heading}</h2>
          <p className="text-lg opacity-80 mb-8">{cta.body}</p>
          <Link href={cta.ctaLink} data-track="Environment CTA" className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-primary font-bold hover:bg-white/90 transition-colors shadow-xl">
            {cta.ctaLabel} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

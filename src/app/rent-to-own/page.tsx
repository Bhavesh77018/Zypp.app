import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { Icon3D } from "@/components/Icon3D";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";
import OwnershipPath from "@/components/OwnershipPath";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { CountUpValue } from "@/components/CountUpValue";

type Stat = { val: string; label: string };
type Benefit = { icon: string; title: string; desc: string };
type Phase = { phase: string; title: string; desc: string };

export default function RentToOwnPage() {
  const c = getContent("rent-to-own");
  const hero = c.hero as Record<string, string>;
  const stats = ((c.statsBar as { stats: Stat[] }).stats ?? []) as Stat[];
  const benefitsSec = c.benefits as Record<string, unknown>;
  const timelineSec = c.timeline as Record<string, unknown>;
  const eligSec = c.eligibility as Record<string, unknown>;
  const cta = c.ctaBanner as Record<string, string>;
  const benefits = (benefitsSec.items ?? []) as Benefit[];
  const timeline = (timelineSec.items ?? []) as Phase[];
  const eligItems = (eligSec?.items ?? []) as Benefit[];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[calc(100svh-64px)] flex items-center overflow-hidden bg-slate-900 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
        <HeroVideoBackdrop image="/media/life-rider.webp" accent="green" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #00BC84 0%, transparent 50%)" }} />
        <Reveal className="relative z-10 container mx-auto px-4 py-10 md:py-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/30">
            {hero.badge}
          </div>
          <h1 className="text-[clamp(2.1rem,4.2vw,3.4rem)] font-black leading-[0.98] tracking-[-0.04em] text-white mb-7">
            {hero.titleLine1}<br /><span className="text-primary">{hero.titleHighlight}</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">{hero.subtitle}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={hero.ctaLink} data-track="RTO Apply CTA" className="px-10 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 inline-flex items-center gap-2">
              {hero.ctaLabel} <ArrowRight size={20} />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="bg-primary py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black"><CountUpValue value={s.val} /></div>
                <div className="text-sm opacity-80 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 52-week ownership road — self-drawing SVG */}
      <OwnershipPath />

      {/* Benefits */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(benefitsSec.eyebrow)}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{String(benefitsSec.heading)}</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((b) => (
              <RevealItem key={b.title} className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <Icon3D glyph={b.icon} size={44} className="mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{b.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{b.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900 overflow-hidden relative border-y border-gray-100 dark:border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Reveal className="text-center mb-16">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(timelineSec.eyebrow)}</div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight max-w-3xl mx-auto">{String(timelineSec.heading)}</h2>
          </Reveal>
          
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 z-0" />
            
            <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
              {timeline.map((t, i) => (
                <RevealItem key={t.phase} className="relative bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
                  
                  {/* Big Background Number */}
                  <div className="absolute -right-4 -bottom-6 text-[140px] font-black text-gray-50 dark:text-slate-900 group-hover:text-primary/5 transition-colors duration-500 leading-none pointer-events-none select-none">
                    {i + 1}
                  </div>
                  
                  {/* Glowing Top Border effect */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-lg mb-8 shadow-inner border border-primary/20 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      0{i + 1}
                    </div>
                    <div className="inline-block text-primary text-[10px] font-black uppercase tracking-widest mb-2">{t.phase}</div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3 leading-tight">{t.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mt-auto">{t.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* Eligibility to Apply */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(eligSec?.eyebrow)}</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">{String(eligSec?.heading)}</h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{String(eligSec?.body)}</p>
              <a href={String(eligSec?.ctaLink)} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                {String(eligSec?.ctaLabel)} <ArrowRight size={16} />
              </a>
            </Reveal>
            <RevealStagger className="grid grid-cols-2 gap-4">
              {eligItems.map((e) => (
                <RevealItem key={e.title} className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 hover:border-primary/30 transition-colors">
                  <Icon3D glyph={e.icon} size={40} className="mb-2" />
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{e.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 leading-relaxed">{e.desc}</p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-4">{cta.heading}</h2>
          <p className="text-lg opacity-80 mb-8">{cta.body}</p>
          <Link href={cta.ctaLink} data-track="RTO Final CTA" className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-primary font-bold hover:bg-white/90 transition-colors shadow-xl">
            {cta.ctaLabel} <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <StickyMobileCTA label="Own your EV in 52 weeks — Apply" />
    </div>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { Icon3D } from "@/components/Icon3D";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";

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
          <h1 className="text-[clamp(2.75rem,6vw,5rem)] font-black leading-[0.98] tracking-[-0.04em] text-white mb-7">
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
                <div className="text-2xl font-black">{s.val}</div>
                <div className="text-sm opacity-80 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(timelineSec.eyebrow)}</div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{String(timelineSec.heading)}</h2>
          </Reveal>
          <div className="relative">
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            <div className="flex flex-col gap-10">
              {timeline.map((t, i) => (
                <Reveal as="div" key={t.phase} direction="right" className="flex items-start gap-8 pl-16 relative">
                  <div className="absolute left-4 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs font-black shadow-lg shadow-primary/30 -translate-x-1/2">
                    {i + 1}
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2">{t.phase}</div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{t.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
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
    </div>
  );
}

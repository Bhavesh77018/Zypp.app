import Link from "next/link";
import { ArrowRight, BatteryCharging } from "lucide-react";
import { EmojiIcon } from "@/components/icons/iconMap";
import { getContent } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { Icon3D } from "@/components/Icon3D";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";

type Feature = { icon: string; title: string; desc: string };
type Stat = { val: string; label: string };
type Partner = { icon: string; name: string };

export default function ZyppEvolvePage() {
  const c = getContent("zypp-evolve");
  const hero = c.hero as Record<string, string>;
  const featuresSec = c.features as Record<string, unknown>;
  const baas = c.baas as Record<string, unknown>;
  const partnersSec = c.partners as Record<string, unknown>;
  const cta = c.ctaBanner as Record<string, string>;
  const features = (featuresSec.items ?? []) as Feature[];
  const baasStats = (baas.stats ?? []) as Stat[];
  const partners = (partnersSec.items ?? []) as Partner[];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[calc(100svh-64px)] flex items-center overflow-hidden bg-slate-900 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900" />
        <HeroVideoBackdrop image="/media/fleet-control.webp" accent="violet" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 60% 40%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 20% 70%, #00BC84 0%, transparent 40%)" }} />
        <Reveal className="relative z-10 container mx-auto px-4 py-10 md:py-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/20 text-violet-300 text-sm font-semibold mb-6 border border-violet-500/30">
            {hero.badge}
          </div>
          <h1 className="text-[clamp(2.75rem,6vw,5rem)] font-black leading-[0.98] tracking-[-0.04em] text-white mb-6">
            {hero.titlePrefix}<span className="text-primary">{hero.titleHighlight}</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-4 font-medium">{hero.tagline}</p>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-10">{hero.subtitle}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={hero.primaryCtaLink} data-track="Evolve Join Beta" className="px-10 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 inline-flex items-center gap-2">
              {hero.primaryCtaLabel} <ArrowRight size={20} />
            </Link>
            <Link href={hero.secondaryCtaLink} data-track="Evolve Learn Tech" className="px-10 py-4 rounded-full bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition-all">
              {hero.secondaryCtaLabel}
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(featuresSec.eyebrow)}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{String(featuresSec.heading)}</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f) => (
              <RevealItem key={f.title} className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <Icon3D glyph={f.icon} size={48} className="mb-4" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* BaaS Explainer */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal direction="right">
              <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(baas.eyebrow)}</div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">{String(baas.heading)}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-6 leading-relaxed">{String(baas.body)}</p>
              <div className="grid grid-cols-3 gap-4">
                {baasStats.map((s) => (
                  <div key={s.label} className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-4 text-center">
                    <div className="text-xl font-black text-primary">{s.val}</div>
                    <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal direction="left" className="flex justify-center">
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-violet-500/10 rounded-3xl" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-24 h-24 flex items-center justify-center rounded-3xl bg-primary/10 text-primary"><BatteryCharging size={56} strokeWidth={1.5} /></div>
                  <div className="text-center">
                    <div className="text-gray-900 dark:text-white font-bold">{String(baas.visualTitle)}</div>
                    <div className="text-primary text-sm">{String(baas.visualSubtitle)}</div>
                  </div>
                  <div className="flex gap-2">
                    {[100, 75, 50, 25, 5].map((pct) => (
                      <div key={pct} className="w-3 h-8 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
                        <div className="w-full bg-primary rounded-full transition-all" style={{ height: `${pct}%`, marginTop: `${100 - pct}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OEM Partners */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(partnersSec.eyebrow)}</div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">{String(partnersSec.heading)}</h2>
          <RevealStagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {partners.map((p) => (
              <RevealItem key={p.name} className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl py-8 flex flex-col items-center gap-2 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-primary shadow-sm mb-1">
                  <EmojiIcon glyph={p.icon} size={28} />
                </div>
                <div className="font-bold text-gray-700 dark:text-gray-300 text-sm">{p.name}</div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-emerald-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{cta.heading}</h2>
          <p className="text-lg opacity-80 mb-8">{cta.body}</p>
          <Link href={cta.ctaLink} data-track="Evolve Final CTA" className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-primary font-bold hover:bg-white/90 transition-colors shadow-xl text-lg">
            {cta.ctaLabel} <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

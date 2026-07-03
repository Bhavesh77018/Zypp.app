import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getContent } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { Icon3D } from "@/components/Icon3D";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";

type Stat = { val: string; label: string };
type Partner = { name: string; orders: string; color: string };
type Tool = { icon: string; title: string; desc: string };

export default function EVForDeliveryPage() {
  const c = getContent("ev-for-delivery");
  const hero = c.hero as Record<string, string>;
  const stats = ((c.statsBar as { stats: Stat[] }).stats ?? []) as Stat[];
  const managed = c.managed as Record<string, unknown>;
  const partnersSec = c.partners as Record<string, unknown>;
  const cta = c.ctaBanner as Record<string, string>;

  const features = (managed.features ?? []) as { label: string }[];
  const toolkit = (managed.toolkit ?? []) as Tool[];
  const partners = (partnersSec.items ?? []) as Partner[];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[calc(100svh-64px)] flex items-center overflow-hidden bg-slate-900 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
        <HeroVideoBackdrop image="/media/zyppads-fleet.webp" accent="green" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #00BC84 0%, transparent 50%)" }} />
        <div className="relative z-10 container mx-auto px-4 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="right">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/30">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> {hero.badge}
              </div>
              <h1 className="text-[clamp(2.75rem,6vw,5rem)] font-black text-white mb-7 leading-[0.98] tracking-[-0.04em]">
                {hero.titlePrefix}<span className="text-primary">{hero.titleHighlight}</span>
              </h1>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">{hero.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Link href={hero.primaryCtaLink} data-track="EV Delivery Get Quote" className="px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 flex items-center gap-2">
                  {hero.primaryCtaLabel} <ArrowRight size={18} />
                </Link>
                <Link href={hero.secondaryCtaLink} data-track="EV Delivery How It Works" className="px-8 py-4 rounded-full bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition-all">
                  {hero.secondaryCtaLabel}
                </Link>
              </div>
            </Reveal>
            {/* Delivery partner logos */}
            <RevealStagger className="grid grid-cols-2 gap-3">
              {partners.slice(0, 4).map((p) => (
                <RevealItem key={p.name} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm flex flex-col items-center gap-2">
                  <div className="font-black text-xl" style={{ color: p.color }}>{p.name}</div>
                  <div className="text-white/50 text-xs">{p.orders} orders delivered</div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-black">{s.val}</div>
                <div className="text-sm opacity-80 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-slate-950" id="how-it-works">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <Reveal direction="right">
              <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(managed.eyebrow)}</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">{String(managed.heading)}</h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 leading-relaxed">{String(managed.body)}</p>
              <ul className="flex flex-col gap-3 mb-8">
                {features.map((f) => (
                  <li key={f.label} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{f.label}</span>
                  </li>
                ))}
              </ul>
              <Link href={String(managed.ctaLink)} data-track="EV Delivery Contact CTA" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                {String(managed.ctaLabel)} <ArrowRight size={18} />
              </Link>
            </Reveal>
            <RevealStagger className="grid grid-cols-2 gap-4">
              {toolkit.map((t) => (
                <RevealItem key={t.title} className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <Icon3D glyph={t.icon} size={44} className="mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{t.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{t.desc}</p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* Delivery Partners */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-12">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(partnersSec.eyebrow)}</div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{String(partnersSec.heading)}</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto" stagger={0.05}>
            {partners.map((p) => (
              <RevealItem key={p.name} className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-5 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="font-black text-base mb-1" style={{ color: p.color }}>{p.name}</div>
                <div className="text-xs text-gray-400">{p.orders} orders</div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{cta.heading}</h2>
          <p className="text-lg opacity-80 mb-8">{cta.body}</p>
          <Link href={cta.ctaLink} data-track="EV Delivery Final CTA" className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-primary font-bold hover:bg-white/90 transition-colors shadow-xl">
            {cta.ctaLabel} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

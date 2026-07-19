import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Timer, Wrench, LayoutDashboard, Leaf } from "lucide-react";
import { getContent } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { Icon3D } from "@/components/Icon3D";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";
import { CountUpValue } from "@/components/CountUpValue";

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
        <HeroVideoBackdrop image="/media/zypp-hub-real.jpg" accent="green" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #00BC84 0%, transparent 50%)" }} />
        <div className="relative z-10 container mx-auto px-4 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="right">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/30">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> {hero.badge}
              </div>
              <h1 className="text-[clamp(2.1rem,4.2vw,3.4rem)] font-black text-white mb-7 leading-[0.98] tracking-[-0.04em]">
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
                <div className="text-2xl md:text-3xl font-black"><CountUpValue value={s.val} /></div>
                <div className="text-sm opacity-80 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="scroll-mt-24 py-20 bg-white dark:bg-slate-950" id="how-it-works">
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

      {/* SLA Commitments */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Our Commitments</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">SLAs We Stand Behind.</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-4 max-w-2xl mx-auto">Not vehicles for rent — guaranteed uptime as a service, in writing.</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: ShieldCheck, n: "96%", t: "Fleet Uptime", d: "Gen3 swapping fleet holds 96%+ uptime. AI predictive maintenance flags issues before breakdown." },
              { Icon: Timer, n: "20 min", t: "Breakdown Response", d: "A rider breaks down, our field team arrives within 20 minutes. Every vehicle tracked live via IoT." },
              { Icon: Wrench, n: "48 hrs", t: "Maintenance Guarantee", d: "Every EV serviced within 48 hours post-allotment — a fleet that's ready, not just available." },
              { Icon: LayoutDashboard, n: "Live", t: "Fleet Dashboard", d: "Real-time visibility into fleet health, rider locations and delivery KPIs. API integration available." },
            ].map((s) => (
              <RevealItem key={s.t}>
                <div className="h-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4"><s.Icon size={22} /></span>
                  <div className="text-3xl font-black text-primary">{s.n}</div>
                  <div className="font-bold text-gray-900 dark:text-white mb-2">{s.t}</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.d}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
          {/* Ops numbers strip */}
          <Reveal className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-4 rounded-3xl border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 p-6 text-center">
            {[["96%", "Uptime"], ["20m", "Repair TAT"], ["<4%", "At Hub"], ["21", "Service Hubs"], ["400", "Field Techs"], ["26K+", "Active EVs"]].map(([n, l]) => (
              <div key={l}><div className="text-xl md:text-2xl font-black text-gray-900 dark:text-white">{n}</div><div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">{l}</div></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Partnership in 3 Steps */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">How It Works</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">Partnership in 3 Steps.</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Define Your Need", d: "Tell us your city, daily delivery volume and preferred vehicle type. We size the fleet and hub infrastructure for your requirement." },
              { n: "02", t: "We Deploy the Fleet", d: "Zypp deploys EVs, sets up swap stations near demand zones, recruits and onboards riders, and activates IoT monitoring." },
              { n: "03", t: "You Get Throughput", d: "You receive guaranteed delivery capacity with SLA-backed uptime. Everything beneath is handled — invisibly and reliably." },
            ].map((s) => (
              <RevealItem key={s.n}>
                <div className="h-full bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="text-5xl font-black text-primary/15 mb-4">{s.n}</div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{s.t}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.d}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ESG band — the sustainability case for your board */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-5xl">
          <Reveal className="rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-10 md:p-12 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3"><Leaf size={15} /> The ESG Bonus</div>
                <h2 className="text-2xl md:text-4xl font-black mb-4">Every delivery you shift to Zypp is carbon-zero.</h2>
                <p className="text-white/65 leading-relaxed mb-6">Zomato has avoided 78,961 tonnes of CO₂ with Zypp. Blinkit 41,056. Zepto 34,543. Your sustainability report gets a number your board will notice — without changing anything in your operations.</p>
                <Link href="/environment" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors">
                  See partner impact <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[["55M+ kg", "CO₂ avoided"], ["2.4 Cr L", "Petrol displaced"], ["1,500+", "Swap stations"], ["Zero", "Tailpipe emissions"]].map(([n, l]) => (
                  <div key={l} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="text-xl font-black text-primary">{n}</div>
                    <div className="text-xs text-white/55 mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
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

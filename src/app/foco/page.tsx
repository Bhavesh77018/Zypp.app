import Link from "next/link";
import {
  ArrowRight, BarChart3, Bike, Building2, Check, Cpu, Headphones,
  MapPin, ShieldCheck, Users, Wrench, type LucideIcon,
} from "lucide-react";
import { getContent } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";

type Card = { icon: string; title: string; desc: string };
type Step = { step: string; title: string; desc: string };

const PARTNER_STATS = [
  { val: "Partner", label: "Asset Ownership" },
  { val: "Zypp", label: "Fleet Operations" },
  { val: "Live", label: "Dashboard Visibility" },
  { val: "Shared", label: "Growth Governance" },
];

const FOCO_STATS = [
  { val: "Managed", label: "Field Operations" },
  { val: "Connected", label: "Maintenance Workflow" },
  { val: "Real-time", label: "Fleet Visibility" },
  { val: "Multi-city", label: "Operating Playbook" },
];

const MODEL_ROLES = [
  { Icon: Building2, owner: "Partner", title: "Owns the assets", body: "The partner owns the deployed fleet and participates in expansion planning." },
  { Icon: Users, owner: "Zypp", title: "Runs the operations", body: "Zypp manages riders, hubs, field teams and the operating cadence." },
  { Icon: Wrench, owner: "Zypp", title: "Keeps the fleet moving", body: "Maintenance, service workflows and issue resolution stay connected to the platform." },
  { Icon: BarChart3, owner: "Shared", title: "Tracks performance", body: "A transparent dashboard keeps deployment and operating activity visible." },
];

function cardIcon(title: string): LucideIcon {
  const value = title.toLowerCase();
  if (value.includes("track") || value.includes("location")) return MapPin;
  if (value.includes("maintenance") || value.includes("service")) return Wrench;
  if (value.includes("insurance") || value.includes("secure") || value.includes("safety")) return ShieldCheck;
  if (value.includes("rider") || value.includes("team")) return Users;
  if (value.includes("support")) return Headphones;
  if (value.includes("vehicle") || value.includes("scooter")) return Bike;
  return Cpu;
}

export default function FocoPage() {
  const c = getContent("foco");
  const hero = c.hero as Record<string, string>;
  const safetySec = c.safety as Record<string, unknown>;
  const safety = (safetySec?.items ?? []) as Card[];
  const techSec = c.tech as Record<string, unknown>;
  const stepsSec = c.steps as Record<string, unknown>;
  const dashSec = c.dashboard as Record<string, unknown>;
  const cta = c.ctaBanner as Record<string, string>;
  const tech = (techSec.items ?? []) as Card[];
  const steps = (stepsSec.items ?? []) as Step[];
  const dash = (dashSec.items ?? []) as Card[];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[calc(100svh-64px)] flex items-center overflow-hidden bg-slate-900 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
        <HeroVideoBackdrop image="/media/fleet-control.webp" accent="green" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 65% 40%, #00BC84 0%, transparent 50%)" }} />
        <div className="relative z-10 container mx-auto px-4 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="right">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/30">
                {hero.badge}
              </div>
              <h1 className="text-[clamp(2.75rem,6vw,5rem)] font-black text-white mb-7 leading-[0.98] tracking-[-0.04em]">
                {hero.titlePrefix}<span className="text-primary">{hero.titleHighlight}</span>
              </h1>
              <p className="text-xl text-white/70 mb-8 leading-relaxed">{hero.subtitle}</p>
              <Link href={hero.ctaLink} data-track="FOCO Hero CTA" className="px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 inline-flex items-center gap-2">
                {hero.ctaLabel} <ArrowRight size={18} />
              </Link>
            </Reveal>
            <Reveal direction="left" className="flex justify-center">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-md w-full max-w-md">
                <div className="flex items-center justify-between mb-7"><div><div className="text-xs text-primary uppercase tracking-[0.18em] font-black">FOCO operating model</div><div className="text-xl font-black text-white mt-1">You own it. Zypp runs it.</div></div><span className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center"><Cpu size={20} /></span></div>
                <div className="space-y-3">
                  {["Fleet and hub operations", "Rider and field workflows", "Maintenance coordination", "Live operating visibility"].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm font-semibold text-white/75"><span className="w-6 h-6 rounded-full bg-primary/15 text-primary flex items-center justify-center"><Check size={14} /></span>{item}</div>)}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Choose / Stats */}
      <section className="bg-primary py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {FOCO_STATS.map((s) => (
              <div key={s.label}><div className="text-2xl md:text-3xl font-black">{s.val}</div><div className="text-sm opacity-80 mt-1">{s.label}</div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 dark:bg-slate-900 border-b border-border">
        <div className="container mx-auto px-4 max-w-7xl">
          <Reveal className="mb-14 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 items-end">
            <div><div className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">Who does what</div><h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">Ownership stays clear.<br /><span className="text-primary">Operations stay connected.</span></h2></div>
            <p className="text-lg leading-relaxed text-muted">FOCO separates asset ownership from day-to-day fleet execution, while giving both sides one operating view.</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {MODEL_ROLES.map(({ Icon, owner, title, body }) => <RevealItem key={title} className="rounded-3xl border border-border bg-background p-7 hover:border-primary/35 hover:-translate-y-1 hover:shadow-xl transition-all"><div className="mb-9 flex items-center justify-between"><span className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center"><Icon size={21} /></span><span className="text-[10px] uppercase tracking-[0.18em] font-black text-primary">{owner}</span></div><h3 className="font-black text-foreground mb-3">{title}</h3><p className="text-sm leading-relaxed text-muted">{body}</p></RevealItem>)}
          </RevealStagger>
        </div>
      </section>

      {/* Investment Safety */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(safetySec?.eyebrow)}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{String(safetySec?.heading)}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-2xl mx-auto">{String(safetySec?.subheading)}</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {safety.map((s) => (
              <RevealItem key={s.title} className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                {(() => { const CardIcon = cardIcon(s.title); return <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5"><CardIcon size={21} /></div>; })()}
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-snug">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-border">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(techSec.eyebrow)}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white max-w-2xl mx-auto">{String(techSec.heading)}</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tech.map((t) => (
              <RevealItem key={t.title} className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                {(() => { const CardIcon = cardIcon(t.title); return <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5"><CardIcon size={21} /></div>; })()}
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{t.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{t.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(stepsSec.eyebrow)}</div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{String(stepsSec.heading)}</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <RevealItem key={s.step} className="flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full bg-primary text-white font-black text-lg flex items-center justify-center mb-4 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">{s.step}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{s.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Dashboard */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(dashSec.eyebrow)}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{String(dashSec.heading)}</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {dash.map((d) => (
              <RevealItem key={d.title} className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                {(() => { const CardIcon = cardIcon(d.title); return <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5"><CardIcon size={21} /></div>; })()}
                <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1.5">{d.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{d.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{cta.heading}</h2>
          <p className="text-lg opacity-80 mb-8 max-w-xl mx-auto">{cta.body}</p>
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link href={cta.ctaLink} data-track="FOCO Final CTA" className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-primary font-bold hover:bg-white/90 transition-colors shadow-xl">
              {cta.ctaLabel} <ArrowRight size={18} />
            </Link>
            <a href="mailto:akash@zypp.app?subject=FOCO — Schedule a Call" className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white/15 text-white font-bold border border-white/30 hover:bg-white/25 transition-colors">
              Schedule a Call
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto pt-8 border-t border-white/20">
            {PARTNER_STATS.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black">{s.val}</div>
                <div className="text-sm opacity-80 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

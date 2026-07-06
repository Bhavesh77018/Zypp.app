import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { Icon3D } from "@/components/Icon3D";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";

type Perk = { icon: string; title: string; desc: string };
type Role = { title: string; dept: string; type: string; location: string };

export default function CareersPage() {
  const c = getContent("careers");
  const hero = c.hero as Record<string, string>;
  const perksSec = c.perks as Record<string, unknown>;
  const rolesSec = c.roles as Record<string, unknown>;
  const cta = c.ctaBanner as Record<string, string>;
  const perks = (perksSec.items ?? []) as Perk[];
  const roles = (rolesSec.items ?? []) as Role[];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[calc(100svh-64px)] flex items-center overflow-hidden bg-slate-900 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
        <HeroVideoBackdrop image="/media/life-team.webp" accent="green" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 40%, #00BC84 0%, transparent 50%)" }} />
        <Reveal className="relative z-10 container mx-auto px-4 py-10 md:py-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/30">
            {hero.badge}
          </div>
          <h1 className="text-[clamp(2.1rem,4.2vw,3.4rem)] font-black leading-[0.98] tracking-[-0.04em] text-white mb-7">
            {hero.titlePrefix}<span className="text-primary">{hero.titleHighlight}</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">{hero.subtitle}</p>
          <a href={hero.ctaLink} data-track="Careers See Openings" className="px-10 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 inline-flex items-center gap-2">
            {hero.ctaLabel} <ArrowRight size={20} />
          </a>
        </Reveal>
      </section>

      {/* Perks */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(perksSec.eyebrow)}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{String(perksSec.heading)}</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {perks.map((p) => (
              <RevealItem key={p.title} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                <Icon3D glyph={p.icon} size={48} className="mb-5 drop-shadow-sm" />
                <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3">{p.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Open Roles */}
      <section id="openings" className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(rolesSec.eyebrow)}</div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{String(rolesSec.heading)}</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto" stagger={0.05}>
            {roles.map((r) => (
              <RevealItem key={r.title} className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-3xl p-6 flex flex-col justify-between gap-6 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary">{r.dept}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300">{r.type}</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-2">{r.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {r.location}
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
                  <Link href="/contact" data-track={`Apply ${r.title}`} className="inline-flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                    Apply for this role <ArrowRight size={16} />
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
          <div className="text-center mt-10">
            <p className="text-gray-500 dark:text-gray-400 mb-4">{String(rolesSec.openNote)}</p>
            <Link href="/contact" data-track="Careers Open Application" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              {String(rolesSec.openLinkLabel)} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-4">{cta.heading}</h2>
          <p className="text-lg opacity-80 mb-8">{cta.body}</p>
          <a href={cta.ctaLink} data-track="Careers Email" className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-primary font-bold hover:bg-white/90 transition-colors shadow-xl">
            {cta.ctaLabel} <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}

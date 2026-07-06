import { ArrowRight, Check, TrendingUp, Package, Fuel, CircleDot, Play } from "lucide-react";
import { getContent } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import GrowthChart from "@/components/investors/GrowthChart";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";

export const metadata = {
  title: "Investors — Zypp (Pre-IPO)",
  description:
    "Zypp Pre-IPO round: EBITDA positive, FY28 IPO track. India's gig economy operating system. 26,827 EVs, ₹243 Cr NRR, +10.08% EBITDA margin.",
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function InvestorsPage() {
  const c = getContent("investors") as Record<string, any>;
  const hero = c.hero ?? {};
  const partners = c.partners ?? {};
  const opp = c.opportunity ?? {};
  const traction = c.traction ?? {};
  const gig = c.gig ?? {};
  const platform = c.platform ?? {};
  const roadmap = c.roadmap ?? {};
  const round = c.round ?? {};
  const founder = c.founder ?? {};
  const whyNow = c.whyNow ?? {};
  const finalCta = c.finalCta ?? {};

  const tailwindIcons = [Package, Fuel, TrendingUp];

  return (
    <div className="w-full">
      {/* ── Hero ── */}
      <section className="relative min-h-[calc(100svh-64px)] flex items-center overflow-hidden bg-slate-900 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
        <HeroVideoBackdrop image="/media/fleet-control.webp" accent="green" videoOpacity={0.25} />
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #00bc84 0%, transparent 55%)" }} />
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
          <Reveal className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> {hero.badge}
            </div>
            <h1 className="text-[clamp(2.2rem,4.2vw,3.5rem)] font-black text-white leading-[0.98] tracking-[-0.04em] mb-7">
              {hero.titleLine1} <span className="text-primary">{hero.titleHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-8 leading-relaxed">{hero.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              <a href={hero.primaryCtaLink} className="px-8 py-3.5 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/30">
                {hero.primaryCtaLabel} <ArrowRight className="inline ml-1" size={16} />
              </a>
              <a href={hero.secondaryCtaLink} target="_blank" rel="noopener" className="px-8 py-3.5 rounded-full bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition-all">
                {hero.secondaryCtaLabel}
              </a>
            </div>
          </Reveal>

          <RevealStagger className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-4xl">
            {(hero.stats ?? []).map((s: any) => (
              <RevealItem key={s.label} className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
                <div className="text-2xl md:text-3xl font-black text-white">{s.n}</div>
                <div className="text-sm text-white/80 font-semibold mt-1">{s.label}</div>
                <div className="text-xs text-primary mt-0.5">{s.sub}</div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── Partner strip ── */}
      <section className="py-12 bg-white dark:bg-slate-950 border-b border-border">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted mb-6">{partners.label}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {(partners.logos ?? []).map((l: any) => (
              <span key={l.name} className="px-5 py-2 rounded-full border border-border bg-gray-50 dark:bg-slate-900 text-sm font-bold text-foreground/70">{l.name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Opportunity / Tailwinds ── */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900 border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="mb-12">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">{opp.eyebrow}</div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">{opp.heading1} <span className="text-primary">{opp.heading2}</span></h2>
            <p className="text-muted text-lg mt-3 max-w-2xl">{opp.subheading}</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(opp.items ?? []).map((it: any, i: number) => {
              const Icon = tailwindIcons[i % tailwindIcons.length];
              return (
                <RevealItem key={it.title}>
                  <div className="h-full bg-white dark:bg-slate-950 border border-border rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 hover:border-primary/30">
                    <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-5"><Icon size={22} /></span>
                    <h3 className="text-xl font-bold text-foreground mb-3">{it.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{it.body}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* ── Traction / The Numbers ── */}
      <section className="py-24 bg-white dark:bg-slate-950 border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <Reveal className="mb-12">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">{traction.eyebrow}</div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">{traction.heading1} <span className="text-primary">{traction.heading2}</span></h2>
            <p className="text-muted text-lg mt-3">{traction.note}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(traction.numbers ?? []).map((m: any) => (
              <Reveal key={m.metric} className="bg-gray-50 dark:bg-slate-900 border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted">{m.metric}</span>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{m.change}</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-lg text-muted line-through">{m.may25}</span>
                  <ArrowRight size={16} className="text-primary" />
                  <span className="text-3xl font-black text-primary">{m.may26}</span>
                </div>
              </Reveal>
            ))}
          </div>
          {/* Self-drawing growth chart — NRR + EBITDA trajectory */}
          <GrowthChart />
          <Reveal className="mt-8 flex items-stretch gap-5 bg-primary/5 border border-primary/15 rounded-2xl p-7">
            <div className="w-1 rounded-full bg-primary shrink-0" />
            <div>
              <p className="text-lg md:text-xl font-extrabold text-foreground leading-snug">{traction.quote}</p>
              <p className="text-muted text-sm mt-2">— {traction.quoteName}, {traction.quoteRole}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Gig Stories ── */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900 border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="mb-10">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">{gig.eyebrow}</div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">{gig.heading1} <span className="text-primary">{gig.heading2}</span></h2>
            <p className="text-muted text-lg mt-3 max-w-2xl">{gig.intro}</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(gig.stories ?? []).map((s: any) => (
              <RevealItem key={s.name}>
                <a href={s.yt} target="_blank" rel="noopener" className="group block h-full bg-white dark:bg-slate-950 border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                  <div className="relative aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img 
                      src={
                        s.name?.includes('Raju') ? '/media/rider-raju.jpg' :
                        s.name?.includes('Roshan') ? '/media/rider-roshan.jpg' :
                        '/media/gig-ki-awaaz.webp'
                      }
                      alt={s.name || "Gig Ki Awaaz Story"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 text-primary">
                        <Play size={20} className="ml-1 fill-primary" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Podcast
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-3xl font-black text-primary">{s.earn}<span className="text-sm text-muted font-bold">/mo</span></div>
                      <span className="text-[11px] font-bold uppercase text-muted">{s.from} →</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs mb-4">
                      <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-500 font-semibold">{s.before}</span>
                      <ArrowRight size={12} className="text-primary" />
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-semibold">{s.after}</span>
                    </div>
                    <p className="text-sm text-muted italic leading-relaxed mb-4 border-l-2 border-primary/30 pl-3">{s.quote}</p>
                    <div className="font-bold text-foreground text-sm">{s.name}</div>
                    <div className="text-xs text-muted">{s.city}</div>
                  </div>
                </a>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── HustleOS Platform layers ── */}
      <section className="py-24 bg-white dark:bg-slate-950 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <Reveal className="mb-10">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">{platform.eyebrow}</div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">{platform.heading1} <span className="text-primary">{platform.heading2}</span></h2>
            <p className="text-muted text-lg mt-3 max-w-2xl">{platform.intro}</p>
          </Reveal>
          <RevealStagger className="flex flex-col gap-3">
            {(platform.layers ?? []).map((l: any, i: number) => (
              <RevealItem key={l.name}>
                <div className="group flex items-center gap-4 bg-gray-50 dark:bg-slate-900 border border-border rounded-2xl p-5 hover:border-primary/30 transition-all">
                  <span className="shrink-0 text-xs font-black text-primary/50 w-7">L{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-foreground">{l.name}</h3>
                    <p className="text-sm text-muted leading-snug">{l.desc}</p>
                  </div>
                  <span className={`shrink-0 text-[11px] font-bold uppercase px-2.5 py-1 rounded-full ${l.badge?.includes("LIVE") ? "bg-primary text-white" : "bg-gray-100 dark:bg-slate-800 text-muted border border-border"}`}>{l.badge}</span>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
          <Reveal className="mt-8 text-center">
            <p className="text-xl md:text-2xl font-extrabold text-foreground max-w-3xl mx-auto">&ldquo;{platform.quote}&rdquo;</p>
            <p className="text-muted text-sm mt-2">{platform.quoteName}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900 border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <Reveal className="mb-12">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">{roadmap.eyebrow}</div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">{roadmap.heading}</h2>
            <p className="text-muted text-lg mt-3 max-w-2xl">{roadmap.intro}</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {(roadmap.steps ?? []).map((s: any) => (
              <RevealItem key={s.title}>
                <div className="h-full bg-white dark:bg-slate-950 border border-border rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{s.q}</span>
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wide text-muted">{s.metricLabel}</div>
                      <div className="text-sm font-black text-primary">{s.metricValue}</div>
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
          <Reveal className="rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-8 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <div className="text-2xl font-black">{roadmap.ipoTitle}</div>
                <div className="text-primary text-sm font-semibold">{roadmap.ipoBankers}</div>
              </div>
              <a href="mailto:invest@zypp.app?subject=Zypp Pre-IPO — Interest" className="px-6 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors">{roadmap.ipoCtaLabel}</a>
            </div>
            <p className="text-white/70 max-w-2xl mb-6">{roadmap.ipoBody}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(roadmap.ipoMetrics ?? []).map((m: any) => (
                <div key={m.label} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="text-xl font-black text-primary">{m.value}</div>
                  <div className="text-xs text-white/60 mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The Round ── */}
      <section className="py-24 bg-white dark:bg-slate-950 border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <Reveal>
              <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">{round.eyebrow}</div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-4">{round.heading1} <span className="text-primary">{round.heading2}</span></h2>
              <p className="text-muted text-lg leading-relaxed mb-6">{round.intro}</p>
              <ul className="space-y-3">
                {(round.checklist ?? []).map((it: any) => (
                  <li key={it.text} className="flex items-start gap-3 text-foreground/80">
                    <Check size={18} className="text-primary mt-0.5 shrink-0" /> {it.text}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal direction="left" className="bg-gray-50 dark:bg-slate-900 border border-border rounded-3xl p-8">
              <div className="font-bold text-foreground mb-5">{round.detailsTitle}</div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {(round.details ?? []).map((d: any) => (
                  <div key={d.label} className="rounded-2xl bg-white dark:bg-slate-950 border border-border p-4">
                    <div className="text-lg font-black text-primary">{d.value}</div>
                    <div className="text-xs text-muted mt-1">{d.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted leading-relaxed mb-6">{round.note}</p>
              <div className="flex flex-col gap-3">
                <a href="mailto:invest@zypp.app?subject=Zypp Pre-IPO — Investment Deck" className="text-center py-3 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors">{round.ctaPrimaryLabel}</a>
                <a href="mailto:invest@zypp.app?subject=Zypp Pre-IPO — Schedule Call" className="text-center py-3 rounded-full border border-border text-foreground font-bold hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">{round.ctaSecondaryLabel}</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Founder ── */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900 border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <Reveal className="mb-10">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">{founder.eyebrow}</div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">{founder.heading1} <span className="text-primary">{founder.heading2}</span></h2>
          </Reveal>
          <div className="bg-white dark:bg-slate-950 border border-border rounded-3xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
            <div>
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-black text-4xl shadow-lg mb-4">AG</div>
              <div className="font-black text-lg text-foreground">{founder.name}</div>
              <div className="text-sm text-muted mb-4">{founder.role}</div>
              <div className="flex flex-wrap gap-2">
                {(founder.socials ?? []).map((s: any) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener" className="text-xs font-semibold text-primary border border-primary/30 rounded-full px-3 py-1.5 hover:bg-primary/5 transition-colors">{s.label}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-muted leading-relaxed mb-5">{founder.intro}</p>
              <div className="space-y-3 mb-6">
                {(founder.facts ?? []).map((f: any) => (
                  <p key={f.strong} className="text-sm text-muted leading-relaxed">
                    <strong className="text-foreground">{f.strong}</strong>{f.rest}
                  </p>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(founder.stats ?? []).map((s: any) => (
                  <div key={s.label} className="rounded-2xl bg-gray-50 dark:bg-slate-900 border border-border p-3 text-center">
                    <div className="text-lg font-black text-primary">{s.value}</div>
                    <div className="text-[11px] text-muted mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Now ── */}
      <section className="py-24 bg-white dark:bg-slate-950 border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="mb-12 text-center">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">{whyNow.eyebrow}</div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground">{whyNow.heading}</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(whyNow.cards ?? []).map((card: any) => (
              <RevealItem key={card.title}>
                <div className="h-full bg-gray-50 dark:bg-slate-900 border border-border rounded-2xl p-7 hover:border-primary/30 transition-colors">
                  <CircleDot size={22} className="text-primary mb-4" />
                  <h3 className="font-bold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{card.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-24 bg-slate-900 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 40%, #00bc84 0%, transparent 55%)" }} />
        <div className="relative z-10 container mx-auto px-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/30">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> {finalCta.badge}
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">{finalCta.heading1} <span className="text-primary">{finalCta.heading2}</span></h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">{finalCta.body}</p>
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <a href={finalCta.primaryLink} className="px-8 py-3.5 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/30">{finalCta.primaryLabel}</a>
            <a href={finalCta.secondaryLink} className="px-8 py-3.5 rounded-full bg-white/10 text-white font-bold border border-white/20 hover:bg-white/20 transition-all">{finalCta.secondaryLabel}</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {(finalCta.contacts ?? []).map((ct: any) => (
              <div key={ct.label} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="text-[11px] text-white/50 uppercase tracking-wide">{ct.label}</div>
                <div className="text-sm font-bold text-white mt-1 break-words">{ct.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import {
  ArrowRight, BarChart3, Bike, Building2, CheckCircle2,
  ChevronRight, Clock, IndianRupee, MapPin, ShieldCheck,
  TrendingUp, Users, Wrench, Zap,
} from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";
import GetInTouchSection from "@/components/home/GetInTouchSection";

export const metadata = {
  title: "FOFO Franchise — Own & Operate a Zypp EV City | Zypp Electric",
  description: "FOFO: Invest ₹50–80L, build and operate your own Zypp EV network. 20–25% annual return, ₹3.75 Cr revenue on 500 EVs, 12–18 month payback. Full brand, tech and playbook support.",
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const INVESTMENT_BREAKDOWN = [
  { label: "Fleet Purchase (500 EVs)", value: "₹35–50L", detail: "2-wheelers via Zypp OEM network at preferred pricing" },
  { label: "Hub Setup & Infrastructure", value: "₹8–15L", detail: "~1,500 sq ft hub: racks, CCTV, fire safety, branding" },
  { label: "Initial Working Capital",   value: "₹5–10L", detail: "Operations, salaries, fuel logistics for first 3 months" },
  { label: "Tech Onboarding & Deposit", value: "₹2–5L",  detail: "FleetEase setup, security deposit, agreement fees" },
];

const RETURNS = [
  {
    n: "20–25%",
    l: "Annual Return on Capital",
    d: "From a 500-EV fleet on Zypp's fixed platform + software fee model. Scales as the fleet grows to 1,000+ EVs.",
    highlight: true,
  },
  {
    n: "~₹3.75 Cr",
    l: "Annual Partner Revenue (500 EVs)",
    d: "500 EVs × ₹750/month × 12 — revenue flowing to partner post Zypp fees. Grows linearly with fleet size.",
    highlight: true,
  },
  {
    n: "12–18 mo",
    l: "Estimated Payback Period",
    d: "On the 500-EV model at 85% utilisation. Faster as you scale past 1,000 EVs with same hub infrastructure.",
    highlight: false,
  },
  {
    n: "₹750/EV",
    l: "Zypp Monthly Fee per EV",
    d: "₹600 platform fee + ₹150 software fee per EV per month — covers brand licence, FleetEase, demand network, and playbook.",
    highlight: false,
  },
  {
    n: "₹0",
    l: "Capex from Zypp",
    d: "You fund the fleet and hub. Zypp brings brand, tech, OEM, and demand — full asset ownership stays with you.",
    highlight: false,
  },
  {
    n: "5-Year",
    l: "Franchise Agreement Term",
    d: "Renewable 5-year agreement. Expansion rights for additional cities and fleet size available to performing partners.",
    highlight: false,
  },
];

const WHAT_YOU_BRING = [
  { Icon: IndianRupee, title: "₹50–80 Lakhs Capital",    desc: "Covers fleet, hub setup, and initial working capital. No debt required from Zypp." },
  { Icon: Building2,  title: "Hub Space (~1,500 sq ft)", desc: "Locate and secure a hub in the target city. Zypp provides site readiness guidance." },
  { Icon: Users,      title: "A Local Operations Team",  desc: "2–5 person team to manage daily hub operations, rider onboarding, and field issues." },
  { Icon: MapPin,     title: "City Operating Presence",  desc: "Willingness to be hands-on and locally present — FOFO needs a local operator mindset." },
];

const WHAT_ZYPP_PROVIDES = [
  { Icon: Bike,       title: "Brand Licence & Identity",      desc: "Full Zypp brand rights for your city — signage, app listings, marketing support." },
  { Icon: BarChart3,  title: "FleetEase Technology",          desc: "Real-time fleet visibility, deployment tracking, rider management, and performance analytics." },
  { Icon: Zap,        title: "OEM Access & Pricing",          desc: "Preferred pricing on EVs through Zypp's OEM network — significantly below retail." },
  { Icon: Users,      title: "Demand Network Activation",     desc: "Zypp connects your hub to active delivery platforms — Zomato, Swiggy, Blinkit, Zepto, Porter." },
  { Icon: Wrench,     title: "Operating Playbook",            desc: "SOPs for onboarding, maintenance, field operations, and issue escalation — proven across 8 cities." },
  { Icon: TrendingUp, title: "Growth & Governance Reviews",  desc: "Regular operating reviews and co-planning to help you scale from 500 to 2,000+ EVs." },
  { Icon: ShieldCheck,title: "Insurance & Compliance Support",desc: "Framework for vehicle insurance, rider compliance, and regulatory requirements by city." },
  { Icon: Clock,      title: "60-Day Launch Programme",       desc: "A structured programme from agreement to Go Live — hub, fleet, team, and demand in 60 days." },
];

const RESPONSIBILITIES = [
  { party: "You (Partner)",  items: ["Own the fleet assets",  "Hire and manage local team", "Run hub operations", "Rider acquisition", "Local marketing"] },
  { party: "Zypp",           items: ["Brand & technology",   "OEM & fleet support",        "Demand network",     "Playbook & training",  "Growth governance"] },
];

const LAUNCH_STEPS = [
  { step: "01", Icon: MapPin,     title: "City & Territory Discovery", body: "Book a discovery call. Align on city, operating potential, fleet size, and partner fit. Zypp reviews within 7 working days." },
  { step: "02", Icon: Building2,  title: "Hub & Team Readiness",       body: "Identify and secure hub space with Zypp's guidance. Order EVs through OEM network. Build local ops team." },
  { step: "03", Icon: Bike,       title: "Fleet Activation & Training", body: "Prepare hub, onboard field team, connect demand platforms. Zypp delivers the ops playbook and FleetEase access." },
  { step: "04", Icon: TrendingUp, title: "Go Live & Scale",            body: "Launch with shared operating reviews and live performance visibility. Revenue starts from Day 1 of operations." },
];

const AVAILABLE_CITIES = [
  "Dehradun", "Lucknow", "Meerut", "Ahmedabad", "Surat", "Vadodara",
  "Indore", "Bhopal", "Kolkata", "Kochi", "Chennai", "Coimbatore",
  "Patna", "Raipur", "Visakhapatnam", "Nagpur", "Agra", "Goa",
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function FofoPage() {
  return (
    <div className="w-full bg-background">

      {/* ── HERO ── */}
      <section className="relative min-h-[calc(100svh-64px)] overflow-hidden bg-slate-950 pt-24 pb-16 md:pt-28 md:pb-20 flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/50 to-slate-950" />
        <HeroVideoBackdrop image="/media/zyppads-fleet.webp" accent="blue" videoOpacity={0.26} />
        <div className="absolute inset-0 opacity-[0.055]" style={{ backgroundImage: "linear-gradient(#3B82F6 1px,transparent 1px),linear-gradient(90deg,#3B82F6 1px,transparent 1px)", backgroundSize: "56px 56px" }} />

        <div className="container relative z-10 mx-auto px-4 py-12 md:py-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal direction="right">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/15 px-4 py-1.5 text-sm font-black uppercase tracking-[0.18em] text-blue-500">
                <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" /> FOFO Franchise Model
              </div>
              <h1 className="mb-4 text-[clamp(2.2rem,4.4vw,3.8rem)] font-black leading-[0.94] tracking-[-0.04em] text-white">
                Own the Network.<br />
                <span className="text-blue-500">Operate the City.</span>
              </h1>
              <p className="mb-3 text-lg leading-relaxed text-white/65 md:text-xl max-w-xl">
                FOFO is for <strong className="text-white">hands-on entrepreneurs</strong> who want local control. You invest, you build, you run — backed by Zypp&apos;s brand, technology, OEM pricing, and proven ops playbook.
              </p>
              {/* Key financial callout */}
              <div className="mb-9 inline-flex flex-wrap items-center gap-6 rounded-2xl border border-blue-500/25 bg-blue-500/10 px-6 py-4 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-2xl font-black text-blue-500">₹50–80L</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">Investment</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-black text-blue-500">20–25%</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">Annual Return</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-black text-blue-500">12–18 mo</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">Payback</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 font-black text-white shadow-xl shadow-blue-600/25 transition-colors hover:bg-blue-700">
                  Discuss Your City <ArrowRight size={18} />
                </Link>
                <Link href="/franchise" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur transition-colors hover:bg-white/10">
                  Compare Models
                </Link>
              </div>
            </Reveal>

            {/* Hero card: what you build */}
            <Reveal direction="left" className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 shadow-2xl backdrop-blur-xl md:p-9">
              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-blue-500">FOFO Partner Profile</div>
                  <h2 className="mt-1 text-2xl font-black text-white">What you build & own</h2>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-500">
                  <Building2 size={22} />
                </span>
              </div>
              <div className="space-y-3">
                {[
                  "Your own locally managed hub & fleet",
                  "A trained city operations team (2–5 staff)",
                  "Rider acquisition & support workflows",
                  "Full P&L and asset ownership",
                  "FleetEase-powered operating visibility",
                  "Rights to expand within your territory",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3.5 text-sm font-semibold text-white/75">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-500">
                      <CheckCircle2 size={14} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── STAT STRIP ── */}
      <section className="border-b border-border bg-background py-12">
        <div className="container mx-auto grid max-w-6xl grid-cols-2 gap-5 px-4 md:grid-cols-4">
          {[
            { n: "₹3.75 Cr",  l: "Annual Revenue (500 EVs)" },
            { n: "85%+",      l: "Target Fleet Utilisation" },
            { n: "₹750/EV",   l: "Zypp Monthly Fee" },
            { n: "500 EVs",   l: "Minimum Fleet Size" },
          ].map((s) => (
            <div key={s.l} className="text-center py-4">
              <div className="text-2xl md:text-3xl font-black text-blue-600 mb-1">{s.n}</div>
              <div className="text-sm font-semibold text-foreground/70">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── INVESTMENT BREAKDOWN ── */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900 border-b border-border">
        <div className="container mx-auto max-w-6xl px-4">
          <Reveal className="mb-14">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 mb-4">The Investment</div>
            <h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl mb-3">
              What ₹50–80 Lakhs <span className="text-blue-600">Gets You.</span>
            </h2>
            <p className="text-muted text-lg max-w-2xl">Full investment breakdown — where the capital goes and what it creates.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {INVESTMENT_BREAKDOWN.map((item, i) => (
              <RevealItem key={item.label}>
                <div className="h-full bg-background border border-border rounded-3xl p-7 hover:border-blue-500/35 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl font-black text-blue-600">{item.value}</div>
                    <span className="text-xs font-black text-blue-600/40 tracking-widest">0{i + 1}</span>
                  </div>
                  <div className="font-black text-foreground mb-2">{item.label}</div>
                  <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                </div>
              </RevealItem>
            ))}
          </div>

          {/* Total callout */}
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-amber-500 p-8 md:p-10 text-white relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-white/70 mb-2">Total Investment Range</div>
                  <div className="text-5xl font-black mb-3">₹50–80 Lakhs</div>
                  <p className="text-white/80 leading-relaxed max-w-lg">
                    All-in figure covering fleet, hub, working capital, and onboarding. Exact number depends on city, fleet size, and hub configuration. Detailed projections shared during partner evaluation.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="bg-white/20 rounded-2xl px-5 py-4 text-center backdrop-blur-sm">
                    <div className="text-2xl font-black">20–25%</div>
                    <div className="text-xs text-white/70 uppercase tracking-wider mt-0.5">Annual Return</div>
                  </div>
                  <div className="bg-white/20 rounded-2xl px-5 py-4 text-center backdrop-blur-sm">
                    <div className="text-2xl font-black">12–18 mo</div>
                    <div className="text-xs text-white/70 uppercase tracking-wider mt-0.5">Payback Period</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── RETURNS & ECONOMICS ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <Reveal className="mb-14 text-center">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 mb-4">The Returns</div>
            <h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl">
              Your Investment. <span className="text-blue-600">Your Returns.</span>
            </h2>
            <p className="text-muted text-lg mt-3 max-w-2xl mx-auto">Real numbers based on a 500-EV fleet at 85% utilisation — exactly how Zypp&apos;s own hubs operate.</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {RETURNS.map((c) => (
              <RevealItem key={c.l} className={`rounded-3xl border p-7 transition-all hover:-translate-y-1 hover:shadow-xl ${c.highlight ? "border-blue-500/30 bg-blue-50/50 dark:bg-blue-600/5" : "border-border bg-background"}`}>
                <div className={`text-3xl font-black mb-2 ${c.highlight ? "text-blue-600" : "text-blue-500"}`}>{c.n}</div>
                <div className="mb-3 text-sm font-black text-foreground">{c.l}</div>
                <p className="text-sm leading-relaxed text-muted">{c.d}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── WHAT YOU BRING vs WHAT ZYPP PROVIDES ── */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900 border-y border-border">
        <div className="container mx-auto max-w-7xl px-4">
          <Reveal className="mb-14 text-center">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 mb-4">The Operating Split</div>
            <h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl">
              What You Bring. <span className="text-blue-600">What Zypp Brings.</span>
            </h2>
            <p className="text-muted text-lg mt-3 max-w-2xl mx-auto">Clear division of responsibilities — you run the city, Zypp runs the system.</p>
          </Reveal>

          {/* Responsibility split table */}
          <Reveal className="mb-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RESPONSIBILITIES.map((r) => (
                <div key={r.party} className={`rounded-3xl border p-8 ${r.party.includes("Partner") ? "border-blue-500/30 bg-blue-50/50 dark:bg-blue-600/5" : "border-border bg-background"}`}>
                  <div className={`text-sm font-black uppercase tracking-[0.2em] mb-5 ${r.party.includes("Partner") ? "text-blue-600" : "text-primary"}`}>{r.party}</div>
                  <ul className="flex flex-col gap-3">
                    {r.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle2 size={16} className={r.party.includes("Partner") ? "text-blue-600 shrink-0" : "text-primary shrink-0"} />
                        <span className="text-sm font-semibold text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          {/* What Zypp provides detail */}
          <Reveal className="mb-8 text-center">
            <h3 className="text-2xl font-black text-foreground">What Zypp Provides to Every FOFO Partner</h3>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHAT_ZYPP_PROVIDES.map(({ Icon, title, desc }) => (
              <RevealItem key={title} className="group rounded-3xl border border-border bg-background p-7 transition-all hover:-translate-y-1 hover:border-blue-500/35 hover:shadow-xl">
                <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="mb-2 font-black text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── WHAT YOU NEED TO BRING ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <Reveal className="mb-14">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 mb-4">Requirements</div>
            <h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl">
              What You Need <span className="text-blue-600">to Bring.</span>
            </h2>
            <p className="text-muted text-lg mt-3 max-w-2xl">FOFO is for hands-on operators. Here&apos;s exactly what&apos;s expected from the franchise partner.</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_YOU_BRING.map(({ Icon, title, desc }) => (
              <RevealItem key={title} className="rounded-3xl border border-border bg-gray-50 dark:bg-slate-900 p-8 hover:border-blue-500/35 hover:-translate-y-1 hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600 shrink-0">
                    <Icon size={22} />
                  </span>
                  <h3 className="text-lg font-black text-foreground">{title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted">{desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── LAUNCH JOURNEY ── */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900 border-y border-border">
        <div className="container mx-auto max-w-6xl px-4">
          <Reveal className="mb-14">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-blue-600">Launch Journey</div>
            <h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl">
              City Interest to <span className="text-blue-600">Operating Network.</span>
            </h2>
            <p className="text-muted text-lg mt-3 max-w-xl">Four steps. 60 days. Full support from the Zypp franchise team throughout.</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {LAUNCH_STEPS.map(({ step, Icon, title, body }) => (
              <RevealItem key={step} className="rounded-3xl border border-border bg-background p-7 hover:border-blue-500/35 hover:-translate-y-1 hover:shadow-xl transition-all">
                <div className="mb-9 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/10 text-blue-600">
                    <Icon size={21} />
                  </span>
                  <span className="text-xs font-black tracking-widest text-blue-600/40">{step}</span>
                </div>
                <h3 className="mb-3 font-black text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{body}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── AVAILABLE CITIES ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <Reveal className="mb-10">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-blue-600">Planned Cities — Now Open for Leads</div>
            <h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl">
              15+ Cities Planned. <span className="text-blue-600">First Mover Wins.</span>
            </h2>
            <p className="text-muted text-lg mt-3 max-w-xl">We are actively planning expansion and accepting franchise leads for the cities below. Spots are limited to 1–2 partners per city.</p>
          </Reveal>
          <Reveal>
            <div className="rounded-[2rem] border border-border bg-gray-50 dark:bg-slate-900 p-8">
              <div className="flex flex-wrap gap-2.5 mb-6">
                {AVAILABLE_CITIES.map((city) => (
                  <span key={city} className="rounded-full border border-border bg-background px-4 py-2 text-sm font-bold text-foreground/75 transition-colors hover:border-blue-500/40 hover:text-blue-600 dark:bg-slate-950">
                    {city}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-border">
                <p className="text-sm text-muted">Interested in a city not listed? We evaluate new markets continuously — mention it in your application.</p>
                <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25">
                  Apply Now <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950/55 to-slate-950 py-24 text-center text-white">
        <div className="container mx-auto max-w-3xl px-4">
          <Reveal>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-blue-500">Build Your City</div>
            <h2 className="mb-5 text-3xl font-black md:text-5xl">
              Ready to Operate a <span className="text-blue-500">Zypp Network?</span>
            </h2>
            <p className="mx-auto mb-9 max-w-2xl text-lg leading-relaxed text-white/55">
              Tell us about your city, operating background, and investment capacity. The franchise team will walk you through the FOFO model and readiness process.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-9 py-4 font-black text-white transition-colors hover:bg-blue-700 shadow-xl shadow-blue-600/30">
                Start the Conversation <ArrowRight size={18} />
              </Link>
              <Link href="/franchise" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-9 py-4 font-bold text-white hover:bg-white/5 transition-colors">
                Back to All Models
              </Link>
            </div>
            {/* Summary financials */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto pt-8 border-t border-white/15">
              {[
                { n: "₹50–80L", l: "Investment" },
                { n: "20–25%",  l: "Annual Return" },
                { n: "12–18 mo",l: "Payback" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-black text-blue-500">{s.n}</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <GetInTouchSection />
    </div>
  );
}

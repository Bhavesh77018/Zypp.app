import Link from "next/link";
import {
  ArrowRight, BarChart3, Bike, Building2, CheckCircle2,
  ChevronRight, Clock, HeartHandshake, IndianRupee, MapPin,
  ShieldCheck, TrendingUp, Users, Wrench,
} from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";
import GetInTouchSection from "@/components/home/GetInTouchSection";

export const metadata = {
  title: "FOCO Franchise — Passive EV Investment with Zypp | Zypp Electric",
  description: "FOCO: Invest ₹50–80L in an EV fleet and let Zypp run everything — riders, hub, maintenance. 18–22% annual return, fully passive. India's largest EV rental platform operates it for you.",
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const INVESTMENT_BREAKDOWN = [
  { label: "Fleet Purchase (500 EVs)", value: "₹35–50L", detail: "2-wheelers via Zypp OEM network at preferred pricing. Fleet registered in partner's name." },
  { label: "Hub Setup & Infrastructure", value: "₹8–15L",  detail: "Hub secured and set up by Zypp — you fund it, Zypp builds and runs it." },
  { label: "Initial Working Capital",   value: "₹5–10L",  detail: "Covered by Zypp operations budget; partner contribution minimal in FOCO." },
  { label: "Tech & Agreement Fees",     value: "₹2–5L",  detail: "FleetEase onboarding, security deposit, and 5-year franchise agreement fees." },
];

const RETURNS = [
  {
    n: "18–22%",
    l: "Annual Return on Capital",
    d: "From a 500-EV fleet fully operated by Zypp. Passive return — no operational effort required from the partner.",
    highlight: true,
  },
  {
    n: "~₹3.3 Cr",
    l: "Annual Partner Revenue (500 EVs)",
    d: "500 EVs × ~₹5,500/month net per EV × 12 months — revenue flows to partner after Zypp's operating fees. Grows linearly with fleet size.",
    highlight: true,
  },
  {
    n: "18–24 mo",
    l: "Estimated Payback Period",
    d: "On a 500-EV FOCO model at 85% utilisation. Zypp's operational efficiency directly protects your payback timeline.",
    highlight: false,
  },
  {
    n: "~₹5,500",
    l: "Net Monthly Income per EV",
    d: "After Zypp's ₹750/EV platform & software fee, the remaining revenue flows to the partner. Scales as EV count grows.",
    highlight: false,
  },
  {
    n: "~₹16.5 Cr",
    l: "5-Year Cumulative Revenue (500 EVs)",
    d: "Projected cumulative partner revenue over the 5-year agreement at steady-state utilisation of 85%+.",
    highlight: false,
  },
  {
    n: "₹0",
    l: "Capex from Zypp",
    d: "You fund the fleet and hub. Zypp brings brand, technology, OEM pricing, and full operations — no Zypp capital involved.",
    highlight: false,
  },
];

const WHAT_YOU_BRING = [
  {
    Icon: IndianRupee,
    title: "₹50–80 Lakhs Investment Capital",
    desc: "Covers fleet purchase (500 EVs at preferred OEM pricing), hub setup, and onboarding fees. This is your only financial commitment — no ongoing opex from your pocket.",
  },
  {
    Icon: ShieldCheck,
    title: "KYC & Franchise Agreement",
    desc: "Standard identity and business KYC, followed by signing the 5-year FOCO franchise agreement. The entire process is guided and completed in under a week.",
  },
  {
    Icon: Bike,
    title: "City Preference & Fleet Size",
    desc: "Choose your preferred city or cities and preferred fleet size (minimum 500 EVs). Zypp handles feasibility, hub planning, and launch — you just confirm the mandate.",
  },
  {
    Icon: BarChart3,
    title: "Quarterly Governance Participation",
    desc: "Attend quarterly review calls with Zypp's franchise team to review fleet performance, utilisation, and expansion opportunities. No daily involvement needed.",
  },
];

const WHAT_ZYPP_MANAGES = [
  {
    Icon: Users,
    title: "Rider Recruitment & Onboarding",
    desc: "Zypp sources, background-checks, KYC-verifies, trains, and onboards every rider assigned to your fleet. You never interview or hire anyone.",
  },
  {
    Icon: Building2,
    title: "Hub Setup & Day-to-Day Operations",
    desc: "Zypp identifies, sets up, and operates the hub in your city — including equipment, branding, CCTV, fire safety, and daily management.",
  },
  {
    Icon: Wrench,
    title: "Fleet Maintenance & Servicing",
    desc: "Zypp's 400+ field technicians across 21 service hubs handle predictive maintenance, breakdowns, and part replacements. 96% fleet uptime guaranteed.",
  },
  {
    Icon: BarChart3,
    title: "Utilisation & Revenue Optimisation",
    desc: "AI-driven fleet allocation maximises the number of revenue-earning hours per EV per day — directly protecting your monthly returns.",
  },
  {
    Icon: TrendingUp,
    title: "Delivery Platform Demand Activation",
    desc: "Zypp connects riders to Zomato, Swiggy, Blinkit, Zepto, Porter, and more. Demand is live and active from Day 1 of operations.",
  },
  {
    Icon: ShieldCheck,
    title: "Insurance & Regulatory Compliance",
    desc: "Third-party insurance, accidental cover, vehicle registration, and all city-level regulatory compliance — fully managed under Zypp's framework.",
  },
  {
    Icon: Clock,
    title: "24/7 Breakdown & Field Support",
    desc: "Round-the-clock field response with a 20-minute average TAT. Every idle EV means lost revenue — Zypp's team ensures it doesn't happen.",
  },
  {
    Icon: HeartHandshake,
    title: "Monthly P&L Reports & Governance",
    desc: "Detailed monthly P&L statement, fleet utilisation report, and live FleetEase dashboard access — full transparency into your investment's performance.",
  },
];

const COMPARISON = [
  { aspect: "Capital Required",     fofo: "₹50–80L",         foco: "₹50–80L" },
  { aspect: "Annual Return",        fofo: "20–25%",           foco: "18–22%" },
  { aspect: "Who Runs Operations",  fofo: "You (partner)",    foco: "Zypp" },
  { aspect: "Team Required",        fofo: "Yes (2–5 staff)",  foco: "No" },
  { aspect: "Time Commitment",      fofo: "Full-time",        foco: "Zero" },
  { aspect: "Payback Period",       fofo: "12–18 months",     foco: "18–24 months" },
  { aspect: "Asset Ownership",      fofo: "Partner",          foco: "Partner" },
  { aspect: "Best for",             fofo: "Operators",        foco: "Investors" },
];

const ONBOARDING_STEPS = [
  { step: "01", Icon: MapPin,         title: "Discovery Call",              body: "30-minute call with Zypp's franchise team. Align on city, fleet size, expected returns, and FOCO suitability." },
  { step: "02", Icon: ShieldCheck,    title: "KYC & Agreement",            body: "Complete KYC, review and sign the 5-year FOCO franchise agreement. Zypp begins city and hub planning." },
  { step: "03", Icon: IndianRupee,    title: "Investment & Fleet Order",    body: "Transfer investment. Fleet ordered through Zypp's OEM network. Hub setup begins simultaneously." },
  { step: "04", Icon: TrendingUp,     title: "Zypp Goes Live, You Earn",   body: "Zypp activates the city — hub, riders, demand. You receive monthly reports and returns. Fully hands-off." },
];

const AVAILABLE_CITIES = [
  "Dehradun", "Lucknow", "Meerut", "Ahmedabad", "Surat", "Vadodara",
  "Indore", "Bhopal", "Kolkata", "Kochi", "Chennai", "Coimbatore",
  "Patna", "Raipur", "Visakhapatnam", "Nagpur", "Agra", "Goa",
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function FocoPage() {
  return (
    <div className="w-full bg-background">

      {/* ── HERO ── */}
      <section className="relative min-h-[calc(100svh-64px)] flex items-center overflow-hidden bg-slate-900 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
        <HeroVideoBackdrop image="/media/fleet-control.webp" accent="green" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 65% 40%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 10% 80%, #00BC84 0%, transparent 40%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.8) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />

        <div className="relative z-10 container mx-auto px-4 py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="right">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-sm font-black mb-6 border border-blue-400/30 uppercase tracking-[0.18em]">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                FOCO Franchise Model
              </div>
              <h1 className="text-[clamp(2.2rem,4.4vw,3.8rem)] font-black text-white mb-4 leading-[0.94] tracking-[-0.04em]">
                You Own It.<br />
                <span className="text-blue-400">Zypp Runs It.</span>
              </h1>
              <p className="text-xl text-white/65 mb-4 leading-relaxed max-w-xl">
                FOCO is built for <strong className="text-white">passive investors</strong> — put in the capital, own the fleet, and let Zypp handle everything else. Riders, hub, maintenance, demand — all managed by India&apos;s largest EV rental platform.
              </p>
              {/* Key financial callout */}
              <div className="mb-9 inline-flex flex-wrap items-center gap-6 rounded-2xl border border-blue-400/25 bg-blue-400/10 px-6 py-4 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-2xl font-black text-blue-400">₹50–80L</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">Investment</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-black text-blue-400">18–22%</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">Annual Return</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-black text-blue-400">Zero</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-white/50">Ops Work</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-black hover:bg-blue-700 transition-colors shadow-xl shadow-blue-600/30">
                  Discuss Your Investment <ArrowRight size={18} />
                </Link>
                <Link href="/franchise" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-bold backdrop-blur transition-colors hover:bg-white/10">
                  Compare Models
                </Link>
              </div>
            </Reveal>

            {/* Hero card */}
            <Reveal direction="left">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-md w-full max-w-md">
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-5">
                  <div>
                    <div className="text-xs text-blue-400 uppercase tracking-[0.18em] font-black">FOCO Passive Model</div>
                    <div className="text-xl font-black text-white mt-1">What Zypp handles for you</div>
                  </div>
                  <span className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    "Fleet & hub operations",
                    "Rider recruitment & management",
                    "Maintenance & breakdown support",
                    "Demand platform activation",
                    "Compliance & insurance",
                    "Monthly P&L reporting",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm font-semibold text-white/75">
                      <span className="w-6 h-6 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={14} />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── STAT STRIP ── */}
      <section className="bg-blue-600 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {[
              { n: "~₹3.3 Cr", l: "Annual Revenue (500 EVs)" },
              { n: "18–22%",   l: "Annual Return on Capital" },
              { n: "18–24 mo", l: "Estimated Payback" },
              { n: "Zero",     l: "Operational Effort" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl md:text-3xl font-black">{s.n}</div>
                <div className="text-sm opacity-80 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INVESTMENT BREAKDOWN ── */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900 border-b border-border">
        <div className="container mx-auto max-w-6xl px-4">
          <Reveal className="mb-14">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-500 mb-4">The Investment</div>
            <h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl mb-3">
              What ₹50–80 Lakhs <span className="text-blue-500">Gets You.</span>
            </h2>
            <p className="text-muted text-lg max-w-2xl">Full investment breakdown — where the capital goes and what it creates. You fund it; Zypp builds and operates it.</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {INVESTMENT_BREAKDOWN.map((item, i) => (
              <RevealItem key={item.label}>
                <div className="h-full bg-background border border-border rounded-3xl p-7 hover:border-blue-400/35 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl font-black text-blue-500">{item.value}</div>
                    <span className="text-xs font-black text-blue-500/40 tracking-widest">0{i + 1}</span>
                  </div>
                  <div className="font-black text-foreground mb-2">{item.label}</div>
                  <p className="text-sm text-muted leading-relaxed">{item.detail}</p>
                </div>
              </RevealItem>
            ))}
          </div>

          {/* Total callout */}
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-10 text-white relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-white/70 mb-2">Total Investment Range</div>
                  <div className="text-5xl font-black mb-3">₹50–80 Lakhs</div>
                  <p className="text-white/80 leading-relaxed max-w-lg">
                    All-in figure. You transfer the investment and sign the agreement. Zypp handles fleet procurement, hub setup, rider onboarding, and all day-to-day operations. You receive monthly revenue and reports.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="bg-white/20 rounded-2xl px-5 py-4 text-center backdrop-blur-sm">
                    <div className="text-2xl font-black">18–22%</div>
                    <div className="text-xs text-white/70 uppercase tracking-wider mt-0.5">Annual Return</div>
                  </div>
                  <div className="bg-white/20 rounded-2xl px-5 py-4 text-center backdrop-blur-sm">
                    <div className="text-2xl font-black">Zero Ops</div>
                    <div className="text-xs text-white/70 uppercase tracking-wider mt-0.5">Required from You</div>
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
            <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-500 mb-4">The Returns</div>
            <h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl">
              Your Investment. <span className="text-blue-500">Zypp&apos;s Work. Your Returns.</span>
            </h2>
            <p className="text-muted text-lg mt-3 max-w-2xl mx-auto">Real numbers based on a 500-EV fleet at 85% utilisation — the same model Zypp runs in its own cities.</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {RETURNS.map((c) => (
              <RevealItem key={c.l} className={`rounded-3xl border p-7 transition-all hover:-translate-y-1 hover:shadow-xl ${c.highlight ? "border-blue-400/30 bg-blue-50/50 dark:bg-blue-500/5" : "border-border bg-background"}`}>
                <div className={`text-3xl font-black mb-2 ${c.highlight ? "text-blue-600" : "text-blue-400"}`}>{c.n}</div>
                <div className="mb-3 text-sm font-black text-foreground">{c.l}</div>
                <p className="text-sm leading-relaxed text-muted">{c.d}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── WHAT ZYPP MANAGES ── */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900 border-y border-border">
        <div className="container mx-auto max-w-7xl px-4">
          <Reveal className="mb-14 text-center">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-500 mb-4">Full Operations</div>
            <h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl">
              Everything Zypp <span className="text-blue-500">Handles for You.</span>
            </h2>
            <p className="text-muted text-lg mt-3 max-w-2xl mx-auto">
              You invest. Zypp activates. Every operation — riders, hub, maintenance, demand, compliance — is managed by Zypp end to end, every single day.
            </p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHAT_ZYPP_MANAGES.map(({ Icon, title, desc }) => (
              <RevealItem key={title} className="group rounded-3xl border border-border bg-background p-7 transition-all hover:-translate-y-1 hover:border-blue-400/35 hover:shadow-xl">
                <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 transition-colors group-hover:bg-blue-600 group-hover:text-white">
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
            <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-500 mb-4">Your Role</div>
            <h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl">
              What You Need <span className="text-blue-500">to Bring.</span>
            </h2>
            <p className="text-muted text-lg mt-3 max-w-2xl">FOCO has just 4 simple requirements. No team. No hub. No operations. Just capital, KYC, a city preference, and a quarterly check-in.</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHAT_YOU_BRING.map(({ Icon, title, desc }) => (
              <RevealItem key={title} className="rounded-3xl border border-border bg-gray-50 dark:bg-slate-900 p-8 hover:border-blue-400/35 hover:-translate-y-1 hover:shadow-xl transition-all text-center">
                <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                  <Icon size={24} />
                </span>
                <h3 className="text-lg font-black text-foreground mb-3">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── FOFO vs FOCO QUICK COMPARE ── */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900 border-y border-border">
        <div className="container mx-auto max-w-4xl px-4">
          <Reveal className="mb-14 text-center">
            <div className="text-sm font-black uppercase tracking-[0.2em] text-blue-500 mb-4">FOFO vs FOCO</div>
            <h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl">
              Is FOCO Right <span className="text-blue-500">for You?</span>
            </h2>
            <p className="text-muted text-lg mt-3 max-w-xl mx-auto">If you don&apos;t want to run operations, FOCO is your model. If you want maximum return and control, look at FOFO.</p>
          </Reveal>
          <Reveal>
            <div className="bg-background border border-border rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[480px]">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-slate-700">
                      <th className="p-5 text-xs font-bold uppercase tracking-widest text-gray-400">Aspect</th>
                      <th className="p-5 text-center text-sm font-black text-primary">🟢 FOFO</th>
                      <th className="p-5 text-center text-sm font-black text-blue-500 bg-blue-50/50 dark:bg-blue-500/5">🔵 FOCO (You are here)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                    {COMPARISON.map((row) => (
                      <tr key={row.aspect} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-5 text-sm font-semibold text-gray-600 dark:text-gray-300">{row.aspect}</td>
                        <td className="p-5 text-center text-sm text-gray-600 dark:text-gray-400">{row.fofo}</td>
                        <td className="p-5 text-center text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-500/5">{row.foco}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-4 bg-blue-500/5 border-t border-blue-400/15 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p className="text-xs text-muted">Considering FOFO? Higher return, you operate the city.</p>
                <Link href="/fofo" className="shrink-0 px-5 py-2.5 rounded-full border border-primary/30 text-primary text-sm font-bold hover:bg-primary hover:text-white transition-colors">
                  Explore FOFO →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ONBOARDING STEPS ── */}
      <section className="py-24 bg-background">
        <div className="container mx-auto max-w-6xl px-4">
          <Reveal className="mb-14">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-blue-500">Your Onboarding</div>
            <h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl">
              4 Steps to <span className="text-blue-500">Earning Returns.</span>
            </h2>
            <p className="text-muted text-lg mt-3 max-w-xl">Simple, fast, fully guided. From discovery call to first month&apos;s revenue in as little as 60 days.</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {ONBOARDING_STEPS.map(({ step, Icon, title, body }) => (
              <RevealItem key={step} className="rounded-3xl border border-border bg-gray-50 dark:bg-slate-900 p-7 hover:border-blue-400/35 hover:-translate-y-1 hover:shadow-xl transition-all">
                <div className="mb-9 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                    <Icon size={21} />
                  </span>
                  <span className="text-xs font-black tracking-widest text-blue-500/40">{step}</span>
                </div>
                <h3 className="mb-3 font-black text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted">{body}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── AVAILABLE CITIES ── */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900 border-y border-border">
        <div className="container mx-auto max-w-6xl px-4">
          <Reveal className="mb-10">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-blue-500">Planned Cities — Now Open for Leads</div>
            <h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl">
              15+ Cities Planned. <span className="text-blue-500">First Mover Wins.</span>
            </h2>
            <p className="text-muted text-lg mt-3 max-w-xl">We are actively planning expansion and accepting investment leads for the cities below. FOCO spots are highly limited per city.</p>
          </Reveal>
          <Reveal>
            <div className="rounded-[2rem] border border-border bg-background p-8">
              <div className="flex flex-wrap gap-2.5 mb-6">
                {AVAILABLE_CITIES.map((city) => (
                  <span key={city} className="rounded-full border border-border bg-gray-50 dark:bg-slate-900 px-4 py-2 text-sm font-bold text-foreground/75 transition-colors hover:border-blue-400/40 hover:text-blue-500">
                    {city}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t border-border">
                <p className="text-sm text-muted">Interested in a city not listed? Mention it in your application — Zypp evaluates new markets continuously.</p>
                <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25">
                  Apply Now <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #3b82f6 0%, transparent 60%)" }} />
        <div className="container relative z-10 mx-auto max-w-3xl px-4">
          <Reveal>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-blue-400">Your Passive Income</div>
            <h2 className="mb-5 text-3xl font-black md:text-5xl">
              Invest in India&apos;s <span className="text-blue-400">EV Revolution.</span>
            </h2>
            <p className="mx-auto mb-9 max-w-2xl text-lg leading-relaxed text-white/55">
              Put your capital in a real, asset-backed EV business — and let Zypp&apos;s 400+ field technicians, tech platform, and operations team run it for you. Monthly reports, live dashboard, zero hustle.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-9 py-4 font-black text-white transition-colors hover:bg-blue-700 shadow-xl shadow-blue-600/30">
                Discuss Your Investment <ArrowRight size={18} />
              </Link>
              <Link href="/franchise" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-9 py-4 font-bold text-white hover:bg-white/5 transition-colors">
                Back to All Models
              </Link>
            </div>
            {/* Summary financials */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto pt-8 border-t border-white/15">
              {[
                { n: "₹50–80L", l: "Investment" },
                { n: "18–22%",  l: "Annual Return" },
                { n: "Zero",    l: "Ops Work" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-2xl font-black text-blue-400">{s.n}</div>
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

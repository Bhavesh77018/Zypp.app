import Link from "next/link";
import { ArrowRight, TrendingUp, Building2, Users, Zap, Clock, BarChart3, Mail, CheckCircle2, ChevronRight, IndianRupee } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import GetInTouchSection from "@/components/home/GetInTouchSection";
import FAQSection from "@/components/home/FAQSection";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";

export const metadata = {
  title: "Franchise — Own an EV City | Zypp Electric",
  description: "Build an EV rental network in your city with Zypp's FOFO and FOCO franchise models. ₹50–80L investment, 18–25% annual return, full brand + tech + playbook support.",
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const COMPARISON_ROWS = [
  { label: "Investment Required",   fofo: "₹50–80 Lakhs",      foco: "₹50–80 Lakhs",      fofoHighlight: false, focoHighlight: false },
  { label: "Annual Return",         fofo: "20–25%",             foco: "18–22%",             fofoHighlight: true,  focoHighlight: true },
  { label: "Asset Ownership",       fofo: "Partner",            foco: "Partner",            fofoHighlight: false, focoHighlight: false },
  { label: "Fleet Operations",      fofo: "Partner's team",     foco: "100% by Zypp",       fofoHighlight: false, focoHighlight: true },
  { label: "Rider Management",      fofo: "Partner manages",    foco: "Zypp manages",       fofoHighlight: false, focoHighlight: true },
  { label: "Hub Management",        fofo: "Partner manages",    foco: "Zypp manages",       fofoHighlight: false, focoHighlight: true },
  { label: "Maintenance",           fofo: "Zypp-supported",     foco: "Zypp-managed",       fofoHighlight: false, focoHighlight: true },
  { label: "Time Commitment",       fofo: "High (full-time)",   foco: "Low (passive)",      fofoHighlight: false, focoHighlight: false },
  { label: "Min. Fleet Size",       fofo: "500 EVs",            foco: "500 EVs",            fofoHighlight: false, focoHighlight: false },
  { label: "Payback Period",        fofo: "12–18 months",       foco: "18–24 months",       fofoHighlight: false, focoHighlight: false },
  { label: "Annual Revenue (500 EVs)", fofo: "~₹3.75 Cr",      foco: "~₹3.3 Cr",          fofoHighlight: true,  focoHighlight: true },
  { label: "Zypp Platform Fee",     fofo: "₹750/EV/month",      foco: "₹750/EV/month",      fofoHighlight: false, focoHighlight: false },
  { label: "Best For",              fofo: "Operators",          foco: "Passive Investors",  fofoHighlight: false, focoHighlight: false },
];

const MODELS = [
  {
    badge: "FOFO",
    badgeFull: "Franchise Owned, Franchise Operated",
    title: "You Own It.\nYou Run It.",
    desc: "You invest in the fleet and hub, and operate with your own team. Zypp provides brand, tech, OEM access, and the full ops playbook. Highest return, maximum control.",
    accent: "text-indigo-500",
    border: "border-indigo-500/30",
    badgeStyle: "bg-indigo-600/10 text-indigo-500 border border-indigo-500/20",
    ctaStyle: "bg-indigo-600 text-white hover:bg-indigo-600/90 shadow-lg shadow-indigo-500/20",
    cta: "Explore FOFO →",
    href: "/fofo",
    metrics: [
      { label: "Investment", value: "₹50–80L" },
      { label: "Annual Return", value: "20–25%" },
      { label: "Payback", value: "12–18 mo" },
      { label: "Operations", value: "You run it" },
    ],
    includes: [
      "Full brand licence & playbook",
      "FleetEase operating technology",
      "OEM pricing for fleet purchase",
      "Demand network access",
      "Your own field team",
      "Full P&L ownership",
    ],
  },
  {
    badge: "FOCO",
    badgeFull: "Franchise Owned, Company Operated",
    title: "You Own It.\nWe Run It.",
    desc: "You invest in the fleet. Zypp operates everything — riders, hub management, maintenance, and revenue collection. Truly passive investment with Zypp's operational excellence.",
    accent: "text-indigo-500",
    border: "border-indigo-400/30",
    badgeStyle: "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20",
    ctaStyle: "bg-indigo-600 text-white hover:bg-blue-700 shadow-lg shadow-indigo-500/20",
    cta: "Explore FOCO →",
    href: "/foco",
    metrics: [
      { label: "Investment", value: "₹50–80L" },
      { label: "Annual Return", value: "18–22%" },
      { label: "Payback", value: "18–24 mo" },
      { label: "Operations", value: "Zypp runs it" },
    ],
    includes: [
      "Zero operational work required",
      "Zypp manages riders & hubs",
      "Maintenance fully handled",
      "Live dashboard visibility",
      "Monthly P&L reports",
      "Multi-city expansion option",
    ],
  },
];

const SHARED_BENEFITS = [
  { Icon: Building2, title: "Proven Brand & Playbook", desc: "Zypp has built and scaled in 8 cities. You get the exact same system — not an experiment." },
  { Icon: Users,    title: "Built-in Rider Demand",    desc: "Active delivery partners waiting for EVs. Day-1 utilisation from hub launch." },
  { Icon: Zap,      title: "OEM Access & Pricing",     desc: "Preferred EV pricing through Zypp's OEM network — lower capex than building independently." },
  { Icon: BarChart3,title: "FleetEase Technology",     desc: "Full fleet management software, real-time earnings dashboard, and AI-driven allocation — included." },
  { Icon: TrendingUp,title:"Multi-City Scalability",   desc: "A repeatable launch model. Add cities without rebuilding — use what Zypp already learned." },
  { Icon: Clock,    title: "60-Day Launch Playbook",   desc: "City planning, hub readiness, tech setup and field activation through one structured rollout plan." },
];

const STEPS = [
  { n: "01", title: "Choose Your Model",   desc: "Decide between FOFO (you operate) or FOCO (Zypp operates). Book a 30-min discovery call with the team." },
  { n: "02", title: "City & Hub Planning", desc: "Shortlist the city, identify ~1,500 sq ft hub location, confirm fleet size and investment plan." },
  { n: "03", title: "Agreement & Payment", desc: "Sign the 5-year partner agreement and complete the investment. OEM ordering begins within the week." },
  { n: "04", title: "Launch & Earn",       desc: "Hub setup, fleet delivery, rider onboarding — all guided by Zypp. Revenue starts from Day 1." },
];

const FRANCHISE_LOCATIONS = [
  { city: "Delhi NCR",     region: "North India",   status: "Active" },
  { city: "Noida",         region: "North India",   status: "Active" },
  { city: "Gurgaon",       region: "North India",   status: "Active" },
  { city: "Faridabad",     region: "North India",   status: "Active" },
  { city: "Bangalore",     region: "South India",   status: "Active" },
  { city: "Hyderabad",     region: "South India",   status: "Active" },
  { city: "Mumbai",        region: "West India",    status: "Active" },
  { city: "Pune",          region: "West India",    status: "Active" },
  { city: "Jaipur",        region: "North India",   status: "Active" },
  { city: "Chandigarh",    region: "North India",   status: "Active" },
  { city: "Lucknow",       region: "North India",   status: "Planned" },
  { city: "Ahmedabad",     region: "West India",    status: "Planned" },
  { city: "Bhopal",        region: "Central India", status: "Planned" },
  { city: "Indore",        region: "Central India", status: "Planned" },
  { city: "Nagpur",        region: "Central India", status: "Planned" },
  { city: "Kolkata",       region: "East India",    status: "Planned" },
  { city: "Chennai",       region: "South India",   status: "Planned" },
  { city: "Coimbatore",    region: "South India",   status: "Planned" },
  { city: "Visakhapatnam", region: "South India",   status: "Upcoming" },
  { city: "Kochi",         region: "South India",   status: "Upcoming" },
  { city: "Agra",          region: "North India",   status: "Upcoming" },
  { city: "Vijayawada",    region: "South India",   status: "Upcoming" },
  { city: "Goa",           region: "West India",    status: "Upcoming" },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function FranchisePage() {
  return (
    <div className="w-full bg-background">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[calc(100svh-64px)] flex items-center overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
        <HeroVideoBackdrop image="/media/fleet-control.webp" accent="blue" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 65% 35%, #3B82F6 0%, transparent 55%), radial-gradient(circle at 10% 80%, #2563EB 0%, transparent 40%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.8) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-600/20 text-indigo-500 text-sm font-bold uppercase tracking-widest mb-8 border border-indigo-500/30">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                Franchise Opportunity
              </div>
              <h1 className="text-[clamp(2.4rem,4.8vw,4rem)] font-black text-white leading-[0.94] tracking-[-0.04em] mb-7">
                Own a City.<br />
                <span className="text-indigo-500">Build an Empire.</span>
              </h1>
              <p className="text-white/65 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
                Zypp is expanding to <strong className="text-white">31 cities</strong>. Become a franchise partner and own the EV delivery infrastructure in your city — with our brand, tech, OEM access, and proven playbook behind you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#models" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-600/90 transition-colors shadow-xl shadow-indigo-500/30">
                  View Both Models <ArrowRight size={18} />
                </Link>
                <a href="mailto:franchise@zypp.app?subject=Franchise Application" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white font-bold hover:bg-white/5 transition-colors">
                  <Mail size={18} /> Apply Now
                </a>
              </div>
            </Reveal>

            {/* Hero stats */}
            <RevealStagger className="grid grid-cols-2 gap-3" stagger={0.08}>
              {[
                { n: "₹50–80L",   l: "Investment Range",       accent: "text-indigo-500" },
                { n: "18–25%",    l: "Annual Return",           accent: "text-amber-400" },
                { n: "500 EVs",   l: "Min Fleet Size",          accent: "text-indigo-500" },
                { n: "12–24 mo",  l: "Payback Period",          accent: "text-indigo-400" },
                { n: "15+ Cities",l: "Open for Franchise",      accent: "text-indigo-500" },
                { n: "60 Days",   l: "Average Launch Time",     accent: "text-amber-400" },
              ].map((m) => (
                <RevealItem key={m.l} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className={`text-2xl font-black mb-1 ${m.accent}`}>{m.n}</div>
                  <div className="text-white/50 text-xs font-semibold uppercase tracking-widest">{m.l}</div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* ── WHAT IS A ZYPP FRANCHISE ── */}
      <section className="py-14 bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-slate-800">
              {[
                { n: "26,000+", l: "EVs Already on Road",  sub: "Proven infrastructure" },
                { n: "8 Cities", l: "Live & Operational",  sub: "With Zypp's model" },
                { n: "₹750/EV", l: "Zypp Monthly Fee",    sub: "Platform + software" },
                { n: "5-Year",  l: "Franchise Agreement",  sub: "Renewable term" },
              ].map((s) => (
                <div key={s.l} className="py-8 px-6 text-center">
                  <div className="text-3xl md:text-4xl font-black text-indigo-500 mb-1">{s.n}</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{s.l}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TWO MODELS — FULL CARDS ── */}
      <section id="models" className="scroll-mt-24 py-24 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-14">
            <div className="text-sm font-bold text-indigo-500 uppercase tracking-[0.2em] mb-3">Two Models</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Choose How <span className="text-indigo-500">You Want to Own.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-2xl">
              Same investment range. Same brand, tech, and OEM access. The difference is <strong className="text-gray-900 dark:text-white">who runs the fleet</strong> — and how much of your time it takes.
            </p>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
            {MODELS.map((m) => (
              <RevealItem key={m.badge}>
                <div className={`h-full bg-white dark:bg-slate-950 border-2 ${m.border} rounded-3xl p-8 md:p-10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col`}>
                  {/* Header */}
                  <div className="mb-7">
                    <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 ${m.badgeStyle}`}>
                      <span className="font-black text-sm">{m.badge}</span>
                      <span className="opacity-70">— {m.badgeFull}</span>
                    </div>
                    <h3 className={`text-3xl md:text-4xl font-black mb-3 leading-tight ${m.accent}`}>
                      {m.title.split("\n").map((line, i) => (
                        <span key={i}>{line}{i === 0 && <br />}</span>
                      ))}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 gap-3 mb-7">
                    {m.metrics.map((metric) => (
                      <div key={metric.label} className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl px-4 py-3">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{metric.label}</div>
                        <div className={`text-lg font-black ${m.accent}`}>{metric.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* What&apos;s included */}
                  <div className="flex-1 mb-8">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">What&apos;s included</div>
                    <ul className="flex flex-col gap-2.5">
                      {m.includes.map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <CheckCircle2 size={15} className={`shrink-0 ${m.accent}`} />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={m.href} className={`w-full py-4 rounded-2xl font-bold text-center transition-all duration-300 inline-flex items-center justify-center gap-2 ${m.ctaStyle}`}>
                    {m.cta} <ChevronRight size={16} />
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-5xl">
          <Reveal className="mb-14">
            <div className="text-sm font-bold text-indigo-500 uppercase tracking-[0.2em] mb-3">Side by Side</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              FOFO vs FOCO. <span className="text-indigo-500">Every Detail.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
              Full comparison — investment, returns, responsibilities, and who does what.
            </p>
          </Reveal>

          <Reveal>
            <div className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[560px]">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-slate-700">
                      <th className="p-5 text-xs font-bold uppercase tracking-widest text-gray-400 w-2/5">Detail</th>
                      <th className="p-5 text-center text-sm font-black text-indigo-500 w-[30%]">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-500/20">🟢 FOFO</span>
                      </th>
                      <th className="p-5 text-center text-sm font-black text-indigo-500 w-[30%]">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">🔵 FOCO</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.label} className="hover:bg-gray-100/50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-5 text-sm font-semibold text-gray-700 dark:text-gray-300">{row.label}</td>
                        <td className={`p-5 text-center text-sm font-bold ${row.fofoHighlight ? "text-indigo-500 text-base" : "text-gray-700 dark:text-gray-200"}`}>{row.fofo}</td>
                        <td className={`p-5 text-center text-sm font-bold ${row.focoHighlight ? "text-indigo-500 text-base" : "text-gray-700 dark:text-gray-200"}`}>{row.foco}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-4 bg-indigo-600/5 border-t border-indigo-500/15 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p className="text-xs text-gray-500 dark:text-gray-400">* Revenue figures based on 500 EV fleet at 85% utilisation. Detailed projections shared during partner evaluation.</p>
                <div className="flex gap-3 shrink-0">
                  <Link href="/fofo" className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-600/90 transition-colors">FOFO Details →</Link>
                  <Link href="/foco" className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors">FOCO Details →</Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT ZYPP PROVIDES TO ALL PARTNERS ── */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-12">
            <div className="text-sm font-bold text-indigo-500 uppercase tracking-[0.2em] mb-3">What Every Partner Gets</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              You Get a System. <span className="text-indigo-500">Not Just a Brand.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
              Every franchise partner — FOFO or FOCO — gets Zypp&apos;s complete operating infrastructure from day one.
            </p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHARED_BENEFITS.map((w, i) => (
              <RevealItem key={w.title}>
                <div className="h-full bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 hover:border-indigo-500/30">
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-500">
                      <w.Icon size={22} strokeWidth={2} />
                    </span>
                    <span className="text-5xl font-black opacity-10 text-indigo-500">0{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-indigo-500 mb-2">{w.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{w.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── HOW TO APPLY ── */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-4xl">
          <Reveal className="mb-12">
            <div className="text-sm font-bold text-indigo-500 uppercase tracking-[0.2em] mb-3">How to Get Started</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              From Application <span className="text-indigo-500">to Launch in 60 Days.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
              Four steps. Fast review. Full support from our team every step of the way.
            </p>
          </Reveal>
          <RevealStagger className="relative flex flex-col gap-0">
            <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-gray-200 dark:bg-slate-700 rounded-full" />
            {STEPS.map((s, i) => (
              <RevealItem key={s.n}>
                <div className={`relative flex gap-6 pb-8 ${i === STEPS.length - 1 ? "pb-0" : ""}`}>
                  <div className="mt-1.5 shrink-0 w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-500/30">
                    {s.n}
                  </div>
                  <div className="flex-1 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 hover:border-indigo-500/20 transition-colors">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── FRANCHISE LOCATIONS ── */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-10">
            <div className="text-sm font-bold text-indigo-500 uppercase tracking-[0.2em] mb-3">Where We&apos;re Going</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              23 Cities. <span className="text-indigo-500">Franchise Spots Filling Fast.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">Limited to 1–2 franchise partners per city. Active cities are live with Zypp&apos;s model today.</p>
          </Reveal>

          {/* Legend */}
          <Reveal className="flex flex-wrap gap-5 mb-8">
            {[
              { color: "bg-indigo-600", dot: "bg-indigo-600", label: "Active" },
              { color: "bg-amber-400", dot: "bg-amber-400", label: "Upcoming" },
              { color: "bg-gray-300", dot: "bg-gray-300", label: "Planned" },
            ].map((l) => (
              <span key={l.label} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
                <span className={`w-3 h-3 rounded-full ${l.dot}`} /> {l.label}
              </span>
            ))}
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FRANCHISE_LOCATIONS.map((loc) => {
              const isActive = loc.status === "Active";
              const isUpcoming = loc.status === "Upcoming";
              const barClass = isActive ? "bg-indigo-600" : isUpcoming ? "bg-amber-400" : "bg-gray-300";
              const dotClass = isActive ? "bg-indigo-600" : isUpcoming ? "bg-amber-500" : "bg-gray-400";
              const badgeClass = isActive
                ? "bg-blue-50 text-blue-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                : isUpcoming
                ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                : "bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-gray-400";

              return (
                <RevealItem key={loc.city}>
                  <div className="relative bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-[14px] overflow-hidden flex items-center justify-between p-4 pl-6 hover:shadow-md transition-shadow h-full">
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${barClass}`} />
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white text-[15px]">{loc.city}</div>
                        <div className="text-gray-400 text-xs font-medium">{loc.region}</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[11px] font-bold ${badgeClass}`}>{loc.status}</div>
                  </div>
                </RevealItem>
              );
            })}
          </div>

          {/* Inline CTA */}
          <Reveal className="mt-12">
            <div className="bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-sm font-bold text-indigo-500 uppercase tracking-[0.2em] mb-2">Ready to Apply?</div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Franchise spots fill fast.</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Write to us with your preferred city, model (FOFO/FOCO), and investment capacity.</p>
              </div>
              <div className="flex gap-4 flex-wrap shrink-0">
                <Link href="/fofo" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-600/90 transition-colors shadow-lg">
                  FOFO <ArrowRight size={16} />
                </Link>
                <Link href="/foco" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg">
                  FOCO <ArrowRight size={16} />
                </Link>
                <a href="mailto:franchise@zypp.app?subject=Franchise Application" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white font-bold hover:border-indigo-500/40 transition-colors">
                  <Mail size={16} /> Email Us
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #3B82F6 0%, transparent 60%)" }} />
        <div className="relative z-10 container mx-auto px-4">
          <Reveal>
            <div className="text-sm font-bold text-indigo-500 uppercase tracking-[0.2em] mb-4">Own Your City</div>
            <h2 className="text-3xl md:text-5xl font-black mb-5">
              Ready to Own India&apos;s <span className="text-indigo-500">EV Future?</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Two models, one proven system. Choose how you want to own — then let&apos;s build your city together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/fofo" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-indigo-600 text-white font-bold text-base hover:bg-indigo-600/90 transition-colors shadow-xl shadow-indigo-500/30">
                Explore FOFO <ArrowRight size={18} />
              </Link>
              <Link href="/foco" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-indigo-600 text-white font-bold text-base hover:bg-blue-700 transition-colors shadow-xl shadow-indigo-500/30">
                Explore FOCO <ArrowRight size={18} />
              </Link>
              <a href="mailto:franchise@zypp.app" className="inline-flex items-center gap-2 px-10 py-5 rounded-full border border-white/25 text-white font-bold hover:bg-white/5 transition-colors">
                <Mail size={18} /> Ask a Question
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GET IN TOUCH ── */}
      <GetInTouchSection />
    </div>
  );
}

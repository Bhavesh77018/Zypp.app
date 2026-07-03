import Link from "next/link";
import { ArrowRight, TrendingUp, Building2, Users, Zap, Clock, BarChart3, Mail } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import GetInTouchSection from "@/components/home/GetInTouchSection";
import FAQSection from "@/components/home/FAQSection";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";

export const metadata = {
  title: "Franchise — Own an EV City | Zypp Electric",
  description: "Build an EV rental network in your city with Zypp's FOFO and FOCO franchise models, operating technology and launch playbook.",
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const MODELS = [
  {
    badge: "FOFO",
    badgeFull: "Franchise Owned, Franchise Operated",
    title: "You Own It. You Run It.",
    desc: "You invest in the fleet and hub, and operate with your own team. Zypp provides brand, tech platform, OEM access, and the full ops playbook. Highest return, maximum control.",
    accent: "text-primary",
    badgeStyle: "bg-primary/10 text-primary border border-primary/20",
    ctaStyle: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20",
    cta: "Apply for FOFO",
    href: "mailto:akash@zypp.app?subject=FOFO Franchise Application",
    facts: [
      { label: "Assets", value: "Partner owned" },
      { label: "Operations", value: "Partner operated" },
      { label: "Technology", value: "Powered by Zypp" },
      { label: "Demand network", value: "Enabled by Zypp" },
      { label: "Business visibility", value: "Live dashboard" },
      { label: "Best for", value: "Hands-on operators" },
    ],
  },
  {
    badge: "FOCO",
    badgeFull: "Franchise Owned, Company Operated",
    title: "You Own It. We Run It.",
    desc: "You invest in the fleet. Zypp operates it entirely — riders, hub management, maintenance, and revenue collection. Passive investment with Zypp's operational excellence.",
    accent: "text-blue-500",
    badgeStyle: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
    ctaStyle: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20",
    cta: "Apply for FOCO",
    href: "mailto:akash@zypp.app?subject=FOCO Franchise Application",
    facts: [
      { label: "Assets", value: "Partner owned" },
      { label: "Operations", value: "Managed by Zypp" },
      { label: "Technology", value: "Powered by Zypp" },
      { label: "Field teams", value: "Managed by Zypp" },
      { label: "Business visibility", value: "Live dashboard" },
      { label: "Best for", value: "Managed ownership" },
    ],
  },
];

const ECONOMICS = [
  { n: "01", label: "City & Hub Design", desc: "Territory planning, hub requirements and a launch blueprint shaped around local rider demand.", Icon: Building2 },
  { n: "02", label: "Fleet & OEM Access", desc: "Vehicle selection and procurement support through Zypp's operating and OEM ecosystem.", Icon: Zap },
  { n: "03", label: "Demand Activation", desc: "Rider acquisition and delivery demand connections are built into the launch workflow.", Icon: Users },
  { n: "04", label: "FleetEase Visibility", desc: "Track deployment, utilisation, service workflows and operating performance in one view.", Icon: BarChart3 },
  { n: "05", label: "Operating Playbook", desc: "Standard processes for onboarding, field operations, maintenance and issue escalation.", Icon: Clock },
  { n: "06", label: "Growth Governance", desc: "Regular operating reviews help the city network scale without losing control or service quality.", Icon: TrendingUp },
];

const STEPS = [
  { n: "01", title: "Apply Online", desc: "Submit your preferred city, investment capacity, and business background. Zypp reviews within 7 working days." },
  { n: "02", title: "Agreement & Onboarding", desc: "Sign franchise agreement. Attend Zypp's 3-day partner onboarding. Get full ops playbook and tech access." },
  { n: "03", title: "Hub Setup & Fleet", desc: "Identify hub location with Zypp's guidance. Order EVs through Zypp's OEM network at preferred pricing." },
  { n: "04", title: "Go Live & Earn", desc: "Zypp connects your hub to the rider network. Platform goes live. Revenue starts flowing from day one." },
];

const CITIES_AVAILABLE = [
  "Dehradun", "Lucknow", "Meerut", "Ahmedabad", "Surat", "Vadodara",
  "Indore", "Bhopal", "Kolkata", "Kochi", "Chennai", "Coimbatore",
  "Patna", "Raipur", "Visakhapatnam",
];

const CITIES_LIVE = [
  "Delhi NCR — Live (Zypp Operated)",
  "Bangalore — Live (Zypp Operated)",
  "Hyderabad — Live (Zypp Operated)",
  "Mumbai — Live (Zypp Operated)",
  "Pune — Live (Zypp Operated)",
  "Jaipur — Live (Zypp Operated)",
  "Chandigarh — Live (Zypp Operated)",
  "Goa — Live (Zypp Operated)",
];

const WHY_ZYPP = [
  { Icon: Building2, title: "Proven Brand & Playbook", desc: "Zypp has already built and scaled the model in 8 cities. You get the exact same system — not an experiment." },
  { Icon: Users, title: "Built-in Rider Demand", desc: "Zypp's platform comes with active delivery partners waiting for EVs. Day-1 utilisation from launch." },
  { Icon: Zap, title: "OEM Access & Pricing", desc: "Preferred pricing on EVs through Zypp's OEM network — lower capex than building independently." },
  { Icon: BarChart3, title: "Technology & Analytics", desc: "Full fleet management software, real-time earnings dashboard, and AI-driven allocation — included." },
  { Icon: TrendingUp, title: "Multi-City Expansion System", desc: "A repeatable launch model helps new markets build on what Zypp has already learned in live cities." },
  { Icon: Clock, title: "Structured Launch Support", desc: "City planning, hub readiness, technology setup and field activation move through one rollout plan." },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function FranchisePage() {
  return (
    <div className="w-full bg-background">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[calc(100svh-64px)] flex items-center overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
        <HeroVideoBackdrop image="/media/fleet-control.webp" accent="green" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 65% 35%, #00BC84 0%, transparent 55%), radial-gradient(circle at 10% 80%, #00a373 0%, transparent 40%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(0,188,132,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,188,132,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-bold uppercase tracking-widest mb-8 border border-primary/30">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Franchise Opportunity
              </div>
              <h1 className="text-[clamp(3rem,6.5vw,5.4rem)] font-black text-white leading-[0.96] tracking-[-0.04em] mb-7">
                Own a City.<br />
                <span className="text-primary">Build an Empire.</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
                Zypp is expanding to 31 cities. We&apos;re looking for{" "}
                <strong className="text-white">franchise partners</strong> who want to own the EV delivery infrastructure in their city — with our brand, tech, and playbook behind them.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:akash@zypp.app?subject=Franchise Application" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-xl shadow-primary/30">
                  Apply for a Franchise City <ArrowRight size={18} />
                </a>
                <Link href="#models" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white font-bold hover:bg-white/5 transition-colors">
                  View Models ↓
                </Link>
              </div>
            </Reveal>

            {/* Right: quick metrics */}
            <RevealStagger className="grid grid-cols-2 gap-3" stagger={0.08}>
              {[
                { n: "FOFO", l: "Partner Operated" },
                { n: "FOCO", l: "Zypp Operated" },
                { n: "Live", l: "Fleet Visibility" },
                { n: "End-to-End", l: "Launch Playbook" },
                { n: "15+ Cities", l: "Open for Franchise" },
                { n: "One OS", l: "Operating Control" },
              ].map((m) => (
                <RevealItem key={m.l} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="text-2xl font-black text-primary mb-1">{m.n}</div>
                  <div className="text-white/50 text-xs font-semibold uppercase tracking-widest">{m.l}</div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* ── TWO MODELS ── */}
      <section id="models" className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Two Models</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Choose How <span className="text-primary">You Want to Own.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
              Both models give you Zypp&apos;s brand, tech, OEM access, and rider network. The difference is who operates the fleet.
            </p>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
            {MODELS.map((m) => (
              <RevealItem key={m.badge}>
                <div className="h-full bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 md:p-10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-primary/20 flex flex-col">
                  {/* Header */}
                  <div className="mb-7">
                    <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 ${m.badgeStyle}`}>
                      <span className="font-black">{m.badge}</span>
                      <span className="opacity-70">— {m.badgeFull}</span>
                    </div>
                    <h3 className={`text-2xl md:text-3xl font-black mb-3 ${m.accent}`}>{m.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                  </div>

                  {/* Fact rows */}
                  <div className="flex-1 mb-8 divide-y divide-gray-100 dark:divide-slate-800">
                    {m.facts.map((f) => (
                      <div key={f.label} className="flex items-center justify-between py-3">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">{f.label}</span>
                        <span className={`text-sm font-bold ${f.label === "Annual Return" ? m.accent : "text-gray-900 dark:text-white"}`}>{f.value}</span>
                      </div>
                    ))}
                  </div>

                  <a href={m.href} className={`w-full py-4 rounded-2xl font-bold text-center transition-all duration-300 ${m.ctaStyle}`}>
                    {m.cta} →
                  </a>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── OPERATING FOUNDATION ── */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Reveal className="mb-12">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Operating foundation</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Everything Needed to <span className="text-primary">Launch With Control.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
              A franchise city connects physical infrastructure, rider demand, field operations and live technology from day one.
            </p>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ECONOMICS.map((e) => (
              <RevealItem key={e.label}>
                <div className="h-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-7 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                      <e.Icon size={20} strokeWidth={2} />
                    </span>
                  </div>
                  <div className="text-3xl font-black text-primary/35 leading-none tracking-tight mb-4">{e.n}</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white mb-2">{e.label}</div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{e.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>

          <Reveal className="mt-8">
            <div className="flex items-stretch gap-5 bg-primary/5 border border-primary/15 rounded-2xl p-7">
              <div className="w-1 rounded-full bg-primary shrink-0" />
              <p className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white leading-snug">
                Commercial scope is configured after city, fleet and operating-model discovery. <span className="text-primary">The public page focuses on responsibilities, capabilities and launch readiness</span>; detailed projections are shared during partner evaluation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHY ZYPP FRANCHISE ── TailwindsSection pattern */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-12">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Why Zypp</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              You Get a System. <span className="text-primary">Not Just a Brand.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
              What you&apos;re buying isn&apos;t a logo. It&apos;s a proven operating playbook built across 8 cities and 26,000+ EVs.
            </p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_ZYPP.map((w, i) => (
              <RevealItem key={w.title}>
                <div className="h-full bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 hover:border-primary/30">
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <w.Icon size={22} strokeWidth={2} />
                    </span>
                    <span className="text-5xl font-black opacity-10 text-primary">0{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">{w.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{w.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── HOW TO APPLY — Timeline */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-4xl">
          <Reveal className="mb-12">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">How to Get Started</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              From Application <span className="text-primary">to Launch in 60 Days.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
              Four steps. Fast review. Full support from our team the entire way.
            </p>
          </Reveal>
          <RevealStagger className="relative flex flex-col gap-0">
            <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-gray-200 dark:bg-slate-700 rounded-full" />
            {STEPS.map((s, i) => (
              <RevealItem key={s.n}>
                <div className={`relative flex gap-6 pb-8 ${i === STEPS.length - 1 ? "pb-0" : ""}`}>
                  <div className="mt-1.5 shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-black text-sm shadow-lg shadow-primary/30">
                    {s.n}
                  </div>
                  <div className="flex-1 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 hover:border-primary/20 transition-colors">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── CITIES ── */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-12">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Available Cities</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              15+ Cities Open. <span className="text-primary">First Mover Wins.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
              Franchise spots are limited to 1–2 partners per city. Cities marked as live are already operational under Zypp&apos;s company model.
            </p>
          </Reveal>

          <Reveal className="mb-6">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Open for Franchise Applications
            </div>
            <div className="flex flex-wrap gap-2.5">
              {CITIES_AVAILABLE.map((city) => (
                <span key={city} className="text-sm px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold hover:bg-primary/20 transition-colors cursor-default">
                  {city}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2 mt-8">
              <span className="w-2 h-2 rounded-full bg-gray-400" />
              Zypp Operated (Not Available for Franchise)
            </div>
            <div className="flex flex-wrap gap-2.5">
              {CITIES_LIVE.map((city) => (
                <span key={city} className="text-sm px-4 py-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-slate-700 font-medium cursor-default">
                  {city}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Apply Now inline CTA */}
          <Reveal className="mt-12">
            <div className="bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-2">Ready to Apply?</div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Franchise spots fill fast.</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Write to us with your preferred city and investment capacity.</p>
              </div>
              <a href="mailto:akash@zypp.app?subject=Franchise Application" className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-xl shadow-primary/30">
                <Mail size={18} /> Apply Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── FINAL CTA ── dark gradient */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #00BC84 0%, transparent 60%)" }} />
        <div className="relative z-10 container mx-auto px-4">
          <Reveal>
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Own Your City</div>
            <h2 className="text-3xl md:text-5xl font-black mb-5">
              Ready to Own India&apos;s <span className="text-primary">EV Future?</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Zypp is building the operating system for India&apos;s gig economy. As a franchise partner, you can build local EV infrastructure with a proven brand, connected technology and a structured operating model.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:akash@zypp.app?subject=Franchise Application" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-primary text-white font-bold text-base hover:bg-primary/90 transition-colors shadow-xl shadow-primary/30">
                <Mail size={18} /> Apply for a Franchise City
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-5 rounded-full border border-white/25 text-white font-bold hover:bg-white/5 transition-colors">
                Ask a Question
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GET IN TOUCH ── */}
      <GetInTouchSection />
    </div>
  );
}

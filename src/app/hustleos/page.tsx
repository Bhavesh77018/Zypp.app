import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bike, CreditCard, Home, Bot, GraduationCap, Smartphone, Wallet, type LucideIcon } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import FlywheelSVG from "@/components/hustleos/FlywheelSVG";
import HeroSection from "@/components/home/HeroSection";

export const metadata: Metadata = {
  title: "HustleOS — The Full Stack for Gig | Zypp Electric",
  description:
    "Mobility was Layer 1. Zypp is building the complete economic operating system for India's 100 million gig entrepreneurs — vehicles, credit, housing, and AI.",
};

type Layer = { tag: string; Icon: LucideIcon; title: string; desc: string; status: string; tone: "live" | "building" | "roadmap" };

const LAYERS: Layer[] = [
  { tag: "L1", Icon: Bike, title: "Mobility — The Foundation", desc: "26,827 high-speed EVs. Zero downpayment. Battery swap in 2 minutes. 96% uptime. Riders save ₹5,100+/month vs petrol. Live across 8 cities. EBITDA positive.", status: "Live ✓", tone: "live" },
  { tag: "L2", Icon: CreditCard, title: "Financial Identity", desc: "Zypp CIBIL score built from ride data. Formal credit at 10–12% vs the moneylender's 36%. Bank account, SIP, micro-insurance — all through Zypp.", status: "Building", tone: "building" },
  { tag: "L3", Icon: Home, title: "Urban Living", desc: "Affordable housing near demand hubs. Zypp Tiffins near swap stations. Cut the commute from 2 hours to 20 minutes — more earning time, more income.", status: "Roadmap · FY27", tone: "roadmap" },
  { tag: "L4", Icon: Bot, title: "AI HustleOS", desc: "Earnings optimiser. Hotspot prediction. Surge timing. Route intelligence. The same AI layer Zepto uses for supply chain — now in every rider's pocket.", status: "Roadmap · FY28", tone: "roadmap" },
  { tag: "L5", Icon: GraduationCap, title: "Community & Growth", desc: "Zypp Academy for upskilling. Micro-entrepreneur community. Gig Ki Awaaz podcast network. A flywheel: better data → higher earnings → more riders.", status: "Building", tone: "building" },
];

const TONE: Record<Layer["tone"], string> = {
  live: "bg-primary text-white shadow-lg shadow-primary/20",
  building: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-lg shadow-amber-500/5",
  roadmap: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700",
};

const JOURNEY: { Icon: LucideIcon; title: string; note: string }[] = [
  { Icon: Smartphone, title: "Downloads App", note: "Zero barrier entry" },
  { Icon: Bike, title: "Gets an EV", note: "No downpayment" },
  { Icon: Wallet, title: "Earns ₹35–45K", note: "Per month, stable" },
  { Icon: CreditCard, title: "Gets Credit Score", note: "Zypp CIBIL" },
  { Icon: Home, title: "Builds Assets", note: "Rent-to-own + SIP" },
];

export default function HustleOSPage() {
  return (
    <div className="w-full bg-background overflow-hidden">
      {/* Hero */}
      <HeroSection
        content={{
          bgImage: "", 
          badge: "Beyond Mobility",
          titleLine1: "HustleOS —",
          titleHighlight: "The Full Stack for Gig",
          titleLine2: "",
          subtitle: "Mobility was Layer 1. We are building the complete economic operating system for India's 100 million gig entrepreneurs — from vehicles to credit to housing to AI.",
          primaryCtaLabel: "Start with Mobility",
          primaryCtaLink: "/riders",
          secondaryCtaLabel: "Partner with Us",
          secondaryCtaLink: "/contact",
          stats: [],
        }}
      />

      {/* Vision — What Zepto Did for Kirana */}
      <section className="py-24 bg-white dark:bg-slate-950 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">The Vision</div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-8 leading-tight">What Zepto Did for Kirana.</h2>
              <p className="text-muted text-lg leading-relaxed mb-6">
                Zepto didn't just deliver groceries. It gave the kirana store an intelligence layer — demand forecasting,
                inventory optimisation, last-mile coordination. The kirana didn't change. The system around it did.
              </p>
              <p className="text-muted text-lg leading-relaxed mb-8">
                Zypp is doing the same for gig workers. A delivery partner on a Zypp EV isn't just getting a bike — they're
                getting access to the full economic infrastructure they've never had: mobility, financial identity, credit,
                housing, and AI earnings intelligence. <strong className="text-foreground font-bold">This is India's first gig economy operating system.</strong>
              </p>
            </Reveal>
            <Reveal delay={0.2} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-emerald-300 rounded-[2.5rem] rotate-3 opacity-20 blur-lg" />
              <div className="relative bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-10 md:p-14 shadow-2xl overflow-hidden">
                <div className="absolute -top-6 -right-6 text-9xl text-primary/10 font-serif leading-none">"</div>
                <p className="text-2xl md:text-4xl font-black text-foreground leading-snug mb-6 relative z-10">
                  Zepto did it for kirana.<br />
                  <span className="text-primary">Zypp is doing it for Gig.</span>
                </p>
                <div className="w-12 h-1 bg-primary/20 rounded-full mb-6" />
                <p className="text-muted font-medium text-lg relative z-10">
                  Same playbook. 100× bigger market — 100 million gig workers vs a few million kirana stores. The infrastructure play of the decade.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The Five Layers */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="mb-16 text-center max-w-3xl mx-auto">
            <div className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">The Five Layers</div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground">The Complete Gig Stack.</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
            {LAYERS.map((l, i) => (
              <RevealItem key={l.tag} className={`group flex flex-col bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 hover:border-primary/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 ${i === 0 || i === 3 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <div className="flex justify-between items-start mb-8">
                  <span className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <l.Icon size={28} strokeWidth={2} />
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${TONE[l.tone]}`}>{l.status}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-black text-primary/70 tracking-wider bg-primary/10 px-2 py-0.5 rounded">{l.tag}</span>
                    <h3 className="text-xl font-black text-foreground">{l.title}</h3>
                  </div>
                  <p className="text-muted leading-relaxed text-base">{l.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* The Flywheel — animated SVG */}
      <FlywheelSVG />

      {/* Rider Journey */}
      <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="mb-16 text-center max-w-3xl mx-auto">
            <div className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">The Rider Journey</div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground">From Migrant to Middle Class.</h2>
          </Reveal>
          
          <div className="relative py-10">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-[50px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <RevealStagger className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
              {JOURNEY.map((j, i) => (
                <RevealItem key={j.title} className="relative flex flex-col items-center text-center group">
                  <div className="w-24 h-24 flex items-center justify-center rounded-[2rem] bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-primary mb-6 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:border-primary/40 transition-all duration-300 relative">
                    <j.Icon size={32} strokeWidth={1.5} className="relative z-10" />
                    {/* Glowing pulse behind icon */}
                    <div className="absolute inset-0 bg-primary/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h4 className="font-bold text-foreground text-lg mb-1">{j.title}</h4>
                  <p className="text-muted text-sm font-medium">{j.note}</p>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>

          <Reveal className="mt-16 bg-primary/5 border border-primary/20 rounded-[2rem] p-8 md:p-10 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/20 blur-[50px]" />
            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed relative z-10">
              A Zypp rider today is where a Zepto kirana partner was in 2020. The platform unlocked their potential.
              Now the platform is getting smarter — and so are they. That's the <strong className="font-black text-primary">HustleOS flywheel.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-slate-900 overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #00BC84 0%, transparent 60%)" }} />
        <Reveal className="relative z-10 container mx-auto px-4 max-w-3xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-black uppercase tracking-widest mb-6 backdrop-blur-md">
            Join the Ecosystem
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Be Part of the Gig OS Story.</h2>
          <p className="text-xl text-white/70 mb-10 leading-relaxed">
            Investor, partner, or rider — there's a place for you in the HustleOS ecosystem. Join us in building the largest infrastructure for India's workforce.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/riders" className="px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/30">
              Start as a Rider
            </Link>
            <Link href="/investors" className="px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg border border-white/20 hover:bg-white/20 hover:scale-105 transition-all backdrop-blur-md">
              Invest in Zypp
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

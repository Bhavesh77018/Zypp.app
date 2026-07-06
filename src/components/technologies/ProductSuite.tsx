"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import {
  Smartphone, Wrench, LayoutDashboard, Globe2, Building2, Users, PackageSearch, Brain,
  type LucideIcon,
} from "lucide-react";

// Zypp's complete app & software portfolio — every tool that runs the fleet,
// from the rider's pocket to the boardroom dashboard.
type Product = {
  Icon: LucideIcon;
  name: string;
  audience: string;
  desc: string;
  tone: "green" | "blue" | "violet" | "amber";
  screens?: string[];
  badge?: string;
};

const PRODUCTS: Product[] = [
  {
    Icon: Smartphone,
    name: "Zypp Pilot App",
    audience: "For Riders",
    desc: "The rider's daily companion — live earnings, wallet & payouts, KYC, client mapping, nearest battery-swap stations, and 24/7 support. 4.7★ on the Play Store with 2.5L+ riders.",
    tone: "green",
    screens: ["/media/app-screen-5.png", "/media/app-screen-3.png"],
    badge: "4.7★ · 2.5L+ riders",
  },
  {
    Icon: Wrench,
    name: "Fleet App (Mechanics)",
    audience: "For Field Ops",
    desc: "The field team's toolkit — maintenance logging, inspection checklists, spare-part requests and 20-minute breakdown response coordination across 21 hubs and 400 technicians.",
    tone: "amber",
  },
  {
    Icon: Users,
    name: "TL / Sales App",
    audience: "For Team Leads",
    desc: "Team Leads manage rider squads on the ground — attendance, allocation, escalations and daily targets. The layer that keeps 26,000+ EVs matched to riders every morning.",
    tone: "green",
  },
  {
    Icon: PackageSearch,
    name: "Sourcing App",
    audience: "For Supply",
    desc: "Rider acquisition engine — lead capture, document collection, onboarding pipeline and hub assignment. Built to scale onboarding from 2,000 to 5,000 EVs a month.",
    tone: "blue",
  },
  {
    Icon: LayoutDashboard,
    name: "Zypp 360 Dashboard",
    audience: "Internal Command",
    desc: "The complete company cockpit — fleet health, city P&L, rider cohorts, battery-swap network and real-time MIS in one place. Every Zypp decision starts on this screen.",
    tone: "violet",
  },
  {
    Icon: Globe2,
    name: "FleetEase.ai Dashboard",
    audience: "B2B SaaS",
    desc: "Our internal fleet OS, productised — real-time tracking, AI predictive maintenance, automated dispatch and per-vehicle P&L for any EV fleet operator. 30K+ EVs already run on it.",
    tone: "blue",
    badge: "9+ enterprise clients",
  },
  {
    Icon: Building2,
    name: "FleetEase for Business",
    audience: "For SMBs",
    desc: "The same fleet intelligence, sized for individual businesses — manage 5 or 50 vehicles with simple per-EV pricing, mobile-first field tools and zero setup overhead.",
    tone: "green",
  },
  {
    Icon: Brain,
    name: "HustleOS Score",
    audience: "For the World",
    desc: "A rider-behaviour score built from ride data — reliability, safety, earnings consistency. The Zypp CIBIL that unlocks formal credit at 10–12% instead of a moneylender's 36%.",
    tone: "violet",
    badge: "Building",
  },
];

const TONES = {
  green: { chip: "bg-primary/10 text-primary border-primary/20", icon: "bg-primary/10 text-primary" },
  blue: { chip: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: "bg-blue-500/10 text-blue-500" },
  violet: { chip: "bg-violet-500/10 text-violet-500 border-violet-500/20", icon: "bg-violet-500/10 text-violet-500" },
  amber: { chip: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: "bg-amber-500/10 text-amber-600" },
};

export default function ProductSuite() {
  const [hero, ...rest] = PRODUCTS;

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-900 border-y border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal className="text-center mb-14">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Our Products</div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground">One Stack. Eight Products.</h2>
          <p className="text-muted text-lg mt-4 max-w-2xl mx-auto">
            Every layer of the gig economy runs on software we build in-house — from the rider&apos;s pocket to the
            enterprise dashboard, and soon a rider score for the world.
          </p>
        </Reveal>

        {/* Hero product — Zypp Pilot App with real screens */}
        <Reveal className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center bg-white dark:bg-slate-950 border border-border rounded-3xl p-8 md:p-10 overflow-hidden relative">
            <div className="absolute -right-20 -top-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${TONES[hero.tone].icon}`}><hero.Icon size={22} /></span>
                <span className={`text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${TONES[hero.tone].chip}`}>{hero.audience}</span>
                {hero.badge && <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-primary text-white">{hero.badge}</span>}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3">{hero.name}</h3>
              <p className="text-muted leading-relaxed max-w-lg">{hero.desc}</p>
            </div>
            <div className="relative flex justify-center gap-4">
              {(hero.screens ?? []).map((s, i) => (
                <motion.div
                  key={s}
                  whileHover={{ y: -6 }}
                  className={`w-[150px] md:w-[170px] rounded-2xl overflow-hidden shadow-xl border border-border ${i === 1 ? "translate-y-5" : ""}`}
                >
                  <Image src={s} alt={`${hero.name} screen`} width={270} height={480} className="w-full h-auto" />
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Remaining products */}
        <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((p) => (
            <RevealItem key={p.name}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative h-full bg-white dark:bg-slate-950 border border-border rounded-2xl p-6 overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute -right-10 -top-10 w-28 h-28 bg-primary/0 group-hover:bg-primary/10 blur-2xl rounded-full transition-colors duration-500" />
                <div className="flex items-center justify-between mb-4">
                  <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${TONES[p.tone].icon}`}><p.Icon size={21} /></span>
                  {p.badge && <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border border-amber-300/40">{p.badge}</span>}
                </div>
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border mb-2 ${TONES[p.tone].chip}`}>{p.audience}</span>
                <h3 className="font-bold text-foreground mb-2">{p.name}</h3>
                <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
              </motion.div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

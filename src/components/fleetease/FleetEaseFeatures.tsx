"use client";
import { motion } from "framer-motion";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { getDefaults } from "@/lib/content";
import {
  BarChart3, BrainCircuit, Cable, Check, MapPin, Network,
  PackageSearch, Route, Smartphone, UserRound, type LucideIcon,
} from "lucide-react";
import Link from "next/link";

type Stat = { val: string; label: string };
type Module = { icon: string; title: string; desc: string };
type Plan = { name: string; highlight: boolean; features: string };

const fe = getDefaults("fleetease") as Record<string, Record<string, unknown>>;
const STATS = ((fe.statsBar?.stats ?? []) as Stat[]);
const MODULES = ((fe.modules?.items ?? []) as Module[]);
const PLANS = ((fe.pricing?.items ?? []) as Plan[]);

const DEPLOYMENT_COPY: Record<string, string> = {
  Starter: "Core visibility for operators moving from spreadsheets and disconnected trackers.",
  Growth: "Connected maintenance, dispatch and reporting for expanding multi-team fleets.",
  Enterprise: "Configurable integrations, controls and implementation support for complex networks.",
};

const CLIENTS = ["Yulu", "MoEVing", "Battery Smart", "Zypp", "+ 6 more operators"];

function moduleIcon(title: string): LucideIcon {
  if (title.includes("Real-Time Fleet")) return MapPin;
  if (title.includes("Predictive")) return BrainCircuit;
  if (title.includes("Rider")) return UserRound;
  if (title.includes("Dispatch")) return Route;
  if (title.includes("Spare Parts")) return PackageSearch;
  if (title.includes("Financial")) return BarChart3;
  if (title.includes("API")) return Cable;
  if (title.includes("Mobile")) return Smartphone;
  return Network;
}

export default function FleetEaseFeatures() {
  return (
    <>
      {/* Stats + client logos */}
      <section className="py-16 bg-white dark:bg-slate-950 border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <RevealStagger className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
            {STATS.map((s) => (
              <RevealItem key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-br from-primary to-emerald-500 bg-clip-text text-transparent">{s.val}</div>
                <div className="text-xs md:text-sm text-muted mt-1">{s.label}</div>
              </RevealItem>
            ))}
          </RevealStagger>
          <Reveal className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs uppercase tracking-widest text-muted mr-2">Trusted by fleet operators</span>
            {CLIENTS.map((c) => (
              <span key={c} className="px-4 py-2 rounded-full border border-border bg-gray-50 dark:bg-slate-900 text-sm font-bold text-foreground/70">{c}</span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 9 features grid */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Platform Features</div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground">Everything Your Fleet Needs</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULES.map((m) => (
              <RevealItem key={m.title}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative h-full bg-white dark:bg-slate-950 border border-border rounded-2xl p-6 overflow-hidden hover:border-primary/40 transition-colors"
                >
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-primary/0 group-hover:bg-primary/10 blur-2xl rounded-full transition-colors duration-500" />
                  {(() => {
                    const ModuleIcon = moduleIcon(m.title);
                    return <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors"><ModuleIcon size={22} /></div>;
                  })()}
                  <h3 className="font-bold text-foreground mb-2">{m.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{m.desc}</p>
                </motion.div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Deployment paths — commercial details are shared after discovery */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Deployment paths</div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground">Start Focused. Scale Without Rebuilding.</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto mt-4">Choose the operational depth that fits today. FleetEase can expand with your vehicles, hubs, teams and integrations.</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PLANS.map((p) => {
              const feats = (p.features || "").split("\n").filter(Boolean);
              return (
                <RevealItem key={p.name}>
                  <div className={`relative h-full rounded-3xl border p-7 transition-all ${p.highlight ? "border-primary bg-primary/5 shadow-xl shadow-primary/10 md:-translate-y-3" : "border-border bg-gray-50 dark:bg-slate-900"}`}>
                    {p.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-white text-[11px] font-bold uppercase tracking-wide">Recommended</div>}
                    <div className="text-xs font-black uppercase tracking-[0.18em] text-primary mb-3">Deployment scope</div>
                    <div className="text-2xl font-black text-foreground mb-3">{p.name}</div>
                    <div className="text-sm text-muted leading-relaxed mb-6">{DEPLOYMENT_COPY[p.name] ?? "A flexible operating scope configured around your fleet and team."}</div>
                    <ul className="space-y-2.5 mb-7">
                      {feats.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                          <Check size={16} className="text-primary mt-0.5 shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className={`block text-center w-full py-3 rounded-full font-bold transition-colors ${p.highlight ? "bg-primary text-white hover:bg-primary/90" : "border border-border text-foreground hover:bg-gray-100 dark:hover:bg-slate-800"}`}>
                      Discuss deployment
                    </Link>
                  </div>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { Activity, BatteryCharging, MapPin, Wrench, Cpu, Signal } from "lucide-react";

// A futuristic, self-animating "Fleet Command Center" mock dashboard — gives
// FleetEase.ai a live-product feel. All numbers tick on their own.

function useTick(base: number, step: number, ms: number) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const id = setInterval(() => setV((x) => x + Math.round(step * (0.4 + Math.random()))), ms);
    return () => clearInterval(id);
  }, [base, step, ms]);
  return v;
}

const ALERTS = [
  { icon: Wrench, text: "Predictive: Vehicle KA-09 battery cell degradation — service flagged", tone: "amber" },
  { icon: Signal, text: "DL-12 back online after 18-min swap — uptime restored", tone: "green" },
  { icon: BatteryCharging, text: "Hub Koramangala — 42 batteries charged, 8 swapping", tone: "green" },
  { icon: MapPin, text: "Geofence breach cleared — TS-44 re-entered service zone", tone: "green" },
];

function BarRow({ label, pct, delay }: { label: string; pct: number; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-1">
        <span className="text-white/60">{label}</span>
        <span className="text-primary font-bold tabular-nums">{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-400"
          initial={reduce ? false : { width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function FleetCommandCenter() {
  const reduce = useReducedMotion();
  const online = useTick(29614, 3, 1400);
  const swaps = useTick(8421, 5, 1100);
  const km = useTick(1284507, 40, 700);
  const [alertIdx, setAlertIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setAlertIdx((i) => (i + 1) % ALERTS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950" />
      {/* animated grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{ backgroundImage: "linear-gradient(#00bc84 1px,transparent 1px),linear-gradient(90deg,#00bc84 1px,transparent 1px)", backgroundSize: "48px 48px" }}
      />
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <Reveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Live Command Center
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white">One screen. Your entire fleet.</h2>
          <p className="text-white/50 mt-3 max-w-xl mx-auto">Real-time vehicle health, battery, utilisation and AI alerts — refreshed every second across 30,000+ EVs.</p>
        </Reveal>

        <Reveal className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 md:p-7 shadow-2xl">
          {/* top status bar */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-2 text-white/70 text-sm font-semibold">
              <Cpu size={16} className="text-primary" /> FleetEase.ai · Command Center
            </div>
            <div className="flex items-center gap-2 text-[11px] text-primary font-bold uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> All systems operational
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* live counters */}
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
              {[
                { Icon: Activity, label: "Vehicles online", val: online.toLocaleString("en-IN") },
                { Icon: BatteryCharging, label: "Battery swaps today", val: swaps.toLocaleString("en-IN") },
                { Icon: MapPin, label: "Live km tracked", val: km.toLocaleString("en-IN") },
              ].map((c) => (
                <div key={c.label} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <c.Icon size={18} className="text-primary mb-2" />
                  <div className="text-xl md:text-2xl font-black text-white tabular-nums">{c.val}</div>
                  <div className="text-white/50 text-[11px] mt-0.5">{c.label}</div>
                </div>
              ))}
            </div>

            {/* utilisation bars */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col justify-center gap-4">
              <div className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Fleet Health</div>
              <BarRow label="Uptime" pct={96} delay={0.1} />
              <BarRow label="Utilisation" pct={88} delay={0.25} />
              <BarRow label="Battery SoH" pct={92} delay={0.4} />
              <BarRow label="On-time service TAT" pct={94} delay={0.55} />
            </div>

            {/* AI alert feed */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <div className="text-white/70 text-xs font-bold uppercase tracking-wider mb-3">AI Alert Feed</div>
              <div className="relative h-[150px] overflow-hidden">
                <motion.div
                  key={alertIdx}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  {[0, 1, 2].map((off) => {
                    const a = ALERTS[(alertIdx + off) % ALERTS.length];
                    const A = a.icon;
                    return (
                      <div key={off} className={`flex items-start gap-2.5 ${off === 0 ? "opacity-100" : "opacity-50"}`}>
                        <span className={`mt-0.5 shrink-0 ${a.tone === "amber" ? "text-amber-400" : "text-primary"}`}><A size={15} /></span>
                        <span className="text-[12px] leading-snug text-white/75">{a.text}</span>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

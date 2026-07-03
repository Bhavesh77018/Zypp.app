"use client";
import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

type VType = "2W" | "3W";

const CONFIG: Record<VType, { label: string; models: string[]; perScooter: number; roi: number; years: number }> = {
  "2W": { label: "2 Wheeler", models: ["Gogoro Viva Max", "Zypp S1", "Hero Electric", "Okinawa"], perScooter: 85000, roi: 0.59, years: 3 },
  "3W": { label: "3 Wheeler", models: ["Zypp Cargo 3W", "Mahindra Treo", "Piaggio Ape"], perScooter: 250000, roi: 0.51, years: 4 },
};

const COUNTS = [10, 25, 50, 100, 250, 500, 1000];
const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export default function FocoReturnCalculator() {
  const [type, setType] = useState<VType>("2W");
  const [countIdx, setCountIdx] = useState(3); // 100
  const [model, setModel] = useState(0);

  const cfg = CONFIG[type];
  const count = COUNTS[countIdx];
  const totalInvestment = cfg.perScooter * count;
  const totalReturns = Math.round(totalInvestment * (1 + cfg.roi));

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-900 border-y border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal className="text-center mb-12">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Return Calculator</div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground">See Your Returns in Seconds</h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6 items-stretch">
          {/* Inputs */}
          <Reveal className="bg-white dark:bg-slate-950 border border-border rounded-3xl p-6 md:p-8">
            {/* type toggle */}
            <div className="inline-flex rounded-full bg-gray-100 dark:bg-slate-900 p-1 mb-7">
              {(Object.keys(CONFIG) as VType[]).map((t) => (
                <button key={t} onClick={() => { setType(t); setModel(0); }}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${type === t ? "bg-primary text-white" : "text-muted hover:text-foreground"}`}>
                  {CONFIG[t].label}
                </button>
              ))}
            </div>

            {/* model select */}
            <label className="block text-xs font-semibold text-muted uppercase tracking-wide mb-2">Scooter Model</label>
            <select value={model} onChange={(e) => setModel(Number(e.target.value))}
              className="w-full rounded-2xl border border-border bg-gray-50 dark:bg-slate-900 px-4 py-3 text-foreground font-semibold mb-6 outline-none focus:border-primary">
              {cfg.models.map((m, i) => <option key={m} value={i}>{m}</option>)}
            </select>

            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-muted">Per scooter cost</span>
              <span className="text-2xl font-black text-primary">{inr(cfg.perScooter)}</span>
            </div>

            {/* count slider */}
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-muted">Number of Scooters</span>
              <span className="text-primary font-black text-lg">{count}</span>
            </div>
            <input type="range" min={0} max={COUNTS.length - 1} value={countIdx}
              onChange={(e) => setCountIdx(Number(e.target.value))}
              className="w-full accent-primary h-2 cursor-pointer" />
            <div className="flex justify-between text-[11px] text-muted mt-1">
              {COUNTS.map((c) => <span key={c}>{c}</span>)}
            </div>
          </Reveal>

          {/* Results */}
          <Reveal direction="left" className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-8 flex flex-col justify-center">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black text-primary">{Math.round(cfg.roi * 100)}%</span>
              <span className="text-white/60 font-semibold">ROI in {cfg.years} years</span>
            </div>
            <div className="space-y-5">
              <div>
                <div className="text-white/50 text-xs uppercase tracking-wide">Scooter Count</div>
                <div className="text-2xl font-black">{count}</div>
              </div>
              <div>
                <div className="text-white/50 text-xs uppercase tracking-wide">Total Investment</div>
                <div className="text-3xl font-black">{inr(totalInvestment)}</div>
              </div>
              <div>
                <div className="text-primary text-xs uppercase tracking-wide font-bold">Total Returns</div>
                <div className="text-3xl font-black text-primary">{inr(totalReturns)}</div>
              </div>
            </div>
            <Link href="/contact" className="mt-7 text-center w-full py-3.5 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors">
              Invest Now
            </Link>
          </Reveal>
        </div>
        <p className="text-center text-xs text-muted mt-5">Illustrative returns based on Zypp&apos;s fixed-lease FOCO model · actual returns confirmed in your partner agreement.</p>
      </div>
    </section>
  );
}

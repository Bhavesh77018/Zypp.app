"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { getDefaults } from "@/lib/content";

type SavingsContent = {
  heading: string;
  subheading: string;
  petrolPerKm: number;
  evPerKm: number;
  evDailyRental: number;
  workingDays: number;
  savingsLabel: string;
};

const FALLBACK = getDefaults("home").savings as unknown as SavingsContent;

// EV-vs-Petrol monthly cost model (₹). Fuel scales with the rider's activity
// (daily earning is a proxy for distance); the rest are realistic baselines
// drawn from the Zypp savings breakdown. Down Payment is a one-time cost.
function buildRows(dailyEarning: number, workingDays: number, petrolPerKm: number) {
  const kmPerDay = dailyEarning / 20; // ~70 km/day at ₹1,400
  const iceFuel = Math.round(kmPerDay * workingDays * petrolPerKm);
  return [
    { label: "Maintenance", zypp: 335, ice: 750, oneTime: false },
    { label: "EMI / Net Rental", zypp: 3417, ice: 3500, oneTime: false },
    { label: "Fuel", zypp: 0, ice: iceFuel, oneTime: false },
    { label: "Down Payment", zypp: 3590, ice: 15000, oneTime: true },
  ];
}

export default function SavingsCalculator({ content }: { content?: Partial<SavingsContent> }) {
  const c = { ...FALLBACK, ...content };
  const [earning, setEarning] = useState(1400);

  const petrolPerKm = c.petrolPerKm && c.petrolPerKm > 1 ? c.petrolPerKm : 3.1;
  const rows = buildRows(earning, c.workingDays, petrolPerKm);
  const maxVal = Math.max(...rows.flatMap((r) => [r.zypp, r.ice]));
  const monthlySaving = rows.filter((r) => !r.oneTime).reduce((s, r) => s + (r.ice - r.zypp), 0);
  const oneTimeSaving = rows.filter((r) => r.oneTime).reduce((s, r) => s + (r.ice - r.zypp), 0);

  const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

  return (
    <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden" id="calculator">
      {/* Decorative bg glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container relative mx-auto px-4 max-w-6xl z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-widest mb-4">
            EV vs Petrol
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 tracking-tight">{c.heading}</h2>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto">{c.subheading}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200 dark:border-slate-800 rounded-[2rem] p-6 md:p-12 shadow-2xl shadow-primary/5">
          {/* Controls + total */}
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-3xl font-black text-foreground mb-2">Calculate Savings</h3>
              <p className="text-muted text-base mb-8">Move the slider to match your expected daily earning and see the true difference.</p>

              <div className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-2 text-sm font-semibold text-foreground mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary"></span> Monthly · {c.workingDays} working days
              </div>

              <div className="mb-4 flex items-end justify-between">
                <span className="text-sm font-bold text-muted uppercase tracking-wider">Daily Earning</span>
                <span className="text-primary font-black text-3xl">{fmt(earning)}</span>
              </div>
              
              <div className="relative mb-10">
                <input
                  type="range" min={200} max={2000} step={100} value={earning}
                  onChange={(e) => setEarning(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-primary"
                  style={{
                    background: `linear-gradient(to right, #00bc84 ${((earning - 200) / 1800) * 100}%, transparent ${((earning - 200) / 1800) * 100}%)`
                  }}
                />
                <div className="flex justify-between text-xs font-bold text-muted mt-3"><span>₹200</span><span>₹2,000</span></div>
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-primary to-emerald-600 p-8 text-white shadow-xl shadow-primary/20 transform transition-transform hover:-translate-y-1">
              <div className="text-xs font-black opacity-90 uppercase tracking-[0.2em] mb-3">You save with Zypp</div>
              <div className="text-4xl md:text-5xl font-black leading-none mb-4">{fmt(monthlySaving)}<span className="text-xl font-bold opacity-90"> / mo</span></div>
              <div className="inline-flex items-center gap-2 text-sm font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                + {fmt(oneTimeSaving)} saved on down payment
              </div>
            </div>
          </div>

          {/* Grouped bar chart */}
          <div className="bg-white dark:bg-slate-950 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-slate-800 shadow-sm">
            <div className="flex flex-wrap items-center justify-end gap-6 mb-8 text-sm font-bold">
              <span className="inline-flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-full bg-primary shadow-sm shadow-primary/30" /> Zypp EV</span>
              <span className="inline-flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/30" /> ICE Bikes</span>
            </div>

            <div className="grid grid-cols-4 gap-4 md:gap-6 h-[300px] items-end relative">
              {/* Background grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
                {[0, 1, 2, 3, 4].map(i => <div key={i} className="w-full h-px bg-foreground" />)}
              </div>

              {rows.map((r) => {
                const zh = Math.max(5, (r.zypp / maxVal) * 100);
                const ih = Math.max(5, (r.ice / maxVal) * 100);
                const diff = r.ice - r.zypp;
                return (
                  <div key={r.label} className="flex flex-col items-center justify-end h-full relative z-10 group">
                    {diff > 0 && (
                      <div className="absolute -top-8 text-[11px] font-black text-primary bg-primary/10 px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        Save {fmt(diff)}
                      </div>
                    )}
                    <div className="flex items-end justify-center gap-2 w-full h-full">
                      {/* Zypp */}
                      <div className="flex flex-col items-center justify-end h-full flex-1 w-full max-w-[40px]">
                        <span className="text-[10px] md:text-xs font-bold text-foreground mb-2 opacity-0 group-hover:opacity-100 transition-opacity">{fmt(r.zypp)}</span>
                        <motion.div
                          className="w-full rounded-t-xl bg-gradient-to-t from-emerald-600 to-primary shadow-sm"
                          initial={{ height: 0 }} whileInView={{ height: `${zh}%` }} viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                      {/* ICE */}
                      <div className="flex flex-col items-center justify-end h-full flex-1 w-full max-w-[40px]">
                        <span className="text-[10px] md:text-xs font-bold text-amber-600 dark:text-amber-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">{fmt(r.ice)}</span>
                        <motion.div
                          className="w-full rounded-t-xl bg-gradient-to-t from-amber-500 to-amber-400 shadow-sm"
                          initial={{ height: 0 }} whileInView={{ height: `${ih}%` }} viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* category labels */}
            <div className="grid grid-cols-4 gap-4 md:gap-6 mt-6 pt-6 border-t border-gray-100 dark:border-slate-800">
              {rows.map((r) => (
                <div key={r.label} className="text-center text-[11px] md:text-sm font-bold text-muted leading-tight">
                  {r.label}{r.oneTime && <span className="block text-[10px] text-muted/60 mt-0.5 uppercase tracking-wider">one-time</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

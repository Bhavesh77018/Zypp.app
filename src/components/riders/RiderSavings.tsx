"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

type Props = { heading: string; subheading: string; petrolPerKm: number; evPerKm: number; workingDays: number };

export default function RiderSavings({ heading, subheading, petrolPerKm, evPerKm, workingDays }: Props) {
  const [km, setKm] = useState(100);
  const [days, setDays] = useState(workingDays);

  const petrolDaily = Math.round(km * petrolPerKm);
  const evDaily = Math.round(km * evPerKm + 8); // small daily platform/battery base
  const saveDaily = Math.max(0, petrolDaily - evDaily);
  const saveMonthly = saveDaily * days;
  const saveYearly = saveMonthly * 12;
  const maxBar = Math.max(petrolDaily, evDaily, 1);

  return (
    <section id="rider-savings" className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 max-w-5xl">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{heading}</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">{subheading}</p>
        </Reveal>

        <Reveal direction="up" className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Controls + result */}
          <div className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8">
            <div className="mb-7">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500 dark:text-gray-400 font-medium">Distance Covered / Day</span>
                <span className="font-black text-primary">{km} km</span>
              </div>
              <input type="range" min={20} max={200} step={5} value={km} onChange={(e) => setKm(Number(e.target.value))}
                className="w-full accent-primary h-2 cursor-pointer" />
            </div>
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500 dark:text-gray-400 font-medium">Working Days / Month</span>
                <span className="font-black text-primary">{days} days</span>
              </div>
              <input type="range" min={10} max={30} step={1} value={days} onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-primary h-2 cursor-pointer" />
            </div>

            <div className="rounded-2xl bg-primary text-white p-6 text-center">
              <div className="text-sm font-semibold opacity-80 uppercase tracking-wider mb-1">You Save</div>
              <motion.div key={saveDaily} initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="text-5xl font-black leading-none">₹{saveDaily}<span className="text-xl font-bold"> / Day</span></motion.div>
              <div className="text-sm opacity-80 mt-2">≈ ₹{saveMonthly.toLocaleString("en-IN")}/month · ₹{saveYearly.toLocaleString("en-IN")}/year</div>
            </div>
          </div>

          {/* Daily cost comparison */}
          <div className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 flex flex-col">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6">Daily Cost Comparison</h3>
            <div className="grid grid-cols-2 gap-6 flex-1">
              {/* Petrol */}
              <div className="flex flex-col">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Petrol Bike</div>
                <div className="flex-1 flex items-end bg-gray-100 dark:bg-slate-800 rounded-2xl p-3 min-h-[180px]">
                  <motion.div className="w-full rounded-xl bg-gradient-to-t from-red-500 to-red-400 flex items-end justify-center pb-2"
                    animate={{ height: `${(petrolDaily / maxBar) * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 18 }}>
                    <span className="text-white text-xs font-bold">₹{petrolDaily}</span>
                  </motion.div>
                </div>
                <div className="text-center mt-3 text-red-500 font-black">₹{petrolDaily * days}/mo</div>
              </div>
              {/* EV */}
              <div className="flex flex-col">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Zypp EV</div>
                <div className="flex-1 flex items-end bg-gray-100 dark:bg-slate-800 rounded-2xl p-3 min-h-[180px]">
                  <motion.div className="w-full rounded-xl bg-gradient-to-t from-primary to-emerald-400 flex items-end justify-center pb-2"
                    animate={{ height: `${(evDaily / maxBar) * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 18 }}>
                    <span className="text-white text-xs font-bold">₹{evDaily}</span>
                  </motion.div>
                </div>
                <div className="text-center mt-3 text-primary font-black">₹{evDaily * days}/mo</div>
              </div>
            </div>
            <div className="mt-6 text-center text-sm rounded-xl bg-primary/10 text-primary font-bold py-3">
              You Save ₹{saveDaily} Every Day with Zypp EV
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

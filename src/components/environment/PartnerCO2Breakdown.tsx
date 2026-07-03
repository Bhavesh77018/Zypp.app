"use client";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

// CO₂ saved per delivery platform (folder impact data), as animated bars.
const PARTNERS = [
  { name: "Zomato", tons: 78961, color: "#E23744" },
  { name: "Blinkit", tons: 41056, color: "#F9D210" },
  { name: "Zepto", tons: 34543, color: "#8B1FA8" },
  { name: "Porter", tons: 17234, color: "#FFC72C" },
  { name: "Swiggy", tons: 7584, color: "#FF6B00" },
  { name: "Rapido", tons: 6770, color: "#F9C200" },
  { name: "Flipkart", tons: 6087, color: "#2874F0" },
  { name: "BigBasket", tons: 3745, color: "#84B53A" },
];

const MAX = Math.max(...PARTNERS.map((p) => p.tons));

export default function PartnerCO2Breakdown() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
      <div className="container mx-auto px-4 max-w-4xl">
        <Reveal className="mb-12">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Partner Impact</div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">CO₂ Saved, by Platform.</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
            Every Zypp delivery for India&apos;s top platforms is carbon-zero. Here&apos;s the tonnage of CO₂ each has avoided by riding electric.
          </p>
        </Reveal>

        <div className="flex flex-col gap-5">
          {PARTNERS.map((p, i) => (
            <Reveal key={p.name} className="flex items-center gap-4">
              <div className="w-24 shrink-0 text-sm font-bold text-gray-900 dark:text-white text-right">{p.name}</div>
              <div className="flex-1 h-9 rounded-lg bg-gray-200/60 dark:bg-slate-800 overflow-hidden relative">
                <motion.div
                  className="h-full rounded-lg flex items-center justify-end pr-3"
                  style={{ backgroundColor: p.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(p.tons / MAX) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: i * 0.08, ease: "easeOut" }}
                >
                  <span className="text-xs font-black text-white drop-shadow whitespace-nowrap">{p.tons.toLocaleString("en-IN")} T</span>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-6">Tonnes of CO₂ saved versus equivalent petrol deliveries · cumulative to date.</p>
      </div>
    </section>
  );
}

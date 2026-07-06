"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { CheckCircle2, Circle, Star } from "lucide-react";

export type Milestone = {
  year: string;
  title: string;
  desc: string;
  highlight?: boolean;
};

// Hard-coded complete journey data (used as fallback and enrichment)
const JOURNEY: Milestone[] = [
  {
    year: "2017",
    title: "The Spark — Jaipur",
    desc: "Akash Gupta starts with a bicycle-sharing idea in Jaipur. The market says no. The first pivot begins.",
  },
  {
    year: "2018–19",
    title: "Pivots 1–8 — Finding the Market",
    desc: "B2C cycles, e-bikes, corporate campuses, delivery logistics. Each pivot teaches something. Nothing sticks yet.",
  },
  {
    year: "2020",
    title: "COVID + EV Pivot — The Breakthrough",
    desc: "The pandemic accelerates quick commerce. Zypp pivots to EV-powered last-mile delivery. First 100 EVs deployed in Delhi. This one sticks.",
    highlight: true,
  },
  {
    year: "2021–22",
    title: "Series A + Scale — 3 Cities",
    desc: "Raised Series A. Expanded to Bangalore and Hyderabad. Built the hub-and-spoke operations model. Hit 3,000 EVs.",
  },
  {
    year: "2023",
    title: "B2C Shift + FleetEase Launch",
    desc: "Shifted from B2B2C to direct B2C model. Launched FleetEase.ai as a standalone SaaS product. Hit 10,000 EVs.",
  },
  {
    year: "2024",
    title: "Gen3 Fleet + EBITDA Positive",
    desc: "Launched Gen3 battery-swapping fleet — the most efficient cohort in company history. Turned EBITDA positive in July 2025. Hit 20,000+ EVs.",
    highlight: true,
  },
  {
    year: "2025–26",
    title: "Pre-IPO + 26,000 EVs + 8 Cities",
    desc: "EBITDA +10.08%. NRR ₹243 Cr (+92% YoY). Gen3 cohort PAT positive. Franchise expansion. IPO bankers appointed. Pre-IPO round open.",
    highlight: true,
  },
  {
    year: "FY28",
    title: "IPO — India's Gig Economy Goes Public",
    desc: "Target listing on Indian stock exchanges. The story that goes public: India's first gig economy operating system.",
    highlight: true,
  },
];

const STATUS_COLORS: Record<number, { dot: string; line: string; year: string; card: string; badge: string }> = {};

function getStyle(m: Milestone, isLast: boolean) {
  if (m.year === "FY28") {
    return {
      dot: "bg-amber-400 shadow-amber-400/50",
      year: "text-amber-400",
      card: "border-amber-400/30 bg-amber-500/5",
      badge: "bg-amber-400/10 text-amber-400 border-amber-400/20",
      icon: <Star size={18} className="text-amber-400" fill="currentColor" />,
    };
  }
  if (m.highlight) {
    return {
      dot: "bg-primary shadow-primary/50",
      year: "text-primary",
      card: "border-primary/30 bg-primary/5",
      badge: "bg-primary/10 text-primary border-primary/20",
      icon: <CheckCircle2 size={18} className="text-primary" />,
    };
  }
  return {
    dot: "bg-gray-400 dark:bg-slate-600 shadow-gray-400/30",
    year: "text-gray-500 dark:text-gray-400",
    card: "border-gray-200 dark:border-slate-700",
    badge: "",
    icon: <Circle size={18} className="text-gray-400" />,
  };
}

export default function AboutTimelineSVG({ milestones = [] }: { milestones?: Milestone[] }) {
  // Scroll-drawn spine: the green line grows as the reader travels the journey.
  const spineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: spineRef, offset: ["start 0.75", "end 0.55"] });
  const spine = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  // Merge CMS data with fallback
  const items: Milestone[] = milestones.length > 0 ? milestones : JOURNEY;

  // Enrich items from JOURNEY fallback for highlight flags
  const enriched = items.map((item) => {
    const match = JOURNEY.find((j) => j.year === item.year);
    return { ...item, highlight: match?.highlight ?? item.highlight };
  });

  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
      <div className="container mx-auto px-4 max-w-3xl">
        <Reveal className="mb-14">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Our Journey</div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
            From Jaipur <span className="text-primary">to India.</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
            8 years. 22 pivots. One mission. The story of building India&apos;s largest EV gig logistics network.
          </p>
        </Reveal>

        {/* Legend */}
        <Reveal className="mb-10">
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Circle size={14} className="text-gray-400" /> Milestone
            </span>
            <span className="inline-flex items-center gap-2 text-primary">
              <CheckCircle2 size={14} className="text-primary" /> Key Achievement
            </span>
            <span className="inline-flex items-center gap-2 text-amber-500">
              <Star size={14} className="text-amber-400" fill="currentColor" /> IPO Target
            </span>
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative" ref={spineRef}>
          {/* Vertical line — grey base + scroll-drawn green progress */}
          <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-slate-700 rounded-full" />
          <motion.div
            className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-primary to-amber-400 rounded-full origin-top"
            style={{ scaleY: spine }}
          />

          <div className="flex flex-col gap-0">
            {enriched.map((m, i) => {
              const style = getStyle(m, i === enriched.length - 1);
              const isLast = i === enriched.length - 1;

              return (
                <Reveal key={m.year} delay={i * 0.07}>
                  <motion.div
                    className={`relative flex gap-6 ${!isLast ? "pb-8" : ""}`}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Dot */}
                    <div className="shrink-0 mt-1.5">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-4 border-gray-50 dark:border-slate-900 ${style.dot}`}>
                        {style.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 bg-white dark:bg-slate-950 border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 ${style.card}`}>
                      {/* Year badge */}
                      <div className={`inline-block text-xs font-black uppercase tracking-widest mb-3 px-3 py-1 rounded-full border ${style.badge || "bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-400 border-transparent"}`}>
                        {m.year}
                      </div>

                      <h3 className={`text-lg font-black mb-2 leading-snug ${
                        m.year === "FY28" ? "text-amber-500" :
                        m.highlight ? "text-gray-900 dark:text-white" :
                        "text-gray-900 dark:text-white"
                      }`}>
                        {m.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{m.desc}</p>

                      {/* Special callout for FY28 */}
                      {m.year === "FY28" && (
                        <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-amber-500 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full">
                          <Star size={12} fill="currentColor" /> Pre-IPO Round Currently Open
                        </div>
                      )}
                      {/* Special callout for 2025-26 */}
                      {m.year === "2025–26" && (
                        <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
                          <CheckCircle2 size={12} /> EBITDA Positive · Pre-IPO Phase
                        </div>
                      )}
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

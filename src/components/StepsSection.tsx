"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { Smartphone, ClipboardCheck, Bike, Wallet, CircleCheck, type LucideIcon } from "lucide-react";

export type Step = { step?: string; title: string; desc: string };

const DEFAULT_ICONS: LucideIcon[] = [Smartphone, ClipboardCheck, Bike, Wallet, CircleCheck];

/**
 * Shared, premium "process / registration" steps section. Animated flowing
 * connector line, gradient numbered tiles with icons, hover-lift cards.
 * Used across rider/service/partner pages so the step UX is consistent.
 */
export default function StepsSection({
  eyebrow,
  heading,
  highlight,
  subheading,
  steps,
  icons,
  className = "py-24 bg-white dark:bg-slate-950",
}: {
  eyebrow?: string;
  heading: string;
  highlight?: string;
  subheading?: string;
  steps: Step[];
  icons?: LucideIcon[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const iconSet = icons ?? DEFAULT_ICONS;

  return (
    <section className={className}>
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal className="text-center mb-16">
          {eyebrow && <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">{eyebrow}</div>}
          <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">
            {heading} {highlight && <span className="text-primary">{highlight}</span>}
          </h2>
          {subheading && <p className="text-muted text-lg mt-4 max-w-2xl mx-auto leading-relaxed">{subheading}</p>}
        </Reveal>

        <div className="relative">
          {/* Animated flowing connector (desktop) */}
          <svg
            className="hidden lg:block absolute top-10 left-[12.5%] w-3/4 h-3 -translate-y-1/2 overflow-visible"
            viewBox="0 0 1000 6" preserveAspectRatio="none" aria-hidden="true"
          >
            <line x1="0" y1="3" x2="1000" y2="3" stroke="currentColor" className="text-primary/15" strokeWidth="2" />
            <motion.line
              x1="0" y1="3" x2="1000" y2="3" stroke="currentColor" className="text-primary"
              strokeWidth="2" strokeLinecap="round" strokeDasharray="14 12"
              initial={reduce ? undefined : { strokeDashoffset: 0 }}
              animate={reduce ? undefined : { strokeDashoffset: -52 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => {
              const Icon = iconSet[i % iconSet.length];
              return (
                <RevealItem key={s.title}>
                  <motion.div
                    whileHover={reduce ? undefined : { y: -6 }}
                    className="group relative h-full bg-gray-50 dark:bg-slate-900 border border-border rounded-3xl p-6 text-center hover:border-primary/40 hover:shadow-xl transition-all duration-300"
                  >
                    {/* number tile */}
                    <div className="relative mx-auto mb-5 w-16 h-16">
                      <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-md group-hover:bg-primary/40 transition-colors" />
                      <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary to-emerald-600 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                        {s.step ?? String(i + 1).padStart(2, "0")}
                      </div>
                      {/* icon badge */}
                      <span className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-white dark:bg-slate-950 border border-border flex items-center justify-center text-primary shadow-sm">
                        <Icon size={16} strokeWidth={2.2} />
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
                  </motion.div>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}

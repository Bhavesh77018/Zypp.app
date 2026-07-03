"use client";
import { useEffect, useState } from "react";
import { Icon3D } from "@/components/Icon3D";
import { Reveal } from "@/components/motion/Reveal";
import { getDefaults } from "@/lib/content";

type WhyContent = {
  heading: string;
  subheading: string;
  centerValue: string;
  centerLabel: string;
  orbit: { value: string; label: string }[];
  features: { icon: string; title: string; desc: string }[];
};

const FALLBACK = getDefaults("home").whyZypp as unknown as WhyContent;

export default function WhyZyppSection({ content }: { content?: Partial<WhyContent> }) {
  const c = { ...FALLBACK, ...content };
  const [rotation, setRotation] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setRotation((r) => (r + 0.3) % 360), 50);
    return () => clearInterval(id);
  }, []);

  const orbit = c.orbit ?? [];

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{c.heading}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">{c.subheading}</p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Orbital animation */}
          <div className="flex justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20" />
              <div className="absolute inset-8 rounded-full border border-primary/10" />

              <div className="absolute inset-[25%] rounded-full bg-gradient-to-br from-primary to-emerald-500 flex flex-col items-center justify-center text-white shadow-2xl shadow-primary/40 text-center px-2">
                <div className="text-2xl font-black">{c.centerValue}</div>
                <div className="text-xs font-semibold opacity-80 leading-tight">{c.centerLabel}</div>
              </div>

              {orbit.map(({ label, value }, i) => {
                const angle = (360 / orbit.length) * i;
                const rad = ((angle + rotation) * Math.PI) / 180;
                const x = 50 + 44 * Math.cos(rad);
                const y = 50 + 44 * Math.sin(rad);
                return (
                  <div
                    key={label}
                    className="absolute bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl px-3 py-2 shadow-md -translate-x-1/2 -translate-y-1/2 text-center whitespace-nowrap"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div className="text-sm font-black text-primary">{value}</div>
                    <div className="text-[10px] text-gray-400 leading-tight">{label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(c.features ?? []).map(({ icon, title, desc }) => (
              <div key={title} className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                <Icon3D glyph={icon} size={48} className="mb-3" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

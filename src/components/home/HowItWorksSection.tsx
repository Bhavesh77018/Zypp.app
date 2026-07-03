"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { getDefaults } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { QrCode, Smartphone } from "lucide-react";

type HowContent = {
  badge: string;
  heading: string;
  subheading: string;
  steps: { step: string; icon: string; title: string; desc: string }[];
};

const FALLBACK = getDefaults("home").howItWorks as unknown as HowContent;

const APP_SCREENS = [
  "/media/app-screen-1.png",
  "/media/app-screen-2.png",
  "/media/app-screen-3.png",
  "/media/app-screen-4.png",
];

function StepItem({
  step,
  index,
  setActiveStep,
}: {
  step: HowContent["steps"][0];
  index: number;
  setActiveStep: (idx: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger when the item reaches the middle of the viewport
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveStep(index);
    }
  }, [isInView, index, setActiveStep]);

  return (
    <div ref={ref} className={`relative flex flex-col py-16 md:py-32 transition-all duration-500 ${isInView ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-4"}`}>
      <div className="flex items-start gap-6 lg:gap-8">
        <div className="shrink-0 mt-1">
          <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-emerald-600 text-white font-black text-xl lg:text-2xl rounded-full flex items-center justify-center shadow-xl shadow-primary/30">
            {step.step}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl lg:text-4xl font-extrabold text-foreground mb-4">{step.title}</h3>
          <p className="text-lg lg:text-xl text-muted leading-relaxed">{step.desc}</p>
        </div>
      </div>

    </div>
  );
}

export default function HowItWorksSection({ content }: { content?: Partial<HowContent> }) {
  const c = { ...FALLBACK, ...content };
  const steps = c.steps ?? [];
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-900 border-y border-border">
      <div className="container mx-auto px-4 max-w-7xl">
        <Reveal className="text-center mb-16 lg:mb-24">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 border border-primary/20 uppercase tracking-widest">
            {c.badge}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 tracking-tight">{c.heading}</h2>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">{c.subheading}</p>
        </Reveal>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 lg:gap-24 relative">
          
          {/* Sticky Media Container (Both Mobile & Desktop) */}
          <div className="sticky top-[72px] lg:top-32 z-20 w-full h-[45vh] lg:h-[calc(100vh-16rem)] min-h-[350px] lg:min-h-[600px] flex items-center justify-center bg-gray-50/95 dark:bg-slate-900/95 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none border-b border-border/50 lg:border-none pt-4 lg:pt-0">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full hidden lg:block" />
            
            <div className="relative w-full max-w-[200px] lg:max-w-[320px] aspect-[9/19.5] rounded-[2.5rem] lg:rounded-[3rem] border-[8px] lg:border-[12px] border-slate-900 dark:border-black bg-slate-900 shadow-2xl overflow-hidden ring-1 ring-border/50">
              {/* Hardware Notch / Dynamic Island */}
              <div className="absolute top-1 lg:top-2 inset-x-0 h-5 lg:h-7 bg-slate-900 rounded-full w-20 lg:w-28 mx-auto z-20 flex items-center justify-end px-2 lg:px-3">
                  <div className="w-3 h-3 rounded-full bg-slate-800/80 border border-white/10" />
                </div>

                {/* Screen Content */}
                <div className="relative w-full h-full bg-slate-900">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={APP_SCREENS[activeStep % APP_SCREENS.length]}
                      alt={steps[activeStep]?.title ?? "App Screen"}
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Scrolling Right: Steps and CTA */}
          <div className="flex flex-col relative z-10 pb-16 lg:pb-32 px-4 lg:px-0 pt-8 lg:pt-0">
            {/* The list of steps */}
            <div className="flex flex-col">
              {steps.map((s, idx) => (
                <StepItem
                  key={s.step}
                  step={s}
                  index={idx}
                  setActiveStep={setActiveStep}
                />
              ))}
            </div>

            {/* App Download CTA Card */}
            <Reveal className="mt-12 bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-6 shadow-inner border border-primary/20">
                    <Smartphone size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-black text-foreground mb-4 leading-tight">Get the <span className="text-primary">Zypp Pilot</span> App</h3>
                  <p className="text-muted text-lg mb-8">Start your journey today. Download the app, complete KYC, and you could be earning within 24 hours.</p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3.5 rounded-xl font-bold flex flex-col items-center leading-none hover:scale-105 transition-transform shadow-lg">
                      <span className="text-[10px] uppercase font-semibold tracking-wider opacity-80 mb-0.5">Download on the</span>
                      <span className="text-lg">App Store</span>
                    </button>
                    <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3.5 rounded-xl font-bold flex flex-col items-center leading-none hover:scale-105 transition-transform shadow-lg">
                      <span className="text-[10px] uppercase font-semibold tracking-wider opacity-80 mb-0.5">Get it on</span>
                      <span className="text-lg">Google Play</span>
                    </button>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col items-center gap-3">
                  <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm relative group overflow-hidden">
                    {/* Simulated QR Code using a grid of blocks and the Lucide icon */}
                    <div className="w-32 h-32 relative flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-lg">
                       <QrCode size={80} className="text-slate-800" strokeWidth={1} />
                       {/* Scanner laser animation */}
                       <div className="absolute inset-x-0 top-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(0,188,132,0.8)] opacity-0 group-hover:opacity-100 group-hover:animate-[scan_2s_ease-in-out_infinite]" />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-muted uppercase tracking-widest">Scan to Download</span>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0%, 100% { top: 5%; }
          50% { top: 95%; }
        }
      `}} />
    </section>
  );
}

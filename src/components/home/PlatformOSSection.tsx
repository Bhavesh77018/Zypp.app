import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { iconFor } from "@/components/icons/iconMap";
import {
  Bike, CreditCard, Bot, GraduationCap, Home,
} from "lucide-react";

// Content sourced from the Zypp "Gig Economy OS" narrative — the five layers
// of the platform, rendered in our design language (not the source's dark theme).
type Layer = { icon: string; title: string; desc: string; status: "Live" | "Building" | "Roadmap" };

// Direct icon mapping for this section for reliability
const LAYER_ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  "🛵": Bike,
  "💳": CreditCard,
  "🤖": Bot,
  "🎓": GraduationCap,
  "🏠": Home,
};

const LAYERS: Layer[] = [
  { icon: "🛵", title: "Mobility", desc: "High-speed EVs. 96% uptime. Zero downpayment. Save ₹5,100+/month vs petrol.", status: "Live" },
  { icon: "💳", title: "Financial Identity", desc: "Zypp CIBIL score. Credit at 10–12% vs moneylender 36%. Bank account, SIP, insurance.", status: "Building" },
  { icon: "🤖", title: "AI HustleOS", desc: "Earnings optimiser and surge predictor — the same class of AI Zepto uses, in the rider's pocket.", status: "Roadmap" },
  { icon: "🎓", title: "Community & Skills", desc: "Zypp Academy. A 2.5 Lakh+ rider community and the Gig Ki Awaaz network.", status: "Building" },
  { icon: "🏠", title: "Urban Living", desc: "Housing near demand hubs. Cut the daily commute from 2 hours to 20 minutes.", status: "Roadmap" },
];

const STATUS_STYLES: Record<Layer["status"], string> = {
  Live: "bg-primary text-white",
  Building: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border border-amber-300/40",
  Roadmap: "bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-gray-400 border border-gray-200 dark:border-slate-700",
};

export default function PlatformOSSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: narrative */}
          <Reveal>
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">What We Build</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
              Not a Fleet.<br /><span className="text-primary">An OS.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-lg">
              Zypp started with mobility. We are becoming the full operating system for India&apos;s gig economy —
              connecting 100 million gig workers to vehicles, credit, identity, and opportunity.{" "}
              <strong className="text-gray-900 dark:text-white">What Zepto did for kirana, Zypp is doing for gig.</strong>
            </p>
          </Reveal>

          {/* Right: the stack */}
          <RevealStagger className="flex flex-col gap-3">
            {LAYERS.map((l) => {
              const Icon = LAYER_ICONS[l.icon] ?? iconFor(l.icon);
              return (
                <RevealItem key={l.title}>
                  <div className="group flex items-center gap-4 bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
                    <span className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {Icon ? <Icon size={22} strokeWidth={2} /> : null}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white">{l.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug">{l.desc}</p>
                    </div>
                    <span className={`shrink-0 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${STATUS_STYLES[l.status]}`}>
                      {l.status}
                    </span>
                  </div>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}


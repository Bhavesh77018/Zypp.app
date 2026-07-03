import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { Package, Fuel, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// "Three Forces. One Platform." — the macro tailwinds behind Zypp's growth.
// Folder content, rendered in our design language.
const FORCES: { n: string; Icon: LucideIcon; title: string; body: string; accent: string }[] = [
  {
    n: "01",
    Icon: Package,
    title: "Quick Commerce Explosion",
    body: "Blinkit, Zepto and Swiggy Instamart are growing 35–40% annually. Every order needs a rider. Every rider needs a vehicle. Zypp is the supply infrastructure that makes 10-minute delivery possible.",
    accent: "text-primary",
  },
  {
    n: "02",
    Icon: Fuel,
    title: "Fuel Price Surge → EV Pull",
    body: "Petrol crossed ₹105/litre. A petrol bike burns ₹6–8K/month in fuel. A Zypp EV is near-zero. Delivery partners refresh our app waiting for bikes — demand is outrunning supply.",
    accent: "text-amber-500",
  },
  {
    n: "03",
    Icon: TrendingUp,
    title: "The New Middle Class Is Gig",
    body: "A Zypp rider earning ₹35–45K/month is a micro-entrepreneur. 100 million Indians are choosing hustle over heritage. Zypp makes it scalable, safe, and financially upward.",
    accent: "text-blue-500",
  },
];

export default function TailwindsSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <Reveal className="mb-12">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">The Tailwinds</div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
            Three Forces. <span className="text-primary">One Platform.</span>
          </h2>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FORCES.map((f) => (
            <RevealItem key={f.n}>
              <div className="h-full bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 hover:border-primary/30">
                <div className="flex items-center justify-between mb-5">
                  <span className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-slate-900 ${f.accent}`}>
                    <f.Icon size={22} strokeWidth={2} />
                  </span>
                  <span className={`text-5xl font-black opacity-15 ${f.accent}`}>{f.n}</span>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${f.accent}`}>{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}


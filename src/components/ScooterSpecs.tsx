import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Gauge, BatteryCharging, MapPin, ShieldCheck, Zap, Wrench, type LucideIcon } from "lucide-react";

// Your Zypp EV — the machine + the swap network, shared on both plan pages.
const SPECS: { Icon: LucideIcon; n: string; l: string; d: string }[] = [
  { Icon: MapPin, n: "60–100 km", l: "Range per charge", d: "Enough for a full delivery day across models — Yulu Miracle, Zypp S1 and Zypp Pro." },
  { Icon: Gauge, n: "25–55 kmph", l: "Top speed", d: "City-tuned speeds — from license-free 25 kmph models to high-speed variants." },
  { Icon: BatteryCharging, n: "< 2 min", l: "Battery swap time", d: "Swap a depleted battery for a charged one — faster than filling petrol." },
  { Icon: Zap, n: "Unlimited", l: "Swaps included", d: "1,500+ swap stations, available every ~5 km in operating zones. No range anxiety, ever." },
  { Icon: Wrench, n: "96%", l: "Fleet uptime", d: "IoT-tracked vehicles with AI predictive maintenance and 20-minute field response." },
  { Icon: ShieldCheck, n: "Included", l: "Insurance & registration", d: "Vehicle registration and insurance handled by Zypp — you just ride." },
];

const MODELS = [
  { name: "Zypp S1", tag: "License-Free · 25 kmph", range: "80 km", payload: "Standard" },
  { name: "Zypp Pro", tag: "Licensed · 45 kmph", range: "100 km", payload: "High" },
  { name: "Yulu Miracle", tag: "License-Free · 25 kmph", range: "60 km", payload: "Standard" },
];

export default function ScooterSpecs({
  className = "py-24 bg-gray-50 dark:bg-slate-900 border-y border-border",
}: { className?: string }) {
  return (
    <section className={className}>
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal className="text-center mb-14">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Your Zypp EV</div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground">Built for the Delivery Day.</h2>
          <p className="text-muted text-lg mt-4 max-w-2xl mx-auto">
            Swappable-battery electric scooters backed by India&apos;s largest swap network — specs that keep you earning, not waiting.
          </p>
        </Reveal>

        {/* Hero layout: image + model cards */}
        <Reveal className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white dark:bg-slate-950 border border-border rounded-3xl overflow-hidden shadow-sm">
            {/* Scooter image */}
            <div className="relative bg-gradient-to-br from-primary/5 via-emerald-50/50 to-white dark:from-primary/10 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-8 min-h-[280px]">
              {/* Decorative glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
              </div>
              <div className="relative z-10">
                <Image
                  src="/media/zypp-scooter-2w.png"
                  alt="Zypp Electric Scooter — swappable battery delivery EV"
                  width={480}
                  height={320}
                  className="object-contain drop-shadow-2xl max-h-[280px] w-auto mx-auto"
                  priority
                />
              </div>
              {/* Floating badge */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-lg shadow-primary/30">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Gen3 Fleet
              </div>
            </div>

            {/* Model cards */}
            <div className="p-8">
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Available Models</div>
              <h3 className="text-2xl font-black text-foreground mb-6">Three Scooters.<br /><span className="text-primary">One Goal: Uptime.</span></h3>
              <div className="flex flex-col gap-3">
                {MODELS.map((m) => (
                  <div key={m.name} className="flex items-center gap-4 bg-gray-50 dark:bg-slate-900 border border-border rounded-2xl px-5 py-4 hover:border-primary/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg shrink-0">🛵</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-foreground">{m.name}</div>
                      <div className="text-xs text-muted mt-0.5">{m.tag}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-black text-primary">{m.range}</div>
                      <div className="text-[10px] text-muted uppercase tracking-wider">range</div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted mt-4">Model availability varies by city · All IoT + GPS enabled · Battery swap in &lt;2 min</p>
            </div>
          </div>
        </Reveal>

        {/* Spec cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SPECS.map((s) => (
            <RevealItem key={s.l}>
              <div className="group h-full bg-white dark:bg-slate-950 border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><s.Icon size={22} /></span>
                <div className="text-2xl font-black text-primary">{s.n}</div>
                <div className="font-bold text-foreground mb-2">{s.l}</div>
                <p className="text-sm text-muted leading-relaxed">{s.d}</p>
              </div>
            </RevealItem>
          ))}
        </div>

        <p className="text-center text-xs text-muted mt-6">Models and speeds vary by city and availability · all vehicles IoT + GPS enabled.</p>
      </div>
    </section>
  );
}

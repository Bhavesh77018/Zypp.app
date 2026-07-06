import Image from "next/image";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Package, Gauge, BatteryCharging, MapPin, Zap, ShieldCheck, type LucideIcon } from "lucide-react";

const LOADER_SPECS: { Icon: LucideIcon; n: string; l: string; d: string }[] = [
  { Icon: Package, n: "250–500 kg", l: "Payload capacity", d: "Carry bulkier orders — groceries, electronics, and large-format deliveries in one trip." },
  { Icon: Gauge, n: "Up to 55 kmph", l: "Top speed", d: "City-legal speeds for both L3 and L5 variants — fast enough to meet SLAs." },
  { Icon: BatteryCharging, n: "100–150 km", l: "Range per charge", d: "Full-day range on a single charge — no range anxiety for intra-city delivery runs." },
  { Icon: Zap, n: "Unlimited", l: "Battery / Charging", d: "Zypp-managed charging infrastructure; never worry about downtime due to battery." },
  { Icon: MapPin, n: "8 Cities", l: "Operational coverage", d: "Delhi NCR, Bangalore, Hyderabad, Mumbai, Pune, Goa, Jaipur, Chandigarh." },
  { Icon: ShieldCheck, n: "Included", l: "Insurance & permits", d: "Third-party and accidental insurance, vehicle registration and road permit — all Zypp managed." },
];

const LOADER_MODELS = [
  {
    name: "L3 Loader",
    tag: "Compact Cargo · Up to 250 kg",
    img: "/media/zypp-loader-l3.png",
    badge: "Urban Delivery",
    badgeColor: "bg-primary",
    range: "100 km",
    payload: "250 kg",
    speed: "45 kmph",
    ideal: "Blinkit · Zepto · BigBasket",
    desc: "Compact, nimble, and perfect for dense urban delivery zones. Ideal for groceries, FMCG, and quick-commerce bulk drops.",
    specs: [
      { label: "Payload", value: "Up to 250 kg" },
      { label: "Range", value: "100 km / charge" },
      { label: "Speed", value: "Up to 45 kmph" },
      { label: "Cargo Volume", value: "~120 L" },
    ],
  },
  {
    name: "L5 Loader",
    tag: "Heavy Cargo · Up to 500 kg",
    img: "/media/zypp-loader-l5.png",
    badge: "Heavy Cargo",
    badgeColor: "bg-amber-500",
    range: "150 km",
    payload: "500 kg",
    speed: "55 kmph",
    ideal: "Flipkart · Amazon · Porter",
    desc: "Built for high-volume and heavyweight deliveries. More space, more payload — the right tool for e-commerce and B2B logistics.",
    specs: [
      { label: "Payload", value: "Up to 500 kg" },
      { label: "Range", value: "150 km / charge" },
      { label: "Speed", value: "Up to 55 kmph" },
      { label: "Cargo Volume", value: "~300 L" },
    ],
  },
];

export default function LoaderSpecs({ className = "py-24 bg-gray-50 dark:bg-slate-900 border-y border-border" }: { className?: string }) {
  return (
    <section className={className}>
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal className="text-center mb-14">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Our Fleet</div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground">
            Two Loaders. <span className="text-primary">Every Load Covered.</span>
          </h2>
          <p className="text-muted text-lg mt-4 max-w-2xl mx-auto">
            Zypp operates both L3 and L5 electric cargo vehicles — zero fuel, zero maintenance, unlimited range within the city.
          </p>
        </Reveal>

        {/* L3 + L5 Model cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          {LOADER_MODELS.map((model) => (
            <RevealItem key={model.name}>
              <div className="h-full bg-white dark:bg-slate-950 border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Vehicle image area */}
                <div className="relative bg-gradient-to-br from-primary/5 via-emerald-50/40 to-white dark:from-primary/10 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-8 min-h-[220px]">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-56 h-56 rounded-full bg-primary/10 blur-3xl" />
                  </div>
                  <Image
                    src={model.img}
                    alt={`Zypp ${model.name} — electric 3-wheeler cargo EV`}
                    width={400}
                    height={260}
                    className="relative z-10 object-contain drop-shadow-xl max-h-[200px] w-auto mx-auto"
                  />
                  {/* Badge */}
                  <div className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${model.badgeColor} text-white text-xs font-bold shadow-lg`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                    {model.badge}
                  </div>
                </div>

                {/* Model info */}
                <div className="p-7">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-black text-foreground">{model.name}</h3>
                    <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mt-1 whitespace-nowrap">{model.tag}</span>
                  </div>
                  <p className="text-muted text-sm leading-relaxed mb-5">{model.desc}</p>

                  {/* Quick specs grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {model.specs.map((s) => (
                      <div key={s.label} className="bg-gray-50 dark:bg-slate-900 border border-border rounded-xl px-4 py-3">
                        <div className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">{s.label}</div>
                        <div className="text-base font-black text-primary">{s.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs text-muted">
                    <span className="font-bold text-foreground">Ideal for:</span> {model.ideal}
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>

        {/* Shared spec cards */}
        <Reveal className="mb-8 text-center">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-2">Platform Specs</div>
          <h3 className="text-2xl md:text-3xl font-black text-foreground">What Every Zypp Loader Comes With.</h3>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LOADER_SPECS.map((s) => (
            <RevealItem key={s.l}>
              <div className="group h-full bg-white dark:bg-slate-950 border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <s.Icon size={22} />
                </span>
                <div className="text-2xl font-black text-primary">{s.n}</div>
                <div className="font-bold text-foreground mb-2">{s.l}</div>
                <p className="text-sm text-muted leading-relaxed">{s.d}</p>
              </div>
            </RevealItem>
          ))}
        </div>
        <p className="text-center text-xs text-muted mt-6">Specs vary by city, model, and operator configuration · All vehicles GPS + IoT enabled.</p>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, MapPin, Home, Bike, Building2 } from "lucide-react";

const DOORS = [
  { icon: Home, label: "Back to Home", desc: "Start from the top", href: "/" },
  { icon: Bike, label: "Earn with Zypp", desc: "Rides, rentals & ownership", href: "/riders" },
  { icon: Building2, label: "For Business", desc: "Fleets, franchise & SaaS", href: "/ev-for-delivery" },
  { icon: MapPin, label: "Find a Hub", desc: "Zypp stations near you", href: "/find-hub" },
];

export default function NotFound() {
  return (
    <section className="relative min-h-[calc(100svh-64px)] flex items-center overflow-hidden bg-slate-900 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 35%, #00BC84 0%, transparent 55%)" }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(0,188,132,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,188,132,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-8 border border-primary/30">
          🛵 Wrong turn
        </div>
        <div className="text-[clamp(5rem,16vw,10rem)] font-black leading-none tracking-[-0.05em] text-white/10 select-none" aria-hidden="true">
          404
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white -mt-4 mb-5">
          This route isn&apos;t on our map<span className="text-primary">.</span>
        </h1>
        <p className="text-lg text-white/60 max-w-xl mx-auto mb-12">
          The page you&apos;re looking for moved, was renamed, or never existed. Pick a road below and we&apos;ll get you back on track.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          {DOORS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.08] hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/15 text-primary group-hover:scale-110 transition-transform">
                <d.icon size={22} />
              </span>
              <span className="font-bold text-white text-sm">{d.label}</span>
              <span className="text-white/50 text-xs">{d.desc}</span>
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
        >
          Can&apos;t find what you need? Contact us <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

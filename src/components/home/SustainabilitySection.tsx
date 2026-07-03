"use client";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import Link from "next/link";
import {
  Building2, Rocket, Briefcase, Zap, Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Investor = { name: string; Icon: LucideIcon; iconClass?: string };

const INVESTORS: Investor[] = [
  { name: "Gruhas", Icon: Building2 },
  { name: "Rocketship VC", Icon: Rocket },
  { name: "Blume Ventures", Icon: Briefcase },
  { name: "Snow Leopard", Icon: Zap },
  { name: "Good Capital", Icon: Wallet },
  { name: "Micelio Fund", Icon: Zap },
];

export default function SustainabilitySection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* CO2 Impact */}
        <div className="bg-gradient-to-br from-primary to-emerald-600 rounded-3xl p-10 md:p-16 text-primary-foreground mb-16 relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-bold mb-4 uppercase tracking-widest">
                Sustainability
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Our Sustainable Journey is Powered by Our Partners
              </h2>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                We&apos;re making every delivery count towards a Zero carbon footprint.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                <div className="text-3xl font-black mb-1">
                  <AnimatedCounter end={197144} suffix=" Ton" />
                </div>
                <div className="text-sm opacity-80">CO₂ Saved</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                <div className="text-3xl font-black mb-1">
                  <AnimatedCounter end={2563756} />
                </div>
                <div className="text-sm opacity-80">Deliveries Completed</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm">
                <div className="text-3xl font-black mb-1">
                  <AnimatedCounter end={20000} suffix="+" />
                </div>
                <div className="text-sm opacity-80">Active EV Riders</div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/environment"
                data-track="Explore Environment"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-primary font-bold hover:bg-white/90 transition-colors shadow-lg"
              >
                Explore our Impact →
              </Link>
            </div>
          </div>
        </div>

        {/* Investors */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">Investors Who Believed in Us</h2>
          <p className="text-muted">Leading venture capitalists backing India&apos;s EV revolution</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INVESTORS.map((inv) => (
            <div key={inv.name} className="bg-card border border-card-border rounded-2xl p-5 flex flex-col items-center gap-2 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-default group">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <inv.Icon size={22} strokeWidth={2} />
              </div>
              <div className="text-xs font-semibold text-muted text-center">{inv.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

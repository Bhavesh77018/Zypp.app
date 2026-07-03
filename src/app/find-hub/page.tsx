import { getCities } from "@/lib/cms";
import FindHub from "@/components/FindHub";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";

export const metadata = {
  title: "Find a Zypp Hub Near You",
  description: "Locate Zypp Electric hubs across India — pick up your EV, swap batteries, and get rider support in your city.",
};

export default function FindHubPage() {
  const cities = getCities();
  const active = cities.filter((c) => c.status === "active").length;
  const hubs = cities.reduce((n, c) => n + c.hubs.length, 0);

  return (
    <div className="w-full bg-gray-50 dark:bg-slate-950 min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[70svh] flex items-center overflow-hidden bg-slate-900 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
        <HeroVideoBackdrop image="/media/life-rider.webp" accent="green" />
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 50% 40%, #00BC84 0%, transparent 55%)" }} />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/30">
            📍 Across India
          </div>
          <h1 className="text-[clamp(2.75rem,6vw,5rem)] font-black leading-[0.98] tracking-[-0.04em] text-white mb-6">Find a Zypp Hub Near You</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Pick up your EV, swap batteries, and get rider support — Zypp is live in {active} cities with {hubs}+ hubs and expanding across India.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <FindHub cities={cities} />
      </section>
    </div>
  );
}

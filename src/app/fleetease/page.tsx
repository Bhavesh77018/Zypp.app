import HeroSection from "@/components/home/HeroSection";
import GetInTouchSection from "@/components/home/GetInTouchSection";
import { Reveal } from "@/components/motion/Reveal";
import FleetNetworkSVG from "@/components/animations/FleetNetworkSVG";
import FleetCommandCenter from "@/components/fleetease/FleetCommandCenter";
import FleetEaseFeatures from "@/components/fleetease/FleetEaseFeatures";
import { getContent } from "@/lib/cms";
import EditorialMediaSection from "@/components/EditorialMediaSection";
import FleetEaseAISection from "@/components/fleetease/FleetEaseAISection";

export const metadata = {
  title: "FleetEase.ai — The EV Fleet OS You Need | Zypp",
  description:
    "Built from running 30,000+ EVs across 8 cities. FleetEase.ai is India's AI-powered EV fleet management platform — real-time tracking, predictive maintenance, automated dispatch.",
};

export default function FleetEasePage() {
  const c = getContent("fleetease");
  const hero = c.hero as Record<string, string>;

  return (
    <div className="w-full bg-background min-h-screen">
      {/* 1. SaaS Landing Hero — real folder content */}
      <HeroSection
        content={{
          bgImage: "",
          badge: hero.badge,
          titleLine1: hero.titleHighlight + hero.titleSuffix,
          titleHighlight: hero.tagline,
          titleLine2: "",
          subtitle: hero.subtitle,
          primaryCtaLabel: hero.primaryCtaLabel,
          primaryCtaLink: "#contact-sales",
          secondaryCtaLabel: hero.secondaryCtaLabel,
          secondaryCtaLink: "#features",
          stats: [],
        }}
      />

      {/* 2. Futuristic live command-center dashboard */}
      <FleetCommandCenter />

      <FleetEaseAISection />

      <EditorialMediaSection
        eyebrow="Built inside live EV operations"
        heading="A fleet OS that understands the field."
        body="FleetEase was shaped around the handoffs that decide uptime: what the control room sees, what the hub assigns, what the mechanic resolves and what the rider needs next. The result is one operating layer instead of disconnected dashboards."
        image="/media/fleet-control.webp"
        imageAlt="FleetEase dashboard used to monitor electric fleet operations"
        caption="Control room visibility connected to field execution"
        ctaLabel="Request a live walkthrough"
        ctaHref="#contact-sales"
        tags={["Control rooms", "Hub teams", "Mechanics", "Riders"]}
        reverse
      />

      {/* 3. Platform network animation */}
      <section id="features" className="relative z-20 bg-slate-950 text-white py-24 mt-24">
        {/* Top/bottom edge gradients for smooth transition if needed */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent" />
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Reveal className="text-center mb-16 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/20 blur-[120px] pointer-events-none rounded-full" />
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-bold uppercase tracking-widest mb-6 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              The Platform
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">One Unified <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Ecosystem</span></h2>
            <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              FleetEase replaces five disconnected tools with a single platform purpose-built for the EV delivery industry.
            </p>
          </Reveal>
          <FleetNetworkSVG />
        </div>
      </section>

      {/* 4. Real stats, client logos, features and deployment paths */}
      <FleetEaseFeatures />

      {/* 4b. Company Fleet Package — apps + master wallet */}
      <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute -top-32 right-0 w-[480px] h-[480px] bg-blue-500/10 rounded-full blur-[110px]" />
        <div className="container relative mx-auto px-4 max-w-6xl">
          <Reveal className="mb-12 text-center">
            <div className="text-sm font-bold text-blue-400 uppercase tracking-[0.2em] mb-3">Run Your Company Fleet on Zypp</div>
            <h2 className="text-3xl md:text-5xl font-black">One Package. <span className="text-blue-400">Apps, Wallet &amp; Control.</span></h2>
            <p className="text-white/55 text-lg mt-4 max-w-2xl mx-auto">
              Hand us your company fleet and get the full Zypp software kit — the same tools that run 30,000+ EVs, branded for your team.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { t: "Rider App", d: "Your riders get the full Pilot experience — earnings, trips, swaps and support, under your fleet." },
              { t: "Mechanic App", d: "Field maintenance logging, inspection checklists and service TATs for your own technicians." },
              { t: "Master Wallet", d: "One company wallet across the fleet — rentals, payouts, deductions and recharges, fully reconciled." },
              { t: "Command Dashboard", d: "Live fleet health, utilisation, per-vehicle P&L and rider analytics on the FleetEase dashboard." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:border-blue-400/40 transition-colors">
                <h3 className="font-black mb-2">{c.t}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <a href="#contact-sales" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600 transition-colors">
              Get the Company Fleet Package
            </a>
          </Reveal>
        </div>
      </section>

      {/* 5. Contact Sales Lead Gen */}
      <div id="contact-sales">
        <GetInTouchSection
          content={{
            eyebrow: "Ready to Scale?",
            heading: "Request a FleetEase.ai Demo",
            subheading: "Tell us about your fleet and our team will walk you through how FleetEase transforms your EV operations — 30-minute live demo.",
          }}
        />
      </div>
    </div>
  );
}

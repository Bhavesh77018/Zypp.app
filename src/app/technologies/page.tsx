import HeroSection from "@/components/home/HeroSection";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import { Icon3D } from "@/components/Icon3D";
import MagneticButton from "@/components/MagneticButton";
import Image from "next/image";
import TechPipelineSVG from "@/components/animations/TechPipelineSVG";
import EditorialMediaSection from "@/components/EditorialMediaSection";
import ScooterSpecificationSection from "@/components/technology/ScooterSpecificationSection";
import ProductTreeSection from "@/components/technology/ProductTreeSection";
import IntelligenceLoopSection from "@/components/technology/IntelligenceLoopSection";
import ProductSuite from "@/components/technologies/ProductSuite";
import TechRealWorldSection from "@/components/technology/TechRealWorldSection";

export const metadata = {
  title: "Zypp Technologies — IoT, AI & Battery Intelligence for EV Fleets",
  description: "The deep-tech stack behind India's largest EV delivery fleet: 4G telematics, predictive maintenance, battery management and the FleetEase operating system.",
};

const OPERATING_LAYERS = [
  { step: "01", title: "Vehicle intelligence", body: "Live telematics, battery signals and asset health create one dependable vehicle record." },
  { step: "02", title: "Predictive operations", body: "Maintenance and utilisation patterns help teams act before downtime becomes a delivery problem." },
  { step: "03", title: "Field workflows", body: "Rider, mechanic and hub actions stay connected to the same operational truth." },
  { step: "04", title: "Business visibility", body: "Dashboards and APIs turn live fleet activity into decisions for operators and partners." },
];

export default function TechnologiesPage() {
  return (
    <div className="w-full bg-background min-h-screen">
      {/* 1. Animated Hero Section */}
      <HeroSection
        content={{
          bgImage: "", // Triggers SVG animated background
          badge: "Zypp Technologies",
          titleLine1: "Powering the Future of",
          titleHighlight: "Delivery with Deep Tech",
          titleLine2: "",
          subtitle: "We don't just rent EVs. We build the intelligence layer that powers India's largest sustainable delivery fleet. Discover the technology driving our IoT ecosystem, AI optimization, and Battery Management Systems.",
          primaryCtaLabel: "Explore FleetEase",
          primaryCtaLink: "/fleetease",
          secondaryCtaLabel: "Contact Tech Team",
          secondaryCtaLink: "/contact",
          stats: [],
        }}
      />

      {/* 2. Core Tech Pillars (Animated Custom SVG Pipeline) */}
      <section className="relative z-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -z-10 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-7xl">
          <Reveal className="text-center mb-10 pt-24">
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
              Our Core Technology Pillars
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              The proprietary hardware and software ecosystem making every delivery smarter, safer, and more efficient.
            </p>
          </Reveal>

          {/* Fully Custom SVG Animation */}
          <TechPipelineSVG />
        </div>
      </section>

      <IntelligenceLoopSection />

      <ScooterSpecificationSection />

      <ProductTreeSection />

      {/* Our Apps & Software — the full 8-product portfolio */}
      <ProductSuite />

      <EditorialMediaSection
        eyebrow="Technology in live operations"
        heading="Every signal should lead to a better decision."
        body="Zypp's technology stack is shaped inside real electric fleet operations. Vehicle health, rider action, service tickets and utilisation data come together so control rooms can see clearly and field teams can move sooner."
        image="/media/zypp-fleet-real.webp"
        imageAlt="Zypp electric scooter at an IndoFast battery-swap station"
        caption="A Zypp EV at a battery-swap station — infrastructure in live operation"
        ctaLabel="See FleetEase in action"
        ctaHref="/fleetease"
        tags={["4G telematics", "Predictive maintenance", "Rider workflows", "Open APIs"]}
      />

      <TechRealWorldSection />

      <section className="py-24 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16 items-end mb-14">
            <div>
              <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">From signal to action</div>
              <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">One stack.<br /><span className="text-primary">Four operating layers.</span></h2>
            </div>
            <p className="text-muted text-lg leading-relaxed">The value is not in collecting more data. It is in connecting the right data to the people who keep the fleet productive.</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {OPERATING_LAYERS.map((layer) => (
              <RevealItem key={layer.step} className="rounded-3xl border border-border bg-white dark:bg-slate-950 p-8 hover:border-primary/35 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="text-xs font-black tracking-[0.2em] text-primary mb-12">{layer.step}</div>
                <h3 className="text-xl font-black text-foreground mb-3">{layer.title}</h3>
                <p className="text-muted leading-relaxed">{layer.body}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* 3. FleetEase Teaser Callout */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <Reveal>
            <div className="relative rounded-[3rem] overflow-hidden p-1 sm:p-1">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-primary to-emerald-400 animate-spin-slow opacity-20" />
              <div className="relative bg-white/10 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/20 dark:border-slate-800 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4 pointer-events-none" />
                
                <div className="flex-1">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-black uppercase tracking-widest mb-6">
                    Our Proprietary OS
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
                    Want this technology for your own fleet?
                  </h2>
                  <p className="text-xl text-muted mb-8 max-w-xl">
                    Meet <strong>FleetEase</strong> — the ultimate Fleet Management OS. We packaged our internal tech stack into a SaaS platform so you can scale, track, and optimize your entire EV fleet from a single dashboard.
                  </p>
                  
                  <MagneticButton href="/fleetease" className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg shadow-xl hover:shadow-cyan-500/30 transition-all">
                    Discover FleetEase
                  </MagneticButton>
                </div>

                <div className="hidden md:block w-[400px] h-[300px] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500">
                  <Image src="/media/zypp-fleetease-real.jpg" fill alt="FleetEase OS Dashboard" className="object-cover" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}

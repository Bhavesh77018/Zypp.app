import Link from "next/link";
import { ArrowRight, Truck, Package, MapPin, Clock, Shield, Zap } from "lucide-react";
import { getContent } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { Icon3D } from "@/components/Icon3D";
import HeroSection from "@/components/home/HeroSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PartnersSection from "@/components/home/PartnersSection";
import FAQSection from "@/components/home/FAQSection";
import GetInTouchSection from "@/components/home/GetInTouchSection";
import GigKiAwaazSection from "@/components/home/GigKiAwaazSection";
import StepsSection from "@/components/StepsSection";
import LoaderSpecs from "@/components/LoaderSpecs";
import StickyMobileCTA from "@/components/StickyMobileCTA";

type Stat = { val: string; label: string };
type Benefit = { icon: string; title: string; desc: string };
type Step = { step: string; title: string; desc: string };

const FALLBACK_STATS: Stat[] = [
  { val: "3W+", label: "Three Wheeler Fleet" },
  { val: "₹40–60K", label: "Avg Monthly Earnings" },
  { val: "8 Cities", label: "Pan-India Coverage" },
  { val: "24/7", label: "Roadside Support" },
];

const FALLBACK_BENEFITS: Benefit[] = [
  { icon: "🛺", title: "High Payload Capacity", desc: "Carry more per trip — maximise your earnings with every delivery run." },
  { icon: "⚡", title: "Zero Fuel Cost", desc: "Full electric powertrain — save ₹8,000+ per month vs diesel alternatives." },
  { icon: "🔧", title: "Zero Maintenance", desc: "Zypp handles all servicing, repairs, and parts — you just drive and earn." },
  { icon: "🛡️", title: "Comprehensive Insurance", desc: "Third-party and accidental insurance coverage included for peace of mind." },
  { icon: "📍", title: "GPS Tracking", desc: "Real-time fleet visibility with in-built GPS for you and your clients." },
  { icon: "💳", title: "Weekly Payouts", desc: "Get paid every week — reliable, on-time income for you and your family." },
];

const FALLBACK_KYC: Step[] = [
  { step: "01", title: "Download App", desc: "Get the Zypp Pilot app on Android or iOS." },
  { step: "02", title: "Submit Documents", desc: "Aadhaar, DL, and vehicle permit — all digital." },
  { step: "03", title: "Get Verified", desc: "Quick KYC review — typically done in 24 hours." },
  { step: "04", title: "Start Delivering", desc: "Pick your route and start earning with any partner." },
];

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Truck, Package, MapPin, Clock, Shield, Zap,
};

export default function ThreeWheelerPage() {
  const c = getContent("3w-Service-Zypp-Pilot");
  const hero = c.hero as Record<string, string>;
  const stats = ((c.statsBar as { stats: Stat[] })?.stats ?? FALLBACK_STATS) as Stat[];
  const benefitsSec = c.benefits as Record<string, unknown>;
  const kycSec = c.kyc as Record<string, unknown>;
  const cta = c.ctaBanner as Record<string, string>;
  const benefits = ((benefitsSec?.items ?? FALLBACK_BENEFITS) as Benefit[]);
  const kyc = ((kycSec?.items ?? FALLBACK_KYC) as Step[]);

  return (
    <div className="w-full bg-background">

      {/* 1. Hero */}
      <HeroSection
        content={{
          bgImage: "",
          badge: hero?.badge ?? "3 Wheeler EV Rentals",
          titleLine1: hero?.titlePrefix ?? "Carry More.",
          titleHighlight: hero?.titleHighlight ?? "Earn More.",
          titleLine2: "",
          subtitle: hero?.subtitle ?? "Zypp's 3-wheelers are built for bulk delivery — more payload, zero fuel cost, and weekly payouts. Join India's fastest-growing EV cargo fleet.",
          primaryCtaLabel: hero?.ctaLabel ?? "Apply for 3W",
          primaryCtaLink: hero?.ctaLink ?? "/contact",
          secondaryCtaLabel: "Learn More",
          secondaryCtaLink: "#benefits",
          stats: [],
        }}
      />

      {/* 2. Stats Strip */}
      <section className="bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800">
        <Reveal>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-slate-800">
              {stats.map((s) => (
                <div key={s.label} className="py-8 px-6 text-center">
                  <div className="text-3xl md:text-4xl font-black text-primary mb-1">{s.val}</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* 3. Benefits — 3-column card grid matching TailwindsSection pattern */}
      <section id="benefits" className="scroll-mt-24 py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-12">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">
              {String(benefitsSec?.eyebrow ?? "Why 3W with Zypp")}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              {String(benefitsSec?.heading ?? "Built for Bulk.")} <span className="text-primary">Built to Earn.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
              Everything a serious delivery entrepreneur needs — more payload, lower costs, and a platform that pays on time.
            </p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((b, i) => (
              <RevealItem key={b.title}>
                <div className="h-full bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 hover:border-primary/30">
                  <div className="flex items-center justify-between mb-5">
                    <Icon3D glyph={b.icon} size={48} />
                    <span className="text-5xl font-black opacity-10 text-primary">0{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{b.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* 4. Loader Vehicles — L3 + L5 model showcase */}
      <LoaderSpecs />

      {/* 5. KYC Steps */}
      <StepsSection
        eyebrow={String(kycSec?.eyebrow ?? "Get Started")}
        heading={String(kycSec?.heading ?? "4 Steps to")}
        highlight="Get on the Road."
        steps={kyc}
      />

      {/* 5. Gig Ki Awaaz Stories */}
      <GigKiAwaazSection />

      {/* 6. Testimonials */}
      <TestimonialsSection />

      {/* 7. Partners */}
      <PartnersSection />

      {/* 8. FAQ */}
      <FAQSection />

      {/* 9. Final CTA */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #00BC84 0%, transparent 60%)" }} />
        <div className="relative z-10 container mx-auto px-4">
          <Reveal>
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Start Today</div>
            <h2 className="text-3xl md:text-5xl font-black mb-5">
              {cta?.heading ?? "Ready to Ride a 3-Wheeler?"}
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              {cta?.body ?? "Join India's fastest growing EV cargo fleet. Zero downpayment. Start earning more, today."}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={cta?.ctaLink ?? "/contact"} data-track="3W Final CTA" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-primary text-white font-bold text-base hover:bg-primary/90 transition-colors shadow-xl shadow-primary/30">
                {cta?.ctaLabel ?? "Apply for 3W"} <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-5 rounded-full border border-white/25 text-white font-bold hover:bg-white/5 transition-colors">
                Talk to Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. Get In Touch */}
      <GetInTouchSection />

      <StickyMobileCTA label="Earn up to ₹80K/mo — Apply for 3W" />
    </div>
  );
}

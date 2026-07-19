import Link from "next/link";
import { ArrowRight, Zap, Shield, TrendingUp, Clock, Bike, BarChart3, Star, IdCard, Heart, BadgeCheck } from "lucide-react";
import { getContent } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import SavingsCalculator from "@/components/home/SavingsCalculator";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GigKiAwaazSection from "@/components/home/GigKiAwaazSection";
import GetInTouchSection from "@/components/home/GetInTouchSection";
import FAQSection from "@/components/home/FAQSection";
import StepsSection from "@/components/StepsSection";
import KycDocsSection from "@/components/KycDocsSection";
import CitiesPresence from "@/components/CitiesPresence";
import PilotVsRental from "@/components/PilotVsRental";
import ScooterSpecs from "@/components/ScooterSpecs";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { CountUpValue } from "@/components/CountUpValue";

type Platform = { name: string; color: string; orders: string };
type Step = { step: string; title: string; desc: string };

const REASONS = [
  { Icon: Zap, title: "Zero Downpayment", desc: "Start earning from Day 1 with no upfront investment needed.", accent: "text-primary" },
  { Icon: BarChart3, title: "₹35–45K+ Monthly", desc: "India's highest earning potential for delivery gig workers.", accent: "text-amber-500" },
  { Icon: Shield, title: "₹5L Health Insurance", desc: "Comprehensive accidental and health coverage included.", accent: "text-blue-500" },
  { Icon: Bike, title: "Zero Fuel Cost", desc: "Unlimited battery swapping at 1,500+ Zypp stations.", accent: "text-primary" },
  { Icon: Clock, title: "24/7 Roadside Support", desc: "Never stranded — our team has you covered around the clock.", accent: "text-amber-500" },
  { Icon: TrendingUp, title: "Grow to Team Lead", desc: "Career progression — top riders manage fleets and earn more.", accent: "text-blue-500" },
];

const PLATFORMS = [
  { name: "Zomato", color: "#EF4444", orders: "5M+ orders/day" },
  { name: "Blinkit", color: "#F59E0B", orders: "3M+ orders/day" },
  { name: "Zepto", color: "#8B5CF6", orders: "2M+ orders/day" },
  { name: "Swiggy", color: "#F97316", orders: "4M+ orders/day" },
  { name: "Porter", color: "#3B82F6", orders: "1M+ orders/day" },
  { name: "Rapido", color: "#F59E0B", orders: "Fast growing" },
];

const STATS = [
  { val: "2.5L+", label: "Active Gig Entrepreneurs" },
  { val: "₹35–45K", label: "Avg Monthly Earnings" },
  { val: "8 Cities", label: "Pan-India Presence" },
  { val: "1,500+", label: "Battery Swap Stations" },
];

export default function ZyppPilotPage() {
  const c = getContent("zypp-pilot");
  const hero = c.hero as Record<string, unknown>;
  const benefitsSec = c.benefits as Record<string, unknown>;
  const howSec = c.howItWorks as Record<string, unknown>;
  const cta = c.ctaBanner as Record<string, string>;
  const platforms = (hero.platforms ?? PLATFORMS) as Platform[];
  const steps = ((howSec.items ?? []) as Step[]).length > 0
    ? (howSec.items as Step[])
    : [
        { step: "01", title: "Download App", desc: "Get the Zypp Pilot app on Android or iOS." },
        { step: "02", title: "Complete KYC", desc: "Submit Aadhaar, licence & photo in minutes." },
        { step: "03", title: "Pick Your Bike", desc: "Visit a Zypp hub and get your EV same day." },
        { step: "04", title: "Start Earning", desc: "Deliver with any platform and earn daily." },
      ];

  return (
    <div className="w-full bg-background">

      {/* ── HERO ── dark gradient matching home page pattern */}
      <section className="relative w-full min-h-[calc(100svh-64px)] flex items-center overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
        <HeroVideoBackdrop image="/media/life-rider.webp" accent="green" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 60% 40%, #00BC84 0%, transparent 50%), radial-gradient(circle at 10% 80%, #00a373 0%, transparent 40%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(0,188,132,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,188,132,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-bold uppercase tracking-widest mb-8 border border-primary/30">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {String(hero.badge ?? "For Gig Entrepreneurs")}
              </div>
              <h1 className="text-[clamp(2.2rem,4.4vw,3.6rem)] font-black text-white leading-[0.96] tracking-[-0.04em] mb-7">
                {String(hero.titlePrefix ?? "Earn More.")}<br />
                <span className="text-primary">{String(hero.titleHighlight ?? "Ride Zypp.")}</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
                {String(hero.subtitle ?? "Zero downpayment. Zero fuel cost. Zero maintenance worry. Just ride and earn ₹35–45K+ every month with India's largest EV platform.")}
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link href={String(hero.primaryCtaLink ?? "/contact")} data-track="Pilot Apply Now" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-xl shadow-primary/30">
                  {String(hero.primaryCtaLabel ?? "Join Zypp Pilot")} <ArrowRight size={18} />
                </Link>
                <a href={String(hero.secondaryCtaLink ?? "https://play.google.com/store/apps/details?id=com.zyppdelivery")} target="_blank" rel="noopener" data-track="Pilot Download App" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white font-bold hover:bg-white/5 transition-colors">
                  {String(hero.secondaryCtaLabel ?? "Download App")}
                </a>
              </div>
              {/* Earning highlight */}
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                <Star size={18} className="text-amber-400" fill="currentColor" />
                <span className="text-white/80 text-sm font-semibold">Avg rider earns <span className="text-primary font-black text-base">₹42K/month</span> with Zypp</span>
              </div>
            </Reveal>

            {/* Platforms grid */}
            <RevealStagger className="grid grid-cols-3 gap-3" stagger={0.06}>
              {platforms.slice(0, 6).map((p) => (
                <RevealItem key={p.name} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-1.5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="font-black text-base" style={{ color: p.color }}>{p.name}</div>
                  <div className="text-white/40 text-[10px] text-center leading-tight">{p.orders}</div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* ── STAT STRIP ── white/dark, no solid green band */}
      <section className="bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800">
        <Reveal>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-slate-800">
              {STATS.map((s) => (
                <div key={s.label} className="py-8 px-6 text-center">
                  <div className="text-3xl md:text-4xl font-black text-primary mb-1"><CountUpValue value={s.val} /></div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── BENEFITS ── matching TailwindsSection 3-column pattern */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-12">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">
              {String(benefitsSec?.eyebrow ?? "Why Zypp")}
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              {String(benefitsSec?.heading ?? "Everything You Need.")} <span className="text-primary">Nothing You Don&apos;t.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
              Zypp is built for gig entrepreneurs — every feature designed to maximise your earnings and minimise your worries.
            </p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REASONS.map((r, i) => (
              <RevealItem key={r.title}>
                <div className="h-full bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 hover:border-primary/30">
                  <div className="flex items-center justify-between mb-5">
                    <span className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-slate-900 ${r.accent}`}>
                      <r.Icon size={22} strokeWidth={2} />
                    </span>
                    <span className={`text-5xl font-black opacity-10 ${r.accent}`}>0{i + 1}</span>
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${r.accent}`}>{r.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── NO CLIENT? ZYPP HANDLES IT — the B2B promise ── */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Headline banner */}
          <Reveal className="mb-8 rounded-3xl bg-gradient-to-br from-primary to-emerald-600 text-white p-8 md:p-10 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/15 rounded-full blur-3xl" />
            <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-center">
              <span className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0"><IdCard size={32} /></span>
              <div>
                <h3 className="text-2xl md:text-3xl font-black mb-2">No Client? No Problem. Zypp Gets You One.</h3>
                <p className="text-white/85 leading-relaxed max-w-2xl">
                  You don&apos;t need to hunt for delivery work. <strong>Zypp creates your client ID with India&apos;s biggest
                  brands</strong> — Blinkit, Zepto, Swiggy, Zomato and more. You show up, ride, and earn from day one.
                  We handle the rest.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Blinkit", "Zepto", "Swiggy", "Zomato", "Porter", "BigBasket"].map((b) => (
                    <span key={b} className="px-3 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-bold">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Supporting promise cards */}
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: IdCard, t: "Zypp Creates Your Client ID", d: "We onboard you directly with a big-brand platform — no applications, no waiting, no jugaad." },
              { Icon: BadgeCheck, t: "Guaranteed Work, Day One", d: "Demand from 25+ platform partners means your EV never sits idle. Activate and start delivering." },
              { Icon: TrendingUp, t: "Incentivised Payouts by Zypp", d: "Weekly or monthly payouts plus performance incentives — the more you deliver, the lower your rent." },
              { Icon: Heart, t: "Earn for Your Family", d: "Average Pilots take home ₹35–45K/month. Riders like Shivam (₹48K/mo) built their own house on it." },
            ].map((f) => (
              <RevealItem key={f.t}>
                <div className="h-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4"><f.Icon size={22} /></span>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{f.t}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.d}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── RIDER STORY TESTIMONIAL ── */}
      {!!benefitsSec?.testimonialQuote && (
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4 max-w-3xl">
            <Reveal>
              <div className="bg-primary/5 border border-primary/15 rounded-3xl p-10">
                <div className="flex items-stretch gap-5 mb-6">
                  <div className="w-1 rounded-full bg-primary shrink-0" />
                  <p className="text-2xl font-black text-gray-900 dark:text-white leading-snug italic">
                    &ldquo;{String(benefitsSec.testimonialQuote)}&rdquo;
                  </p>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">{String(benefitsSec.testimonialName ?? "")}</div>
                    <div className="text-gray-400 text-sm">{String(benefitsSec.testimonialMeta ?? "")}</div>
                  </div>
                  {!!benefitsSec.testimonialLink && (
                    <a href={String(benefitsSec.testimonialLink)} target="_blank" rel="noopener" data-track="Pilot Story" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition-colors">
                      Watch Story <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── SCOOTER SPECIFICATIONS + SWAP NETWORK ── */}
      <ScooterSpecs />

      {/* ── WHAT YOU'LL NEED FOR KYC ── */}
      <KycDocsSection />

      {/* ── HOW IT WORKS ── */}
      <StepsSection
        eyebrow={String(howSec?.eyebrow ?? "Get Started")}
        heading={String(howSec?.heading ?? "4 Steps to")}
        highlight="Start Earning."
        steps={steps}
        className="py-24 bg-white dark:bg-slate-950"
      />

      {/* ── PILOT VS RENTAL head-to-head ── */}
      <PilotVsRental highlight="pilot" />

      {/* ── WE ARE PRESENT IN ── */}
      <CitiesPresence className="py-24 bg-gray-50 dark:bg-slate-900 border-y border-border" />

      {/* ── SAVINGS CALCULATOR ── reuse home component */}
      <SavingsCalculator />

      {/* ── GIG KI AWAAZ ── */}
      <GigKiAwaazSection />

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection />

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #00BC84 0%, transparent 60%)" }} />
        <div className="relative z-10 container mx-auto px-4">
          <Reveal>
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Start Today</div>
            <h2 className="text-3xl md:text-5xl font-black mb-5">
              {cta?.heading ?? "Ready to Earn with Zypp?"}
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              {cta?.body ?? "Join 2.5 Lakh+ gig entrepreneurs already riding with Zypp. Zero downpayment. Start earning today."}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href={cta?.ctaLink ?? "/contact"} data-track="Pilot Final CTA" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-primary text-white font-bold text-base hover:bg-primary/90 transition-colors shadow-xl shadow-primary/30">
                {cta?.ctaLabel ?? "Become a Zypp Pilot"} <ArrowRight size={18} />
              </Link>
              <a href="https://play.google.com/store/apps/details?id=com.zyppdelivery" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-10 py-5 rounded-full border border-white/25 text-white font-bold hover:bg-white/5 transition-colors">
                Download App
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <GetInTouchSection />

      <StickyMobileCTA label="Join Zypp Pilot — Apply Now" />
    </div>
  );
}

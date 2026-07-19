import Link from "next/link";
import { ArrowRight, CheckCircle2, Wallet, Fuel, ShieldCheck, Headphones, IndianRupee, Leaf } from "lucide-react";
import { getContent } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import KycDocsSection from "@/components/KycDocsSection";
import CitiesPresence from "@/components/CitiesPresence";
import PilotVsRental from "@/components/PilotVsRental";
import ScooterSpecs from "@/components/ScooterSpecs";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";
import SavingsCalculator from "@/components/home/SavingsCalculator";
import GigKiAwaazSection from "@/components/home/GigKiAwaazSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export const metadata = {
  title: "Zypp Rental (B2C) — Rent an Electric Scooter, Keep the Freedom",
  description: "Flexible EV scooter rentals with unlimited battery swaps, maintenance and insurance included. Work with any delivery app and keep 100% of your earnings.",
};

type Plan = { name: string; highlight: boolean; features: string };
type FAQ = { q: string; a: string };

export default function ZyppRentalPage() {
  const c = getContent("zypp-rental");
  const hero = c.hero as Record<string, string>;
  const plansSec = c.plans as Record<string, unknown>;
  const faqSec = c.faq as Record<string, unknown>;
  const cta = c.ctaBanner as Record<string, string>;
  const plans = (plansSec.items ?? []) as Plan[];
  const faqs = (faqSec.items ?? []) as FAQ[];
  const safeFaqs = faqs.map((item) =>
    /cost|price|pricing/i.test(item.q)
      ? {
          ...item,
          q: "How do I choose the right Zypp rental plan?",
          a: "Plan availability and vehicle options vary by city. Complete your details or contact the Zypp team to see the options currently available at your nearest hub.",
        }
      : item
  );

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[calc(100svh-64px)] flex items-center overflow-hidden bg-slate-900 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
        <HeroVideoBackdrop image="/media/life-rider.webp" accent="green" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 50% 40%, #00BC84 0%, transparent 50%)" }} />
        <Reveal className="relative z-10 container mx-auto px-4 py-10 md:py-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/30">
            {hero.badge}
          </div>
          <h1 className="text-[clamp(2.1rem,4.2vw,3.4rem)] font-black leading-[0.98] tracking-[-0.04em] text-white mb-7">
            {hero.titlePrefix}<span className="text-primary">{hero.titleHighlight}</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            Flexible electric scooter access for independent delivery work, supported by Zypp&apos;s service, battery and operating network.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={hero.ctaLink} data-track="Rental Book Now" className="px-10 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 inline-flex items-center gap-2">
              {hero.ctaLabel} <ArrowRight size={20} />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* The All-Inclusive B2C Prepaid Plan — direct payout front and center */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">The B2C Model</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">The All-Inclusive <span className="text-primary">Prepaid Plan.</span></h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
              Your ride, your rules, your independent vehicle — a fixed plan that covers everything you need to succeed on the road.
            </p>
          </Reveal>

          {/* Direct Payout — the headline B2C feature */}
          <Reveal className="mb-8 rounded-3xl bg-gradient-to-br from-primary to-emerald-600 text-white p-8 md:p-10 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/15 rounded-full blur-3xl" />
            <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-center">
              <span className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0"><Wallet size={32} /></span>
              <div>
                <h3 className="text-2xl md:text-3xl font-black mb-2">Direct Payout, On Your Own ID.</h3>
                <p className="text-white/85 leading-relaxed max-w-2xl">
                  Unlike the B2B plan, your client — Zomato, Swiggy, Blinkit, Zepto, anyone — pays <strong>you directly</strong> on
                  your own client ID. No middleman, no cuts on earnings. You pay a fixed prepaid rent; every rupee you earn is yours.
                </p>
              </div>
            </div>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { Icon: Fuel, t: "No Fuel / No Maintenance", d: "Save more with unlimited battery swapping — Zypp covers all servicing and repairs." },
              { Icon: IndianRupee, t: "Fixed Affordable Rent", d: "Starting at just ₹180*/day, prepaid. No surprise costs, total predictability." },
              { Icon: CheckCircle2, t: "Work Your Own Hours", d: "Full independence — choose your platform, your shifts, your zones." },
              { Icon: ShieldCheck, t: "Insurance Included", d: "Sum insured up to ₹2,00,000 (opt-in) — ride covered, every day." },
              { Icon: Headphones, t: "24×7 Customer Support", d: "Chatbots and in-app tickets — help is always one tap away." },
              { Icon: Leaf, t: "Environment Friendly", d: "100% electric scooter — reduce your carbon footprint while you earn." },
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

      {/* Rental paths — benefits first, with plan details shared after enquiry */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Choose how you ride</div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">A rental path for every work rhythm.</h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Compare flexibility, vehicle access and support. Current options are confirmed after your city and hub are selected.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((p) => (
              <div key={p.name} className={`rounded-3xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 ${p.highlight ? "bg-primary text-white shadow-2xl shadow-primary/30" : "bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-primary/30 hover:shadow-xl"}`}>
                {p.highlight && <div className="text-xs font-black uppercase tracking-wider text-white/70 mb-2">Most flexible</div>}
                <h3 className={`text-2xl font-extrabold mb-6 ${p.highlight ? "text-white" : "text-gray-900 dark:text-white"}`}>{p.name}</h3>
                <ul className="flex flex-col gap-2.5 flex-1 mb-8">
                  {p.features.split("\n").filter(Boolean).map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 size={15} className={p.highlight ? "text-white/80" : "text-primary"} />
                      <span className={`text-sm ${p.highlight ? "text-white/90" : "text-gray-600 dark:text-gray-400"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" data-track={`Rental ${p.name} CTA`}
                  className={`w-full py-3.5 rounded-xl font-bold text-center transition-all ${p.highlight ? "bg-white text-primary hover:bg-white/90" : "bg-primary text-white hover:bg-primary/90"}`}>
                  Check availability
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot vs Rental head-to-head */}
      <PilotVsRental highlight="rental" />

      {/* Scooter specifications + swap network */}
      <ScooterSpecs className="py-24 bg-white dark:bg-slate-950" />

      {/* What you'll need for KYC */}
      <KycDocsSection />

      {/* We are present in */}
      <CitiesPresence />

      {/* ── SAVINGS CALCULATOR ── */}
      <SavingsCalculator />

      {/* ── GIG KI AWAAZ ── */}
      <GigKiAwaazSection />

      {/* ── TESTIMONIALS (The Badlav) ── */}
      <TestimonialsSection />

      {/* FAQ */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-3xl">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(faqSec.eyebrow)}</div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{String(faqSec.heading)}</h2>
          </Reveal>
          <RevealStagger className="flex flex-col gap-4" stagger={0.05}>
            {safeFaqs.map((f) => (
              <RevealItem key={f.q} className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm">{f.q}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.a}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-4">{cta.heading}</h2>
          <p className="opacity-80 text-lg mb-8">{cta.body}</p>
          <Link href={cta.ctaLink} data-track="Rental Final CTA" className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-primary font-bold hover:bg-white/90 transition-colors shadow-xl">
            {cta.ctaLabel} <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <StickyMobileCTA label="Rent a Zypp EV — Get Started" />
    </div>
  );
}

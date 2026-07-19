import { Check, X } from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import WhyZyppSection from "@/components/home/WhyZyppSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PartnersSection from "@/components/home/PartnersSection";
import FAQSection from "@/components/home/FAQSection";
import GetInTouchSection from "@/components/home/GetInTouchSection";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { Icon3D } from "@/components/Icon3D";
import Link from "next/link";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import SavingsCalculator from "@/components/home/SavingsCalculator";
import GigKiAwaazSection from "@/components/home/GigKiAwaazSection";

export const metadata = {
  title: "2W EV Services — Zypp Pilot vs Zypp Rental Compared",
  description: "Compare Zypp's two-wheeler plans: Pilot (B2B, work included) vs Rental (B2C, full freedom). Find the right electric scooter plan for your delivery hustle.",
};

const TWO_MODEL_CARDS = [
  {
    key: "rental",
    emoji: "🛴",
    title: "Zypp Rental",
    tag: "Without Client ID",
    tagColor: "text-violet-600 dark:text-violet-400",
    subTitle: "Post-Paid, Flexible Rentals",
    href: "/zypp-rental",
    cta: "Explore Zypp Rental",
    ctaStyle: "bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-200 dark:border-slate-700 hover:border-primary/40 hover:shadow-md",
    accent: "border-violet-200 dark:border-violet-800/50 hover:border-violet-400/50",
    features: [
      "Zero downpayment needed to get started",
      "Flexible monthly rentals that fit your pace",
      "Unlimited battery swapping across all hubs",
    ],
  },
  {
    key: "pilot",
    emoji: "🛵",
    title: "Zypp Pilot",
    tag: "With Client ID",
    tagColor: "text-primary",
    subTitle: "Deliver & Earn Daily",
    href: "/zypp-pilot",
    cta: "Become a Zypp Pilot",
    ctaStyle: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30",
    accent: "border-primary/20 hover:border-primary/50",
    features: [
      "Designed exclusively for delivery partners",
      "High incentives based on daily ride volume",
      "Zero maintenance and servicing costs",
    ],
    featured: true,
  },
];

const COMPARISON_ROWS = [
  { feature: "Payout Model", rental: "Directly by Client", pilot: "Weekly by Zypp" },
  { feature: "Fixed Daily Fee", rental: true, pilot: false },
  { feature: "Security Deposit", rental: "₹2,500 Required", pilot: "Waived Off", pilotHighlight: true },
  { feature: "Maintenance & Servicing", rental: "Included", pilot: "Included" },
  { feature: "Battery Swapping", rental: "Unlimited", pilot: "Unlimited" },
  { feature: "Insurance", rental: "Up to ₹2L (Opt-in)", pilot: "Up to ₹5L (Opt-in)" },
];

export default function TwoWheelerPilotPage() {
  return (
    <div className="w-full bg-background">

      {/* 1. Hero — uses the shared HeroSection component */}
      <HeroSection
        content={{
          bgImage: "",
          badge: "2 Wheeler EV Rentals",
          titleLine1: "Choose Your Preferred",
          titleHighlight: "2 Wheeler Rental",
          titleLine2: "",
          subtitle: "Two models, unlimited possibilities. Zypp Rental for independent use, or Zypp Pilot to deliver and earn daily — both on India's largest EV network.",
          primaryCtaLabel: "Explore Zypp Pilot",
          primaryCtaLink: "/zypp-pilot",
          secondaryCtaLabel: "Explore Zypp Rental",
          secondaryCtaLink: "/zypp-rental",
          stats: [],
        }}
      />

      {/* 2. Two Models — cards matching home design system */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Our Models</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Two Models. <span className="text-primary">Unlimited Possibilities.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-2xl mx-auto">
              Find the perfect plan for your delivery needs and lifestyle.
            </p>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TWO_MODEL_CARDS.map((card) => (
              <RevealItem key={card.key}>
                <div className={`h-full bg-white dark:bg-slate-950 border-2 ${card.accent} rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col ${card.featured ? "ring-1 ring-primary/20" : ""}`}>
                  {card.featured && (
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-5 w-fit">
                      ⭐ Most Popular
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-7">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-1">{card.title}</h3>
                      <p className={`font-bold uppercase tracking-widest text-xs ${card.tagColor}`}>{card.tag}</p>
                    </div>
                    <Icon3D glyph={card.emoji} size={64} className="shrink-0" />
                  </div>

                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-5">{card.subTitle}</h4>
                  <ul className="flex flex-col gap-4 flex-1 mb-8">
                    {card.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={card.href} className={`w-full block py-4 rounded-full font-bold text-center text-sm transition-all duration-300 ${card.ctaStyle}`}>
                    {card.cta}
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* 3. Comparison Table — clean, home-system styled */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-4xl">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Compare</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Rental vs Pilot. <span className="text-primary">Side by Side.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl mx-auto">
              See how our two models compare so you can make the right choice.
            </p>
          </Reveal>

          <Reveal>
            <div className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[560px]">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-slate-800">
                      <th className="p-5 font-bold text-gray-400 dark:text-gray-500 text-xs uppercase tracking-widest w-2/5">Feature</th>
                      <th className="p-5 font-bold text-center text-violet-600 dark:text-violet-400 text-sm w-[30%]">Zypp Rental</th>
                      <th className="p-5 font-bold text-center text-primary text-sm w-[30%]">Zypp Pilot</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.feature} className="hover:bg-white dark:hover:bg-slate-800 transition-colors">
                        <td className="p-5 font-semibold text-gray-900 dark:text-white text-sm">{row.feature}</td>
                        <td className="p-5 text-center text-sm text-gray-500 dark:text-gray-400">
                          {typeof row.rental === "boolean"
                            ? row.rental
                              ? <Check size={18} className="mx-auto text-violet-500" strokeWidth={3} />
                              : <X size={18} className="mx-auto text-gray-300 dark:text-gray-600" strokeWidth={3} />
                            : <span className="font-semibold">{row.rental}</span>}
                        </td>
                        <td className="p-5 text-center text-sm">
                          {typeof row.pilot === "boolean"
                            ? row.pilot
                              ? <Check size={18} className="mx-auto text-primary" strokeWidth={3} />
                              : <X size={18} className="mx-auto text-gray-300 dark:text-gray-600" strokeWidth={3} />
                            : <span className={`font-semibold ${row.pilotHighlight ? "text-primary" : "text-gray-500 dark:text-gray-400"}`}>{row.pilot}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. How It Works */}
      <HowItWorksSection />

      {/* 5. Savings Calculator */}
      <SavingsCalculator />

      {/* 6. Why Choose Zypp */}
      <WhyZyppSection
        content={{
          heading: "Why Choose Zypp?",
          subheading: "India's largest EV fleet built for delivery partners — trusted by 2.5 Lakh+ gig entrepreneurs.",
          centerValue: "26K+",
          centerLabel: "Active EVs",
          orbit: [
            { value: "176M+", label: "Deliveries" },
            { value: "0", label: "Tailpipe CO₂" },
            { value: "24/7", label: "Support" },
          ],
          features: [
            { icon: "💸", title: "No Joining Fees", desc: "Start earning immediately with zero hidden onboarding costs or upfront fees." },
            { icon: "🛡️", title: "₹5L Health Insurance", desc: "Comprehensive health and accidental insurance coverage — Zypp Pilot exclusive." },
            { icon: "🏆", title: "Grow to Team Lead", desc: "Career progression tracks allowing high performers to manage fleets." },
            { icon: "⚡", title: "Zero Pollution", desc: "Drive 100% green EVs and contribute to a cleaner, pollution-free environment." },
          ],
        }}
      />

      {/* 7. Gig Ki Awaaz Stories */}
      <GigKiAwaazSection />

      {/* 8. Testimonials */}
      <TestimonialsSection />

      {/* 9. Partners */}
      <PartnersSection />

      {/* 10. FAQ */}
      <FAQSection />

      {/* 11. Get In Touch */}
      <GetInTouchSection />
    </div>
  );
}

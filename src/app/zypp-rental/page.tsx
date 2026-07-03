import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getContent } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import KycDocsSection from "@/components/KycDocsSection";
import CitiesPresence from "@/components/CitiesPresence";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";

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
          <h1 className="text-[clamp(2.75rem,6vw,5rem)] font-black leading-[0.98] tracking-[-0.04em] text-white mb-7">
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

      {/* What you'll need for KYC */}
      <KycDocsSection />

      {/* We are present in */}
      <CitiesPresence />

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
    </div>
  );
}

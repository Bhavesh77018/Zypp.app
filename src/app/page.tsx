import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import CarbonSection from "@/components/home/CarbonSection";
import WhyZyppSection from "@/components/home/WhyZyppSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import SavingsCalculator from "@/components/home/SavingsCalculator";
import PartnersSection from "@/components/home/PartnersSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import GetInTouchSection from "@/components/home/GetInTouchSection";
import ScrollStory from "@/components/home/ScrollStory";
import LiveImpactMap from "@/components/home/LiveImpactMap";
import PlatformOSSection from "@/components/home/PlatformOSSection";
import NumbersSection from "@/components/home/NumbersSection";
import TailwindsSection from "@/components/home/TailwindsSection";
import FounderSection from "@/components/home/FounderSection";
import AppShowcase from "@/components/home/AppShowcase";
import GigKiAwaazSection from "@/components/home/GigKiAwaazSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/cms";

// Corporate Video Section
type CorpVideoContent = { eyebrow: string; heading: string; body: string; ctaLabel: string; ctaLink: string; cardCaption: string };
function CorpVideoSection({ content }: { content: CorpVideoContent }) {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{content.eyebrow}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              {content.heading}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-6 leading-relaxed">
              {content.body}
            </p>
            <a
              href={content.ctaLink}
              target="_blank"
              rel="noopener"
              data-track="Watch Corporate Video"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
            >
              {content.ctaLabel} <ArrowRight size={16} />
            </a>
          </div>
          {/* Video play card */}
          <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
            <div className="absolute inset-0 bg-primary/10" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/40 group-hover:scale-110 transition-transform duration-300">
                <div className="w-0 h-0 border-t-[14px] border-t-transparent border-l-[24px] border-l-white border-b-[14px] border-b-transparent ml-2" />
              </div>
              <span className="text-white font-bold">{content.cardCaption}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// News Section
type NewsContent = { eyebrow: string; heading: string; items: { source: string; date: string; title: string; url?: string }[] };
function NewsSection({ content }: { content: NewsContent }) {
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-2">{content.eyebrow}</div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">{content.heading}</h2>
          </div>
          <Link
            href="/zyppNews"
            data-track="View All News"
            className="flex items-center gap-1 text-primary font-semibold text-sm hover:underline"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(content.items ?? []).map((n) => {
            const card = (
              <>
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">{n.source} · {n.date}</div>
                <h3 className="text-gray-900 dark:text-white font-bold leading-snug group-hover:text-primary transition-colors">{n.title}</h3>
              </>
            );
            const cardClass = "block bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group";
            return n.url ? (
              <a key={n.title} href={n.url} target="_blank" rel="noopener noreferrer" className={cardClass}>
                {card}
              </a>
            ) : (
              <div key={n.title} className={cardClass}>
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Page Assembly (matching live zypp.app section order) ─────────────────
export default function Home() {
  const content = getContent("home");
  return (
    <div className="w-full">
      {/* 1. Hero - dark video bg, centered text */}
      <HeroSection content={content.hero as never} />
      {/* 1b. Scroll-telling narrative: petrol → electric → earnings */}
      <ScrollStory />
      {/* 1c. Platform — "Not a Fleet. An OS." 5-layer gig-economy stack */}
      <PlatformOSSection />
      {/* 1d. Tailwinds — three macro forces behind the growth */}
      <TailwindsSection />
      {/* 2. What We Offer - 6 service cards */}
      <ServicesSection content={content.services as never} />
      {/* 3. Carbon Counter - live ticking, dark green bg */}
      <CarbonSection content={content.carbon as never} />
      {/* 4. Why Zypp - orbital animation + 4 features */}
      <WhyZyppSection content={content.whyZypp as never} />
      {/* 5. How It Works - 4 step process */}
      <HowItWorksSection content={content.howItWorks as never} />
      {/* 5b. App showcase — real Zypp Pilot app onboarding screens */}
      <AppShowcase />
      {/* 6. Savings Calculator - bar chart EV vs Petrol */}
      <SavingsCalculator content={content.savings as never} />
      {/* 7. Partners - delivery platforms + investors */}
      <PartnersSection content={content.partners as never} />
      {/* 7b. Live impact map - animated India map + live counters */}
      <LiveImpactMap />
      {/* 7c. The Numbers — one-year EBITDA-positive transformation */}
      <NumbersSection />
      {/* 7d. Founder — built on hustle, not heritage */}
      <FounderSection />
      {/* 8. Corporate Video */}
      <CorpVideoSection content={content.corpVideo as never} />
      {/* 9. Testimonials carousel */}
      <TestimonialsSection content={content.testimonials as never} />
      {/* 9b. Gig Ki Awaaz — real podcast episode thumbnails */}
      <GigKiAwaazSection />
      {/* 10. FAQ */}
      <FAQSection content={content.faq as never} />
      {/* 11. News */}
      <NewsSection content={content.news as never} />
      {/* 12. Get In Touch */}
      <GetInTouchSection content={content.getInTouch as never} />
    </div>
  );
}

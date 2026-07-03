import Link from "next/link";
import { ArrowRight, Trophy, BookOpen, Mic, Camera, PlaySquare, Briefcase } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import AboutTimelineSVG from "@/components/animations/AboutTimelineSVG";
import GetInTouchSection from "@/components/home/GetInTouchSection";
import EditorialMediaSection from "@/components/EditorialMediaSection";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";

export const metadata = {
  title: "About Zypp Electric — 8 Years, 22 Pivots, India's Gig Economy OS",
  description: "Zypp Electric was founded in 2017. Today, India's largest EV gig logistics network with 26,000+ EVs, EBITDA positive, pre-IPO.",
};

const TEAM = [
  { initials: "AG", name: "Akash Gupta", role: "Co-Founder & CEO", bio: "8 years, 22 pivots. IMT Ghaziabad Distinguished Alumni. 500K+ followers. HarperCollins book deal. Host of Gig Ki Awaaz." },
  { initials: "RA", name: "Rashi Agarwal", role: "Co-Founder & CBO", bio: "Drives business development, enterprise partnerships, and revenue strategy. Built Zypp's platform relationships with India's largest delivery apps." },
  { initials: "TM", name: "Tushar Mehta", role: "Co-Founder & COO", bio: "Runs Zypp's 8-city operations, 21 hubs, 400-person field team. The architect of Zypp's 96% fleet uptime and 20-minute breakdown response." },
  { initials: "MS", name: "Mukesh Singla", role: "CFO", bio: "Leads financial strategy, IPO readiness, and investor relations. Driving Zypp toward PAT positivity and the FY28 public listing." },
];

const INVESTORS = [
  "9Unicorns", "Gogoro", "Shell", "Google", "LetsVenture",
  "Eneos", "Good Year", "Anthill Ventures", "Grip Invest"
];

export default function AboutPage() {
  return (
    <div className="w-full bg-background">
      
      {/* ── HERO ── dark gradient */}
      <section className="relative w-full min-h-[calc(100svh-64px)] flex items-center overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950/70 to-slate-900" />
        <HeroVideoBackdrop image="/media/founder-short.jpg" accent="green" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 65% 35%, #00BC84 0%, transparent 55%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(0,188,132,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,188,132,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 text-center max-w-4xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-bold uppercase tracking-widest mb-8 border border-primary/30">
              Our Story
            </div>
            <h1 className="text-[clamp(3rem,6.5vw,5.4rem)] font-black text-white leading-[0.98] tracking-[-0.04em] mb-7">
              <span className="text-white/50">8 Years.</span><br />
              <span className="text-white">22 Pivots.</span><br />
              <span className="text-primary">One Mission.</span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 mx-auto">
              Started in Jaipur with an idea and no blueprint. Today, Zypp is India&apos;s largest EV-powered gig logistics network — and we&apos;re just getting started. <strong className="text-white">We are building the operating system for India&apos;s gig economy.</strong>
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/riders" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-xl shadow-primary/30">
                Join as a Rider <ArrowRight size={18} />
              </Link>
              <Link href="/careers" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white font-bold hover:bg-white/5 transition-colors">
                Work with Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-5xl">
          <Reveal className="mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Our Mission</div>
            
            <div className="bg-gray-50 dark:bg-slate-900 border-l-4 border-primary rounded-r-3xl p-8 md:p-12 shadow-sm">
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-5">
                Zero pollution mobility for India&apos;s<br />
                <span className="text-primary">100 million gig entrepreneurs.</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                We started with EVs because mobility is where the gig worker&apos;s income begins and ends. We&apos;re expanding into financial identity, credit, housing, and AI because the gig worker deserves a full economic platform — not just a vehicle.
              </p>
            </div>
          </Reveal>

          {/* Quick Stats Grid */}
          <RevealStagger className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: "26K+", l: "EVs on Road" },
              { n: "8", l: "Cities" },
              { n: "2.5L+", l: "Gig Entrepreneurs" },
              { n: "176M+", l: "Deliveries Done" },
            ].map((s) => (
              <RevealItem key={s.l} className="bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 text-center shadow-sm hover:border-primary/30 transition-colors">
                <div className="text-3xl md:text-4xl font-black text-primary mb-2">{s.n}</div>
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">{s.l}</div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <EditorialMediaSection
        eyebrow="The people behind the platform"
        heading="Built close to the road, not far from it."
        body="Zypp's progress comes from teams who stay close to riders, hubs, vehicles and partner operations. Product decisions are tested in the field, operating lessons return to the platform, and every improvement starts with a real mobility problem."
        image="/media/life-team.webp"
        imageAlt="Zypp team members collaborating inside an electric mobility hub"
        caption="Operators, builders and rider-first teams"
        ctaLabel="Meet life at Zypp"
        ctaHref="/life-at-zypp"
        tags={["Rider empathy", "Field learning", "Operational ownership", "Mission Zero Emission"]}
        reverse
      />

      {/* ── TIMELINE ── uses redesigned component */}
      <AboutTimelineSVG />

      {/* ── TEAM ── */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">The Team</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Built by Operators.<br />
              <span className="text-primary">For Operators.</span>
            </h2>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {TEAM.map((t) => (
              <RevealItem key={t.initials} className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary border-2 border-primary flex items-center justify-center font-black text-xl mb-5">
                  {t.initials}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{t.name}</h3>
                <div className="text-xs font-bold text-primary uppercase tracking-wider mb-4">{t.role}</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{t.bio}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── INVESTORS ── */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <Reveal className="mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Our Investors</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Backed by <span className="text-primary">Believers.</span>
            </h2>
          </Reveal>

          <Reveal className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {INVESTORS.map((inv) => (
                <span key={inv} className="px-6 py-3 rounded-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 font-bold text-sm cursor-default hover:border-primary/50 transition-colors">
                  {inv}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="bg-white dark:bg-slate-950 border-l-4 border-primary rounded-r-3xl p-8 md:p-10 shadow-sm text-left max-w-3xl mx-auto">
              <p className="text-lg font-medium text-gray-900 dark:text-white italic mb-4">
                &ldquo;Zypp is building infrastructure for India&apos;s new economy — not just delivering packages, but delivering dignity and economic mobility to 100 million gig workers.&rdquo;
              </p>
              <div className="text-sm font-bold text-gray-400">— Investor Perspective</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOUNDER MEDIA ── */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="mb-12 text-center md:text-left">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Founder & Brand</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              The Founder <span className="text-primary">Is the Story.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Reveal direction="right">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">500K+ followers @KaashSeAkash</strong> across Instagram, YouTube, and LinkedIn. Rider acquisition cost for Zypp is near-zero because riders trust the face behind the company.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Host of <strong className="text-gray-900 dark:text-white">Gig Ki Awaaz</strong> — India&apos;s only podcast by gig workers, for gig workers. 50+ documented episodes. The community that Akash has built is Zypp&apos;s most durable competitive moat.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="https://instagram.com/kaashseakash" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 dark:border-slate-700 font-bold text-sm hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                  <Camera size={16} className="text-pink-600" /> @KaashSeAkash
                </a>
                <a href="https://youtube.com/@GigKiAwaaz" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 dark:border-slate-700 font-bold text-sm hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                  <PlaySquare size={16} className="text-red-500" /> Gig Ki Awaaz
                </a>
                <a href="https://linkedin.com/in/akashg" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 dark:border-slate-700 font-bold text-sm hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                  <Briefcase size={16} className="text-blue-600" /> LinkedIn
                </a>
              </div>
            </Reveal>

            <Reveal direction="left">
              <div className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Recognition</div>
                
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4 pb-6 border-b border-gray-200 dark:border-slate-800">
                    <Trophy size={24} className="text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">IMT Ghaziabad Distinguished Alumni</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Youngest recipient in 20-year history · Presented by Dr. Shashi Tharoor</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pb-6 border-b border-gray-200 dark:border-slate-800">
                    <BookOpen size={24} className="text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">HarperCollins Book Deal</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Business memoir: the journey from Jaipur to IPO</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Mic size={24} className="text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">Gig Ki Awaaz Podcast</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">50+ episodes · India&apos;s only gig worker podcast</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── GET IN TOUCH ── */}
      <GetInTouchSection />
    </div>
  );
}

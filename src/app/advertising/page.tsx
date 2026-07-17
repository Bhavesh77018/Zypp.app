import Link from "next/link";
import {
  ArrowRight, Megaphone, Package, Smartphone, ShoppingBag,
  BatteryFull, BarChart3, Mail, MapPin, Clock, Target, Eye, TrendingUp,
  Palette, Navigation, BrainCircuit, FileBarChart,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import GetInTouchSection from "@/components/home/GetInTouchSection";
import EditorialMediaSection from "@/components/EditorialMediaSection";
import ZyppAdsCommandCenter from "@/components/advertising/ZyppAdsCommandCenter";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";

export const metadata = {
  title: "ZyppAds — Mobility Advertising Across Urban India | Zypp Electric",
  description: "Reach urban India through Zypp's electric delivery network with vehicle wraps, delivery-bag branding, rider app media and campaign reporting.",
};

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const WHY_STATS: { n: string; label: string; desc: string; Icon: LucideIcon }[] = [
  { n: "Moving", label: "Street-Level Reach", desc: "Campaigns travel through delivery corridors instead of waiting for audiences at one fixed location.", Icon: TrendingUp },
  { n: "26K+", label: "Branded EVs", desc: "Moving billboards across India's busiest delivery corridors — Koramangala, Hauz Khas, Bandra, Hitech City.", Icon: Megaphone },
  { n: "8", label: "Metro Cities", desc: "Delhi NCR, Bangalore, Hyderabad, Mumbai, Pune, Goa, Jaipur, Chandigarh. Targeted city-level campaigns.", Icon: MapPin },
  { n: "10M+", label: "Daily Impressions", desc: "Based on average delivery routes, peak hours, and dense residential/commercial zone coverage.", Icon: Eye },
  { n: "6am–11pm", label: "Active Hours", desc: "Zypp EVs are on the road from early morning to late night — when consumers are most active and receptive.", Icon: Clock },
  { n: "100%", label: "Hyperlocal Targeting", desc: "Target specific pin codes, neighbourhoods, or demand zones. Campaign adjustable by city, time, and route.", Icon: Target },
];

const AD_FORMATS: { icon: LucideIcon; title: string; desc: string; badge: string }[] = [
  {
    icon: Megaphone,
    title: "Vehicle Wrap",
    desc: "Full or partial vinyl wrap on the EV body. Premium visual real estate on a moving vehicle. High recall, street-level visibility.",
    badge: "High visibility",
  },
  {
    icon: ShoppingBag,
    title: "Delivery Bag Branding",
    desc: "Brand logo on the rider's delivery bag. Reaches the consumer at the door — the highest-attention moment of the delivery journey.",
    badge: "Doorstep recall",
  },
  {
    icon: Smartphone,
    title: "Rider App In-Feed",
    desc: "Targeted digital ads inside the Zypp Pilot App. Reaches 2.5L+ active gig workers — a hard-to-reach, high-intent demographic.",
    badge: "Rider audience",
  },
  {
    icon: Package,
    title: "Insert Advertising",
    desc: "Brand inserts, samples, or pamphlets placed in deliveries. Direct-to-consumer touchpoint at moment of package opening.",
    badge: "Tactile format",
  },
  {
    icon: BatteryFull,
    title: "Swap Station Branding",
    desc: "Brand placements at 1,500+ battery swap stations. Daily footfall of 50+ riders per station. High dwell time, captive audience.",
    badge: "High dwell time",
  },
  {
    icon: BarChart3,
    title: "Performance Reports",
    desc: "Real-time dashboard showing impressions, routes, zones covered, and estimated reach. Full accountability for every rupee spent.",
    badge: "Campaign intelligence",
  },
];

const CAMPAIGN_STEPS = [
  { Icon: Target, step: "01", title: "Define the audience", body: "Choose cities, neighbourhoods, active windows and the delivery moments that matter to your brand." },
  { Icon: Palette, step: "02", title: "Build the media mix", body: "Combine vehicle wraps, delivery bags, app placements, inserts and station visibility around one objective." },
  { Icon: Navigation, step: "03", title: "Deploy across routes", body: "Allocate campaign assets to active EVs and delivery corridors through a connected operating plan." },
  { Icon: BrainCircuit, step: "04", title: "Optimise with AI", body: "Use live coverage and visibility signals to identify stronger zones, time windows and format opportunities." },
  { Icon: FileBarChart, step: "05", title: "Report clearly", body: "Bring deployment, route activity, zones covered and estimated reach into one campaign view." },
];

const SECTORS = [
  "FMCG", "D2C Brands", "Ed-Tech", "FinTech & Insurance",
  "Gaming & Entertainment", "Real Estate", "Healthcare",
  "Food & Beverage", "Auto & Mobility", "Fashion & Lifestyle",
  "Government Campaigns",
];

const CITIES = [
  "Delhi NCR", "Bangalore", "Hyderabad", "Mumbai",
  "Pune", "Jaipur", "Chandigarh", "Goa",
];

const ADS_FAQS = [
  { q: "Which advertising formats can be combined?", a: "Campaigns can combine vehicle wraps, delivery-bag branding, rider app placements, inserts and swap-station media around one audience objective." },
  { q: "Can a campaign focus on specific cities or neighbourhoods?", a: "Yes. Planning can be shaped around selected cities, pin codes, delivery corridors, demand zones and active time windows." },
  { q: "How is campaign execution managed?", a: "The ZyppAds team connects creative adaptation, deployment, fleet allocation, route planning and reporting through one operating workflow." },
  { q: "What reporting is available?", a: "Reporting can cover deployed assets, active routes, zones, operating windows and estimated campaign reach based on the selected media plan." },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function AdvertisingPage() {
  return (
    <div className="w-full bg-background">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[calc(100svh-64px)] flex items-center overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-orange-950/60 to-slate-900" />
        <HeroVideoBackdrop image="/media/zyppads-fleet.webp" accent="orange" videoOpacity={0.26} />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 65% 35%, #FF6B35 0%, transparent 55%), radial-gradient(circle at 10% 80%, #00a373 0%, transparent 40%)" }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(0,188,132,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,188,132,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold uppercase tracking-widest mb-8 border border-orange-500/30">
                <Megaphone size={14} />
                ZyppAds · Mobility Advertising
              </div>
              <h1 className="text-[clamp(2.2rem,4.4vw,3.6rem)] font-black text-white leading-[0.96] tracking-[-0.04em] mb-7">
                Put Your Brand<br />
                <span className="text-orange-400">Where India Moves.</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
                26,000+ branded EVs moving through India&apos;s densest delivery zones —{" "}
                <strong className="text-white">a mobile media network built around real urban movement.</strong>{" "}
                Your brand can travel across neighbourhoods, delivery moments and rider touchpoints.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:akash@zypp.app?subject=ZyppAds Advertising Inquiry" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors shadow-xl shadow-orange-500/30">
                  Advertise with Zypp <ArrowRight size={18} />
                </a>
                <Link href="#formats" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white font-bold hover:bg-white/5 transition-colors">
                  View Ad Formats ↓
                </Link>
              </div>
            </Reveal>

            {/* Right: quick stat grid */}
            <RevealStagger className="grid grid-cols-2 gap-3" stagger={0.08}>
              {[
                { n: "26K+", l: "Branded EVs" },
                { n: "10M+", l: "Daily Impressions" },
                { n: "8 Cities", l: "Metro Coverage" },
                { n: "6am–11pm", l: "Active Hours" },
                { n: "Pin-code", l: "Targeting" },
                { n: "Live", l: "Campaign Reporting" },
              ].map((m) => (
                <RevealItem key={m.l} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="text-2xl font-black text-orange-400 mb-1">{m.n}</div>
                  <div className="text-white/50 text-xs font-semibold uppercase tracking-widest">{m.l}</div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      <ZyppAdsCommandCenter />

      <EditorialMediaSection
        eyebrow="Reach in motion"
        heading="The city becomes the media plan."
        body="Zypp's electric fleet moves through residential clusters, office districts, high streets and delivery hotspots throughout the day. That movement gives brands repeated, street-level visibility across the places where urban life actually happens."
        image="/media/zyppads-fleet.webp"
        imageAlt="Zypp electric fleet carrying advertising through an urban corridor"
        caption="Mobility media across high-frequency delivery routes"
        ctaLabel="Build a campaign brief"
        ctaHref="/contact"
        tags={["Vehicle media", "Delivery touchpoints", "Hyperlocal routes", "Campaign reporting"]}
        accentClass="text-orange-500"
        reverse
      />

      {/* ── WHY ZYPPADS ── matching TailwindsSection pattern */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-12">
            <div className="text-sm font-bold text-orange-500 uppercase tracking-[0.2em] mb-3">Why ZyppAds</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Reach India&apos;s <span className="text-orange-500">Most Active Zones.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
              Your brand moves with India&apos;s fastest-growing delivery network — in the neighbourhoods where your customers live, work, and order.
            </p>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_STATS.map((w, i) => (
              <RevealItem key={w.label}>
                <div className="h-full bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 hover:border-orange-400/30">
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                      <w.Icon size={22} strokeWidth={2} />
                    </span>
                    <span className="text-5xl font-black opacity-10 text-orange-500">0{i + 1}</span>
                  </div>
                  <div className="text-3xl font-black text-orange-500 leading-none mb-2">{w.n}</div>
                  <div className="font-bold text-gray-900 dark:text-white text-sm mb-2">{w.label}</div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{w.desc}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── AD FORMATS ── */}
      <section id="formats" className="scroll-mt-24 py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Reveal className="mb-12">
            <div className="text-sm font-bold text-orange-500 uppercase tracking-[0.2em] mb-3">Ad Formats</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              How Your Brand <span className="text-orange-500">Gets Seen.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
              Six ways to put your brand in front of urban India — from moving vehicles to doorstep delivery moments.
            </p>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AD_FORMATS.map((f, index) => (
              <RevealItem key={f.title}>
                <div className="group h-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-5 hover:border-orange-400/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="relative h-32 overflow-hidden rounded-2xl bg-slate-950 mb-6 p-5">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle,#fb923c 1px,transparent 1px)", backgroundSize: "18px 18px" }} />
                    <div className="absolute -right-8 -bottom-10 w-32 h-32 rounded-full bg-orange-500/20 blur-2xl" />
                    <div className="relative flex items-start justify-between">
                      <span className="w-12 h-12 flex items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
                        <f.icon size={24} strokeWidth={2.2} />
                      </span>
                      <span className="text-4xl font-black text-white/10">0{index + 1}</span>
                    </div>
                    <div className="absolute left-5 bottom-4 text-[10px] font-black uppercase tracking-[0.18em] text-orange-300">{f.badge}</div>
                  </div>
                  <div className="px-2 pb-3">
                    <h3 className="font-black text-lg text-gray-900 dark:text-white mb-3">{f.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-1">{f.desc}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-orange-500/10 blur-[110px]" />
        <div className="container relative mx-auto px-4 max-w-7xl">
          <Reveal className="mb-14 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 items-end">
            <div>
              <div className="text-sm font-black text-orange-400 uppercase tracking-[0.2em] mb-4">Campaign journey</div>
              <h2 className="text-3xl md:text-5xl font-black leading-tight">One team from brief<br /><span className="text-orange-400">to visibility report.</span></h2>
            </div>
            <p className="text-white/55 text-lg leading-relaxed">ZyppAds connects planning, creative adaptation, fleet deployment and reporting so a moving campaign stays manageable from one operating workflow.</p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CAMPAIGN_STEPS.map(({ Icon, step, title, body }) => (
              <RevealItem key={step} className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-orange-400/30 hover:bg-white/[0.06] transition-colors">
                <div className="mb-9 flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400"><Icon size={21} /></span><span className="text-xs font-black tracking-widest text-white/20">{step}</span></div>
                <h3 className="font-black mb-3">{title}</h3>
                <p className="text-xs leading-relaxed text-white/45">{body}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── CITY COVERAGE ── */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-12">
            <div className="text-sm font-bold text-orange-500 uppercase tracking-[0.2em] mb-3">Coverage</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              8 Metro Cities. <span className="text-orange-500">One Platform.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
              Run a pan-India campaign or target a single city — with hyperlocal down to the pin code.
            </p>
          </Reveal>

          <Reveal className="mb-10">
            <div className="flex flex-wrap gap-3">
              {CITIES.map((city) => (
                <span key={city} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:border-orange-400/50 hover:text-orange-500 transition-colors cursor-default">
                  <MapPin size={13} /> {city}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Comparison callout */}
          <Reveal>
            <div className="flex items-stretch gap-5 bg-orange-500/5 border border-orange-500/15 rounded-2xl p-7">
              <div className="w-1 rounded-full bg-orange-500 shrink-0" />
              <p className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white leading-snug">
                Static media owns one location. <span className="text-orange-500">ZyppAds moves across the city.</span>{" "}
                Campaigns can combine neighbourhood targeting, high-frequency routes, multiple physical formats and reporting in one operating plan.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHO ADVERTISES ── Sector chips */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-4xl">
          <Reveal className="mb-10">
            <div className="text-sm font-bold text-orange-500 uppercase tracking-[0.2em] mb-3">Best For</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Brands That <span className="text-orange-500">Reach India.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
              ZyppAds works best for brands targeting urban India&apos;s working and aspirational class — the very demographic that uses Zypp every day.
            </p>
          </Reveal>

          <Reveal className="mb-10">
            <div className="flex flex-wrap gap-2.5">
              {SECTORS.map((s) => (
                <span key={s} className="px-4 py-2 rounded-full text-sm font-semibold bg-orange-500/10 text-orange-500 border border-orange-500/20 hover:bg-orange-500/20 transition-colors cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Inline media-plan CTA */}
          <Reveal>
            <div className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-orange-400/30 transition-colors">
              <div>
                <div className="text-sm font-bold text-orange-500 uppercase tracking-[0.2em] mb-2">Ready to Launch?</div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Get a Free Media Plan</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Share your audience, cities and campaign objective. We&apos;ll shape the right mix of formats, routes and deployment timelines.
                </p>
              </div>
              <a href="mailto:akash@zypp.app?subject=ZyppAds Campaign Inquiry" className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors shadow-xl shadow-orange-500/20">
                <Mail size={18} /> Get Free Media Plan
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <Reveal className="text-center mb-12">
            <div className="text-sm font-bold text-orange-500 uppercase tracking-[0.2em] mb-3">Frequently asked</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white">Planning a ZyppAds Campaign</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ADS_FAQS.map((item) => (
              <RevealItem key={item.q} className="rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-950 p-7 hover:border-orange-400/30 transition-colors">
                <h3 className="font-black text-gray-900 dark:text-white mb-3">{item.q}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.a}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── FINAL CTA ── dark gradient */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-orange-950/40 to-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #FF6B35 0%, transparent 60%)" }} />
        <div className="relative z-10 container mx-auto px-4">
          <Reveal>
            <div className="text-sm font-bold text-orange-400 uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-2">
              <Megaphone size={14} /> Advertise Now
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-5">
              Put Your Brand on <span className="text-orange-400">Every Street in India.</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Build a campaign across Zypp&apos;s electric fleet, delivery touchpoints and high-frequency urban routes—with execution and reporting connected from one team.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="mailto:akash@zypp.app?subject=ZyppAds Advertising Inquiry" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-orange-500 text-white font-bold text-base hover:bg-orange-600 transition-colors shadow-xl shadow-orange-500/30">
                <Megaphone size={18} /> Advertise with Zypp
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-5 rounded-full border border-white/25 text-white font-bold hover:bg-white/5 transition-colors">
                Get a Media Kit
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GET IN TOUCH ── */}
      <GetInTouchSection />
    </div>
  );
}

import Link from "next/link";
import {
  ArrowRight, Star, Check, X, Bike, Building2, Package,
  Home, BatteryFull, Smartphone, MapPin,
} from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { Icon3D } from "@/components/Icon3D";
import RiderHero from "@/components/riders/RiderHero";
import SavingsCalculator from "@/components/home/SavingsCalculator";
import GigKiAwaazSection from "@/components/home/GigKiAwaazSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import StepsSection from "@/components/StepsSection";
import GetInTouchSection from "@/components/home/GetInTouchSection";
import PartnersSection from "@/components/home/PartnersSection";
import { getContent } from "@/lib/cms";

type Help = { icon: string; title: string; href: string };
type Story = { name: string; role: string; earnings: string; quote: string };
type Step = { step: string; title: string; desc: string };
type Feature = { icon: string; title: string; desc: string };

const AVATAR_COLORS = [
  "from-emerald-500 to-teal-500",
  "from-blue-500 to-indigo-500",
  "from-orange-500 to-amber-500",
];

const SERVICES = [
  {
    Icon: Bike, glyph: "🛵",
    title: "2-Wheeler Rental (B2C)",
    desc: "Rent an EV scooter daily. Work with any platform — Zomato, Swiggy, Blinkit, Zepto, Rapido. No EMI, no downpayment. Battery swap in under 2 minutes.",
    tag: "Most Popular",
    tagColor: "text-primary bg-primary/10 border-primary/20",
    href: "/2w-Service-Zypp-Pilot",
  },
  {
    Icon: Building2, glyph: "🏢",
    title: "Zypp Pilot (B2B)",
    desc: "Dedicated fleet for enterprise delivery partners. Your platform gets guaranteed EV throughput with SLA-backed uptime. We manage everything below.",
    tag: "Enterprise",
    tagColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    href: "/zypp-pilot",
  },
  {
    Icon: Package, glyph: "📦",
    title: "3-Wheeler Loader",
    desc: "For large-order and cargo deliveries. Electric loaders ideal for Blinkit, BigBasket, Flipkart. Zero emissions, higher payload capacity.",
    tag: "Cargo",
    tagColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    href: "/3w-Service-Zypp-Pilot",
  },
  {
    Icon: Home, glyph: "🏠",
    title: "Rent to Own",
    desc: "Start renting today, own your EV in 24–36 months. No bank loan needed. Rental payments count toward ownership. Build an asset while you earn.",
    tag: "Asset Building",
    tagColor: "text-violet-500 bg-violet-500/10 border-violet-500/20",
    href: "/zypp-pilot",
  },
  {
    Icon: BatteryFull, glyph: "🔋",
    title: "Battery Swap Network",
    desc: "1,500+ swap stations across 8 cities. Swap a depleted battery for a charged one in under 2 minutes. Available every 5 km in operating zones.",
    tag: "Infrastructure",
    tagColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    href: "/zypp-pilot",
  },
  {
    Icon: Smartphone, glyph: "📱",
    title: "Zypp Pilot App",
    desc: "Track earnings, find nearest swap stations, manage your KYC, check maintenance status — all in one app. 4.7 stars on Play Store.",
    tag: "Digital",
    tagColor: "text-primary bg-primary/10 border-primary/20",
    href: "/zypp-pilot",
  },
];

const EV_VS_PETROL = [
  { item: "Fuel / Energy / month", ev: "~₹0 (battery swap)", petrol: "₹6,000–8,000", evGood: true },
  { item: "Vehicle EMI / Rental", ev: "₹240/day flexible", petrol: "₹3,500–5,000 EMI", evGood: true },
  { item: "Maintenance & Repairs", ev: "₹0 (Zypp covers it)", petrol: "₹800–1,500", evGood: true },
  { item: "Breakdown Downtime", ev: "20-min response, 96% uptime", petrol: "Unpredictable loss", evGood: true },
  { item: "Insurance", ev: "Included", petrol: "₹400–600", evGood: true },
  { item: "Downpayment", ev: "₹0", petrol: "₹15,000–20,000", evGood: true },
  { item: "Monthly savings with Zypp", ev: "+₹5,100/month more", petrol: "₹0", evGood: true, highlight: true },
];

const CITIES = [
  "Delhi · Gurgaon · Noida", "Bangalore", "Hyderabad",
  "Mumbai", "Pune", "Goa", "Jaipur", "Chandigarh",
];

const STEPS = [
  { n: "01", emoji: "📋", title: "Download the App", desc: "Download Zypp Pilot from Play Store or App Store. Create your account with your phone number." },
  { n: "02", emoji: "🪪", title: "Complete KYC", desc: "Upload Aadhaar, PAN, and bank details digitally. Takes under 10 minutes. Verified within 24 hours." },
  { n: "03", emoji: "🛵", title: "Pick Your EV", desc: "Choose your preferred scooter model — 2W swapping bike or 3W loader — at your nearest Zypp hub." },
  { n: "04", emoji: "💰", title: "Start Earning", desc: "Activate on your delivery platform of choice. Begin earning same day. Support available 24/7." },
];

export default function RidersPage() {
  const c = getContent("riders");
  const help = c.help as Record<string, unknown>;
  const testi = c.testimonials as Record<string, unknown>;
  const stepsSec = c.steps as Record<string, unknown>;
  const whySec = c.why as Record<string, unknown>;
  const savings = c.savings as Record<string, unknown>;

  const helpItems = (help.items ?? []) as Help[];
  const stories = (testi.items ?? []) as Story[];
  const features = (whySec.items ?? []) as Feature[];

  return (
    <div className="w-full bg-background">

      {/* ── HERO ── existing animated component — kept as-is */}
      <RiderHero content={c.hero as never} />

      {/* ── STAT STRIP ── */}
      <section className="bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800">
        <Reveal>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100 dark:divide-slate-800">
              {[
                { n: "2.5L+", l: "Active Riders" },
                { n: "₹35–45K", l: "Avg Monthly Earnings" },
                { n: "1,500+", l: "Swap Stations" },
                { n: "8 Cities", l: "Pan-India Coverage" },
              ].map((s) => (
                <div key={s.l} className="py-8 px-6 text-center">
                  <div className="text-3xl md:text-4xl font-black text-primary mb-1">{s.n}</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── HOW CAN WE HELP ── quick-link cards */}
      {helpItems.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
          <div className="container mx-auto px-4">
            <Reveal className="mb-12">
              <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Get Help</div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                {String(help.heading ?? "How Can We Help?")} <span className="text-primary">You.</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg mt-3">{String(help.subheading ?? "")}</p>
            </Reveal>
            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {helpItems.map((h) => (
                <RevealItem key={h.title}>
                  <Link href={h.href} data-track={`Rider Help ${h.title}`}
                    className="group h-full flex flex-col gap-4 rounded-3xl bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 p-6 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                    <Icon3D glyph={h.icon} size={52} />
                    <div className="font-bold text-gray-900 dark:text-white leading-snug flex-1">{h.title}</div>
                    <span className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      )}

      {/* ── 6 SERVICES ── TailwindsSection pattern */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Reveal className="mb-12">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Our Services</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Pick Your Ride. <span className="text-primary">We Handle the Rest.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
              Six ways to partner with Zypp — from daily rentals to cargo fleets to full ownership.
            </p>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <RevealItem key={s.title}>
                <Link href={s.href} className="h-full flex flex-col bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-4xl">{s.glyph}</span>
                    <span className="text-5xl font-black opacity-10 text-primary">0{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className={`inline-flex items-center text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border mb-3 ${s.tagColor}`}>
                      {s.tag}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ArrowRight size={14} />
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ── EV VS PETROL ── comparison table */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <Reveal className="mb-12">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">The Math</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Zypp EV vs <span className="text-amber-500">Petrol Bike.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3">
              Same roads. Same hours. The difference is what stays in your pocket.
            </p>
          </Reveal>
          <Reveal>
            <div className="bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[560px]">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-slate-800">
                      <th className="p-5 text-xs font-bold uppercase tracking-widest text-gray-400 w-2/5">Cost Item</th>
                      <th className="p-5 text-center text-sm font-bold text-primary w-[30%]">🟢 Zypp EV</th>
                      <th className="p-5 text-center text-sm font-bold text-gray-400 w-[30%]">⛽ Petrol Bike</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                    {EV_VS_PETROL.map((row) => (
                      <tr key={row.item} className={`transition-colors ${row.highlight ? "bg-primary/5" : "hover:bg-gray-50 dark:hover:bg-slate-900"}`}>
                        <td className={`p-5 text-sm ${row.highlight ? "font-bold text-gray-900 dark:text-white" : "font-semibold text-gray-700 dark:text-gray-300"}`}>{row.item}</td>
                        <td className={`p-5 text-center text-sm font-bold ${row.highlight ? "text-primary text-base" : "text-primary"}`}>{row.ev}</td>
                        <td className={`p-5 text-center text-sm font-semibold ${row.highlight ? "text-red-400 line-through" : "text-gray-400"}`}>{row.petrol}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOW TO JOIN — 4 Steps ── */}
      <StepsSection
        eyebrow="Get Started"
        heading="On the Road"
        highlight="in 4 Steps."
        steps={STEPS.map((s) => ({ step: s.n, title: s.title, desc: s.desc }))}
      />
      <div className="bg-white dark:bg-slate-950 pb-20 -mt-8 text-center">
        <a href="https://play.google.com/store/apps/details?id=com.zyppdelivery" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-primary text-white font-bold text-base hover:bg-primary/90 transition-colors shadow-xl shadow-primary/30">
          Download Now &amp; Start Earning <ArrowRight size={18} />
        </a>
      </div>

      {/* ── RIDER STORIES ── */}
      {stories.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
          <div className="container mx-auto px-4">
            <Reveal className="flex items-end justify-between flex-wrap gap-4 mb-12">
              <div>
                <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Real Stories</div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                  What Our <span className="text-primary">Riders Say.</span>
                </h2>
              </div>
              <Link href="https://youtube.com/@GigKiAwaaz" target="_blank" rel="noopener" className="text-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                Watch 50+ Stories on Gig Ki Awaaz <ArrowRight size={14} />
              </Link>
            </Reveal>
            <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stories.map((t, i) => (
                <RevealItem key={t.name}>
                  <div className="h-full bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white font-black text-lg shrink-0`}>
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white leading-tight">{t.name}</div>
                        <div className="text-xs text-gray-400">{t.role}</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-3 text-amber-400">
                      {Array.from({ length: 5 }).map((_, s) => <Star key={s} size={14} fill="currentColor" strokeWidth={0} />)}
                    </div>
                    <div className="text-2xl font-black text-primary mb-3">{t.earnings}</div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      )}

      {/* ── WHY RIDERS CHOOSE ZYPP ── */}
      {features.length > 0 && (
        <section className="py-20 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <Reveal className="mb-12">
              <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Why Zypp</div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                {String(whySec.heading ?? "Why Riders Choose Zypp.")}
              </h2>
            </Reveal>
            <RevealStagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {features.map((f) => (
                <RevealItem key={f.title}>
                  <div className="h-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 text-center hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <Icon3D glyph={f.icon} size={42} className="mx-auto mb-3" />
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{f.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      )}

      {/* ── CITY COVERAGE ── */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="mb-10">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Where We Are</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              Available in <span className="text-primary">8 Cities.</span>
            </h2>
          </Reveal>
          <Reveal className="mb-6">
            <div className="flex flex-wrap gap-2.5">
              {CITIES.map((city) => (
                <span key={city} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold text-sm cursor-default hover:bg-primary/20 transition-colors">
                  <MapPin size={13} /> {city}
                </span>
              ))}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-5">
              Not in your city yet?{" "}
              <Link href="/contact" className="text-primary font-semibold hover:underline">Register your interest</Link>
              {" "}— we&apos;ll notify you when we launch near you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── SAVINGS CALCULATOR ── */}
      <SavingsCalculator />

      {/* ── GIG KI AWAAZ ── */}
      <GigKiAwaazSection />

      {/* ── TESTIMONIALS ── shared home component */}
      <TestimonialsSection />

      {/* ── PARTNERS ── */}
      <PartnersSection />

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── FINAL CTA ── dark gradient */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #00BC84 0%, transparent 60%)" }} />
        <div className="relative z-10 container mx-auto px-4">
          <Reveal>
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Start Today</div>
            <h2 className="text-3xl md:text-5xl font-black mb-5">Start Earning Today.</h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              Join 2.5 Lakh+ gig entrepreneurs already riding with Zypp. Zero downpayment. Start earning today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://play.google.com/store/apps/details?id=com.zyppdelivery" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-primary text-white font-bold text-base hover:bg-primary/90 transition-colors shadow-xl shadow-primary/30">
                Download Zypp Pilot App <ArrowRight size={18} />
              </a>
              <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-5 rounded-full border border-white/25 text-white font-bold hover:bg-white/5 transition-colors">
                Talk to Us
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

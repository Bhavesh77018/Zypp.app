import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { getContent } from "@/lib/cms";
import ContactForm from "@/components/ContactForm";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";

type QuickContact = { iconType: string; label: string; val: string; href: string };
type Office = { city: string; address: string; phone: string };

// "Choose Your Door" — route each visitor to the right path (folder content).
const DOORS = [
  { icon: "🛵", title: "I Want to Ride with Zypp", desc: "Download the Zypp Pilot App, complete your KYC, and start earning. Available in 8 cities.", cta: "Download App", href: "https://play.google.com/store/apps/details?id=com.zyppdelivery", external: true },
  { icon: "🏢", title: "I'm a Delivery Platform / Enterprise", desc: "Want guaranteed EV uptime for your last-mile operations? Talk to our enterprise team.", cta: "Enterprise Solutions", href: "/ev-for-delivery", external: false },
  { icon: "🏙️", title: "I Want a Zypp Franchise", desc: "Own the EV delivery infrastructure in your city. 15+ cities available. First mover wins.", cta: "Apply for Franchise", href: "/franchise", external: false },
  { icon: "💻", title: "I Want to Try FleetEase.ai", desc: "AI-powered EV fleet management SaaS. Book a 30-minute live demo for your fleet.", cta: "Request Demo", href: "/fleetease", external: false },
  { icon: "📢", title: "I Want to Advertise on Zypp", desc: "Reach urban India via 26,000+ branded EVs at ₹0.10 CPV. Get a free media plan.", cta: "Get Media Plan", href: "/advertising", external: false },
  { icon: "📈", title: "I'm an Investor", desc: "Pre-IPO round open. $25–30M. FY28 IPO. EBITDA positive — the last private entry before listing.", cta: "Investor Inquiry", href: "/investors", external: false },
];

export default function ContactPage() {
  const c = getContent("contact");
  const hero = c.hero as Record<string, string>;
  const form = c.form as Record<string, unknown>;
  const quick = c.quickContact as Record<string, unknown>;
  const officesSec = c.offices as Record<string, unknown>;

  const reasons = ((form.reasons ?? []) as { label: string }[]).map((r) => r.label);
  const quickItems = (quick.items ?? []) as QuickContact[];
  const offices = (officesSec.items ?? []) as Office[];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative bg-slate-900 pt-32 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #00BC84 0%, transparent 60%)" }} />
        <div className="relative z-10 container mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/30">
            {hero.badge}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{hero.heading}</h1>
          <p className="text-xl text-white/60 max-w-xl mx-auto">{hero.subtitle}</p>
        </div>
      </section>

      {/* Choose Your Door */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="text-center mb-12">
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">What brings you here?</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Choose Your Door.</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOORS.map((d) => (
              <RevealItem key={d.title}>
                <Link
                  href={d.href}
                  {...(d.external ? { target: "_blank", rel: "noopener" } : {})}
                  className="group h-full flex flex-col bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-primary/30 transition-all duration-300"
                >
                  <span className="text-3xl mb-4">{d.icon}</span>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{d.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">{d.desc}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                    {d.cta} <ArrowRight size={15} />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                <ContactForm heading={String(form.heading)} reasonLabel={String(form.reasonLabel)} reasons={reasons} />
              </div>
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {/* Quick contacts */}
              <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <h3 className="font-extrabold text-gray-900 dark:text-white mb-5">{String(quick.heading)}</h3>
                <div className="flex flex-col gap-4">
                  {quickItems.map((q) => {
                    const Icon = q.iconType === "phone" ? Phone : Mail;
                    return (
                      <a key={q.val} href={q.href} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon size={16} className="text-primary" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">{q.label}</div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{q.val}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Offices */}
              <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                <h3 className="font-extrabold text-gray-900 dark:text-white mb-5">{String(officesSec.heading)}</h3>
                <div className="flex flex-col gap-4">
                  {offices.map((o) => (
                    <div key={o.city} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin size={14} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-gray-900 dark:text-white">{o.city}</div>
                        <div className="text-xs text-gray-400 leading-relaxed">{o.address}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-sm flex-1 min-h-[200px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.449!2d77.0715!3d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzM0LjIiTiA3N8KwMDQnMTcuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%" height="220" style={{ border: 0 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Zypp HQ Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

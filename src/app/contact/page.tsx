import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { getContent } from "@/lib/cms";
import ContactForm from "@/components/ContactForm";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";

export const metadata = {
  title: "Contact Zypp Electric — Riders, Partners, Franchise & Press",
  description: "Reach the right Zypp team fast: rider onboarding, enterprise fleets, franchise, advertising, FleetEase demos and investor relations. Offices in Gurugram.",
};

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

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string; role?: string }>;
}) {
  const { reason, role } = await searchParams;
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
                <ContactForm
                  heading={String(form.heading)}
                  reasonLabel={String(form.reasonLabel)}
                  reasons={reasons}
                  initialReason={reason}
                  initialMessage={role ? `Applying for: ${role}` : undefined}
                />
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
                {/* WhatsApp — the channel most riders actually use */}
                <a
                  href="https://wa.me/919289222111?text=Hi%20Zypp%2C%20I%27d%20like%20to%20know%20more"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="WhatsApp Contact"
                  className="mt-5 flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#1fb857] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#25D366]/25"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.07-.12-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.83 9.83 0 01-1.51-5.24c0-5.44 4.43-9.87 9.89-9.87a9.8 9.8 0 016.98 2.9 9.8 9.8 0 012.9 6.99c0 5.44-4.44 9.86-9.88 9.86zm8.4-18.25A11.8 11.8 0 0012.04 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.95L.06 24l6.3-1.65a11.9 11.9 0 005.69 1.45C18.6 23.8 24 18.46 24 11.9a11.82 11.82 0 00-3.54-8.36z" />
                  </svg>
                  Chat with us on WhatsApp
                </a>
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

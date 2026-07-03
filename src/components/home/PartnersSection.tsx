import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { TreePine, Leaf } from "lucide-react";
import { getDefaults } from "@/lib/content";

type PartnersContent = {
  heading: string;
  subheading: string;
  investorsLabel: string;
  investorsHeading: string;
  deliveryPartners: { name: string; color: string }[];
  partnerImpact: { name: string; color: string; co2: string; deliveries: string }[];
  investors: { name: string }[];
};

const FALLBACK = getDefaults("home").partners as unknown as PartnersContent;

// Real cumulative CO₂ saved per platform (tonnes, from Zypp impact data).
// Trees ≈ 4.6 saplings-equivalent per tonne of CO₂ avoided.
const PARTNER_IMPACT: { name: string; color: string; co2: number }[] = [
  { name: "Zomato", color: "#E23744", co2: 78961 },
  { name: "Blinkit", color: "#F8CB46", co2: 41056 },
  { name: "Zepto", color: "#7B2FF7", co2: 34543 },
  { name: "Porter", color: "#1A73E8", co2: 17234 },
  { name: "Swiggy", color: "#FC8019", co2: 7584 },
  { name: "Rapido", color: "#F5C518", co2: 6770 },
  { name: "Flipkart", color: "#2874F0", co2: 6087 },
  { name: "Big Basket", color: "#84B53A", co2: 3745 },
];

const treesLabel = (co2: number) => {
  const t = co2 * 4.6;
  return t >= 1000 ? (t / 1000).toFixed(1) + "k" : Math.round(t).toString();
};
const initials = (name: string) => name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

export default function PartnersSection({ content }: { content?: Partial<PartnersContent> }) {
  const c = { ...FALLBACK, ...content };

  return (
    <>
      {/* Delivery Partners */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{c.heading}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">{c.subheading}</p>
          </Reveal>

          <div className="marquee-pause relative overflow-hidden">
            <div className="flex gap-4 w-max animate-marquee">
              {[...(c.deliveryPartners ?? []), ...(c.deliveryPartners ?? [])].map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="shrink-0 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl py-5 px-10 flex items-center justify-center shadow-sm"
                >
                  <span className="text-lg font-black" style={{ color: p.color }}>{p.name}</span>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 dark:from-slate-900 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 dark:from-slate-900 to-transparent" />
          </div>

          {/* Per-partner CO₂ + trees impact */}
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {PARTNER_IMPACT.map((p) => (
              <RevealItem key={p.name}>
                <div className="group h-full bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0" style={{ backgroundColor: p.color }}>
                      {initials(p.name)}
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">{p.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-primary/5 border border-primary/10 p-3">
                      <div className="flex items-center gap-1 text-primary text-[11px] font-bold uppercase tracking-wide mb-0.5"><Leaf size={12} /> CO₂</div>
                      <div className="text-lg font-black text-gray-900 dark:text-white tabular-nums">{p.co2.toLocaleString("en-IN")}<span className="text-xs text-gray-400 font-bold"> T</span></div>
                    </div>
                    <div className="rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 p-3">
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-wide mb-0.5"><TreePine size={12} /> Trees</div>
                      <div className="text-lg font-black text-gray-900 dark:text-white tabular-nums">{treesLabel(p.co2)}</div>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
          <p className="text-center text-xs text-gray-400 mt-6">Cumulative CO₂ avoided vs equivalent petrol deliveries · trees-equivalent at 4.6 saplings per tonne.</p>
        </div>
      </section>

      {/* Investors */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-12">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{c.investorsLabel}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{c.investorsHeading}</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {(c.investors ?? []).map((inv) => (
              <div
                key={inv.name}
                className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl py-5 px-4 text-center hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-default"
              >
                <span className="font-bold text-sm text-gray-700 dark:text-gray-300">{inv.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

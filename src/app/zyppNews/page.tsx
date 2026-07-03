import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/cms";
import { RevealStagger, RevealItem } from "@/components/motion/Reveal";

type Article = { source: string; date: string; title: string; category: string };

const CATEGORY_COLORS: Record<string, string> = {
  Milestone: "bg-primary/10 text-primary",
  Funding: "bg-blue-500/10 text-blue-500",
  Impact: "bg-emerald-500/10 text-emerald-600",
  Feature: "bg-purple-500/10 text-purple-600",
  Technology: "bg-cyan-500/10 text-cyan-600",
  Riders: "bg-orange-500/10 text-orange-600",
  Expansion: "bg-pink-500/10 text-pink-600",
  Partnership: "bg-yellow-500/10 text-yellow-600",
  Market: "bg-indigo-500/10 text-indigo-600",
};

export default function NewsPage() {
  const c = getContent("zyppNews");
  const hero = c.hero as Record<string, string>;
  const articlesSec = c.articles as Record<string, unknown>;
  const press = c.press as Record<string, string>;
  const articles = (articlesSec.items ?? []) as Article[];
  const featured = articles[0];
  const rest = articles.slice(1);

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

      {/* Articles Grid */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          {/* Featured */}
          {featured && (
            <div className="mb-10">
              <div className="text-sm font-bold text-primary uppercase tracking-widest mb-6">{String(articlesSec.featuredLabel)}</div>
              <div className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 md:p-10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group cursor-pointer max-w-4xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${CATEGORY_COLORS[featured.category] || "bg-gray-100 text-gray-500"}`}>{featured.category}</span>
                  <span className="text-xs text-gray-400">{featured.source} · {featured.date}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-4">{featured.title}</h2>
                <div className="inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                  Read Article <ArrowRight size={14} />
                </div>
              </div>
            </div>
          )}

          {/* All Articles */}
          <div className="text-sm font-bold text-primary uppercase tracking-widest mb-6">{String(articlesSec.listLabel)}</div>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.05}>
            {rest.map((a) => (
              <RevealItem key={a.title} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${CATEGORY_COLORS[a.category] || "bg-gray-100 text-gray-500"}`}>{a.category}</span>
                  <span className="text-xs text-gray-400">{a.date}</span>
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{a.source}</div>
                <h3 className="font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors flex-1">{a.title}</h3>
                <div className="mt-4 inline-flex items-center gap-1 text-primary text-xs font-semibold group-hover:gap-2 transition-all">
                  Read <ArrowRight size={12} />
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3">{press.heading}</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">{press.body}</p>
          <a href={`mailto:${press.email}`} data-track="Press Email" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            {press.email} <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}

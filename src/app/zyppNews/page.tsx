import { ArrowRight } from "lucide-react";
import { getContent } from "@/lib/cms";
import NewsExplorer from "@/components/news/NewsExplorer";

export const metadata = {
  title: "Zypp Electric in the News — Press & Media Coverage",
  description: "The latest press coverage of Zypp Electric: funding, milestones, partnerships and India's EV-led quick-commerce revolution. Press contact: pr@zypp.app.",
};

type Article = { source: string; date: string; title: string; category: string; url?: string };

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

function FeaturedCard({ article }: { article: Article }) {
  const inner = (
    <>
      <div className="flex items-center gap-3 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${CATEGORY_COLORS[article.category] || "bg-gray-100 text-gray-500"}`}>{article.category}</span>
        <span className="text-xs text-gray-400">{article.source} · {article.date}</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-4">{article.title}</h2>
      {article.url && (
        <div className="inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
          Read Article <ArrowRight size={14} />
        </div>
      )}
    </>
  );
  const cls = "block bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 md:p-10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group max-w-4xl";
  return article.url
    ? <a href={article.url} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <div className={cls}>{inner}</div>;
}

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
              <FeaturedCard article={featured} />
            </div>
          )}

          {/* All Articles — client-side category filtering */}
          <NewsExplorer articles={rest} listLabel={String(articlesSec.listLabel)} />
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

"use client";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { RevealStagger, RevealItem } from "@/components/motion/Reveal";

export type NewsArticle = { source: string; date: string; title: string; category: string; url?: string };

export const CATEGORY_COLORS: Record<string, string> = {
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

function ArticleCard({ article }: { article: NewsArticle }) {
  const inner = (
    <>
      <div className="flex items-center gap-2 mb-3">
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${CATEGORY_COLORS[article.category] || "bg-gray-100 text-gray-500"}`}>{article.category}</span>
        <span className="text-xs text-gray-400">{article.date}</span>
      </div>
      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{article.source}</div>
      <h3 className="font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors flex-1">{article.title}</h3>
      {article.url && (
        <div className="mt-4 inline-flex items-center gap-1 text-primary text-xs font-semibold group-hover:gap-2 transition-all">
          Read <ArrowRight size={12} />
        </div>
      )}
    </>
  );
  const cls = "h-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col";
  return article.url
    ? <a href={article.url} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <div className={cls}>{inner}</div>;
}

export default function NewsExplorer({ articles, listLabel }: { articles: NewsArticle[]; listLabel: string }) {
  const [active, setActive] = useState("All");
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean)))],
    [articles]
  );
  const filtered = active === "All" ? articles : articles.filter((a) => a.category === active);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="text-sm font-bold text-primary uppercase tracking-widest">{listLabel}</div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                active === cat
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-primary/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm py-10">No articles in this category yet.</p>
      ) : (
        <RevealStagger key={active} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={0.05}>
          {filtered.map((a) => (
            <RevealItem key={a.title}>
              <ArticleCard article={a} />
            </RevealItem>
          ))}
        </RevealStagger>
      )}
    </>
  );
}

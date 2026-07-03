"use client";

import Link from "next/link";
import { LayoutTemplate, ArrowRight, ExternalLink } from "lucide-react";
import { PAGE_REGISTRY } from "@/lib/content";

export default function ContentIndexPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <LayoutTemplate size={24} className="text-primary" /> Site Content
        </h2>
        <p className="text-slate-400 mt-1 text-sm">
          Edit the text, links, stats and cards on your built-in pages — no code needed. Changes go live instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PAGE_REGISTRY.map((page) => (
          <div key={page.slug} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-white font-bold">{page.label}</h3>
                <p className="text-slate-500 text-xs font-mono mt-0.5">{page.path}</p>
              </div>
              <Link href={page.path} target="_blank" className="text-slate-500 hover:text-primary" title="View live">
                <ExternalLink size={16} />
              </Link>
            </div>
            <p className="text-slate-400 text-xs mb-4">
              {page.sections.length} editable section{page.sections.length !== 1 ? "s" : ""}: {page.sections.map((s) => s.label).join(", ")}
            </p>
            <Link
              href={`/admin/content/${page.slug}`}
              className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2.5 transition-all"
            >
              Edit content <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>

      <p className="text-slate-500 text-xs mt-6">
        More pages become editable here as they&apos;re connected to the content system.
      </p>
    </div>
  );
}

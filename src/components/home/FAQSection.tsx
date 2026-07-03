"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getDefaults } from "@/lib/content";

type FAQContent = { badge: string; heading: string; subheading: string; items: { q: string; a: string }[] };

const FALLBACK = getDefaults("home").faq as unknown as FAQContent;

export default function FAQSection({ content }: { content?: Partial<FAQContent> }) {
  const c = { ...FALLBACK, ...content };
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 border border-primary/20 uppercase tracking-widest">
            {c.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">{c.heading}</h2>
          <p className="text-lg text-muted">{c.subheading}</p>
        </div>

        <div className="flex flex-col gap-3">
          {(c.items ?? []).map((faq, i) => (
            <div key={i} className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open === i ? "border-primary/40 shadow-md shadow-primary/5" : "border-card-border"}`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-foreground hover:text-primary transition-colors gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown size={20} className={`shrink-0 transition-transform duration-300 ${open === i ? "rotate-180 text-primary" : "text-muted"}`} />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-muted text-sm leading-relaxed border-t border-card-border pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

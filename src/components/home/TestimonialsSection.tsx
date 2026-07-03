"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { getDefaults } from "@/lib/content";

type Testimonial = { name: string; city: string; earnings: string; quote: string; link: string };
type TestimonialsContent = { badge: string; heading: string; subheading: string; items: Testimonial[] };

const FALLBACK = getDefaults("home").testimonials as unknown as TestimonialsContent;

export default function TestimonialsSection({ content }: { content?: Partial<TestimonialsContent> }) {
  const c = { ...FALLBACK, ...content };
  const items = c.items ?? [];
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);
  const t = items[idx] ?? items[0];

  if (!t) return null;

  return (
    <section className="py-24 bg-card border-y border-card-border overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 border border-primary/20 uppercase tracking-widest">
            {c.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">{c.heading}</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">{c.subheading}</p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Card */}
          <div key={idx} className="bg-background border border-card-border rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
            <div className="text-6xl text-primary/20 font-serif leading-none mb-4">&ldquo;</div>
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">{t.quote}</p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-xl font-extrabold text-foreground">{t.name}</div>
                <div className="text-sm text-muted">{t.city} · {t.earnings}</div>
              </div>
              <a
                href={t.link} target="_blank" rel="noopener"
                data-track={`Watch ${t.name} Story`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Watch Story <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={prev} className="w-10 h-10 rounded-full bg-card border border-card-border text-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === idx ? "bg-primary w-6" : "bg-card-border"}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full bg-card border border-card-border text-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

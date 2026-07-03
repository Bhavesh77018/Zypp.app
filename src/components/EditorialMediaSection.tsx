import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

type EditorialMediaSectionProps = {
  eyebrow: string;
  heading: string;
  body: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  tags?: string[];
  caption?: string;
  reverse?: boolean;
  dark?: boolean;
  accentClass?: string;
};

export default function EditorialMediaSection({
  eyebrow,
  heading,
  body,
  image,
  imageAlt,
  ctaLabel,
  ctaHref,
  tags = [],
  caption,
  reverse = false,
  dark = false,
  accentClass = "text-primary",
}: EditorialMediaSectionProps) {
  return (
    <section className={`py-20 ${dark ? "bg-slate-950" : "bg-white dark:bg-slate-950"}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <Reveal>
          <div className={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[2rem] border ${dark ? "border-white/10 bg-white/[0.04]" : "border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900"}`}>
            <div className={`relative min-h-[430px] lg:min-h-[600px] overflow-hidden ${reverse ? "lg:order-2" : ""}`}>
              <Image src={image} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
              {caption && <div className="absolute left-6 right-6 bottom-6 text-xs font-black uppercase tracking-[0.18em] text-white/75">{caption}</div>}
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <div className={`text-sm font-bold uppercase tracking-[0.2em] mb-4 ${accentClass}`}>{eyebrow}</div>
              <h2 className={`text-3xl md:text-5xl font-black leading-[1.02] tracking-tight mb-6 ${dark ? "text-white" : "text-gray-900 dark:text-white"}`}>{heading}</h2>
              <p className={`text-lg leading-relaxed mb-8 ${dark ? "text-white/55" : "text-gray-500 dark:text-gray-400"}`}>{body}</p>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-9">
                  {tags.map((tag) => <span key={tag} className={`px-4 py-2 rounded-full border text-sm font-semibold ${dark ? "border-white/10 bg-white/5 text-white/75" : "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-gray-600 dark:text-gray-300"}`}>{tag}</span>)}
                </div>
              )}
              <Link href={ctaHref} className="inline-flex w-fit items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-bold hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/20">
                {ctaLabel} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

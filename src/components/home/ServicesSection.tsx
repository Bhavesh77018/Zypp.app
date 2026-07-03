import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon3D } from "@/components/Icon3D";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { getDefaults } from "@/lib/content";

type ServicesContent = {
  heading: string;
  subheading: string;
  items: { icon: string; title: string; desc: string; href: string }[];
};

const FALLBACK = getDefaults("home").services as unknown as ServicesContent;

export default function ServicesSection({ content }: { content?: Partial<ServicesContent> }) {
  const c = { ...FALLBACK, ...content };

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <Reveal className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">{c.heading}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">{c.subheading}</p>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.items.map((s) => (
            <RevealItem key={s.title}>
              <Link
                href={s.href}
                data-track={s.title}
                className="group h-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 hover:border-primary/30 flex flex-col gap-4"
              >
                <Icon3D glyph={s.icon} />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  Learn more <ArrowRight size={15} />
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

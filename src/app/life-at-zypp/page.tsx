import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Headphones, Mic2, PlayCircle } from "lucide-react";
import { getContent } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { Icon3D } from "@/components/Icon3D";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";

type Culture = { icon: string; title: string; desc: string };
type Story = { name: string; role: string; quote: string };

const MEDIA_STORIES = [
  { eyebrow: "Rider story", title: "The road to independence", image: "/media/life-rider.webp", href: "https://youtube.com/@GigKiAwaaz" },
  { eyebrow: "From the hub", title: "People who keep every ride moving", image: "/media/life-team.webp", href: "https://youtube.com/@GigKiAwaaz" },
  { eyebrow: "Founder journal", title: "Building for India's gig economy", image: "/media/founder-short.jpg", href: "https://instagram.com/kaashseakash" },
];

const LISTEN_PATHS = [
  { audience: "For riders", title: "Work, family and freedom", body: "Conversations about the everyday wins, pressures and ambitions behind delivery work." },
  { audience: "For employees", title: "Building from the field", body: "What teams learn when product, operations and rider empathy meet on the ground." },
  { audience: "For partners", title: "The system behind the ride", body: "Voices from operators and collaborators shaping cleaner last-mile mobility." },
];

const GALLERY = [
  { image: "/media/life-team.webp", label: "Teams learning in the field" },
  { image: "/media/life-rider.webp", label: "Rider moments from the road" },
  { image: "/media/gig-ki-awaaz.webp", label: "Conversations that give gig work a voice" },
  { image: "/media/rider-roshan.jpg", label: "Everyday people, real momentum" },
];

export default function LifeAtZyppPage() {
  const c = getContent("life-at-zypp");
  const hero = c.hero as Record<string, string>;
  const cultureSec = c.culture as Record<string, unknown>;
  const photosSec = c.photos as Record<string, unknown>;
  const testimonialsSec = c.testimonials as Record<string, unknown>;
  const cta = c.ctaBanner as Record<string, string>;
  const culture = (cultureSec.items ?? []) as Culture[];
  const stories = (testimonialsSec.items ?? []) as Story[];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-[calc(100svh-64px)] flex items-center overflow-hidden bg-slate-900 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900" />
        <HeroVideoBackdrop image="/media/life-team.webp" accent="green" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 60% 40%, #00BC84 0%, transparent 50%)" }} />
        <Reveal className="relative z-10 container mx-auto px-4 py-10 md:py-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-6 border border-primary/30">
            {hero.badge}
          </div>
          <h1 className="text-[clamp(2.1rem,4.2vw,3.4rem)] font-black leading-[0.98] tracking-[-0.04em] text-white mb-7">
            {hero.titlePrefix}<span className="text-primary">{hero.titleHighlight}</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">{hero.subtitle}</p>
          <Link href={hero.ctaLink} data-track="Life CTA Careers" className="px-10 py-4 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 inline-flex items-center gap-2">
            {hero.ctaLabel} <ArrowRight size={20} />
          </Link>
        </Reveal>
      </section>

      {/* Culture */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(cultureSec.eyebrow)}</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{String(cultureSec.heading)}</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {culture.map((item) => (
              <RevealItem key={item.title} className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <Icon3D glyph={item.icon} size={44} className="mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Reels and short stories */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">
            <div>
              <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Stories in motion</div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">Fast stories from the road<br /><span className="text-primary">and the room.</span></h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">Short-form moments bring riders, employees and the people building the platform into one shared story.</p>
          </Reveal>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MEDIA_STORIES.map((item) => (
              <RevealItem key={item.title}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="group relative block min-h-[440px] overflow-hidden rounded-3xl bg-slate-950 border border-gray-100 dark:border-slate-800 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                  <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/15 border border-white/25 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary group-hover:border-primary transition-colors"><PlayCircle size={22} /></div>
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                    <div className="text-xs font-black uppercase tracking-[0.18em] text-primary mb-3">{item.eyebrow}</div>
                    <h3 className="text-2xl font-black leading-tight">{item.title}</h3>
                  </div>
                </a>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Gig Ki Awaaj podcast */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(0,188,132,0.24),transparent_42%)]" />
        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
            <Reveal direction="right">
              <div className="relative aspect-square max-w-[520px] mx-auto overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
                <Image src="/media/gig-ki-awaaz.webp" alt="Gig Ki Awaaj conversation" fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-primary/10" />
                <div className="absolute left-7 right-7 bottom-7 flex items-center justify-between gap-4">
                  <div><div className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-2">A Zypp original</div><div className="text-2xl font-black">Gig Ki Awaaj</div></div>
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/30"><Mic2 size={24} /></div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left">
              <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-xs mb-5"><Headphones size={17} /> Podcasts &amp; conversations</div>
              <h2 className="text-4xl md:text-6xl font-black leading-[0.98] tracking-tight mb-6">The gig economy,<br /><span className="text-primary">in its own voice.</span></h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-2xl">Gig Ki Awaaj creates space for riders to speak about work, dignity, family, ambition and change&mdash;in conversations shaped around lived experience, not corporate talking points.</p>
              <a href="https://youtube.com/@GigKiAwaaz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-bold hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-xl shadow-primary/20">Listen to Gig Ki Awaaj <ArrowRight size={18} /></a>
            </Reveal>
          </div>

          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
            {LISTEN_PATHS.map((item) => (
              <RevealItem key={item.audience} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 hover:bg-white/[0.07] hover:border-primary/30 transition-colors">
                <div className="text-xs font-black uppercase tracking-[0.18em] text-primary mb-8">{item.audience}</div>
                <h3 className="text-xl font-black mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.body}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* Photo Wall */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(photosSec.eyebrow)}</div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{String(photosSec.heading)}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] gap-4 max-w-6xl mx-auto">
            {GALLERY.map((item, i) => (
              <figure key={item.label} className={`group relative overflow-hidden rounded-3xl border border-gray-100 dark:border-slate-800 bg-slate-950 ${i === 0 ? "lg:row-span-2 lg:min-h-[576px]" : ""} ${i === 3 ? "lg:col-span-2" : ""}`}>
                <Image src={item.image} alt={item.label} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-[1.025] transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <figcaption className="absolute left-6 right-6 bottom-5 text-sm font-bold text-white">{item.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Employee Testimonials */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{String(testimonialsSec.eyebrow)}</div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">{String(testimonialsSec.heading)}</h2>
          </Reveal>
          <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {stories.map((t) => (
              <RevealItem key={t.name} className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <div className="text-4xl text-primary/20 font-serif leading-none mb-3">&ldquo;</div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic mb-4">{t.quote}</p>
                <div className="font-bold text-gray-900 dark:text-white text-sm">{t.name}</div>
                <div className="text-gray-400 text-xs">{t.role}</div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-4">{cta.heading}</h2>
          <p className="text-lg opacity-80 mb-8">{cta.body}</p>
          <Link href={cta.ctaLink} data-track="Life Final CTA" className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white text-primary font-bold hover:bg-white/90 transition-colors shadow-xl">
            {cta.ctaLabel} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

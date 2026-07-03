import { Reveal } from "@/components/motion/Reveal";
import { Camera, Share2, Play, Mic, Trophy, BookOpen, ExternalLink, MessageCircle } from "lucide-react";
import Image from "next/image";

export type FounderInfo = {
  name: string;
  role: string;
  initials: string;
  imageSrc?: string;
  bio: string;
};

// Socials and highlights are kept hardcoded here for simplicity/icons, 
// but the core CMS text (bio, names) is injected via props.
const FALLBACK_HIGHLIGHTS: Record<string, { icon: React.ElementType; text: string }[]> = {
  "Akash Gupta": [
    { icon: Trophy, text: "IMT Ghaziabad Distinguished Alumni" },
    { icon: BookOpen, text: "HarperCollins Book Deal" },
    { icon: Mic, text: "Host of Gig Ki Awaaz Podcast" },
  ],
  "Rashi Agarwal": [
    { icon: Trophy, text: "Business World 40 Under 40" },
    { icon: Share2, text: "Led major OEM Partnerships" },
    { icon: Trophy, text: "Top Women Entrepreneurs in India" },
  ]
};

const FALLBACK_SOCIALS: Record<string, { label: string; href: string; icon: React.ElementType }[]> = {
  "Akash Gupta": [
    { label: "Instagram", href: "https://instagram.com/kaashseakash", icon: Camera },
    { label: "LinkedIn", href: "https://linkedin.com/in/akashg", icon: ExternalLink },
    { label: "YouTube", href: "https://youtube.com/@GigKiAwaaz", icon: Play },
  ],
  "Rashi Agarwal": [
    { label: "LinkedIn", href: "https://linkedin.com/in/rashi-agarwal-zypp", icon: ExternalLink },
    { label: "Twitter", href: "https://twitter.com/RashiA_Zypp", icon: MessageCircle },
  ]
};

export default function FoundersSection({ people = [] }: { people?: FounderInfo[] }) {
  if (!people || people.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950/50">
      <div className="absolute inset-0 bg-[url('/media/grid.svg')] opacity-[0.03]" />
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        <Reveal className="text-center mb-16 md:mb-24">
          <div className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">The Founders</div>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">
            Built on Hustle. <span className="text-primary">Not Heritage.</span>
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            The visionary leaders obsessed with decarbonizing last-mile delivery and transforming the gig economy in India.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {people.map((f, idx) => {
            const highlights = FALLBACK_HIGHLIGHTS[f.name] || [];
            const socials = FALLBACK_SOCIALS[f.name] || [];

            return (
              <Reveal key={f.name} direction={idx === 0 ? "left" : "right"} delay={idx * 0.2}>
                <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-150" />
                  
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                    {/* Avatar / Image */}
                    <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-xl shrink-0 border-4 border-white dark:border-slate-800 relative bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-black text-4xl">
                      {f.imageSrc ? (
                        <Image src={f.imageSrc} alt={f.name} fill className="object-cover" />
                      ) : (
                        f.initials
                      )}
                    </div>
                    <div className="text-center sm:text-left pt-2">
                      <h3 className="text-3xl font-black text-foreground mb-1">{f.name}</h3>
                      <p className="text-primary font-bold tracking-widest uppercase text-sm">{f.role}</p>
                      
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                        {socials.map(s => (
                          <a key={s.label} href={s.href} target="_blank" rel="noopener" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-colors" title={s.label}>
                            <s.icon size={18} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted text-lg leading-relaxed mb-10 flex-1">
                    {f.bio}
                  </p>

                  {highlights.length > 0 && (
                    <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/50">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Highlights</h4>
                      <ul className="space-y-3">
                        {highlights.map(h => (
                          <li key={h.text} className="flex items-center gap-3 text-sm font-semibold text-foreground">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                              <h.icon size={16} />
                            </div>
                            {h.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}

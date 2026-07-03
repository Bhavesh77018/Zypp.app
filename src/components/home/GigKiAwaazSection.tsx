import Image from "next/image";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";
import { Mic } from "lucide-react";

// Real Gig Ki Awaaz episode thumbnails (YouTube), each linking to the episode.
const EPISODES = [
  { thumb: "/media/founder-short.jpg", title: "Naukri se acha hai delivery ka kaam", who: "Raju Kumar · Delhi NCR", href: "https://youtube.com/@GigKiAwaaz" },
  { thumb: "/media/rider-raju.jpg", title: "From daily wage to micro-entrepreneur", who: "A Zypp Pilot story", href: "https://youtube.com/@GigKiAwaaz" },
  { thumb: "/media/rider-roshan.jpg", title: "₹40,000+ a month, with time for family", who: "A Zypp Pilot story", href: "https://youtube.com/@GigKiAwaaz" },
];

export default function GigKiAwaazSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <Reveal>
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2"><Mic size={15} /> Gig Ki Awaaz</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">India&apos;s Only Podcast<br /><span className="text-primary">by Gig Workers.</span></h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">50+ documented episodes. Every story real, every number verified. Hosted by founder Akash Gupta.</p>
          </Reveal>
          <a
            href="https://youtube.com/@GigKiAwaaz"
            target="_blank"
            rel="noopener"
            data-track="Gig Ki Awaaz Channel"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/40 text-primary font-semibold hover:bg-primary/5 transition-colors"
          >
            Watch all episodes ↗
          </a>
        </div>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EPISODES.map((e) => (
            <RevealItem key={e.thumb}>
              <a href={e.href} target="_blank" rel="noopener" className="group block rounded-2xl overflow-hidden bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={e.thumb} alt={e.title} width={640} height={360} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <div className="w-0 h-0 border-t-[9px] border-t-transparent border-l-[15px] border-l-primary border-b-[9px] border-b-transparent ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors">{e.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{e.who}</p>
                </div>
              </a>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

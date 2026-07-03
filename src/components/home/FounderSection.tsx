import { Reveal } from "@/components/motion/Reveal";
import { Camera, Share2, Play, Mic, Trophy, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import FounderAvatar from "@/components/home/FounderAvatar";

// "Built on Hustle. Not Heritage." — the founder as the brand. Folder content,
// rendered in our design language. The avatar uses initials by default; drop a
// real photo at /public/akash-gupta.jpg to swap it in.
const LINKS: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: "Instagram", href: "https://instagram.com/kaashseakash", Icon: Camera },
  { label: "YouTube", href: "https://youtube.com/@KaashSeAkash", Icon: Play },
  { label: "LinkedIn", href: "https://linkedin.com/in/akashg", Icon: Share2 },
  { label: "Gig Ki Awaaz", href: "https://youtube.com/@GigKiAwaaz", Icon: Mic },
];

const RECOGNITION: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: Trophy, title: "IMT Ghaziabad Distinguished Alumni", desc: "Youngest recipient in 20-year history · Presented by Dr. Shashi Tharoor" },
  { Icon: BookOpen, title: "HarperCollins Book Deal", desc: "Business memoir — the journey from Jaipur to IPO" },
  { Icon: Mic, title: "Gig Ki Awaaz Podcast", desc: "50+ episodes · India's only podcast by gig workers" },
];

export default function FounderSection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 max-w-5xl">
        <Reveal className="mb-12">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">The Founder</div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
            Built on Hustle. <span className="text-primary">Not Heritage.</span>
          </h2>
        </Reveal>

        <div className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start">
          <div className="flex flex-col items-center md:items-start gap-4">
            <FounderAvatar className="w-28 h-28" />
            <div className="text-center md:text-left">
              <div className="font-black text-xl text-gray-900 dark:text-white">Akash Gupta</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">Co-Founder &amp; CEO</div>
            </div>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              <strong className="text-gray-900 dark:text-white">8 years. 22 pivots.</strong> Started in Jaipur and built Zypp
              through every crisis, every city, every pivot — the kind of founder obsession that cannot be hired.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              <strong className="text-gray-900 dark:text-white">500K+ followers @KaashSeAkash.</strong> The founder is the brand —
              rider acquisition cost is near-zero because riders trust the face behind the company. Host of Gig Ki Awaaz,
              India&apos;s only podcast by gig workers.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {LINKS.map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm font-semibold text-primary border border-primary/30 rounded-full px-4 py-2 hover:bg-primary/5 transition-colors">
                  <l.Icon size={15} strokeWidth={2} /> {l.label}
                </a>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {RECOGNITION.map((r) => (
                <div key={r.title} className="bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl p-4">
                  <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                    <r.Icon size={18} strokeWidth={2} />
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white text-sm leading-snug mb-1">{r.title}</div>
                  <div className="text-gray-500 dark:text-gray-400 text-xs leading-snug">{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

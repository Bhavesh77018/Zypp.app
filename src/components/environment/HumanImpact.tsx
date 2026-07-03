"use client";

import { Mic, ArrowRight } from "lucide-react";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";

const stories = [
  {
    income: "₹42K/mo",
    name: "Raju Kumar",
    details: "Delhi NCR · Rapido Rider · 1 yr",
    before: "Daily wage ₹12K",
    after: "Micro-entrepreneur",
    quote: "Naukri se acha hai delivery ka kaam. Pehle koi loan nahi deta tha. Zypp ne mujhe chance diya.",
  },
  {
    income: "₹1L/mo",
    name: "Maqsood Sheikh",
    details: "Bengaluru · Zepto Rider · 2 yrs",
    before: "Cloud Kitchen",
    after: "₹1 Lakh earner",
    quote: "Delivery karke monthly income ₹1,00,000. Zypp ki battery swap se time aur paise dono bachte hain.",
  },
  {
    income: "₹30K/mo",
    name: "Ujala Mandal",
    details: "Delhi NCR · Porter Rider · 5 yrs",
    before: "Village migrant",
    after: "5 yrs stable income",
    quote: "EV vs petrol — main Zypp choose karti hoon kyunki maintenance ka tension nahi.",
  },
  {
    income: "₹80K/mo",
    name: "Mukmal Hussain",
    details: "Hyderabad · Swiggy Rider · 4 mos",
    before: "Metro supervisor",
    after: "3× income",
    quote: "Ek beti pilot banegi, dusri commando. Zypp se paise bachaye hain — unka sapna poora karunga.",
  },
  {
    income: "₹40K/mo",
    name: "Gaurav Kumar",
    details: "Mumbai · Rapido Rider · 4 yrs",
    before: "Student",
    after: "Self-sufficient at 22",
    quote: "Zypp ne mujhe college ke saath earning ka mauka diya. Ab main apna kharcha khud uthata hoon.",
  },
  {
    income: "₹52K/mo",
    name: "Amit",
    details: "Delhi NCR · Blinkit Rider · 6 mos",
    before: "Labour work",
    after: "Hustle entrepreneur",
    quote: "Yeh sirf ek bike nahi hai. Yeh meri azadi hai. Zypp ne mujhe apni zindagi ka malik banaya.",
  },
];

export default function HumanImpact() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden border-y border-gray-100 dark:border-slate-900">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-emerald-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-4">Human Impact</div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white tracking-tight">
            The New Middle Class Is <span className="text-primary">Gig.</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            A Zypp rider earning ₹35–45K/month isn&apos;t a labourer — they&apos;re a micro-entrepreneur building wealth on
            hustle, not heritage. Impact isn&apos;t just carbon avoided; it&apos;s families fed and dreams funded.
          </p>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {stories.map((story, i) => (
            <RevealItem 
              key={i} 
              className="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-8 hover:border-primary/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className="font-black text-4xl text-primary tracking-tight mb-2">{story.income}</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">{story.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">{story.details}</div>
                
                <div className="flex flex-wrap items-center gap-2 mb-6 text-xs font-semibold mt-auto pt-4">
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    {story.before}
                  </span>
                  <ArrowRight size={14} className="text-gray-400" />
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                    {story.after}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 font-medium italic text-sm leading-relaxed border-l-2 border-primary/30 pl-4 mt-2">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        {/* Podcast CTA Banner */}
        <Reveal className="mt-20 max-w-4xl mx-auto">
          <div className="bg-emerald-950 rounded-3xl p-10 md:p-14 text-center border border-primary/20 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 text-primary">
                <Mic size={32} />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Gig Ki Awaaz</h3>
              <p className="text-white/80 text-lg mb-8 max-w-2xl">
                India&apos;s only podcast by gig workers, for gig workers. 50+ documented stories. Every number verified. Hosted by Akash Gupta.
              </p>
              <a 
                href="https://youtube.com/@GigKiAwaaz" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-slate-950 font-bold hover:bg-primary/90 transition-transform hover:scale-105"
              >
                Watch on YouTube <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

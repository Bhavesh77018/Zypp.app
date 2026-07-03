import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

// Real Zypp Pilot app screens (from the Play Store listing), shown as the
// onboarding flow. Files live in /public/media.
const SCREENS = [
  { src: "/media/app-screen-3.png", alt: "Become a Zypp Pilot — earn more, save more" },
  { src: "/media/app-screen-4.png", alt: "Complete your KYC and onboarding" },
  { src: "/media/app-screen-5.png", alt: "Zypp Pilot app — live earnings and wallet" },
  { src: "/media/app-screen-6.png", alt: "Track payouts and rewards in the app" },
];

const STATS = [
  { value: "4.7★", label: "Play Store Rating" },
  { value: "2.5 Lakh+", label: "Active Riders" },
  { value: "4.34", label: "Service Rating" },
];

export default function AppShowcase() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Narrative */}
          <Reveal>
            <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">The Zypp App</div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-5">
              Your EV. Your Income.<br /><span className="text-primary">Your Future.</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              From finding the nearest battery-swap station to tracking your daily earnings — the Zypp Pilot app puts your
              livelihood in your pocket. KYC, client mapping, payouts and rewards, all in one place.
            </p>
            <div className="flex gap-8 mb-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl md:text-3xl font-black text-primary">{s.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.zyppdelivery"
              target="_blank"
              rel="noopener"
              data-track="App Showcase Google Play"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
            >
              ▶ Download on Google Play
            </a>
          </Reveal>

          {/* Real app screens — smooth horizontal scroll with snap */}
          <Reveal direction="left">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scroll-px-4 [scrollbar-width:thin]">
              {SCREENS.map((s) => (
                <div key={s.src} className="snap-start shrink-0 w-[200px] sm:w-[230px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-800 hover:-translate-y-1.5 transition-transform duration-300">
                  <Image src={s.src} alt={s.alt} width={270} height={480} className="w-full h-auto" />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2 lg:hidden">← swipe to explore the app →</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

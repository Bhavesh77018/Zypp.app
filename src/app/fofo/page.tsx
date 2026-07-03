import Link from "next/link";
import {
  ArrowRight, BarChart3, Bike, Building2, Check, ClipboardCheck,
  Cpu, MapPin, Route, ShieldCheck, Users, Wrench,
} from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";
import HeroVideoBackdrop from "@/components/HeroVideoBackdrop";

export const metadata = {
  title: "FOFO Franchise — Build and Operate a Zypp EV Network",
  description: "Own and operate a Zypp EV rental network in your city with brand, technology, fleet workflows and launch support.",
};

const RESPONSIBILITIES = [
  { Icon: Building2, owner: "Partner owns", title: "Local infrastructure", body: "Build the hub, own the fleet and create the local operating foundation." },
  { Icon: Users, owner: "Partner operates", title: "City execution", body: "Lead the team, rider relationships and daily fleet operations in your territory." },
  { Icon: Cpu, owner: "Zypp enables", title: "Brand, tech and playbook", body: "Run on Zypp's operating workflows, FleetEase visibility and market experience." },
];

const LAUNCH_STEPS = [
  { step: "01", Icon: MapPin, title: "Territory discovery", body: "Align on the city, demand zones, operating potential and partner fit." },
  { step: "02", Icon: ClipboardCheck, title: "Readiness plan", body: "Map the hub, team, fleet, process and technology requirements." },
  { step: "03", Icon: Bike, title: "Fleet activation", body: "Prepare assets, onboard the field team and connect rider demand." },
  { step: "04", Icon: Route, title: "Go live and improve", body: "Launch with shared operating reviews and live performance visibility." },
];

const CONTROL_CARDS = [
  { Icon: Bike, value: "Live", label: "Fleet deployment" },
  { Icon: Users, value: "Connected", label: "Rider onboarding" },
  { Icon: Wrench, value: "Tracked", label: "Service workflow" },
  { Icon: BarChart3, value: "Visible", label: "Operating performance" },
];

export default function FofoPage() {
  return (
    <div className="w-full bg-background">
      <section className="relative min-h-[calc(100svh-64px)] overflow-hidden bg-slate-950 pt-24 pb-16 md:pt-28 md:pb-20 flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-orange-950/50 to-slate-950" />
        <HeroVideoBackdrop image="/media/zyppads-fleet.webp" accent="orange" videoOpacity={0.26} />
        <div className="absolute inset-0 opacity-[0.055]" style={{ backgroundImage: "linear-gradient(#fb923c 1px,transparent 1px),linear-gradient(90deg,#fb923c 1px,transparent 1px)", backgroundSize: "56px 56px" }} />

        <div className="container relative z-10 mx-auto px-4 py-12 md:py-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal direction="right">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-400/15 px-4 py-1.5 text-sm font-black uppercase tracking-[0.18em] text-orange-400"><span className="h-2 w-2 animate-pulse rounded-full bg-orange-400" /> FOFO franchise model</div>
              <h1 className="mb-7 text-[clamp(3rem,6.5vw,5.4rem)] font-black leading-[0.96] tracking-[-0.04em] text-white">Own the network.<br /><span className="text-orange-400">Operate the city.</span></h1>
              <p className="mb-9 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">FOFO is built for hands-on entrepreneurs who want local operating control—supported by Zypp&apos;s brand, technology, fleet workflows and launch playbook.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 font-black text-white shadow-xl shadow-orange-500/25 transition-colors hover:bg-orange-600">Discuss your city <ArrowRight size={18} /></Link>
                <Link href="/franchise#models" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur transition-colors hover:bg-white/10">Compare models</Link>
              </div>
            </Reveal>

            <Reveal direction="left" className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl backdrop-blur-xl md:p-8">
              <div className="mb-7 flex items-center justify-between"><div><div className="text-xs font-black uppercase tracking-[0.18em] text-orange-400">Operator readiness</div><h2 className="mt-1 text-2xl font-black text-white">What a FOFO partner builds</h2></div><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-400/15 text-orange-400"><ShieldCheck size={22} /></span></div>
              <div className="space-y-3">
                {["A locally managed hub and fleet", "A trained city operations team", "Rider acquisition and support workflows", "FleetEase-powered operating visibility"].map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3.5 text-sm font-semibold text-white/75"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-400/15 text-orange-400"><Check size={14} /></span>{item}</div>)}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-12">
        <div className="container mx-auto grid max-w-6xl grid-cols-2 gap-5 px-4 md:grid-cols-4">
          {["Partner-owned assets", "Partner-led operations", "Zypp technology", "Shared governance"].map((item) => <div key={item} className="text-center"><div className="mx-auto mb-3 h-1.5 w-8 rounded-full bg-orange-400" /><div className="text-sm font-black text-foreground">{item}</div></div>)}
        </div>
      </section>

      <section className="border-b border-border bg-gray-50 py-24 dark:bg-slate-900">
        <div className="container mx-auto max-w-7xl px-4">
          <Reveal className="mx-auto mb-14 max-w-3xl text-center"><div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-orange-500">The operating split</div><h2 className="mb-5 text-3xl font-black leading-tight text-foreground md:text-5xl">Local ownership.<br /><span className="text-orange-500">Platform advantage.</span></h2><p className="text-lg leading-relaxed text-muted">FOFO keeps city execution close to the market while connecting the partner to Zypp&apos;s wider operating system.</p></Reveal>
          <RevealStagger className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {RESPONSIBILITIES.map(({ Icon, owner, title, body }) => <RevealItem key={title} className="group rounded-3xl border border-border bg-background p-8 transition-all hover:-translate-y-1 hover:border-orange-400/35 hover:shadow-xl"><div className="mb-10 flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 transition-colors group-hover:bg-orange-500 group-hover:text-white"><Icon size={23} /></span><span className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">{owner}</span></div><h3 className="mb-3 text-xl font-black text-foreground">{title}</h3><p className="leading-relaxed text-muted">{body}</p></RevealItem>)}
          </RevealStagger>
        </div>
      </section>

      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[110px]" />
        <div className="container relative mx-auto max-w-7xl px-4">
          <Reveal className="mb-12 grid items-end gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-orange-400">FOFO control room</div><h2 className="text-3xl font-black leading-tight md:text-5xl">Run the city with<br /><span className="text-orange-400">one operating view.</span></h2></div><p className="text-lg leading-relaxed text-white/55">Deployment, riders, maintenance and performance stay connected so the local team can see what needs attention next.</p></Reveal>
          <Reveal className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur md:p-7">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white"><Cpu size={20} /></span><div><div className="font-black">City Operations Dashboard</div><div className="text-[10px] uppercase tracking-[0.18em] text-white/35">Powered by Zypp technology</div></div></div><div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-emerald-400"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Operations live</div></div>
            <RevealStagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CONTROL_CARDS.map(({ Icon, value, label }) => <RevealItem key={label} className="rounded-2xl border border-white/10 bg-slate-950/45 p-5"><Icon size={20} className="mb-7 text-orange-400" /><div className="text-2xl font-black">{value}</div><div className="mt-1 text-xs text-white/40">{label}</div></RevealItem>)}
            </RevealStagger>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <Reveal className="mb-14"><div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-orange-500">Launch journey</div><h2 className="text-3xl font-black leading-tight text-foreground md:text-5xl">From city interest<br /><span className="text-orange-500">to operating network.</span></h2></Reveal>
          <RevealStagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {LAUNCH_STEPS.map(({ step, Icon, title, body }) => <RevealItem key={step} className="rounded-3xl border border-border bg-gray-50 p-7 dark:bg-slate-900"><div className="mb-9 flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500"><Icon size={21} /></span><span className="text-xs font-black tracking-widest text-orange-500/45">{step}</span></div><h3 className="mb-3 font-black text-foreground">{title}</h3><p className="text-sm leading-relaxed text-muted">{body}</p></RevealItem>)}
          </RevealStagger>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-950 via-orange-950/55 to-slate-950 py-24 text-center text-white">
        <div className="container mx-auto max-w-3xl px-4"><Reveal><div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-orange-400">Build your city</div><h2 className="mb-5 text-3xl font-black md:text-5xl">Ready to operate a Zypp network?</h2><p className="mx-auto mb-9 max-w-2xl text-lg leading-relaxed text-white/55">Tell us about your city, operating background and expansion vision. The franchise team will take you through the model and readiness process.</p><Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-9 py-4 font-black text-white transition-colors hover:bg-orange-600">Start the conversation <ArrowRight size={18} /></Link></Reveal></div>
      </section>
    </div>
  );
}

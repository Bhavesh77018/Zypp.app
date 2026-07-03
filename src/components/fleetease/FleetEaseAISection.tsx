import { BrainCircuit, CircleGauge, Route, ShieldAlert, Sparkles, Wrench } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";

const ACTIONS = [
  { Icon: ShieldAlert, label: "Predict", title: "Find risk before failure", body: "AI reads battery, vehicle and service signals to surface assets that need attention before downtime spreads." },
  { Icon: Route, label: "Allocate", title: "Put the right EV in motion", body: "Availability, rider demand and operational constraints can guide faster vehicle allocation and dispatch." },
  { Icon: Wrench, label: "Resolve", title: "Turn alerts into field work", body: "Each signal can become an assigned ticket, mechanic workflow and tracked resolution—not another dashboard notification." },
  { Icon: CircleGauge, label: "Improve", title: "Learn from every outcome", body: "Uptime, utilisation and service history feed the next operating decision across vehicles, hubs and cities." },
];

export default function FleetEaseAISection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-gray-50 py-24 dark:bg-slate-900">
      <div className="container mx-auto max-w-7xl px-4">
        <Reveal className="mb-14 grid items-end gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-primary"><BrainCircuit size={17} /> FleetEase intelligence layer</div>
            <h2 className="text-3xl font-black leading-[1.08] text-foreground md:text-5xl">AI that recommends.<br /><span className="text-primary">Workflows that deliver.</span></h2>
          </div>
          <div className="rounded-3xl border border-primary/20 bg-primary/[0.07] p-6">
            <div className="mb-2 flex items-center gap-2 font-black text-foreground"><Sparkles size={18} className="text-primary" /> From signal to next-best action</div>
            <p className="leading-relaxed text-muted">FleetEase is designed to connect prediction with the people who can act—control rooms, hub teams, mechanics and riders.</p>
          </div>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {ACTIONS.map(({ Icon, label, title, body }, index) => (
            <RevealItem key={title} className="group relative overflow-hidden rounded-3xl border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl">
              <div className="absolute right-5 top-4 text-5xl font-black text-primary/[0.08]">0{index + 1}</div>
              <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white"><Icon size={22} /></div>
              <div className="mb-2 text-[11px] font-black uppercase tracking-[0.18em] text-primary">{label}</div>
              <h3 className="mb-3 text-lg font-black text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted">{body}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

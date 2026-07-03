import { Activity, BrainCircuit, GitBranch, RefreshCw } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";

const LOOP = [
  { Icon: Activity, step: "Sense", body: "Vehicle, battery, rider and service signals create a live operating picture." },
  { Icon: BrainCircuit, step: "Understand", body: "Models identify anomalies, risk patterns and opportunities hidden in fleet activity." },
  { Icon: GitBranch, step: "Act", body: "The right workflow reaches the control room, hub, mechanic or rider who can respond." },
  { Icon: RefreshCw, step: "Learn", body: "Every resolution improves the data trail behind the next operating decision." },
];

export default function IntelligenceLoopSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24">
      <div className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />
      <div className="container relative mx-auto max-w-6xl px-4">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-primary">The intelligence loop</div>
          <h2 className="mb-5 text-3xl font-black leading-tight text-foreground md:text-5xl">Technology that gets smarter<br /><span className="text-primary">because the fleet keeps moving.</span></h2>
          <p className="text-lg leading-relaxed text-muted">Zypp connects sensing, AI and field execution in a continuous loop—not a collection of disconnected tools.</p>
        </Reveal>

        <RevealStagger className="relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-[12.5%] right-[12.5%] top-9 hidden border-t border-dashed border-primary/30 lg:block" />
          {LOOP.map(({ Icon, step, body }, index) => (
            <RevealItem key={step} className="relative rounded-3xl border border-border bg-background p-7 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
              <div className="relative z-10 mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary text-white shadow-lg shadow-primary/20"><Icon size={25} /></div>
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Step 0{index + 1}</div>
              <h3 className="mb-3 text-xl font-black text-foreground">{step}</h3>
              <p className="text-sm leading-relaxed text-muted">{body}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

import Link from "next/link";
import { BarChart3, Bike, Cpu, RadioTower, Smartphone, Wrench } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";

const BRANCHES = [
  {
    number: "01",
    title: "Connected mobility",
    body: "The physical fleet and telematics layer that turns every scooter into a live operating asset.",
    accent: "border-emerald-400/30 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300",
  },
  {
    number: "02",
    title: "Field operations",
    body: "Role-based products keep pilots, mechanics, hub teams and managers on the same workflow.",
    accent: "border-cyan-400/30 bg-cyan-400/10 text-cyan-700 dark:text-cyan-300",
  },
  {
    number: "03",
    title: "Fleet intelligence",
    body: "Dashboards, alerts and predictive signals convert live activity into faster decisions.",
    accent: "border-blue-400/30 bg-blue-400/10 text-blue-700 dark:text-blue-300",
  },
];

const PRODUCTS = [
  { Icon: Smartphone, name: "Pilot App", body: "Tasks, earnings, support and rider workflows in one place.", branch: "Field app" },
  { Icon: Wrench, name: "Mechanic App", body: "Service assignments, job cards and maintenance progress.", branch: "Service app" },
  { Icon: Bike, name: "TL / Sales App", body: "Fleet overview, KYC, rider management and ticket resolution.", branch: "Operations app" },
  { Icon: BarChart3, name: "Fleet Dashboard", body: "Live counts, heat maps, utilisation and business visibility.", branch: "Control room" },
  { Icon: RadioTower, name: "4G GPS Tracker", body: "Telematics, diagnostics and seamless dashboard integration.", branch: "Hardware" },
];

export default function ProductTreeSection() {
  return (
    <section className="relative overflow-hidden border-y border-border bg-gray-50 py-24 dark:bg-slate-900">
      <div className="container mx-auto max-w-7xl px-4">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-primary">The Zypp technology tree</div>
          <h2 className="mb-5 text-3xl font-black leading-tight text-foreground md:text-5xl">One operating system.<br /><span className="text-primary">Products for every role.</span></h2>
          <p className="text-lg leading-relaxed text-muted">Inspired by how the fleet actually operates: one shared foundation branches into connected vehicles, field workflows and fleet intelligence.</p>
        </Reveal>

        <Reveal className="relative mx-auto mb-12 max-w-md">
          <div className="rounded-[2rem] border border-primary/25 bg-foreground p-7 text-center text-background shadow-2xl dark:bg-white dark:text-slate-950">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white"><Cpu size={24} /></div>
            <div className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Shared foundation</div>
            <h3 className="mt-2 text-2xl font-black">Zypp Technology OS</h3>
            <p className="mt-2 text-sm opacity-65">Vehicle data + people + workflows + intelligence</p>
          </div>
          <div className="absolute left-1/2 top-full hidden h-12 w-px -translate-x-1/2 bg-gradient-to-b from-primary to-border lg:block" />
        </Reveal>

        <div className="relative">
          <div className="absolute left-[16.66%] right-[16.66%] top-0 hidden h-px bg-border lg:block" />
          <RevealStagger className="grid grid-cols-1 gap-5 pt-0 lg:grid-cols-3 lg:pt-10">
            {BRANCHES.map((branch) => (
              <RevealItem key={branch.number} className="relative rounded-3xl border border-border bg-background p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="absolute bottom-full left-1/2 hidden h-10 w-px -translate-x-1/2 bg-border lg:block" />
                <div className={`mb-8 inline-flex rounded-full border px-3 py-1 text-xs font-black tracking-widest ${branch.accent}`}>{branch.number}</div>
                <h3 className="mb-3 text-xl font-black text-foreground">{branch.title}</h3>
                <p className="leading-relaxed text-muted">{branch.body}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>

        <div className="mx-auto my-10 hidden h-10 w-px bg-gradient-to-b from-border to-primary/40 lg:block" />

        <RevealStagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PRODUCTS.map(({ Icon, name, body, branch }) => (
            <RevealItem key={name} className="group rounded-3xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl">
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white"><Icon size={21} /></div>
              <div className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-primary">{branch}</div>
              <h3 className="mb-2 font-black text-foreground">{name}</h3>
              <p className="text-sm leading-relaxed text-muted">{body}</p>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-5 rounded-3xl border border-primary/20 bg-primary/[0.07] p-7 sm:flex-row sm:items-center">
          <div>
            <div className="mb-1 font-black text-foreground">Built inside Zypp. Ready for other fleets.</div>
            <p className="text-sm text-muted">FleetEase brings this connected operating stack to enterprise fleet teams.</p>
          </div>
          <Link href="/fleetease" className="shrink-0 rounded-full bg-primary px-6 py-3 text-sm font-black text-white transition-colors hover:bg-primary-hover">Explore FleetEase →</Link>
        </Reveal>
      </div>
    </section>
  );
}

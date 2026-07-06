import Image from "next/image";
import { BatteryCharging, Gauge, MapPin, Radio, ShieldCheck, Wrench } from "lucide-react";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/Reveal";

const MODELS = [
  { name: "Yulu Miracle", range: "60 km", speed: "25 kmph", tone: "bg-emerald-400" },
  { name: "Zypp S1", range: "80 km", speed: "45 kmph", tone: "bg-cyan-400" },
  { name: "Zypp Pro", range: "100 km", speed: "55 kmph", tone: "bg-lime-300" },
];

const CONNECTED_SPECS = [
  { Icon: BatteryCharging, title: "Swappable energy", body: "A battery-swap-ready fleet keeps delivery operations moving without long charging pauses." },
  { Icon: Radio, title: "4G GPS + IoT", body: "Live location, state of charge and vital vehicle signals flow into one connected platform." },
  { Icon: ShieldCheck, title: "Fleet protection", body: "Geo-fencing, motor-lock workflows and theft alerts help teams respond sooner." },
  { Icon: Wrench, title: "Service intelligence", body: "Health signals and smart tickets connect each scooter to maintenance and field support." },
];

export default function ScooterSpecificationSection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      <div className="absolute -left-48 top-8 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-500/15 blur-[120px]" />

      <div className="container relative mx-auto max-w-7xl px-4">
        <Reveal className="mb-14 grid items-end gap-8 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <div className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-emerald-400">Our connected scooters</div>
            <h2 className="max-w-3xl text-3xl font-black leading-[1.08] md:text-5xl">
              Built for the road.<br /><span className="text-emerald-400">Connected to the control room.</span>
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-slate-300">
            A delivery scooter is more useful when the vehicle, battery, rider and service team work as one connected system.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal direction="right" className="relative min-h-[520px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.055] p-6 md:p-10">
            <div className="absolute inset-x-12 bottom-16 h-28 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="relative flex h-full min-h-[440px] items-center justify-center overflow-hidden rounded-3xl">
              <Image
                src="/media/zypp-rider-real.jpg"
                alt="Zypp connected electric delivery scooter in real world"
                fill
                className="relative z-0 object-cover object-center opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />

              <div className="absolute left-4 top-4 z-20 rounded-2xl border border-white/10 bg-slate-900/85 p-4 shadow-2xl backdrop-blur-md">
                <div className="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400"><BatteryCharging size={15} /> Energy</div>
                <div className="font-bold">Swappable battery</div>
              </div>
              <div className="absolute bottom-2 right-0 z-20 rounded-2xl border border-white/10 bg-slate-900/85 p-4 shadow-2xl backdrop-blur-md md:bottom-8 md:right-3">
                <div className="mb-1 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-400"><MapPin size={15} /> Connected</div>
                <div className="font-bold">Live fleet visibility</div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5">
            <RevealStagger className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CONNECTED_SPECS.map(({ Icon, title, body }) => (
                <RevealItem key={title} className="rounded-3xl border border-white/10 bg-white/[0.055] p-6 transition-colors hover:border-emerald-400/40 hover:bg-white/[0.08]">
                  <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400"><Icon size={21} /></div>
                  <h3 className="mb-2 text-lg font-black">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{body}</p>
                </RevealItem>
              ))}
            </RevealStagger>

            <Reveal className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-emerald-400"><Gauge size={20} /></div>
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Available fleet</div>
                  <h3 className="font-black">Scooter specifications</h3>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {MODELS.map((model) => (
                  <div key={model.name} className="rounded-2xl bg-slate-900/70 p-4">
                    <div className={`mb-3 h-1.5 w-8 rounded-full ${model.tone}`} />
                    <div className="mb-4 font-black">{model.name}</div>
                    <dl className="space-y-2 text-xs">
                      <div className="flex justify-between gap-2"><dt className="text-slate-500">Range</dt><dd className="font-bold text-slate-200">{model.range}</dd></div>
                      <div className="flex justify-between gap-2"><dt className="text-slate-500">Top speed</dt><dd className="font-bold text-slate-200">{model.speed}</dd></div>
                      <div className="flex justify-between gap-2"><dt className="text-slate-500">Battery</dt><dd className="font-bold text-slate-200">Swappable</dd></div>
                    </dl>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">Vehicle availability and on-road performance can vary by city, load, riding conditions and fleet allocation.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";

// "One Year. Transformed." — the May-25 → May-26 turnaround. Folder content,
// rendered in our design language.
const METRICS = [
  { label: "Fleet (utilisable)", from: "15,497", to: "26,827", delta: "+73%" },
  { label: "Net Rental Revenue", from: "₹126.9 Cr", to: "₹243 Cr", delta: "+92%" },
  { label: "EBITDA Margin", from: "−4.6%", to: "+10.08%", delta: "+14.7 pts" },
];

export default function NumbersSection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <Reveal className="mb-12">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">The Numbers</div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
            One Year. <span className="text-primary">Transformed.</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mt-3 max-w-xl">
            May-25 to May-26. No additional capital raised. Pure execution.
          </p>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {METRICS.map((m) => (
            <RevealItem key={m.label}>
              <div className="h-full bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-7">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">{m.label}</div>
                <div className="text-lg text-gray-400 dark:text-gray-600 line-through font-bold">{m.from}</div>
                <div className="text-4xl md:text-5xl font-black text-primary leading-none tracking-tight my-2">{m.to}</div>
                <div className="inline-flex items-center gap-1 text-sm font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  ↑ {m.delta}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal className="mt-8">
          <div className="flex items-stretch gap-5 bg-primary/5 border border-primary/15 rounded-2xl p-7">
            <div className="w-1 rounded-full bg-primary shrink-0" />
            <p className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white leading-snug">
              Fleet +73%. Revenue +92%. EBITDA from negative to <span className="text-primary">+10.08%</span>.
              Gen3 cohort already PAT positive at <span className="text-primary">₹+1.09 Cr/month</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

// Head-to-head: Zypp Pilot (B2B postpaid) vs Zypp Rental (B2C prepaid).
// Shared on both plan pages so riders can self-select the right plan.
const ROWS: { dim: string; pilot: string; rental: string }[] = [
  { dim: "Who it's for", pilot: "Riders who want guaranteed work via Zypp's client ID", rental: "Independent riders who choose their own platform & hours" },
  { dim: "Payout", pilot: "Incentivised payout by Zypp — weekly / monthly", rental: "Direct payout from your client, on your own ID" },
  { dim: "Rent model", pilot: "Postpaid · discounted — more deliveries, lower rent", rental: "Prepaid · fixed — no surprise costs, total predictability" },
  { dim: "Insurance", pilot: "Up to ₹5,00,000 (opt-in)", rental: "Up to ₹2,00,000 (opt-in)" },
  { dim: "Battery swaps", pilot: "Unlimited, included", rental: "Unlimited, included" },
  { dim: "Growth path", pilot: "Team Lead preference after 12 months", rental: "Upgrade to Rent-to-Own — own your EV in 52 weeks" },
];

export default function PilotVsRental({ highlight = "pilot" }: { highlight?: "pilot" | "rental" }) {
  const hp = highlight === "pilot";
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 max-w-5xl">
        <Reveal className="text-center mb-12">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Pick Your Plan</div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground">Pilot vs Rental — <span className="text-primary">Which One Is You?</span></h2>
          <p className="text-muted text-lg mt-4 max-w-2xl mx-auto">Same EV, same swaps, same support — two different ways to earn. Both start at ₹180/day.</p>
        </Reveal>

        <Reveal className="overflow-x-auto rounded-3xl border border-border shadow-sm">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-900">
                <th className="p-4 text-left text-xs font-bold uppercase tracking-widest text-muted w-1/4"></th>
                <th className={`p-4 text-left ${hp ? "bg-primary text-white" : "text-foreground"}`}>
                  <div className="font-black text-base">Zypp Pilot</div>
                  <div className={`text-[11px] font-semibold ${hp ? "text-white/80" : "text-muted"}`}>B2B · Postpaid · Deliver &amp; Earn</div>
                </th>
                <th className={`p-4 text-left ${!hp ? "bg-primary text-white" : "text-foreground"}`}>
                  <div className="font-black text-base">Zypp Rental</div>
                  <div className={`text-[11px] font-semibold ${!hp ? "text-white/80" : "text-muted"}`}>B2C · Prepaid · Total Freedom</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.dim} className={i % 2 ? "bg-gray-50/60 dark:bg-slate-900/50" : "bg-white dark:bg-slate-950"}>
                  <td className="p-4 font-bold text-muted text-xs uppercase tracking-wide">{r.dim}</td>
                  <td className={`p-4 text-foreground/85 ${hp ? "bg-primary/[0.04]" : ""}`}>{r.pilot}</td>
                  <td className={`p-4 text-foreground/85 ${!hp ? "bg-primary/[0.04]" : ""}`}>{r.rental}</td>
                </tr>
              ))}
              <tr>
                <td className="p-4"></td>
                <td className="p-4">
                  <Link href="/zypp-pilot" className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-bold text-sm transition-colors ${hp ? "bg-primary text-white hover:bg-primary/90" : "border border-border text-foreground hover:border-primary/40"}`}>
                    Become a Pilot <ArrowRight size={14} />
                  </Link>
                </td>
                <td className="p-4">
                  <Link href="/zypp-rental" className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-bold text-sm transition-colors ${!hp ? "bg-primary text-white hover:bg-primary/90" : "border border-border text-foreground hover:border-primary/40"}`}>
                    Rent Independently <ArrowRight size={14} />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}

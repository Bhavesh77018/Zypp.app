import { Reveal } from "@/components/motion/Reveal";
import { CreditCard, FileText, IdCard, Landmark, ArrowRight, type LucideIcon } from "lucide-react";

const DOCS: { Icon: LucideIcon; title: string; note: string }[] = [
  { Icon: IdCard, title: "Aadhaar Card", note: "Identity & address proof" },
  { Icon: CreditCard, title: "PAN Card", note: "Tax & verification" },
  { Icon: FileText, title: "Driving License", note: "Optional for delivery" },
  { Icon: Landmark, title: "Bank Account", note: "For weekly payouts" },
];

/** "What you'll need for KYC?" — the 4 documents, as a clean horizontal flow.
 *  Shared across rider/service pages so onboarding info is consistent. */
export default function KycDocsSection({
  heading = "What You'll Need for KYC",
  subheading = "Getting your electric scooter on rent has never been easier — keep these ready.",
  className = "py-24 bg-gray-50 dark:bg-slate-900 border-y border-border",
}: { heading?: string; subheading?: string; className?: string }) {
  return (
    <section className={className}>
      <div className="container mx-auto px-4 max-w-5xl">
        <Reveal className="text-center mb-14">
          <div className="text-sm font-bold text-primary uppercase tracking-[0.2em] mb-3">Registration</div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground">{heading}</h2>
          <p className="text-muted text-lg mt-4 max-w-2xl mx-auto">{subheading}</p>
        </Reveal>

        <div className="flex flex-col md:flex-row items-stretch justify-center gap-4">
          {DOCS.map((d, i) => (
            <div key={d.title} className="flex items-center gap-4 md:gap-2 flex-1">
              <div className="group w-full bg-white dark:bg-slate-950 border border-border rounded-2xl p-6 text-center hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <d.Icon size={26} strokeWidth={2} />
                </div>
                <h3 className="font-bold text-foreground">{d.title}</h3>
                <p className="text-muted text-xs mt-1">{d.note}</p>
              </div>
              {i < DOCS.length - 1 && (
                <ArrowRight className="hidden md:block text-primary/40 shrink-0 self-center" size={22} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

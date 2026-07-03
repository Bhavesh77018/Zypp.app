import { getContent } from "@/lib/cms";
import LegalDoc from "@/components/LegalDoc";

export default function TermsAndConditionsPage() {
  const doc = getContent("term-and-conditions").doc as Record<string, unknown>;
  return (
    <LegalDoc
      title={String(doc.title)}
      lastUpdated={String(doc.lastUpdated)}
      intro={String(doc.intro ?? "")}
      sections={(doc.sections ?? []) as { heading: string; body: string }[]}
    />
  );
}

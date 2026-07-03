import { getContent } from "@/lib/cms";
import LegalDoc from "@/components/LegalDoc";

export default function PrivacyPolicyPage() {
  const doc = getContent("privacy-policy").doc as Record<string, unknown>;
  return (
    <LegalDoc
      title={String(doc.title)}
      lastUpdated={String(doc.lastUpdated)}
      intro={String(doc.intro ?? "")}
      sections={(doc.sections ?? []) as { heading: string; body: string }[]}
    />
  );
}

import { getContent } from "@/lib/cms";
import LegalDoc from "@/components/LegalDoc";

export const metadata = {
  title: "Privacy Policy | Zypp Electric",
  description: "How Zypp Electric (Bicyshare Technologies) collects, uses and protects your personal data across our apps, website and services.",
};

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

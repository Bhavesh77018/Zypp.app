import { getContent } from "@/lib/cms";
import LegalDoc from "@/components/LegalDoc";

export const metadata = {
  title: "Terms of Service | Zypp Electric",
  description: "The terms and conditions governing use of Zypp Electric's rental services, apps and website, operated by Bicyshare Technologies Pvt. Ltd.",
};

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

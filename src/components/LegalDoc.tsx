import { Fragment } from "react";

type Section = { heading: string; body: string };

// Renders a legal-doc body where lines starting with "- " become bullets,
// everything else becomes paragraphs. Plain emails are linkified.
function renderBody(body: string) {
  const lines = body.split("\n");
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = (key: string) => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={key} className="list-disc pl-6 mb-6 space-y-2">
        {bullets.map((b, i) => <li key={i}>{linkify(b)}</li>)}
      </ul>,
    );
    bullets = [];
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      bullets.push(trimmed.slice(2));
    } else if (trimmed) {
      flushBullets(`ul-${i}`);
      blocks.push(<p key={`p-${i}`} className="mb-6">{linkify(trimmed)}</p>);
    }
  });
  flushBullets("ul-end");
  return blocks;
}

function linkify(text: string) {
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  if (!emailMatch) return text;
  const email = emailMatch[0];
  const [before, after] = text.split(email);
  return (
    <Fragment>
      {before}
      <a href={`mailto:${email}`} className="text-primary hover:underline">{email}</a>
      {after}
    </Fragment>
  );
}

export default function LegalDoc({ title, lastUpdated, intro, sections }: { title: string; lastUpdated: string; intro: string; sections: Section[] }) {
  return (
    <div className="w-full bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-foreground tracking-tight">{title}</h1>
        {lastUpdated && <p className="text-muted mb-12">{lastUpdated}</p>}
        <div className="prose prose-lg dark:prose-invert max-w-none text-muted">
          {intro && <p className="mb-6">{intro}</p>}
          {sections.map((s) => (
            <Fragment key={s.heading}>
              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{s.heading}</h2>
              {renderBody(s.body)}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

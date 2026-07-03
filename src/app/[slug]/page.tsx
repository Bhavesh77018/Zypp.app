import { notFound } from "next/navigation";
import Link from "next/link";
import { readCMS } from "@/lib/cms";

type D = Record<string, unknown>;
const str = (v: unknown) => (v != null ? String(v) : "");

interface Stat { number: string; label: string; }
interface Feature { icon: string; title: string; desc: string; }
interface ButtonConfig { label: string; link: string; style: string; newTab: boolean; }

// ─── Primitive Renderers ──────────────────────────────────────────────────

function HeadingH1Section({ data }: { data: D }) {
  const alignClass = data.align === "left" ? "text-left" : data.align === "right" ? "text-right" : "text-center";
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className={`text-4xl md:text-6xl font-black ${alignClass} text-foreground leading-tight tracking-tight`}>
          {str(data.text)}
        </h1>
      </div>
    </section>
  );
}

function HeadingH2Section({ data }: { data: D }) {
  const alignClass = data.align === "left" ? "text-left" : data.align === "right" ? "text-right" : "text-center";
  return (
    <section className="pt-12 pb-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className={`text-3xl md:text-4xl font-bold ${alignClass} text-foreground tracking-tight`}>
          {str(data.text)}
        </h2>
      </div>
    </section>
  );
}

function RichTextSection({ data }: { data: D }) {
  const sizeClass = data.size === "sm" ? "text-sm" : data.size === "lg" ? "text-lg" : data.size === "xl" ? "text-xl" : "text-base";
  return (
    <section className="py-6">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className={`${sizeClass} text-muted leading-relaxed whitespace-pre-wrap`}>
          {str(data.text)}
        </div>
      </div>
    </section>
  );
}

function ImageBlockSection({ data }: { data: D }) {
  const alignMap: Record<string, string> = { left: "mr-auto", center: "mx-auto", right: "ml-auto" };
  const widthMap: Record<string, string> = { "25": "w-[25%]", "50": "w-[50%]", "75": "w-[75%]", "100": "w-full" };
  const align = str(data.align) || "center";
  const width = str(data.width) || "100";
  
  if (!data.url) return null;
  
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className={`${alignMap[align]} ${widthMap[width]}`}>
          <img 
            src={str(data.url)} 
            alt={str(data.alt)} 
            className="w-full h-auto rounded-2xl shadow-md border border-card-border object-cover" 
          />
          {!!data.caption && <p className={`mt-3 text-sm text-muted ${align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center"}`}>{str(data.caption)}</p>}
        </div>
      </div>
    </section>
  );
}

function VideoBlockSection({ data }: { data: D }) {
  const url = str(data.url);
  const isYoutube = url.includes("youtube.com") || url.includes("youtu.be");
  const isVimeo = url.includes("vimeo.com");
  const aspectClass = data.aspect === "9:16" ? "aspect-[9/16] max-w-sm" : data.aspect === "1:1" ? "aspect-square max-w-2xl" : "aspect-video max-w-5xl";
  
  if (!url) return null;

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className={`w-full ${aspectClass} rounded-2xl overflow-hidden shadow-2xl border border-card-border bg-slate-900`}>
          {isYoutube || isVimeo ? (
            <iframe 
              src={`${url}?autoplay=${data.autoplay ? '1' : '0'}&mute=${data.muted ? '1' : '0'}`}
              title="Video Player"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video 
              src={url}
              className="w-full h-full object-cover"
              controls={!data.autoplay}
              autoPlay={!!data.autoplay}
              muted={!!data.muted}
              loop={!!data.autoplay}
              playsInline
            />
          )}
        </div>
        {!!data.caption && <p className="mt-4 text-sm text-muted text-center">{str(data.caption)}</p>}
      </div>
    </section>
  );
}

function GifBlockSection({ data }: { data: D }) {
  const alignMap: Record<string, string> = { left: "mr-auto", center: "mx-auto", right: "ml-auto" };
  const widthMap: Record<string, string> = { "25": "w-[25%]", "50": "w-[50%]", "75": "w-[75%]", "100": "w-full" };
  const align = str(data.align) || "center";
  const width = str(data.width) || "50";
  
  if (!data.url) return null;

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className={`${alignMap[align]} ${widthMap[width]}`}>
          <img 
            src={str(data.url)} 
            alt={str(data.alt)} 
            className="w-full h-auto rounded-xl shadow-sm border border-card-border" 
          />
        </div>
      </div>
    </section>
  );
}

function DividerSection({ data }: { data: D }) {
  if (data.style === "none") {
    const spacingMap: Record<string, string> = { sm: "h-8", md: "h-16", lg: "h-24", xl: "h-32" };
    return <div className={spacingMap[str(data.spacing) || "md"]} />;
  }
  
  const styleMap: Record<string, string> = { solid: "border-solid", dashed: "border-dashed", dotted: "border-dotted" };
  const spacingMap: Record<string, string> = { sm: "py-4", md: "py-8", lg: "py-16", xl: "py-24" };
  
  return (
    <div className={`container mx-auto px-4 ${spacingMap[str(data.spacing) || "md"]}`}>
      <hr className={`w-full max-w-4xl mx-auto border-t-2 border-card-border ${styleMap[str(data.style) || "solid"]}`} />
    </div>
  );
}

function ButtonRowSection({ data }: { data: D }) {
  const buttons = (data.buttons as ButtonConfig[]) || [];
  if (buttons.length === 0) return null;

  const alignClass = data.align === "left" ? "justify-start" : data.align === "right" ? "justify-end" : "justify-center";

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className={`flex flex-wrap gap-4 ${alignClass}`}>
          {buttons.map((btn, i) => {
            const baseClass = "px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all shadow-sm";
            let styleClass = "";
            if (btn.style === "primary") styleClass = "bg-primary text-white hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20";
            else if (btn.style === "secondary") styleClass = "bg-slate-800 text-white hover:bg-slate-700";
            else styleClass = "bg-transparent border-2 border-primary text-primary hover:bg-primary/5";

            return (
              <Link 
                key={i} 
                href={btn.link || "#"} 
                target={btn.newTab ? "_blank" : undefined}
                rel={btn.newTab ? "noopener noreferrer" : undefined}
                className={`${baseClass} ${styleClass}`}
              >
                {btn.label || "Click Here"}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TwoColSection({ data }: { data: D }) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {!!data.headline && <h2 className="text-3xl font-bold mb-10 text-center text-foreground">{str(data.headline)}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="text-muted leading-relaxed whitespace-pre-wrap">{str(data.leftText)}</div>
          <div className="text-muted leading-relaxed whitespace-pre-wrap">{str(data.rightText)}</div>
        </div>
      </div>
    </section>
  );
}

function ImageTextSection({ data }: { data: D }) {
  const reverseClass = data.imageSide === "right" ? "md:flex-row-reverse" : "md:flex-row";
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className={`flex flex-col ${reverseClass} items-center gap-12`}>
          <div className="w-full md:w-1/2">
            {data.imageUrl ? (
              <img src={str(data.imageUrl)} alt={str(data.imageAlt)} className="w-full h-auto rounded-3xl shadow-xl object-cover" />
            ) : (
              <div className="w-full aspect-square bg-card rounded-3xl flex items-center justify-center border border-card-border shadow-sm">
                <span className="text-muted">Image Placeholder</span>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight">{str(data.headline)}</h2>
            <p className="text-lg text-muted leading-relaxed whitespace-pre-wrap">{str(data.body)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Legacy Marketing Renderers ───────────────────────────────────────────

function HeroSection({ data }: { data: D }) {
  return (
    <section className="pt-32 pb-24 bg-primary/5 text-center px-4 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        {!!data.badge && <span className="px-5 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-widest mb-8 inline-block border border-primary/20 shadow-sm">{str(data.badge)}</span>}
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-foreground tracking-tight leading-[1.1]">{str(data.headline)}</h1>
        <p className="text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">{str(data.subheadline)}</p>
        {!!(data.ctaText && data.ctaLink) && (
          <Link href={str(data.ctaLink)} className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg inline-block hover:bg-primary-hover transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1">
            {str(data.ctaText)}
          </Link>
        )}
      </div>
    </section>
  );
}

function StatsSection({ data }: { data: D }) {
  const stats = (data.stats as Stat[]) ?? [];
  return (
    <section className="py-20 bg-card border-y border-card-border relative z-20 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 text-center">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 mb-2">{s.number}</div>
              <div className="font-bold uppercase tracking-widest text-muted text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureGridSection({ data }: { data: D }) {
  const features = (data.features as Feature[]) ?? [];
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-black mb-16 text-foreground tracking-tight">{str(data.headline)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="bg-card border border-card-border p-10 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/50 transition-all group duration-300">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{f.title}</h3>
              <p className="text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABannerSection({ data }: { data: D }) {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-gradient-to-br from-primary to-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">{str(data.headline)}</h2>
            <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-2xl mx-auto font-medium">{str(data.subheadline)}</p>
            {!!(data.ctaText && data.ctaLink) && (
              <Link href={str(data.ctaLink)} className="px-10 py-5 rounded-full bg-white text-primary font-black text-lg inline-block hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                {str(data.ctaText)}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function TextBlockSection({ data }: { data: D }) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        {!!data.headline && <h2 className="text-3xl font-bold mb-8 text-foreground">{str(data.headline)}</h2>}
        <div className="prose prose-lg dark:prose-invert max-w-none text-muted">
          <p className="leading-relaxed whitespace-pre-wrap">{str(data.body)}</p>
        </div>
      </div>
    </section>
  );
}


// ─── Dynamic Page Route ───────────────────────────────────────────────────

export default async function DynamicPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ preview?: string }> }) {
  const { slug } = await params;
  const sp = await searchParams;
  const isPreview = sp.preview === "true";
  
  const config = readCMS();
  const page = config.dynamicPages.find((p) => p.slug === slug && (p.published || isPreview));
  
  if (!page) notFound();

  return (
    <main className="w-full bg-background min-h-screen">
      {page.sections.map((section) => {
        const d = section.data;
        switch (section.type) {
          case "heading_h1": return <HeadingH1Section key={section.id} data={d} />;
          case "heading_h2": return <HeadingH2Section key={section.id} data={d} />;
          case "rich_text": return <RichTextSection key={section.id} data={d} />;
          case "image_block": return <ImageBlockSection key={section.id} data={d} />;
          case "video_block": return <VideoBlockSection key={section.id} data={d} />;
          case "gif_block": return <GifBlockSection key={section.id} data={d} />;
          case "divider": return <DividerSection key={section.id} data={d} />;
          case "button_row": return <ButtonRowSection key={section.id} data={d} />;
          case "two_col": return <TwoColSection key={section.id} data={d} />;
          case "image_text": return <ImageTextSection key={section.id} data={d} />;
          
          case "hero": return <HeroSection key={section.id} data={d} />;
          case "stats": return <StatsSection key={section.id} data={d} />;
          case "feature_grid": return <FeatureGridSection key={section.id} data={d} />;
          case "cta_banner": return <CTABannerSection key={section.id} data={d} />;
          case "text_block": return <TextBlockSection key={section.id} data={d} />;
          default: return null;
        }
      })}
    </main>
  );
}

// Generate metadata from CMS
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = readCMS();
  const page = config.dynamicPages.find((p) => p.slug === slug);
  return {
    title: page ? `${page.title} | Zypp Electric` : "Zypp Electric",
    description: page?.metaDescription ?? "Zypp Electric — India's largest EV rental platform.",
  };
}

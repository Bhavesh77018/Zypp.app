"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Save, Eye, Plus, Trash2, Globe, Settings, GripVertical, FileText, Type, LayoutTemplate, ChevronDown, ChevronUp, Image as ImageIcon, Video, MousePointerClick, Columns, DivideSquare, AlignLeft, Bold } from "lucide-react";
import Link from "next/link";

type SectionType = "hero" | "stats" | "feature_grid" | "cta_banner" | "text_block" | "heading_h1" | "heading_h2" | "rich_text" | "image_block" | "video_block" | "gif_block" | "divider" | "button_row" | "two_col" | "image_text";
interface Section { id: string; type: SectionType; data: Record<string, unknown>; }
interface NavSettings { showInMenu: boolean; menuLabel: string; menuGroup: string; openInNewTab: boolean; menuIcon: string; menuDescription: string; }
interface PageData { id: string; slug: string; title: string; metaDescription: string; published: boolean; updatedAt: string; sections: Section[]; navSettings?: NavSettings; }

const DEFAULT_NAV: NavSettings = { showInMenu: false, menuLabel: "", menuGroup: "none", openInNewTab: false, menuIcon: "🔗", menuDescription: "" };
const NAV_GROUPS = [{ value: "none", label: "None (hidden)" }, { value: "riders", label: "For Riders" }, { value: "partners", label: "For Partners" }, { value: "company", label: "Company" }, { value: "more", label: "More" }];

const SECTION_TEMPLATES: Record<SectionType, { label: string; icon: React.ReactNode; group: string; defaults: Record<string, unknown> }> = {
  heading_h1: { label: "H1 Heading", icon: <Type size={18}/>, group: "structure", defaults: { text: "Big Headline", align: "center", color: "text-foreground" } },
  heading_h2: { label: "H2 Heading", icon: <Bold size={18}/>, group: "structure", defaults: { text: "Section Title", align: "left", color: "text-foreground" } },
  divider: { label: "Divider", icon: <DivideSquare size={18}/>, group: "structure", defaults: { style: "solid", spacing: "md", color: "border-card-border" } },
  two_col: { label: "Two Column", icon: <Columns size={18}/>, group: "structure", defaults: { leftText: "Left column text", rightText: "Right column text", headline: "" } },
  
  rich_text: { label: "Rich Text", icon: <AlignLeft size={18}/>, group: "content", defaults: { text: "Enter your paragraph text here. Keep it concise and engaging.", size: "base", color: "text-muted" } },
  image_block: { label: "Image", icon: <ImageIcon size={18}/>, group: "content", defaults: { url: "", alt: "Image description", width: "100", align: "center", caption: "" } },
  video_block: { label: "Video", icon: <Video size={18}/>, group: "content", defaults: { url: "", type: "youtube", aspect: "16:9", autoplay: false, muted: true, caption: "" } },
  gif_block: { label: "GIF", icon: <FileText size={18}/>, group: "content", defaults: { url: "", alt: "Animated GIF", width: "50", align: "center", caption: "" } },
  image_text: { label: "Image + Text", icon: <LayoutTemplate size={18}/>, group: "content", defaults: { imageUrl: "", imageSide: "left", headline: "Your Headline", body: "Detailed description here.", imageAlt: "" } },
  button_row: { label: "Button Row", icon: <MousePointerClick size={18}/>, group: "content", defaults: { buttons: [{ label: "Click Me", link: "/contact", style: "primary", newTab: false }], align: "center" } },
  
  hero: { label: "Hero Section", icon: <LayoutTemplate size={18}/>, group: "marketing", defaults: { headline: "Hero Headline", subheadline: "A short description.", ctaText: "Get Started", ctaLink: "/contact", badge: "New" } },
  stats: { label: "Stats Row", icon: <LayoutTemplate size={18}/>, group: "marketing", defaults: { stats: [{ number: "100K+", label: "Riders" }, { number: "50+", label: "Cities" }, { number: "5M+", label: "Deliveries" }] } },
  feature_grid: { label: "Feature Grid", icon: <LayoutTemplate size={18}/>, group: "marketing", defaults: { headline: "Why Choose Us?", features: [{ icon: "🚀", title: "Fast", desc: "Lightning fast." }, { icon: "🛡️", title: "Safe", desc: "Fully insured." }, { icon: "🌿", title: "Green", desc: "Zero emissions." }] } },
  cta_banner: { label: "CTA Banner", icon: <LayoutTemplate size={18}/>, group: "marketing", defaults: { headline: "Ready to start?", subheadline: "Join us today.", ctaText: "Contact Us", ctaLink: "/contact" } },
  text_block: { label: "Text Block", icon: <LayoutTemplate size={18}/>, group: "marketing", defaults: { headline: "Title", body: "Enter text here." } },
};

const GROUPS = [
  { key: "structure", label: "Structure", color: "text-blue-400" },
  { key: "content", label: "Content", color: "text-purple-400" },
  { key: "marketing", label: "Marketing", color: "text-primary" },
];

function FI({ label, value, onChange, multiline = false, placeholder = "", maxLen, hint }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string; maxLen?: number; hint?: string }) {
  const cls = "w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary";
  return (
    <div>
      <label className="text-slate-400 text-xs font-semibold uppercase mb-1 flex justify-between">
        <span>{label}</span>
        {maxLen && <span className="normal-case text-slate-500">{value.length}/{maxLen}</span>}
      </label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value.slice(0, maxLen ?? 99999))} rows={4} className={cls + " resize-none"} placeholder={placeholder} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value.slice(0, maxLen ?? 99999))} className={cls} placeholder={placeholder} />
      )}
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div>
      <label className="text-slate-400 text-xs font-semibold uppercase mb-1 block">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function ToggleField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div onClick={() => onChange(!checked)} className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-primary" : "bg-slate-700"}`}>
        <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : ""}`} />
      </div>
      <span className="text-slate-300 text-sm">{label}</span>
    </label>
  );
}

function SectionEditor({ section, onChange }: { section: Section; onChange: (data: Record<string, unknown>) => void }) {
  const d = section.data;
  const upd = (k: string, v: unknown) => onChange({ ...d, [k]: v });

  switch (section.type) {
    case "heading_h1": return (
      <div className="flex flex-col gap-3">
        <FI label="Heading Text" value={d.text as string ?? ""} onChange={v => upd("text", v)} maxLen={80} />
        <SelectField label="Alignment" value={d.align as string ?? "center"} onChange={v => upd("align", v)} options={[{ value: "left", label: "Left" }, { value: "center", label: "Center" }, { value: "right", label: "Right" }]} />
      </div>
    );
    case "heading_h2": return (
      <div className="flex flex-col gap-3">
        <FI label="Heading Text" value={d.text as string ?? ""} onChange={v => upd("text", v)} maxLen={120} />
        <SelectField label="Alignment" value={d.align as string ?? "left"} onChange={v => upd("align", v)} options={[{ value: "left", label: "Left" }, { value: "center", label: "Center" }, { value: "right", label: "Right" }]} />
      </div>
    );
    case "rich_text": return (
      <div className="flex flex-col gap-3">
        <FI label="Content" value={d.text as string ?? ""} onChange={v => upd("text", v)} multiline maxLen={2000} />
        <SelectField label="Font Size" value={d.size as string ?? "base"} onChange={v => upd("size", v)} options={[{ value: "sm", label: "Small" }, { value: "base", label: "Normal" }, { value: "lg", label: "Large" }, { value: "xl", label: "X-Large" }]} />
      </div>
    );
    case "image_block": return (
      <div className="flex flex-col gap-3">
        <FI label="Image URL" value={d.url as string ?? ""} onChange={v => upd("url", v)} placeholder="https://" hint="Must start with https://" />
        {!!d.url && !(d.url as string).startsWith("https://") && <p className="text-red-400 text-xs">⚠ Invalid URL format.</p>}
        <FI label="Alt Text" value={d.alt as string ?? ""} onChange={v => upd("alt", v)} />
        <SelectField label="Width" value={d.width as string ?? "100"} onChange={v => upd("width", v)} options={[{ value: "25", label: "25%" }, { value: "50", label: "50%" }, { value: "75", label: "75%" }, { value: "100", label: "Full width" }]} />
        <SelectField label="Alignment" value={d.align as string ?? "center"} onChange={v => upd("align", v)} options={[{ value: "left", label: "Left" }, { value: "center", label: "Center" }, { value: "right", label: "Right" }]} />
        <FI label="Caption (optional)" value={d.caption as string ?? ""} onChange={v => upd("caption", v)} />
      </div>
    );
    case "video_block": {
      const url = d.url as string ?? "";
      const isValid = !url || url.includes("youtube") || url.includes("youtu.be") || url.includes("vimeo") || url.endsWith(".mp4");
      return (
        <div className="flex flex-col gap-3">
          <FI label="Video URL" value={url} onChange={v => upd("url", v)} placeholder="https://youtube.com/embed/..." />
          {!!url && !isValid && <p className="text-red-400 text-xs">⚠ Must be YouTube, Vimeo, or .mp4 URL</p>}
          <SelectField label="Aspect Ratio" value={d.aspect as string ?? "16:9"} onChange={v => upd("aspect", v)} options={[{ value: "16:9", label: "16:9" }, { value: "9:16", label: "9:16" }, { value: "1:1", label: "1:1" }]} />
          <ToggleField label="Muted" checked={d.muted as boolean ?? true} onChange={v => upd("muted", v)} />
          <ToggleField label="Autoplay" checked={d.autoplay as boolean ?? false} onChange={v => upd("autoplay", v)} />
          <FI label="Caption (optional)" value={d.caption as string ?? ""} onChange={v => upd("caption", v)} />
        </div>
      );
    }
    case "gif_block": {
      const url = d.url as string ?? "";
      const isValid = !url || url.endsWith(".gif") || url.includes("giphy") || url.includes("tenor");
      return (
        <div className="flex flex-col gap-3">
          <FI label="GIF URL" value={url} onChange={v => upd("url", v)} placeholder="https://..." />
          {!!url && !isValid && <p className="text-red-400 text-xs">⚠ Must be a .gif or Giphy/Tenor URL</p>}
          <FI label="Alt Text" value={d.alt as string ?? ""} onChange={v => upd("alt", v)} />
          <SelectField label="Width" value={d.width as string ?? "50"} onChange={v => upd("width", v)} options={[{ value: "25", label: "25%" }, { value: "50", label: "50%" }, { value: "75", label: "75%" }, { value: "100", label: "Full width" }]} />
          <SelectField label="Alignment" value={d.align as string ?? "center"} onChange={v => upd("align", v)} options={[{ value: "left", label: "Left" }, { value: "center", label: "Center" }, { value: "right", label: "Right" }]} />
        </div>
      );
    }
    case "divider": return (
      <div className="flex flex-col gap-3">
        <SelectField label="Style" value={d.style as string ?? "solid"} onChange={v => upd("style", v)} options={[{ value: "solid", label: "Solid" }, { value: "dashed", label: "Dashed" }, { value: "dotted", label: "Dotted" }, { value: "none", label: "Invisible" }]} />
        <SelectField label="Spacing" value={d.spacing as string ?? "md"} onChange={v => upd("spacing", v)} options={[{ value: "sm", label: "Small" }, { value: "md", label: "Medium" }, { value: "lg", label: "Large" }, { value: "xl", label: "X-Large" }]} />
      </div>
    );
    case "button_row": {
      const buttons = (d.buttons as { label: string; link: string; style: string; newTab: boolean }[]) ?? [];
      return (
        <div className="flex flex-col gap-3">
          <SelectField label="Row Alignment" value={d.align as string ?? "center"} onChange={v => upd("align", v)} options={[{ value: "left", label: "Left" }, { value: "center", label: "Center" }, { value: "right", label: "Right" }]} />
          {buttons.map((btn, i) => (
            <div key={i} className="p-3 bg-slate-800/50 rounded-xl flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">Button {i + 1}</span>
                {buttons.length > 1 && <button onClick={() => { const nb = [...buttons]; nb.splice(i, 1); upd("buttons", nb); }} className="text-red-400 hover:text-red-300 text-xs">Remove</button>}
              </div>
              <FI label="Label" value={btn.label} onChange={v => { const nb = [...buttons]; nb[i] = { ...nb[i], label: v }; upd("buttons", nb); }} maxLen={30} />
              <FI label="Link" value={btn.link} onChange={v => { const nb = [...buttons]; nb[i] = { ...nb[i], link: v }; upd("buttons", nb); }} />
              <div className="grid grid-cols-2 gap-2 mt-2">
                <SelectField label="Style" value={btn.style} onChange={v => { const nb = [...buttons]; nb[i] = { ...nb[i], style: v }; upd("buttons", nb); }} options={[{ value: "primary", label: "Primary" }, { value: "secondary", label: "Secondary" }, { value: "outline", label: "Outline" }]} />
                <div className="pt-5"><ToggleField label="New Tab" checked={btn.newTab} onChange={v => { const nb = [...buttons]; nb[i] = { ...nb[i], newTab: v }; upd("buttons", nb); }} /></div>
              </div>
            </div>
          ))}
          {buttons.length < 3 && <button onClick={() => upd("buttons", [...buttons, { label: "Button", link: "/", style: "primary", newTab: false }])} className="text-primary text-xs font-bold py-2 border border-primary/30 border-dashed rounded-lg hover:bg-primary/10 transition-colors">+ Add Button</button>}
        </div>
      );
    }
    case "two_col": return (
      <div className="flex flex-col gap-3">
        <FI label="Headline (optional)" value={d.headline as string ?? ""} onChange={v => upd("headline", v)} />
        <FI label="Left Column Text" value={d.leftText as string ?? ""} onChange={v => upd("leftText", v)} multiline />
        <FI label="Right Column Text" value={d.rightText as string ?? ""} onChange={v => upd("rightText", v)} multiline />
      </div>
    );
    case "image_text": return (
      <div className="flex flex-col gap-3">
        <SelectField label="Image Side" value={d.imageSide as string ?? "left"} onChange={v => upd("imageSide", v)} options={[{ value: "left", label: "Left" }, { value: "right", label: "Right" }]} />
        <FI label="Image URL" value={d.imageUrl as string ?? ""} onChange={v => upd("imageUrl", v)} />
        <FI label="Image Alt" value={d.imageAlt as string ?? ""} onChange={v => upd("imageAlt", v)} />
        <FI label="Headline" value={d.headline as string ?? ""} onChange={v => upd("headline", v)} />
        <FI label="Body text" value={d.body as string ?? ""} onChange={v => upd("body", v)} multiline />
      </div>
    );
    case "hero": return (
      <div className="flex flex-col gap-3">
        <FI label="Badge" value={d.badge as string ?? ""} onChange={v => upd("badge", v)} />
        <FI label="Headline" value={d.headline as string ?? ""} onChange={v => upd("headline", v)} maxLen={80} />
        <FI label="Subheadline" value={d.subheadline as string ?? ""} onChange={v => upd("subheadline", v)} multiline />
        <FI label="CTA Text" value={d.ctaText as string ?? ""} onChange={v => upd("ctaText", v)} />
        <FI label="CTA Link" value={d.ctaLink as string ?? ""} onChange={v => upd("ctaLink", v)} />
      </div>
    );
    case "cta_banner": return (
      <div className="flex flex-col gap-3">
        <FI label="Headline" value={d.headline as string ?? ""} onChange={v => upd("headline", v)} />
        <FI label="Subheadline" value={d.subheadline as string ?? ""} onChange={v => upd("subheadline", v)} />
        <FI label="CTA Text" value={d.ctaText as string ?? ""} onChange={v => upd("ctaText", v)} />
        <FI label="CTA Link" value={d.ctaLink as string ?? ""} onChange={v => upd("ctaLink", v)} />
      </div>
    );
    case "text_block": return (
      <div className="flex flex-col gap-3">
        <FI label="Headline" value={d.headline as string ?? ""} onChange={v => upd("headline", v)} />
        <FI label="Body" value={d.body as string ?? ""} onChange={v => upd("body", v)} multiline maxLen={2000} />
      </div>
    );
    case "stats": {
      const stats = (d.stats as { number: string; label: string }[]) ?? [];
      return (
        <div className="flex flex-col gap-3">
          {stats.map((s, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 p-3 bg-slate-800/50 rounded-xl">
              <FI label={`#${i + 1} Value`} value={s.number} onChange={v => { const ns = [...stats]; ns[i] = { ...ns[i], number: v }; upd("stats", ns); }} />
              <FI label={`#${i + 1} Label`} value={s.label} onChange={v => { const ns = [...stats]; ns[i] = { ...ns[i], label: v }; upd("stats", ns); }} />
            </div>
          ))}
        </div>
      );
    }
    case "feature_grid": {
      const features = (d.features as { icon: string; title: string; desc: string }[]) ?? [];
      return (
        <div className="flex flex-col gap-3">
          <FI label="Headline" value={d.headline as string ?? ""} onChange={v => upd("headline", v)} />
          {features.map((f, i) => (
            <div key={i} className="p-3 bg-slate-800/50 rounded-xl flex flex-col gap-2">
              <div className="text-xs text-slate-500">Feature {i + 1}</div>
              <div className="grid grid-cols-3 gap-2">
                <FI label="Icon" value={f.icon} onChange={v => { const nf = [...features]; nf[i] = { ...nf[i], icon: v }; upd("features", nf); }} />
                <FI label="Title" value={f.title} onChange={v => { const nf = [...features]; nf[i] = { ...nf[i], title: v }; upd("features", nf); }} />
                <FI label="Desc" value={f.desc} onChange={v => { const nf = [...features]; nf[i] = { ...nf[i], desc: v }; upd("features", nf); }} />
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
  return <p className="text-slate-400 text-sm">No properties for this block.</p>;
}

// ─── Visual Preview Mini Components ─────────────────────────────────────────

function SectionPreview({ section }: { section: Section }) {
  const d = section.data;
  switch (section.type) {
    case "heading_h1": return <h1 className={`text-2xl font-black ${d.align === 'center' ? 'text-center' : d.align === 'right' ? 'text-right' : 'text-left'}`}>{(d.text as string) || "Heading H1"}</h1>;
    case "heading_h2": return <h2 className={`text-xl font-bold ${d.align === 'center' ? 'text-center' : d.align === 'right' ? 'text-right' : 'text-left'}`}>{(d.text as string) || "Heading H2"}</h2>;
    case "rich_text": return <p className="text-sm text-slate-400 line-clamp-3">{(d.text as string) || "Rich text content..."}</p>;
    case "divider": return <hr className={`my-2 ${d.style === 'dashed' ? 'border-dashed' : d.style === 'dotted' ? 'border-dotted' : 'border-solid'} border-slate-700`} />;
    case "button_row": {
      const btns = (d.buttons as { style?: string; label?: string }[]) || [];
      return (
        <div className={`flex gap-2 ${d.align === 'center' ? 'justify-center' : d.align === 'right' ? 'justify-end' : 'justify-start'}`}>
          {btns.map((b, i) => <div key={i} className={`px-3 py-1 rounded text-xs font-semibold ${b.style === 'primary' ? 'bg-primary text-white' : 'border border-slate-600 text-slate-300'}`}>{b.label || "Button"}</div>)}
        </div>
      );
    }
    case "image_block": return (
      <div className={`flex ${d.align === 'center' ? 'justify-center' : d.align === 'right' ? 'justify-end' : 'justify-start'}`}>
        {d.url ? <img src={d.url as string} alt="Preview" className="max-h-20 rounded object-cover" /> : <div className="w-full h-16 bg-slate-800 rounded flex items-center justify-center text-slate-500 text-xs"><ImageIcon size={16} className="mr-1"/> Image placeholder</div>}
      </div>
    );
    case "video_block": return <div className="w-full h-16 bg-slate-800 rounded flex items-center justify-center text-slate-500 text-xs"><Video size={16} className="mr-1"/> Video Block</div>;
    case "gif_block": return <div className="w-full h-16 bg-slate-800 rounded flex items-center justify-center text-slate-500 text-xs"><FileText size={16} className="mr-1"/> GIF Block</div>;
    case "hero": return <div className="text-center py-4 bg-primary/10 rounded-xl"><div className="text-primary text-xs font-bold uppercase">{d.badge as string}</div><div className="font-bold text-lg">{d.headline as string}</div><div className="text-xs text-slate-400 mt-1">{d.subheadline as string}</div></div>;
    case "cta_banner": return <div className="text-center py-4 bg-primary text-white rounded-xl"><div className="font-bold">{d.headline as string}</div><div className="text-xs opacity-80">{d.subheadline as string}</div></div>;
    case "stats": return <div className="flex justify-center gap-4 py-2">{((d.stats as { number?: string; label?: string }[])||[]).slice(0,3).map((s,i)=><div key={i} className="text-center"><div className="font-bold text-primary">{s.number}</div><div className="text-[10px] text-slate-500 uppercase">{s.label}</div></div>)}</div>;
    case "feature_grid": return <div className="py-2"><div className="font-bold text-sm text-center mb-2">{d.headline as string}</div><div className="grid grid-cols-3 gap-2">{((d.features as { icon?: string; title?: string }[])||[]).slice(0,3).map((f,i)=><div key={i} className="text-center bg-slate-800/50 p-2 rounded"><div className="text-sm">{f.icon}</div><div className="text-[10px] font-bold truncate">{f.title}</div></div>)}</div></div>;
    case "two_col": return <div className="flex gap-4"><div className="flex-1 bg-slate-800/30 p-2 rounded text-xs text-slate-400">Left Column</div><div className="flex-1 bg-slate-800/30 p-2 rounded text-xs text-slate-400">Right Column</div></div>;
    case "image_text": return <div className={`flex gap-3 items-center ${d.imageSide === 'right' ? 'flex-row-reverse' : ''}`}><div className="w-16 h-12 bg-slate-800 rounded"></div><div className="flex-1 text-xs text-slate-400">Heading & Text</div></div>;
    case "text_block": return <div className="py-2"><h3 className="font-bold text-sm mb-1">{d.headline as string}</h3><p className="text-xs text-slate-400 line-clamp-2">{d.body as string}</p></div>;
  }
  return <div className="text-xs text-slate-500">Preview not available</div>;
}

// ─── Main Builder Page ────────────────────────────────────────────────────

export default function PageBuilderPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"builder" | "settings">("builder");
  const token = typeof window !== "undefined" ? localStorage.getItem("zypp_admin_token") ?? "" : "";

  useEffect(() => {
    fetch(`/api/cms/pages/${slug}`, { headers: { "x-admin-token": token } })
      .then((r) => r.json()).then((d) => { setPage(d); setLoading(false); });
  }, [slug]);

  const save = async (pub?: boolean) => {
    if (!page) return;
    setSaving(true);
    const payload = pub !== undefined ? { ...page, published: pub } : page;
    const res = await fetch(`/api/cms/pages/${slug}`, { method: "PATCH", headers: { "Content-Type": "application/json", "x-admin-token": token }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (data.page) setPage(data.page);
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
  };

  const addSection = (type: SectionType) => {
    const s: Section = { id: crypto.randomUUID(), type, data: { ...SECTION_TEMPLATES[type].defaults } };
    setPage((p) => p ? { ...p, sections: [...p.sections, s] } : p);
    setActiveSection(s.id); setSaved(false);
    setTimeout(() => {
      document.getElementById('canvas-end')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const updateSection = (id: string, data: Record<string, unknown>) => { setPage((p) => p ? { ...p, sections: p.sections.map((s) => s.id === id ? { ...s, data } : s) } : p); setSaved(false); };
  const removeSection = (id: string) => { setPage((p) => p ? { ...p, sections: p.sections.filter((s) => s.id !== id) } : p); if (activeSection === id) setActiveSection(null); setSaved(false); };

  // Native Drag & Drop
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
    // Slightly fade the dragged element
    setTimeout(() => {
      if (e.target instanceof HTMLElement) {
        e.target.style.opacity = "0.5";
      }
    }, 0);
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIdx(index);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (e.target instanceof HTMLElement) {
      e.target.style.opacity = "1";
    }
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) {
      handleDragEnd(e);
      return;
    }
    setPage(p => {
      if (!p) return p;
      const newSections = [...p.sections];
      const draggedSection = newSections[draggedIdx];
      newSections.splice(draggedIdx, 1);
      newSections.splice(index, 0, draggedSection);
      return { ...p, sections: newSections };
    });
    setSaved(false);
    handleDragEnd(e);
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!page) return <div className="text-slate-400 text-center py-20">Page not found.</div>;

  const activeSec = page.sections.find((s) => s.id === activeSection);

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <Link href="/admin/pages" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
        <div className="flex-1">
          <div className="text-white font-black text-lg">{page.title}</div>
          <div className="text-slate-500 text-xs">zypp.app/<span className="text-primary">{page.slug}</span></div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${page.published ? "bg-green-500/20 text-green-400" : "bg-slate-800 text-slate-400"}`}>{page.published ? "Published" : "Draft"}</span>
          <a href={`/${page.slug}?preview=true`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-sm hover:bg-slate-700 hover:text-white transition-colors border border-slate-700" title="Preview Full Page">
            <Eye size={14} /> Preview Page
          </a>
          <button onClick={() => save(!page.published)} className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors ${page.published ? "bg-slate-800 text-slate-300 hover:bg-red-500/20 hover:text-red-400" : "bg-green-600 text-white hover:bg-green-700"}`}>
            <Globe size={14} className="inline mr-1" />{page.published ? "Unpublish" : "Publish"}
          </button>
          <button onClick={() => save()} disabled={saving} className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 disabled:opacity-60 transition-colors">
            <Save size={14} />{saving ? "Saving…" : saved ? "Saved ✓" : "Save"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-slate-800 pb-0">
        <button onClick={() => setActiveTab("builder")} className={`px-4 py-2.5 text-sm font-bold rounded-t-xl transition-colors ${activeTab === "builder" ? "bg-slate-900 text-white border border-slate-700 border-b-slate-900" : "text-slate-400 hover:text-white"}`}>
          🧱 Visual Builder
        </button>
        <button onClick={() => setActiveTab("settings")} className={`px-4 py-2.5 text-sm font-bold rounded-t-xl flex items-center gap-1 transition-colors ${activeTab === "settings" ? "bg-slate-900 text-white border border-slate-700 border-b-slate-900" : "text-slate-400 hover:text-white"}`}>
          <Settings size={14} /> Page Settings
        </button>
      </div>

      {activeTab === "settings" ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg">
          {/* Settings panel content */}
          <div className="flex flex-col gap-4">
            <div className="border-b border-slate-800 pb-4">
              <h4 className="text-slate-300 font-bold text-sm mb-3">📄 Page Details</h4>
              <div className="flex flex-col gap-3">
                <FI label="Page Title (browser tab)" value={page.title} onChange={(v) => { setPage({ ...page, title: v }); setSaved(false); }} />
                <FI label="URL Slug" value={page.slug} onChange={(v) => { setPage({ ...page, slug: v.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") }); setSaved(false); }} />
                <FI label="Meta Description (SEO)" value={page.metaDescription} onChange={(v) => { setPage({ ...page, metaDescription: v }); setSaved(false); }} multiline />
              </div>
            </div>

            <div>
              <h4 className="text-slate-300 font-bold text-sm mb-3">🧭 Navigation Menu</h4>
              <div className="flex flex-col gap-3">
                <ToggleField label="Show in navigation menu" checked={page.navSettings?.showInMenu ?? false} onChange={(v) => { setPage({ ...page, navSettings: { ...(page.navSettings ?? DEFAULT_NAV), showInMenu: v } }); setSaved(false); }} />
                {(page.navSettings?.showInMenu) && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <FI label="Menu Icon (emoji)" value={page.navSettings.menuIcon} onChange={(v) => { setPage({ ...page, navSettings: { ...page.navSettings!, menuIcon: v } }); setSaved(false); }} />
                      <FI label="Menu Label" value={page.navSettings.menuLabel} onChange={(v) => { setPage({ ...page, navSettings: { ...page.navSettings!, menuLabel: v } }); setSaved(false); }} />
                    </div>
                    <FI label="Short description" value={page.navSettings.menuDescription} onChange={(v) => { setPage({ ...page, navSettings: { ...page.navSettings!, menuDescription: v } }); setSaved(false); }} />
                    <SelectField label="Dropdown Group" value={page.navSettings.menuGroup} onChange={(v) => { setPage({ ...page, navSettings: { ...page.navSettings!, menuGroup: v } }); setSaved(false); }} options={NAV_GROUPS} />
                    <ToggleField label="Open in new tab" checked={page.navSettings.openInNewTab} onChange={(v) => { setPage({ ...page, navSettings: { ...page.navSettings!, openInNewTab: v } }); setSaved(false); }} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-6 flex-1 min-h-0">
          {/* Section Palette */}
          <aside className="w-56 shrink-0 flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
            {GROUPS.map(group => (
              <div key={group.key}>
                <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 ${group.color}`}>{group.label}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.entries(SECTION_TEMPLATES) as [SectionType, (typeof SECTION_TEMPLATES)[SectionType]][]).filter(([, t]) => t.group === group.key).map(([type, t]) => (
                    <button key={type} onClick={() => addSection(type)} className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-primary/50 text-center hover:bg-slate-800 transition-all group">
                      <span className="text-slate-400 group-hover:text-primary transition-colors">{t.icon}</span>
                      <span className="text-[10px] font-semibold text-slate-300 group-hover:text-white leading-tight">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </aside>

          {/* Canvas (Visual Preview + Drag & Drop) */}
          <div className="flex-1 bg-background/50 rounded-2xl border border-slate-800 overflow-y-auto p-4 flex flex-col gap-3 pb-32">
            {page.sections.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-600 py-20 text-center">
                <div className="text-5xl mb-4">📋</div>
                <p className="font-bold text-lg">Start building your page</p>
                <p className="text-sm mt-1">Click a block on the left to add it.</p>
              </div>
            )}
            
            {page.sections.map((sec, idx) => {
              const tmpl = SECTION_TEMPLATES[sec.type];
              const isActive = activeSection === sec.id;
              const isDragOver = dragOverIdx === idx;
              
              return (
                <div 
                  key={sec.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragEnter={(e) => handleDragEnter(e, idx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => handleDrop(e, idx)}
                  onClick={() => setActiveSection(sec.id)}
                  className={`relative bg-slate-900/80 backdrop-blur border-2 rounded-xl transition-all cursor-pointer group ${isActive ? "border-primary shadow-lg shadow-primary/20" : isDragOver ? "border-blue-500 scale-[1.01]" : "border-slate-800 hover:border-slate-600"}`}
                >
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-700 z-10">
                    <button onClick={(e) => { e.stopPropagation(); removeSection(sec.id); }} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-md" title="Delete"><Trash2 size={14} /></button>
                  </div>
                  
                  <div className="flex items-stretch">
                    {/* Drag Handle */}
                    <div className="flex items-center justify-center w-8 bg-slate-800/50 rounded-l-lg cursor-grab active:cursor-grabbing text-slate-500 hover:text-white border-r border-slate-800/50">
                      <GripVertical size={16} />
                    </div>
                    
                    {/* Visual Preview Area */}
                    <div className="flex-1 p-4 min-w-0">
                       <div className="flex items-center gap-2 mb-3">
                         <span className="text-slate-500">{tmpl.icon}</span>
                         <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{tmpl.label}</span>
                       </div>
                       
                       <div className="bg-background rounded-lg border border-card-border p-4 shadow-sm overflow-hidden relative pointer-events-none opacity-90">
                         <SectionPreview section={sec} />
                       </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div id="canvas-end" />
          </div>

          {/* Properties Panel */}
          <aside className="w-80 shrink-0 overflow-y-auto pb-10">
            {activeSec ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">{SECTION_TEMPLATES[activeSec.type].icon}</span>
                    <h3 className="text-white font-bold">{SECTION_TEMPLATES[activeSec.type].label}</h3>
                  </div>
                </div>
                <div className="h-px w-full bg-slate-800" />
                <SectionEditor section={activeSec} onChange={(data) => updateSection(activeSec.id, data)} />
              </div>
            ) : (
              <div className="bg-slate-900 border border-dashed border-slate-800 rounded-2xl p-8 text-center sticky top-0">
                <Settings className="mx-auto text-slate-600 mb-3" size={32} />
                <h3 className="text-white font-bold mb-1">Properties</h3>
                <p className="text-slate-500 text-sm">Select a block on the canvas to edit its content and settings.</p>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ExternalLink, Pencil, Trash2, Globe, Clock, X, LayoutTemplate } from "lucide-react";

interface Page { id: string; slug: string; title: string; published: boolean; updatedAt: string; sections: unknown[]; }

const PAGE_TEMPLATES = [
  { id: "blank", name: "Blank Page", icon: "📄", desc: "Start from scratch.", sections: [] },
  {
    id: "landing", name: "Landing Page", icon: "🚀", desc: "Hero + Stats + Features + CTA",
    sections: [
      { type: "hero", data: { headline: "Your Headline Here", subheadline: "A short description.", ctaText: "Get Started", ctaLink: "/contact", badge: "New Launch" } },
      { type: "stats", data: { stats: [{ number: "100K+", label: "Happy Riders" }, { number: "50+", label: "Cities" }, { number: "5M+", label: "Deliveries" }] } },
      { type: "feature_grid", data: { headline: "Why Choose Zypp?", features: [{ icon: "🚀", title: "Fast", desc: "Lightning-fast EV delivery." }, { icon: "🛡️", title: "Safe", desc: "Fully insured riders." }, { icon: "🌿", title: "Green", desc: "Zero-emission EVs." }] } },
      { type: "cta_banner", data: { headline: "Ready to get started?", subheadline: "Join thousands of happy customers.", ctaText: "Contact Us", ctaLink: "/contact" } },
    ],
  },
  {
    id: "offer", name: "Offer / Promo", icon: "🎁", desc: "H1 + Image + Text + Buttons + CTA",
    sections: [
      { type: "heading_h1", data: { text: "Special Offer — Limited Time", align: "center" } },
      { type: "image_block", data: { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200", alt: "Zypp Promo", width: "100", align: "center", caption: "" } },
      { type: "rich_text", data: { text: "Don't miss out on this exclusive Zypp offer. Terms and conditions apply.", size: "base" } },
      { type: "button_row", data: { buttons: [{ label: "Claim Offer", link: "/contact", style: "primary", newTab: false }, { label: "Learn More", link: "/about", style: "outline", newTab: false }], align: "center" } },
      { type: "cta_banner", data: { headline: "Limited time only!", subheadline: "Act fast before this offer expires.", ctaText: "Get the App", ctaLink: "/contact" } },
    ],
  },
  {
    id: "blog", name: "Blog / Article", icon: "📝", desc: "H1 + Image + H2 + Rich Text",
    sections: [
      { type: "heading_h1", data: { text: "Article Title Goes Here", align: "left" } },
      { type: "image_block", data: { url: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1200", alt: "Article cover", width: "100", align: "center", caption: "Photo caption here" } },
      { type: "heading_h2", data: { text: "Introduction", align: "left" } },
      { type: "rich_text", data: { text: "Write your introduction paragraph here.", size: "base" } },
      { type: "heading_h2", data: { text: "Main Content", align: "left" } },
      { type: "rich_text", data: { text: "Continue writing your main content here.", size: "base" } },
      { type: "divider", data: { style: "solid", spacing: "md" } },
      { type: "button_row", data: { buttons: [{ label: "Share This Article", link: "#", style: "outline", newTab: false }], align: "center" } },
    ],
  },
  {
    id: "media", name: "Media Showcase", icon: "🎬", desc: "Hero + Video + Image & Text + CTA",
    sections: [
      { type: "hero", data: { headline: "See Zypp in Action", subheadline: "Watch how we're transforming last-mile delivery with electric vehicles.", ctaText: "Partner With Us", ctaLink: "/ev-for-delivery", badge: "Video" } },
      { type: "video_block", data: { url: "https://www.youtube.com/embed/dQw4w9WgXcQ", type: "youtube", aspect: "16:9", autoplay: false, muted: true, caption: "Zypp Electric — India's largest EV fleet" } },
      { type: "image_text", data: { imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", imageSide: "left", headline: "Built for Scale", body: "Our fleet covers 50+ cities across India.", imageAlt: "Zypp Fleet" } },
      { type: "cta_banner", data: { headline: "Join India's green delivery revolution.", subheadline: "Partner with Zypp and grow sustainably.", ctaText: "Get Started", ctaLink: "/ev-for-delivery" } },
    ],
  },
];

function NewPageModal({ onClose, onCreate }: { onClose: () => void; onCreate: (title: string, slug: string, templateId: string) => void; }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("blank");
  const [creating, setCreating] = useState(false);

  const toSlug = (t: string) => t.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!slugTouched) setSlug(toSlug(v));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) return;
    setCreating(true);
    onCreate(title.trim(), slug.trim(), selectedTemplate);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div>
            <h2 className="text-white font-black text-lg">Create New Page</h2>
            <p className="text-slate-400 text-sm mt-0.5">Choose a template and give it a URL.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase mb-1.5 block">Page Title</label>
              <input value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="e.g. Monsoon Offer 2026"
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm" autoFocus required />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-bold uppercase mb-1.5 block">URL Slug</label>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus-within:ring-2 focus-within:ring-primary">
                <span className="text-slate-500 text-sm shrink-0">zypp.app/</span>
                <input value={slug} onChange={(e) => { setSlugTouched(true); setSlug(toSlug(e.target.value)); }}
                  placeholder="monsoon-offer-2026" className="flex-1 bg-transparent text-primary text-sm font-mono focus:outline-none" required />
              </div>
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-xs font-bold uppercase mb-3 block flex items-center gap-2"><LayoutTemplate size={12} /> Starting Template</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PAGE_TEMPLATES.map((t) => (
                <button key={t.id} type="button" onClick={() => setSelectedTemplate(t.id)}
                  className={`text-left p-4 rounded-xl border transition-all ${selectedTemplate === t.id ? "border-primary bg-primary/10" : "border-slate-700 bg-slate-800/50 hover:border-slate-600"}`}>
                  <div className="text-2xl mb-2">{t.icon}</div>
                  <div className={`font-bold text-sm mb-1 ${selectedTemplate === t.id ? "text-primary" : "text-white"}`}>{t.name}</div>
                  <div className="text-slate-500 text-xs leading-snug">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm font-semibold">Cancel</button>
            <button type="submit" disabled={creating || !title.trim() || !slug.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 disabled:opacity-60 transition-colors">
              {creating ? <><div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> Creating…</> : <><Plus size={16} /> Create Page</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PagesListPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("zypp_admin_token") ?? "" : "";

  useEffect(() => {
    fetch("/api/cms/pages", { headers: { "x-admin-token": token } })
      .then((r) => r.json())
      .then((d) => { setPages(Array.isArray(d) ? d : []); setLoading(false); });
  }, []);

  const deletePage = async (slug: string) => {
    if (!confirm(`Delete page "/${slug}"? This cannot be undone.`)) return;
    await fetch(`/api/cms/pages/${slug}`, { method: "DELETE", headers: { "x-admin-token": token } });
    setPages((p) => p.filter((pg) => pg.slug !== slug));
  };

  const handleCreate = async (title: string, slug: string, templateId: string) => {
    const template = PAGE_TEMPLATES.find((t) => t.id === templateId);
    const sections = (template?.sections ?? []).map((s) => ({ id: Math.random().toString(36).slice(2), ...s }));
    const res = await fetch("/api/cms/pages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ slug, title, sections }),
    });
    const data = await res.json();
    if (data.page) { setShowModal(false); window.location.href = `/admin/pages/${data.page.slug}`; }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {showModal && <NewPageModal onClose={() => setShowModal(false)} onCreate={handleCreate} />}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-white mb-1">Dynamic Pages</h2>
          <p className="text-slate-400 text-sm">Create and manage marketing pages using the no-code builder.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
          <Plus size={16} /> New Page
        </button>
      </div>

      {loading && <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}

      {!loading && pages.length === 0 && (
        <div className="bg-slate-900 border border-dashed border-slate-700 rounded-2xl p-16 text-center">
          <div className="w-16 h-16 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-4"><Globe size={28} className="text-slate-500" /></div>
          <h3 className="text-white font-bold text-lg mb-2">No pages yet</h3>
          <p className="text-slate-400 text-sm mb-6">Create your first marketing page for a product launch, event, or offer.</p>
          <button onClick={() => setShowModal(true)} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold">Create First Page</button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {pages.map((page) => (
          <div key={page.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 hover:border-slate-700 transition-colors">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-white font-bold truncate">{page.title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold shrink-0 ${page.published ? "bg-green-500/20 text-green-400" : "bg-slate-800 text-slate-400"}`}>
                  {page.published ? "Published" : "Draft"}
                </span>
              </div>
              <div className="flex items-center gap-4 text-slate-500 text-xs">
                <span className="flex items-center gap-1"><Globe size={12} />/{page.slug}</span>
                <span className="flex items-center gap-1"><Clock size={12} />{new Date(page.updatedAt).toLocaleDateString()}</span>
                <span>{page.sections?.length ?? 0} sections</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {page.published && (
                <a href={`/${page.slug}`} target="_blank" rel="noopener" className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors" title="View live"><ExternalLink size={16} /></a>
              )}
              <Link href={`/admin/pages/${page.slug}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs font-semibold">
                <Pencil size={14} /> Edit
              </Link>
              <button onClick={() => deletePage(page.slug)} className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

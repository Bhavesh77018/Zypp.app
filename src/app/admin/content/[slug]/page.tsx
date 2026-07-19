"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, ChevronUp, ChevronDown, ExternalLink, Upload, X } from "lucide-react";
import { getPageDef, type FieldDef } from "@/lib/content";
import IconPicker from "@/components/admin/IconPicker";

type Content = Record<string, Record<string, unknown>>;

// ─── Primitive inputs ──────────────────────────────────────────────────────
function TextInput({ value, onChange, type = "text" }: { value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
    />
  );
}

function TextArea({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-y"
    />
  );
}

// ─── Image upload field ────────────────────────────────────────────────────
function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const upload = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const token = localStorage.getItem("zypp_admin_token") ?? "";
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/cms/upload", { method: "POST", headers: { "x-admin-token": token }, body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {value ? (
        <div className="relative inline-block w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="max-h-32 rounded-xl border border-slate-700 object-cover" />
          <button onClick={() => onChange("")} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow" title="Remove">
            <X size={13} />
          </button>
        </div>
      ) : (
        <label className="flex items-center gap-2 cursor-pointer w-fit px-4 py-2.5 rounded-xl bg-slate-800 border border-dashed border-slate-600 text-slate-300 text-sm hover:border-primary hover:text-primary transition-colors">
          <Upload size={15} /> {uploading ? "Uploading…" : "Upload image"}
          <input type="file" accept="image/*" className="hidden" disabled={uploading}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }} />
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="…or paste an image URL"
        className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary text-xs"
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

// ─── A single (non-list) field ─────────────────────────────────────────────
function ScalarField({ field, value, onChange }: { field: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  // Icon fields get the professional icon picker (stores an icon name; legacy emoji still render).
  if (field.key === "icon" || /\bicon\b/i.test(field.label)) {
    return <IconPicker value={String(value ?? "")} onChange={onChange} />;
  }
  if (field.type === "image") return <ImageField value={String(value ?? "")} onChange={onChange} />;
  if (field.type === "toggle") {
    const checked = Boolean(value);
    return (
      <div
        className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${checked ? "bg-primary" : "bg-slate-700"}`}
        onClick={() => onChange(!checked)}
      >
        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${checked ? "left-[1.375rem]" : "left-0.5"}`} />
      </div>
    );
  }
  if (field.type === "textarea") return <TextArea value={String(value ?? "")} onChange={onChange} />;
  if (field.type === "number")
    return <TextInput type="number" value={String(value ?? "")} onChange={(v) => onChange(v === "" ? 0 : Number(v))} />;
  if (field.type === "color")
    return (
      <div className="flex items-center gap-2">
        <input type="color" value={String(value ?? "#00bc84")} onChange={(e) => onChange(e.target.value)} className="h-9 w-12 rounded bg-slate-800 border border-slate-700" />
        <TextInput value={String(value ?? "")} onChange={onChange} />
      </div>
    );
  return <TextInput value={String(value ?? "")} onChange={onChange} />;
}

// ─── A list field (array of objects) ───────────────────────────────────────
function ListField({ field, value, onChange }: { field: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  const items = Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
  const itemFields = field.itemFields ?? [];

  const update = (items2: Record<string, unknown>[]) => onChange(items2);
  const newItem = () => Object.fromEntries(itemFields.map((f) => [f.key, f.default]));

  const setItem = (idx: number, key: string, v: unknown) => {
    const next = items.map((it, i) => (i === idx ? { ...it, [key]: v } : it));
    update(next);
  };
  const remove = (idx: number) => update(items.filter((_, i) => i !== idx));
  const move = (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[idx], next[j]] = [next[j], next[idx]];
    update(next);
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => (
        <div key={idx} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">#{idx + 1}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => move(idx, -1)} disabled={idx === 0} className="p-1 text-slate-500 hover:text-white disabled:opacity-30"><ChevronUp size={15} /></button>
              <button onClick={() => move(idx, 1)} disabled={idx === items.length - 1} className="p-1 text-slate-500 hover:text-white disabled:opacity-30"><ChevronDown size={15} /></button>
              <button onClick={() => remove(idx)} className="p-1 text-red-400 hover:text-red-300"><Trash2 size={15} /></button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {itemFields.map((f) => (
              <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="text-xs font-medium text-slate-400 block mb-1">{f.label}</label>
                <ScalarField field={f} value={item[f.key]} onChange={(v) => setItem(idx, f.key, v)} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={() => update([...items, newItem()])}
        className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
      >
        <Plus size={15} /> Add item
      </button>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function ContentEditorPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const def = getPageDef(slug);

  const [content, setContent] = useState<Content>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("zypp_admin_token") ?? "";
    fetch(`/api/cms/content?slug=${slug}`, { headers: { "x-admin-token": token } })
      .then((r) => r.json())
      .then((d) => setContent(d ?? {}))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  const setField = useCallback((sectionKey: string, fieldKey: string, value: unknown) => {
    setContent((prev) => ({ ...prev, [sectionKey]: { ...prev[sectionKey], [fieldKey]: value } }));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const token = localStorage.getItem("zypp_admin_token") ?? "";
    await fetch("/api/cms/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ slug, content }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!def) {
    return (
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/content" className="text-slate-400 hover:text-white text-sm flex items-center gap-1 mb-4"><ArrowLeft size={15} /> Back</Link>
        <p className="text-slate-400">No editable content is registered for &quot;{slug}&quot;.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="w-7 h-7 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-24">
      <Link href="/admin/content" className="text-slate-400 hover:text-white text-sm flex items-center gap-1 mb-4"><ArrowLeft size={15} /> All pages</Link>

      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-black text-white">{def.label}</h2>
          <Link href={def.path} target="_blank" className="text-slate-500 text-xs font-mono hover:text-primary inline-flex items-center gap-1 mt-1">
            {def.path} <ExternalLink size={11} />
          </Link>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <Save size={16} /> {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {def.sections.map((section) => (
          <div key={section.key} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="mb-5">
              <h3 className="text-white font-bold text-base">{section.label}</h3>
              {section.description && <p className="text-slate-500 text-xs mt-0.5">{section.description}</p>}
            </div>
            <div className="space-y-4">
              {section.fields.map((field) => {
                const value = content[section.key]?.[field.key];
                const isList = field.type === "list";
                return (
                  <div key={field.key} className={isList ? "" : "grid grid-cols-1 gap-1.5"}>
                    <label className="text-sm font-semibold text-slate-300">{field.label}</label>
                    {field.hint && <p className="text-xs text-slate-500 -mt-0.5 mb-1">{field.hint}</p>}
                    {isList ? (
                      <ListField field={field} value={value} onChange={(v) => setField(section.key, field.key, v)} />
                    ) : (
                      <ScalarField field={field} value={value} onChange={(v) => setField(section.key, field.key, v)} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

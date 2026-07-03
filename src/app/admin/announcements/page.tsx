"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save, ToggleLeft, ToggleRight } from "lucide-react";
import { randomUUID } from "crypto";

interface Bar {
  id: string;
  message: string;
  ctaText: string;
  ctaLink: string;
  bgColor: string;
  pages: string[];
  active: boolean;
  dismissible: boolean;
}

const BG_OPTIONS = ["primary", "blue", "yellow", "red", "purple"];
const BLANK_BAR = (): Bar => ({
  id: Math.random().toString(36).slice(2),
  message: "",
  ctaText: "",
  ctaLink: "",
  bgColor: "primary",
  pages: ["all"],
  active: false,
  dismissible: true,
});

export default function AnnouncementsPage() {
  const [bars, setBars] = useState<Bar[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("zypp_admin_token") ?? "" : "";

  useEffect(() => {
    fetch("/api/cms/config", { headers: { "x-admin-token": token } })
      .then((r) => r.json())
      .then((d) => setBars(d.announcementBars ?? []));
  }, []);

  const update = (id: string, field: keyof Bar, value: unknown) => {
    setBars((prev) => prev.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
    setSaved(false);
  };

  const addBar = () => setBars((prev) => [...prev, BLANK_BAR()]);
  const removeBar = (id: string) => { setBars((prev) => prev.filter((b) => b.id !== id)); setSaved(false); };

  const saveAll = async () => {
    setSaving(true);
    await fetch("/api/cms/config", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ announcementBars: bars }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-white mb-1">Announcement Bars</h2>
          <p className="text-slate-400 text-sm">Create scrolling top banners for promotions, events, or alerts.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={addBar} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-semibold text-sm hover:bg-slate-700 transition-colors">
            <Plus size={16} /> Add Bar
          </button>
          <button onClick={saveAll} disabled={saving} className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-60">
            <Save size={16} /> {saving ? "Saving…" : saved ? "Saved ✓" : "Save All"}
          </button>
        </div>
      </div>

      {bars.length === 0 && (
        <div className="bg-slate-900 border border-dashed border-slate-700 rounded-2xl p-12 text-center">
          <p className="text-slate-400 mb-4">No announcement bars yet.</p>
          <button onClick={addBar} className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold">
            Create First Bar
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {bars.map((bar) => (
          <div key={bar.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${bar.active ? "bg-green-500/20 text-green-400" : "bg-slate-800 text-slate-400"}`}>
                {bar.active ? "Active" : "Inactive"}
              </span>
              <div className="flex items-center gap-3">
                <button onClick={() => update(bar.id, "active", !bar.active)} className="text-slate-400 hover:text-white">
                  {bar.active ? <ToggleRight size={28} className="text-primary" /> : <ToggleLeft size={28} />}
                </button>
                <button onClick={() => removeBar(bar.id)} className="text-red-400 hover:text-red-300">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-xs font-semibold uppercase mb-1 block">Message *</label>
              <input
                value={bar.message}
                onChange={(e) => update(bar.id, "message", e.target.value)}
                placeholder="🎉 New city launch in Pune! Check it out."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-xs font-semibold uppercase mb-1 block">CTA Button Text</label>
                <input value={bar.ctaText} onChange={(e) => update(bar.id, "ctaText", e.target.value)} placeholder="Learn More" className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
              </div>
              <div>
                <label className="text-slate-400 text-xs font-semibold uppercase mb-1 block">CTA Link</label>
                <input value={bar.ctaLink} onChange={(e) => update(bar.id, "ctaLink", e.target.value)} placeholder="/zyppNews" className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <label className="text-slate-400 text-xs font-semibold uppercase mb-1 block">Background Color</label>
                <div className="flex gap-2">
                  {BG_OPTIONS.map((c) => (
                    <button key={c} onClick={() => update(bar.id, "bgColor", c)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${bar.bgColor === c ? "ring-2 ring-white scale-110" : "opacity-60 hover:opacity-100"} ${
                        c === "primary" ? "bg-primary text-black" : c === "blue" ? "bg-blue-600 text-white" : c === "yellow" ? "bg-yellow-400 text-black" : c === "red" ? "bg-red-600 text-white" : "bg-purple-600 text-white"
                      }`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 text-sm">
                <input type="checkbox" checked={bar.dismissible} onChange={(e) => update(bar.id, "dismissible", e.target.checked)} className="accent-primary w-4 h-4" />
                Dismissible
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

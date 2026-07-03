"use client";

import { useEffect, useState } from "react";
import { MousePointerClick, Save, Eye, EyeOff } from "lucide-react";

interface GlobalCTA {
  enabled: boolean;
  label: string;
  link: string;
  openInNewTab: boolean;
  style: "primary" | "outline" | "ghost";
  floatingEnabled: boolean;
  floatingLabel: string;
  floatingLink: string;
  floatingOpenInNewTab: boolean;
  floatingPosition: "bottom-right" | "bottom-left" | "bottom-center";
}

const DEFAULT: GlobalCTA = {
  enabled: true,
  label: "Get the App",
  link: "/contact",
  openInNewTab: false,
  style: "primary",
  floatingEnabled: false,
  floatingLabel: "Get the App",
  floatingLink: "/contact",
  floatingOpenInNewTab: false,
  floatingPosition: "bottom-right",
};

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-300">{label}</label>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
    />
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        className={`w-11 h-6 rounded-full transition-colors relative ${checked ? "bg-primary" : "bg-slate-700"}`}
        onClick={() => onChange(!checked)}
      >
        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5.5 left-0.5" : "left-0.5"}`} />
      </div>
      <span className="text-sm text-slate-300">{label}</span>
    </label>
  );
}

export default function CTASettingsPage() {
  const [cta, setCta] = useState<GlobalCTA>(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("zypp_admin_token") ?? "";
    fetch("/api/cms/config", { headers: { "x-admin-token": token } })
      .then((r) => r.json())
      .then((d) => {
        if (d.globalCTA) setCta({ ...DEFAULT, ...d.globalCTA });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const token = localStorage.getItem("zypp_admin_token") ?? "";
    await fetch("/api/cms/config", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ globalCTA: cta }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const update = (field: keyof GlobalCTA, value: unknown) =>
    setCta((prev) => ({ ...prev, [field]: value }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="w-7 h-7 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <MousePointerClick size={24} className="text-primary" /> CTA Settings
          </h2>
          <p className="text-slate-400 mt-1 text-sm">Configure the Call-to-Action button shown sitewide. Changes go live instantly.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          <Save size={16} />
          {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Navbar CTA */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-white font-bold text-base">Navbar CTA Button</h3>
          <Toggle checked={cta.enabled} onChange={(v) => update("enabled", v)} label={cta.enabled ? "Visible" : "Hidden"} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Button Label" hint="Text shown on the button">
            <Input value={cta.label} onChange={(v) => update("label", v)} placeholder="e.g. Get the App" />
          </Field>

          <Field label="Redirect URL" hint="Where the button takes users">
            <Input value={cta.link} onChange={(v) => update("link", v)} placeholder="e.g. /contact or https://…" />
          </Field>

          <Field label="Button Style">
            <select
              value={cta.style}
              onChange={(e) => update("style", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="primary">Primary (filled)</option>
              <option value="outline">Outline (bordered)</option>
              <option value="ghost">Ghost (text only)</option>
            </select>
          </Field>

          <Field label="Link Behavior">
            <select
              value={cta.openInNewTab ? "new" : "same"}
              onChange={(e) => update("openInNewTab", e.target.value === "new")}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="same">Open in same tab</option>
              <option value="new">Open in new tab</option>
            </select>
          </Field>
        </div>

        {/* Preview */}
        <div className="mt-5 pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">Preview</p>
          <div className="flex items-center gap-3">
            {cta.enabled ? (
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`inline-flex px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                  cta.style === "outline"
                    ? "border-2 border-primary text-primary"
                    : cta.style === "ghost"
                    ? "text-primary"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {cta.label || "Button Label"}
              </a>
            ) : (
              <span className="text-slate-500 text-sm italic flex items-center gap-1"><EyeOff size={14} /> Hidden</span>
            )}
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-white font-bold text-base">Floating CTA Button</h3>
            <p className="text-slate-400 text-xs mt-0.5">Appears as a floating pill after scrolling down any page</p>
          </div>
          <Toggle checked={cta.floatingEnabled} onChange={(v) => update("floatingEnabled", v)} label={cta.floatingEnabled ? "Enabled" : "Disabled"} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Button Label">
            <Input value={cta.floatingLabel} onChange={(v) => update("floatingLabel", v)} placeholder="e.g. Get the App" />
          </Field>

          <Field label="Redirect URL">
            <Input value={cta.floatingLink} onChange={(v) => update("floatingLink", v)} placeholder="e.g. /contact or https://…" />
          </Field>

          <Field label="Screen Position">
            <select
              value={cta.floatingPosition}
              onChange={(e) => update("floatingPosition", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="bottom-center">Bottom Center</option>
            </select>
          </Field>

          <Field label="Link Behavior">
            <select
              value={cta.floatingOpenInNewTab ? "new" : "same"}
              onChange={(e) => update("floatingOpenInNewTab", e.target.value === "new")}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            >
              <option value="same">Open in same tab</option>
              <option value="new">Open in new tab</option>
            </select>
          </Field>
        </div>

        {cta.floatingEnabled && (
          <div className="mt-5 pt-4 border-t border-slate-800">
            <p className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">Preview</p>
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-slate-400" />
              <span className="text-xs text-slate-400">Floating button appears at <strong className="text-white">{cta.floatingPosition.replace("-", " ")}</strong> after scroll</span>
            </div>
            <div className="relative h-16 mt-3 bg-slate-800 rounded-xl overflow-hidden">
              <div className={`absolute bottom-3 flex ${cta.floatingPosition === "bottom-left" ? "left-3" : cta.floatingPosition === "bottom-center" ? "left-1/2 -translate-x-1/2" : "right-3"}`}>
                <span className="inline-flex items-center bg-primary text-primary-foreground px-4 py-1.5 rounded-full font-bold text-xs shadow-lg">
                  {cta.floatingLabel || "Button Label"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="text-slate-500 text-xs mt-4 text-center">Changes are applied globally across all pages after saving.</p>
    </div>
  );
}

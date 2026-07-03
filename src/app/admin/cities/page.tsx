"use client";

import { useEffect, useState } from "react";
import { MapPin, Save, Plus, Trash2, Building2 } from "lucide-react";

type Hub = { id: string; name: string; address: string; phone?: string; mapUrl?: string };
type Region = "North" | "South" | "East" | "West" | "Central";
type City = { id: string; name: string; state: string; region: Region; status: "active" | "coming-soon"; riders: string; hubs: Hub[] };

const REGIONS: Region[] = ["North", "South", "East", "West", "Central"];

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
  );
}

export default function CitiesAdminPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/cms/cities")
      .then((r) => r.json())
      .then((d) => setCities(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true); setSaved(false);
    const token = localStorage.getItem("zypp_admin_token") ?? "";
    await fetch("/api/cms/cities", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ cities }),
    });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  const updateCity = (id: string, patch: Partial<City>) => setCities((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const removeCity = (id: string) => setCities((cs) => cs.filter((c) => c.id !== id));
  const addCity = () => setCities((cs) => [...cs, { id: crypto.randomUUID(), name: "New City", state: "", region: "North", status: "coming-soon", riders: "—", hubs: [] }]);

  const addHub = (cityId: string) => updateCity(cityId, { hubs: [...(cities.find((c) => c.id === cityId)?.hubs ?? []), { id: crypto.randomUUID(), name: "New Hub", address: "" }] });
  const updateHub = (cityId: string, hubId: string, patch: Partial<Hub>) => {
    const city = cities.find((c) => c.id === cityId); if (!city) return;
    updateCity(cityId, { hubs: city.hubs.map((h) => (h.id === hubId ? { ...h, ...patch } : h)) });
  };
  const removeHub = (cityId: string, hubId: string) => {
    const city = cities.find((c) => c.id === cityId); if (!city) return;
    updateCity(cityId, { hubs: city.hubs.filter((h) => h.id !== hubId) });
  };

  if (loading) return <div className="flex items-center justify-center h-40"><div className="w-7 h-7 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  const activeCount = cities.filter((c) => c.status === "active").length;
  const hubCount = cities.reduce((n, c) => n + c.hubs.length, 0);

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="flex items-center justify-between mb-2 gap-4 flex-wrap">
        <h2 className="text-2xl font-black text-white flex items-center gap-2"><MapPin size={24} className="text-primary" /> Cities & Hubs</h2>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 disabled:opacity-50 transition-colors">
          <Save size={16} /> {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
      <p className="text-slate-400 text-sm mb-6">Add, edit or remove cities and their hubs. Changes power the <strong className="text-white">Find a Hub</strong> page and city counts across the site. {cities.length} cities · {activeCount} active · {hubCount} hubs.</p>

      <div className="space-y-4">
        {cities.map((c) => (
          <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
              <div><label className="text-xs text-slate-400 block mb-1">City</label><Input value={c.name} onChange={(v) => updateCity(c.id, { name: v })} /></div>
              <div><label className="text-xs text-slate-400 block mb-1">State</label><Input value={c.state} onChange={(v) => updateCity(c.id, { state: v })} /></div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Region</label>
                <select value={c.region} onChange={(e) => updateCity(c.id, { region: e.target.value as Region })} className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Status</label>
                <select value={c.status} onChange={(e) => updateCity(c.id, { status: e.target.value as City["status"] })} className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="active">Active</option>
                  <option value="coming-soon">Coming soon</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div><label className="text-xs text-slate-400 block mb-1">Active riders (label)</label><Input value={c.riders} onChange={(v) => updateCity(c.id, { riders: v })} placeholder="e.g. 6500+" /></div>
            </div>

            {/* Hubs */}
            <div className="border-t border-slate-800 pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5"><Building2 size={13} /> Hubs ({c.hubs.length})</span>
                <button onClick={() => addHub(c.id)} className="text-xs font-semibold text-primary hover:gap-1.5 flex items-center gap-1"><Plus size={13} /> Add hub</button>
              </div>
              <div className="space-y-2">
                {c.hubs.map((h) => (
                  <div key={h.id} className="bg-slate-800/60 border border-slate-700 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] text-slate-500 uppercase tracking-wider">Hub</span>
                      <button onClick={() => removeHub(c.id, h.id)} className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Input value={h.name} onChange={(v) => updateHub(c.id, h.id, { name: v })} placeholder="Hub name" />
                      <Input value={h.phone ?? ""} onChange={(v) => updateHub(c.id, h.id, { phone: v })} placeholder="Phone (optional)" />
                      <div className="sm:col-span-2"><Input value={h.address} onChange={(v) => updateHub(c.id, h.id, { address: v })} placeholder="Full address" /></div>
                      <div className="sm:col-span-2"><Input value={h.mapUrl ?? ""} onChange={(v) => updateHub(c.id, h.id, { mapUrl: v })} placeholder="Google Maps link (optional)" /></div>
                    </div>
                  </div>
                ))}
                {c.hubs.length === 0 && <p className="text-slate-600 text-xs italic">No hubs yet.</p>}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 flex justify-end">
              <button onClick={() => removeCity(c.id)} className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1"><Trash2 size={13} /> Remove city</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addCity} className="mt-5 w-full py-3 rounded-2xl border border-dashed border-slate-700 text-slate-300 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 font-semibold text-sm">
        <Plus size={16} /> Add a city
      </button>
    </div>
  );
}

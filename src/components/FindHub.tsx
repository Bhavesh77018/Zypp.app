"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Phone, ExternalLink, Navigation } from "lucide-react";
import type { City, Region } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";

const FILTERS: (Region | "All")[] = ["All", "North", "South", "East", "West", "Central"];

export default function FindHub({ cities }: { cities: City[] }) {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState<Region | "All">("All");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return cities.filter((c) => {
      if (region !== "All" && c.region !== region) return false;
      if (!query) return true;
      return (
        c.name.toLowerCase().includes(query) ||
        c.state.toLowerCase().includes(query) ||
        c.hubs.some((h) => h.address.toLowerCase().includes(query) || h.name.toLowerCase().includes(query))
      );
    });
  }, [cities, q, region]);

  const activeCount = cities.filter((c) => c.status === "active").length;
  const hubCount = cities.reduce((n, c) => n + c.hubs.length, 0);

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {/* Search + filters */}
      <Reveal className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-5 md:p-6 shadow-sm -mt-12 relative z-10">
        <div className="relative mb-4">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by city, state or area…"
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                region === r
                  ? "bg-primary text-white border-primary"
                  : "bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-primary/50"
              }`}
            >
              {r === "All" ? `All India · ${cities.length}` : r}
            </button>
          ))}
        </div>
        <div className="mt-4 text-xs text-gray-400">
          {activeCount} active cities · {hubCount} hubs · showing {filtered.length}
        </div>
      </Reveal>

      {/* Results */}
      <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8" stagger={0.05}>
        {filtered.map((c) => (
          <RevealItem key={c.id} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col">
            <div className="flex items-start justify-between gap-3 mb-1">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{c.name}</h3>
                <div className="text-xs text-gray-400">{c.state} · {c.region} India</div>
              </div>
              <span className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                c.status === "active" ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-600"
              }`}>
                {c.status === "active" ? "Live" : "Soon"}
              </span>
            </div>
            {c.status === "active" && (
              <div className="text-sm font-black text-primary mb-4">{c.riders} <span className="text-xs font-medium text-gray-400">active riders</span></div>
            )}

            <div className="flex flex-col gap-3 flex-1">
              {c.hubs.map((h) => (
                <div key={h.id} className="rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-4">
                  <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1.5 flex items-center gap-1.5">
                    <MapPin size={14} className="text-primary shrink-0" /> {h.name}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-2">{h.address}</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    {h.phone && <a href={`tel:${h.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-primary"><Phone size={12} /> {h.phone}</a>}
                    {h.mapUrl && <a href={h.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-1.5 transition-all"><Navigation size={12} /> Directions <ExternalLink size={10} /></a>}
                  </div>
                </div>
              ))}
              {c.hubs.length === 0 && (
                <div className="rounded-xl bg-gray-50 dark:bg-slate-800 border border-dashed border-gray-200 dark:border-slate-700 p-4 text-xs text-gray-400">
                  {c.status === "active" ? "Hub details coming soon — " : "Launching soon — "}
                  <Link href="/contact" className="text-primary font-semibold hover:underline">contact us</Link>.
                </div>
              )}
            </div>
          </RevealItem>
        ))}
      </RevealStagger>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          No cities match “{q}”. Try another search, or <Link href="/contact" className="text-primary font-semibold">request your city</Link>.
        </div>
      )}
    </div>
  );
}

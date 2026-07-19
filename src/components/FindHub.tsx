"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Phone, ExternalLink, Navigation } from "lucide-react";
import type { City, Region } from "@/lib/cms";
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/Reveal";

const FILTERS: (Region | "All")[] = ["All", "North", "South", "East", "West", "Central"];

/** Coordinates for locating the nearest Zypp city — covers current cities and
 *  likely expansion targets. Keys are lowercase city names as stored in the CMS. */
const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  gurgaon: { lat: 28.4595, lng: 77.0266 }, gurugram: { lat: 28.4595, lng: 77.0266 },
  delhi: { lat: 28.6139, lng: 77.209 }, "new delhi": { lat: 28.6139, lng: 77.209 },
  noida: { lat: 28.5355, lng: 77.391 }, faridabad: { lat: 28.4089, lng: 77.3178 },
  ghaziabad: { lat: 28.6692, lng: 77.4538 }, jaipur: { lat: 26.9124, lng: 75.7873 },
  chandigarh: { lat: 30.7333, lng: 76.7794 }, lucknow: { lat: 26.8467, lng: 80.9462 },
  bengaluru: { lat: 12.9716, lng: 77.5946 }, bangalore: { lat: 12.9716, lng: 77.5946 },
  hyderabad: { lat: 17.385, lng: 78.4867 }, chennai: { lat: 13.0827, lng: 80.2707 },
  kochi: { lat: 9.9312, lng: 76.2673 }, mumbai: { lat: 19.076, lng: 72.8777 },
  pune: { lat: 18.5204, lng: 73.8567 }, ahmedabad: { lat: 23.0225, lng: 72.5714 },
  surat: { lat: 21.1702, lng: 72.8311 }, goa: { lat: 15.2993, lng: 74.124 },
  kolkata: { lat: 22.5726, lng: 88.3639 }, indore: { lat: 22.7196, lng: 75.8577 },
  nagpur: { lat: 21.1458, lng: 79.0882 }, bhopal: { lat: 23.2599, lng: 77.4126 },
};

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export default function FindHub({ cities }: { cities: City[] }) {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState<Region | "All">("All");
  const [locating, setLocating] = useState(false);
  const [nearMsg, setNearMsg] = useState<string | null>(null);

  const locate = () => {
    if (!("geolocation" in navigator)) {
      setNearMsg("Location isn't supported by this browser — search for your city instead.");
      return;
    }
    setLocating(true);
    setNearMsg(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const me = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        let best: { city: City; km: number } | null = null;
        for (const c of cities) {
          const coords = CITY_COORDS[c.name.trim().toLowerCase()];
          if (!coords) continue;
          const km = haversineKm(me, coords);
          if (!best || km < best.km) best = { city: c, km };
        }
        setLocating(false);
        if (best) {
          setRegion("All");
          setQ(best.city.name);
          setNearMsg(`Nearest Zypp city: ${best.city.name} (~${Math.round(best.km)} km away)`);
        } else {
          setNearMsg("Couldn't match your location to a Zypp city yet — try searching instead.");
        }
      },
      () => {
        setLocating(false);
        setNearMsg("Location permission denied — search for your city instead.");
      },
      { timeout: 10000, maximumAge: 300000 }
    );
  };

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
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by city, state or area…"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
          <button
            onClick={locate}
            disabled={locating}
            data-track="Find Hub Near Me"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-primary text-white text-sm font-bold hover:bg-primary/90 disabled:opacity-60 transition-all shrink-0"
          >
            <Navigation size={15} className={locating ? "animate-pulse" : ""} />
            {locating ? "Locating…" : "Near me"}
          </button>
        </div>
        {nearMsg && <div className="mb-4 text-xs font-semibold text-primary">{nearMsg}</div>}
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

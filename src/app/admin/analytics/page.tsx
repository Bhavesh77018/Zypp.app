"use client";

import { useEffect, useState } from "react";
import { Eye, MousePointer, FileText, BarChart2, RefreshCw, TrendingUp } from "lucide-react";

interface Summary {
  totalEvents: number; pageViews: number; ctaClicks: number; formSubmits: number;
  topPages: { page: string; views: number }[];
  topCTAs:  { label: string; clicks: number }[];
  recentEvents: { id: string; type: string; page: string; label?: string; ts: string }[];
  byDay: { date: string; views: number; clicks: number }[];
}

const RANGES = [{ label: "Today", days: 1 }, { label: "7 Days", days: 7 }, { label: "30 Days", days: 30 }];

const TYPE_COLORS: Record<string, string> = {
  page_view: "bg-blue-500/20 text-blue-400",
  cta_click: "bg-primary/20 text-primary",
  banner_click: "bg-yellow-500/20 text-yellow-400",
  menu_click: "bg-purple-500/20 text-purple-400",
  form_submit: "bg-green-500/20 text-green-400",
  announcement_dismiss: "bg-slate-700 text-slate-400",
};

function KPICard({ label, value, icon: Icon, color }: { label: string; value: number; icon: React.ElementType; color: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}><Icon size={20} /></div>
      <div className="text-3xl font-black text-white">{value.toLocaleString()}</div>
      <div className="text-slate-400 text-sm font-medium">{label}</div>
    </div>
  );
}

// Simple bar chart using CSS
function MiniBarChart({ data }: { data: { date: string; views: number; clicks: number }[] }) {
  const maxVal = Math.max(...data.map((d) => Math.max(d.views, d.clicks)), 1);
  return (
    <div className="flex items-end gap-1 h-24 w-full">
      {data.map((d) => (
        <div key={d.date} className="flex-1 flex flex-col items-center gap-0.5 group relative" title={`${d.date}: ${d.views} views, ${d.clicks} clicks`}>
          <div className="w-full bg-primary rounded-t" style={{ height: `${(d.views / maxVal) * 100}%` }}></div>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [range, setRange] = useState(7);
  const [data, setData] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("zypp_admin_token") ?? "" : "";

  const load = async (days: number) => {
    setLoading(true);
    const res = await fetch(`/api/analytics/summary?range=${days}`, { headers: { "x-admin-token": token } });
    const d = await res.json();
    setData(d); setLoading(false);
  };

  useEffect(() => { load(range); }, []);

  const switchRange = (days: number) => { setRange(days); load(days); };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-black text-white mb-1">Analytics</h2>
          <p className="text-slate-400 text-sm">Real-time event tracking across every page.</p>
        </div>
        <div className="flex items-center gap-3">
          {RANGES.map((r) => (
            <button key={r.days} onClick={() => switchRange(r.days)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${range === r.days ? "bg-primary text-primary-foreground" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}>
              {r.label}
            </button>
          ))}
          <button onClick={() => load(range)} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"><RefreshCw size={16} /></button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
      ) : data ? (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <KPICard label="Page Views" value={data.pageViews} icon={Eye} color="bg-blue-500/10 text-blue-400" />
            <KPICard label="CTA Clicks" value={data.ctaClicks} icon={MousePointer} color="bg-primary/10 text-primary" />
            <KPICard label="Form Submits" value={data.formSubmits} icon={FileText} color="bg-green-500/10 text-green-400" />
            <KPICard label="Total Events" value={data.totalEvents} icon={BarChart2} color="bg-purple-500/10 text-purple-400" />
          </div>

          {/* Chart */}
          {data.byDay.length > 1 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2"><TrendingUp size={16} /> Page Views Over Time</h3>
              <MiniBarChart data={data.byDay} />
              <div className="flex justify-between text-slate-500 text-xs mt-2">
                <span>{data.byDay[0]?.date}</span>
                <span>{data.byDay[data.byDay.length - 1]?.date}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Top Pages */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Top Pages</h3>
              {data.topPages.length === 0 ? <p className="text-slate-500 text-sm">No data yet.</p> : (
                <div className="space-y-3">
                  {data.topPages.map((p, i) => {
                    const pct = Math.round((p.views / (data.topPages[0]?.views || 1)) * 100);
                    return (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300 font-mono truncate">{p.page || "/"}</span>
                          <span className="text-primary font-bold shrink-0 ml-2">{p.views}</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Top CTAs */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Top CTAs & Clicks</h3>
              {data.topCTAs.length === 0 ? <p className="text-slate-500 text-sm">No click data yet. Add data-track attributes to buttons.</p> : (
                <div className="space-y-3">
                  {data.topCTAs.map((c, i) => {
                    const pct = Math.round((c.clicks / (data.topCTAs[0]?.clicks || 1)) * 100);
                    return (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300 truncate">{c.label}</span>
                          <span className="text-yellow-400 font-bold shrink-0 ml-2">{c.clicks}</span>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Recent Events Feed */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">Live Event Feed (last 50)</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
              {data.recentEvents.length === 0 ? <p className="text-slate-500 text-sm">No events yet. Visit the public site to start tracking.</p> : data.recentEvents.map((e) => (
                <div key={e.id} className="flex items-center gap-3 py-2 border-b border-slate-800 last:border-0">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-bold shrink-0 ${TYPE_COLORS[e.type] ?? "bg-slate-700 text-slate-400"}`}>{e.type.replace("_", " ")}</span>
                  <span className="text-slate-300 text-sm font-mono truncate flex-1">{e.page}</span>
                  {e.label && <span className="text-slate-500 text-xs truncate hidden md:block">{e.label}</span>}
                  <span className="text-slate-600 text-xs shrink-0">{new Date(e.ts).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="text-slate-400 text-center py-20">Failed to load analytics.</p>
      )}
    </div>
  );
}

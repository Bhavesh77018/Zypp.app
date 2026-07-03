"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText, Megaphone, MousePointerClick, BarChart2, Inbox, Eye,
  TrendingUp, Globe, ArrowRight, Zap,
} from "lucide-react";

interface Summary {
  totalEvents: number;
  pageViews: number;
  ctaClicks: number;
  formSubmits: number;
  topPages: { page: string; views: number }[];
}

function StatCard({ label, value, sub, icon: Icon, accent }: {
  label: string; value: string | number; sub: string;
  icon: React.ComponentType<{ size?: number }>; accent: string;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-sm font-medium">{label}</p>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent}`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="text-slate-500 text-xs">{sub}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [pageCount, setPageCount] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [barCount, setBarCount] = useState(0);
  const [activeBarCount, setActiveBarCount] = useState(0);
  const [ctaLabel, setCtaLabel] = useState<string | null>(null);
  const [ctaEnabled, setCtaEnabled] = useState(true);
  const [ctaLink, setCtaLink] = useState("");
  const [contactCount, setContactCount] = useState(0);
  const [newContactCount, setNewContactCount] = useState(0);
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("zypp_admin_token") ?? "";
    const headers = { "x-admin-token": token };

    fetch("/api/cms/config", { headers })
      .then((r) => r.json())
      .then((d) => {
        const pages = d.dynamicPages ?? [];
        setPageCount(pages.length);
        setPublishedCount(pages.filter((p: { published: boolean }) => p.published).length);
        setBarCount(d.announcementBars?.length ?? 0);
        setActiveBarCount(d.announcementBars?.filter((b: { active: boolean }) => b.active).length ?? 0);
        if (d.globalCTA) {
          setCtaLabel(d.globalCTA.label);
          setCtaEnabled(d.globalCTA.enabled);
          setCtaLink(d.globalCTA.link);
        }
      })
      .catch(() => {});

    fetch("/api/cms/contacts", { headers })
      .then((r) => r.json())
      .then((d) => {
        const list = Array.isArray(d) ? d : d.contacts ?? [];
        setContactCount(list.length);
        setNewContactCount(list.filter((c: { status: string }) => c.status === "new").length);
      })
      .catch(() => {});

    fetch("/api/analytics/summary?range=7", { headers })
      .then((r) => r.json())
      .then((d) => setSummary(d))
      .catch(() => {});
  }, []);

  const publicTopPages = (summary?.topPages ?? []).filter((p) => !p.page.startsWith("/admin")).slice(0, 5);
  const maxViews = Math.max(1, ...publicTopPages.map((p) => p.views));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-white mb-1">Welcome back 👋</h2>
        <p className="text-slate-400">Manage zypp.app content from here — no code needed. All changes go live instantly.</p>
      </div>

      {/* Traffic stats — last 7 days */}
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={16} className="text-primary" />
        <h3 className="text-white font-bold text-sm uppercase tracking-wider">Last 7 Days</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Page Views" value={summary?.pageViews ?? "—"} sub="Across all public pages" icon={Eye} accent="bg-primary/10 text-primary" />
        <StatCard label="CTA Clicks" value={summary?.ctaClicks ?? "—"} sub="Button & link clicks" icon={MousePointerClick} accent="bg-emerald-500/10 text-emerald-400" />
        <StatCard label="Form Submits" value={summary?.formSubmits ?? "—"} sub="Contact form leads" icon={Inbox} accent="bg-blue-500/10 text-blue-400" />
        <StatCard label="Total Events" value={summary?.totalEvents ?? "—"} sub="All tracked interactions" icon={Zap} accent="bg-yellow-500/10 text-yellow-400" />
      </div>

      {/* Content stats */}
      <div className="flex items-center gap-2 mb-4">
        <Globe size={16} className="text-blue-400" />
        <h3 className="text-white font-bold text-sm uppercase tracking-wider">Site Content</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Dynamic Pages" value={pageCount} sub={`${publishedCount} published, ${pageCount - publishedCount} draft`} icon={FileText} accent="bg-blue-500/10 text-blue-400" />
        <StatCard label="Announcements" value={barCount} sub={`${activeBarCount} currently active`} icon={Megaphone} accent="bg-purple-500/10 text-purple-400" />
        <StatCard label="Navbar CTA" value={ctaEnabled ? (ctaLabel ?? "—") : "Off"} sub={ctaEnabled ? `→ ${ctaLink}` : "Hidden sitewide"} icon={MousePointerClick} accent={ctaEnabled ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-700/30 text-slate-500"} />
        <StatCard label="Contact Leads" value={contactCount} sub={newContactCount > 0 ? `${newContactCount} new — needs review` : "All reviewed"} icon={Inbox} accent={newContactCount > 0 ? "bg-red-500/10 text-red-400" : "bg-slate-700/30 text-slate-400"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Top pages */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white font-bold">Top Pages (7 days)</h3>
            <Link href="/admin/analytics" className="text-primary text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              Full analytics <ArrowRight size={12} />
            </Link>
          </div>
          {publicTopPages.length === 0 ? (
            <p className="text-slate-500 text-sm">No traffic data yet.</p>
          ) : (
            <div className="space-y-3">
              {publicTopPages.map((p) => (
                <div key={p.page} className="flex items-center gap-3">
                  <span className="text-slate-300 text-sm font-mono w-40 truncate shrink-0">{p.page}</span>
                  <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(p.views / maxViews) * 100}%` }} />
                  </div>
                  <span className="text-slate-400 text-xs font-bold w-8 text-right">{p.views}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-5">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { href: "/admin/pages", icon: FileText, color: "text-blue-400 bg-blue-500/10", title: "Create a Page", desc: "Build a new landing page without code" },
              { href: "/admin/announcements", icon: Megaphone, color: "text-purple-400 bg-purple-500/10", title: "Run an Announcement", desc: "Promo strip at the top of every page" },
              { href: "/admin/cta", icon: MousePointerClick, color: "text-emerald-400 bg-emerald-500/10", title: "Edit Sitewide CTA", desc: "Change button label, link & style" },
              { href: "/admin/contacts", icon: Inbox, color: "text-red-400 bg-red-500/10", title: "Review Leads", desc: newContactCount > 0 ? `${newContactCount} new submissions waiting` : "View contact form submissions" },
            ].map((a) => (
              <Link key={a.href} href={a.href} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-800 transition-colors group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${a.color}`}>
                  <a.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm">{a.title}</div>
                  <div className="text-slate-500 text-xs truncate">{a.desc}</div>
                </div>
                <ArrowRight size={14} className="text-slate-600 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Help */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-white font-bold mb-3">How it works</h3>
        <ul className="space-y-3 text-sm text-slate-400">
          <li className="flex gap-3"><span className="text-primary font-bold shrink-0">1.</span> Use <strong className="text-white">Announcement Bars</strong> to add a promo strip at the top of the website — perfect for flash sales, events, or new city launches.</li>
          <li className="flex gap-3"><span className="text-primary font-bold shrink-0">2.</span> Use the <strong className="text-white">Page Builder</strong> to create a brand-new public URL (e.g., <code className="text-primary">/monsoon-offer</code>) using predefined design sections.</li>
          <li className="flex gap-3"><span className="text-primary font-bold shrink-0">3.</span> Use <strong className="text-white">CTA Settings</strong> to control the sitewide call-to-action button — label, destination URL, style, and an optional floating button on every page.</li>
          <li className="flex gap-3"><span className="text-primary font-bold shrink-0">4.</span> All published changes are immediately live — check <strong className="text-white">Analytics</strong> to see how they perform.</li>
        </ul>
      </div>
    </div>
  );
}

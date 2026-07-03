"use client";

import { useEffect, useState } from "react";
import { Inbox, CheckCheck, MessageSquare, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

interface Submission {
  id: string; name: string; email: string; phone: string;
  reason: string; message: string; status: "new" | "read" | "replied"; createdAt: string;
}

const STATUS_STYLES: Record<string, string> = {
  new: "bg-yellow-500/20 text-yellow-400",
  read: "bg-blue-500/20 text-blue-400",
  replied: "bg-green-500/20 text-green-400",
};

export default function ContactsAdminPage() {
  const [contacts, setContacts] = useState<Submission[]>([]);
  const [filter, setFilter] = useState<"all" | "new" | "read" | "replied">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("zypp_admin_token") ?? "" : "";

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/cms/contacts", { headers: { "x-admin-token": token } });
    const d = await res.json();
    setContacts(Array.isArray(d) ? d.reverse() : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: Submission["status"]) => {
    await fetch("/api/cms/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-token": token },
      body: JSON.stringify({ id, status }),
    });
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, status } : c));
  };

  const filtered = filter === "all" ? contacts : contacts.filter((c) => c.status === filter);
  const newCount = contacts.filter((c) => c.status === "new").length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-black text-white mb-1">
            Contact Submissions
            {newCount > 0 && <span className="ml-3 px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-bold">{newCount} new</span>}
          </h2>
          <p className="text-slate-400 text-sm">All messages submitted via the contact form.</p>
        </div>
        <div className="flex items-center gap-2">
          {(["all", "new", "read", "replied"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}>
              {f}
            </button>
          ))}
          <button onClick={load} className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"><RefreshCw size={16} /></button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
      ) : filtered.length === 0 ? (
        <div className="bg-slate-900 border border-dashed border-slate-700 rounded-2xl p-16 text-center">
          <Inbox size={48} className="text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">No {filter !== "all" ? filter : ""} submissions yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((c) => (
            <div key={c.id} className={`bg-slate-900 border rounded-2xl overflow-hidden transition-colors ${c.status === "new" ? "border-yellow-500/30" : "border-slate-800"}`}>
              {/* Header row */}
              <div
                className="flex items-center gap-4 p-5 cursor-pointer hover:bg-slate-800/50 transition-colors"
                onClick={() => { setExpanded(expanded === c.id ? null : c.id); if (c.status === "new") setStatus(c.id, "read"); }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-white font-bold">{c.name}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${STATUS_STYLES[c.status]}`}>{c.status}</span>
                  </div>
                  <div className="flex gap-4 text-slate-500 text-xs">
                    <span>{c.email}</span>
                    {c.phone && <span>{c.phone}</span>}
                    <span className="bg-slate-800 px-2 py-0.5 rounded-md">{c.reason}</span>
                    <span>{new Date(c.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </div>
                {expanded === c.id ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
              </div>

              {/* Expanded body */}
              {expanded === c.id && (
                <div className="px-5 pb-5 border-t border-slate-800">
                  <p className="text-slate-300 text-sm leading-relaxed my-4 bg-slate-800/50 p-4 rounded-xl whitespace-pre-wrap">
                    {c.message || <em className="text-slate-500">No message provided.</em>}
                  </p>
                  <div className="flex gap-3">
                    <button onClick={() => setStatus(c.id, "read")} disabled={c.status === "read"}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold hover:bg-blue-500/20 hover:text-blue-400 transition-colors disabled:opacity-40">
                      <CheckCheck size={16} /> Mark Read
                    </button>
                    <button onClick={() => setStatus(c.id, "replied")} disabled={c.status === "replied"}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold hover:bg-green-500/20 hover:text-green-400 transition-colors disabled:opacity-40">
                      <MessageSquare size={16} /> Mark Replied
                    </button>
                    <a href={`mailto:${c.email}?subject=Re: ${c.reason}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 text-primary text-sm font-semibold hover:bg-primary/30 transition-colors">
                      Reply via Email
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

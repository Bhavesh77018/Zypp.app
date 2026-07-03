"use client";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function ContactForm({ heading, reasonLabel, reasons }: { heading: string; reasonLabel: string; reasons: string[] }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", reason: reasons[0] ?? "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  const cls = "w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400 transition-all";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-16 gap-4">
        <CheckCircle size={72} className="text-primary" />
        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">Message Sent!</h3>
        <p className="text-gray-500">Our team will get back to you within 24 hours.</p>
        <button onClick={() => setStatus("idle")} className="mt-2 px-6 py-2.5 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors">
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required value={form.name} onChange={set("name")} placeholder="Full Name *" className={cls} />
        <input value={form.phone} onChange={set("phone")} placeholder="Phone Number" className={cls} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required type="email" value={form.email} onChange={set("email")} placeholder="Email Address *" className={cls} />
        <input value={form.company} onChange={set("company")} placeholder="Company (optional)" className={cls} />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{reasonLabel}</label>
        <div className="flex flex-wrap gap-2">
          {reasons.map((r) => (
            <button key={r} type="button" onClick={() => setForm((f) => ({ ...f, reason: r }))}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${form.reason === r ? "bg-primary text-white border-primary" : "bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-primary/50"}`}>
              {r}
            </button>
          ))}
        </div>
      </div>
      <textarea value={form.message} onChange={set("message")} rows={4} placeholder="Your message..." className={cls + " resize-none"} />
      {status === "error" && <p className="text-red-500 text-sm">Something went wrong. Try again.</p>}
      <button type="submit" disabled={status === "loading"} data-track="Contact Form Submit" className="flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 disabled:opacity-60 transition-all shadow-lg shadow-primary/20">
        {status === "loading" ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</span> : <><Send size={18} /> Send Message</>}
      </button>
    </form>
  );
}

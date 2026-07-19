"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle, FileText } from "lucide-react";

/** Inline email capture for the investor deck — posts to the same contact
 *  endpoint so requests land in the admin contacts inbox. */
export default function DeckRequestForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Investor deck request",
          phone: "",
          email,
          company: "",
          reason: "Investor relations",
          message: `Please send the investor deck to ${email}.`,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center justify-center gap-3 rounded-2xl bg-white/5 border border-primary/30 px-6 py-5 text-white max-w-xl mx-auto">
        <CheckCircle size={22} className="text-primary shrink-0" />
        <p className="text-sm font-semibold text-left">
          Request received — our IR team will send the deck to <span className="text-primary">{email}</span> within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto">
      <div className="flex items-center justify-center gap-2 text-white/60 text-sm font-semibold mb-3">
        <FileText size={15} /> Get the investor deck
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email address"
          className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          data-track="Investor Deck Request"
          className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary/90 disabled:opacity-60 transition-all shadow-lg shadow-primary/25"
        >
          {status === "loading" ? "Sending…" : <>Request Deck <ArrowRight size={15} /></>}
        </button>
      </div>
      {status === "error" && <p className="text-red-400 text-xs mt-2">Something went wrong — try again or email us directly.</p>}
    </form>
  );
}

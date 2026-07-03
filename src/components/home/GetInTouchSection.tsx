"use client";
import { useState } from "react";
import { Send, CheckCircle, MapPin, Phone, Mail } from "lucide-react";
import { getDefaults } from "@/lib/content";

type GetInTouchContent = {
  eyebrow: string;
  heading: string;
  subheading: string;
  address: string;
  phone: string;
  email: string;
  reasons: { label: string }[];
};

const FALLBACK = getDefaults("home").getInTouch as unknown as GetInTouchContent;

export default function GetInTouchSection({ content }: { content?: Partial<GetInTouchContent> }) {
  const c = { ...FALLBACK, ...content };
  const REASONS = (c.reasons ?? []).map((r) => r.label);
  const [form, setForm] = useState({ name: "", phone: "", email: "", reason: REASONS[0] ?? "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const setReason = (r: string) => setForm((f) => ({ ...f, reason: r }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch { setStatus("error"); }
  };

  const inputCls = "w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400 transition-all";

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800" id="get-in-touch">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14">
          <div className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{c.eyebrow}</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            {c.heading}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {c.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form - wider */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 p-8">
            {status === "success" ? (
              <div className="flex flex-col items-center text-center py-12 gap-4">
                <CheckCircle size={64} className="text-primary" />
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">Thank You!</h3>
                <p className="text-gray-500 text-base">We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 px-6 py-2.5 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-5">
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1">Send us a message</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required value={form.name} onChange={set("name")} placeholder="Full Name *" className={inputCls} />
                  <input value={form.phone} onChange={set("phone")} placeholder="Phone Number" className={inputCls} />
                </div>
                <input required type="email" value={form.email} onChange={set("email")} placeholder="Email Address *" className={inputCls} />

                {/* Reason as radio pills */}
                <div>
                  <label className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 block uppercase tracking-wider">Choose The Reason</label>
                  <div className="flex flex-wrap gap-2">
                    {REASONS.map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setReason(r)}
                        className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                          form.reason === r
                            ? "bg-primary text-white border-primary"
                            : "bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:border-primary/50"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={form.message}
                  onChange={set("message")}
                  rows={3}
                  placeholder="Your message (optional)..."
                  className={inputCls + " resize-none"}
                />

                {status === "error" && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  data-track="Submit Contact Form"
                  className="flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-white font-bold text-base hover:bg-primary/90 disabled:opacity-60 transition-all shadow-lg shadow-primary/20"
                >
                  {status === "loading" ? (
                    <span className="inline-flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</span>
                  ) : (
                    <><Send size={18} /> Send Message</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info + Map */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 p-6">
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-5">Contact Information</h3>
              <div className="flex flex-col gap-4">
                {[
                  { icon: MapPin, text: c.address },
                  { icon: Phone, text: c.phone },
                  { icon: Mail, text: c.email },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden flex-1 min-h-[200px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.4497!2d77.0715!3d28.4595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzM0LjIiTiA3N8KwMDQnMTcuNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "200px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Zypp Office Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

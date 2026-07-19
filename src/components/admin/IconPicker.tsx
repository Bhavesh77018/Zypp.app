"use client";
import { useMemo, useRef, useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { ICON_CHOICES, iconFor } from "@/components/icons/iconMap";

/**
 * Admin icon field: pick a professional icon from the curated set (stores the
 * icon name, e.g. "bike"), or type a legacy emoji — both render via iconFor.
 */
export default function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  const filtered = useMemo(
    () => ICON_CHOICES.filter((c) => c.name.includes(q.trim().toLowerCase())),
    [q]
  );

  const Current = iconFor(value);

  return (
    <div ref={rootRef} className="relative">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm hover:border-primary transition-colors"
          title="Choose an icon"
        >
          <span className="w-6 h-6 rounded-md bg-slate-700 flex items-center justify-center text-primary">
            {Current ? <Current size={15} /> : <span className="text-xs text-slate-500">?</span>}
          </span>
          <span className="text-xs text-slate-300 max-w-[90px] truncate">{value || "Pick icon"}</span>
          <ChevronDown size={13} className={`text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {value && (
          <button type="button" onClick={() => onChange("")} className="text-slate-500 hover:text-red-400" title="Clear icon">
            <X size={14} />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute z-30 mt-2 w-72 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-3">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search icons…"
            className="w-full mb-2 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <div className="grid grid-cols-7 gap-1 max-h-52 overflow-y-auto pr-1">
            {filtered.map(({ name, Icon }) => (
              <button
                key={name}
                type="button"
                title={name}
                onClick={() => { onChange(name); setOpen(false); setQ(""); }}
                className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                  value === name ? "bg-primary text-white" : "text-slate-300 hover:bg-slate-800 hover:text-primary"
                }`}
              >
                <Icon size={17} />
              </button>
            ))}
            {filtered.length === 0 && <p className="col-span-7 text-slate-500 text-xs py-3 text-center">No match</p>}
          </div>
        </div>
      )}
    </div>
  );
}

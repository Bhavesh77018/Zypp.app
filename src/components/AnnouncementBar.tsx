"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

interface Bar {
  id: string;
  message: string;
  ctaText?: string;
  ctaLink?: string;
  bgColor: string;
  active: boolean;
  dismissible: boolean;
}

const BG_CLASSES: Record<string, string> = {
  primary: "bg-primary text-primary-foreground",
  blue: "bg-blue-600 text-white",
  yellow: "bg-yellow-400 text-yellow-950",
  red: "bg-red-600 text-white",
  purple: "bg-purple-600 text-white",
};

export default function AnnouncementBar() {
  const [bars, setBars] = useState<Bar[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/cms/config", { headers: { "x-admin-token": "public-read" } })
      .then((r) => r.json())
      .then((d) => {
        if (d.announcementBars) setBars(d.announcementBars);
      })
      .catch(() => {});
    // Load dismissed from localStorage
    try {
      const saved = JSON.parse(localStorage.getItem("zypp_dismissed_bars") ?? "[]");
      setDismissed(new Set(saved));
    } catch {}
  }, []);

  const dismiss = (id: string) => {
    const next = new Set(dismissed).add(id);
    setDismissed(next);
    localStorage.setItem("zypp_dismissed_bars", JSON.stringify([...next]));
  };

  const visible = bars.filter((b) => b.active && !dismissed.has(b.id));
  if (visible.length === 0) return null;
  const bar = visible[0];

  return (
    <div className={`w-full flex items-center justify-center gap-4 px-4 py-2.5 text-sm font-semibold ${BG_CLASSES[bar.bgColor] ?? BG_CLASSES.primary}`}>
      <span>{bar.message}</span>
      {bar.ctaText && bar.ctaLink && (
        <Link href={bar.ctaLink} className="underline underline-offset-2 font-bold hover:opacity-80 transition-opacity">
          {bar.ctaText}
        </Link>
      )}
      {bar.dismissible && (
        <button onClick={() => dismiss(bar.id)} className="ml-auto opacity-80 hover:opacity-100 transition-opacity" aria-label="Dismiss">
          <X size={16} />
        </button>
      )}
    </div>
  );
}

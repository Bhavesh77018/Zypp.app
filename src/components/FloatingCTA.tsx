"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface GlobalCTA {
  floatingEnabled: boolean;
  floatingLabel: string;
  floatingLink: string;
  floatingOpenInNewTab: boolean;
  floatingPosition: string;
}

export default function FloatingCTA() {
  const [cta, setCta] = useState<GlobalCTA | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetch("/api/cms/config")
      .then((r) => r.json())
      .then((d) => {
        if (d.globalCTA?.floatingEnabled) {
          setCta(d.globalCTA);
        }
      })
      .catch(() => {});

    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!cta || !cta.floatingEnabled) return null;

  const positionClass =
    cta.floatingPosition === "bottom-left"
      ? "bottom-6 left-6"
      : cta.floatingPosition === "bottom-center"
      ? "bottom-6 left-1/2 -translate-x-1/2"
      : "bottom-6 right-6";

  return (
    <div
      className={`fixed z-40 transition-all duration-300 ${positionClass} ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <Link
        href={cta.floatingLink}
        target={cta.floatingOpenInNewTab ? "_blank" : undefined}
        rel={cta.floatingOpenInNewTab ? "noopener noreferrer" : undefined}
        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
        data-track="cta_click"
      >
        {cta.floatingLabel}
      </Link>
    </div>
  );
}

"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

// ─── Session ID (persisted for the tab lifetime) ──────────────────────────
function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem("zypp_sid");
  if (!sid) { sid = Math.random().toString(36).slice(2) + Date.now().toString(36); sessionStorage.setItem("zypp_sid", sid); }
  return sid;
}

// ─── Core fire function (exported for use anywhere in the app) ────────────
export async function fireEvent(
  type: "page_view" | "cta_click" | "banner_click" | "menu_click" | "form_submit" | "announcement_dismiss",
  opts?: { page?: string; label?: string; target?: string }
) {
  if (typeof window === "undefined") return;
  try {
    await fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        page: opts?.page ?? window.location.pathname,
        label: opts?.label,
        target: opts?.target,
        sessionId: getSessionId(),
        referrer: document.referrer || undefined,
      }),
    });
  } catch { /* silent — analytics must never break the UI */ }
}

// ─── Auto-attach click tracking to elements with data-track ──────────────
function attachClickTrackers() {
  document.querySelectorAll<HTMLElement>("[data-track]").forEach((el) => {
    if (el.dataset.trackAttached) return;
    el.dataset.trackAttached = "1";
    el.addEventListener("click", () => {
      fireEvent("cta_click", {
        label: el.dataset.track ?? el.textContent?.trim() ?? "unknown",
        target: (el as HTMLAnchorElement).href ?? el.dataset.trackTarget,
      });
    }, { passive: true });
  });
}

// ─── Component — add to root layout ──────────────────────────────────────
export default function AnalyticsTracker() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  // Fire page_view on every route change
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
    fireEvent("page_view", { page: pathname });

    // Attach data-track listeners after a short delay (so dynamic content renders)
    const t = setTimeout(attachClickTrackers, 600);
    return () => clearTimeout(t);
  }, [pathname]);

  return null; // renders nothing
}

import fs from "fs";
import path from "path";

export interface AnalyticsEvent {
  id: string;
  type: "page_view" | "cta_click" | "banner_click" | "menu_click" | "form_submit" | "announcement_dismiss";
  page: string;
  label?: string;      // Button text, banner ID, menu item label, etc.
  target?: string;     // href / destination
  referrer?: string;
  userAgent?: string;
  sessionId?: string;
  ts: string;          // ISO timestamp
}

export interface DaySummary {
  date: string;
  events: AnalyticsEvent[];
}

// ─── Paths ────────────────────────────────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), "data", "analytics");

function dayFile(date: string): string {
  return path.join(DATA_DIR, `${date}.json`);
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function ensure() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ─── Write ────────────────────────────────────────────────────────────────
export function appendEvent(event: AnalyticsEvent): void {
  ensure();
  const file = dayFile(event.ts.slice(0, 10));
  let events: AnalyticsEvent[] = [];
  if (fs.existsSync(file)) {
    try { events = JSON.parse(fs.readFileSync(file, "utf-8")); } catch {}
  }
  events.push(event);
  // Keep max 50 000 events per day to avoid unbounded growth
  if (events.length > 50_000) events = events.slice(-50_000);
  fs.writeFileSync(file, JSON.stringify(events));
}

// ─── Read ─────────────────────────────────────────────────────────────────
export function readDay(date: string): AnalyticsEvent[] {
  ensure();
  const file = dayFile(date);
  if (!fs.existsSync(file)) return [];
  try { return JSON.parse(fs.readFileSync(file, "utf-8")); } catch { return []; }
}

export function readRange(startDate: string, endDate: string): AnalyticsEvent[] {
  const out: AnalyticsEvent[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().slice(0, 10);
    out.push(...readDay(key));
  }
  return out;
}

// ─── Aggregate ────────────────────────────────────────────────────────────
export interface AnalyticsSummary {
  totalEvents: number;
  pageViews: number;
  ctaClicks: number;
  formSubmits: number;
  topPages: { page: string; views: number }[];
  topCTAs:  { label: string; clicks: number }[];
  recentEvents: AnalyticsEvent[];
  byDay: { date: string; views: number; clicks: number }[];
}

export function aggregate(events: AnalyticsEvent[]): AnalyticsSummary {
  const pageViewMap: Record<string, number> = {};
  const ctaMap: Record<string, number> = {};
  const dayMap: Record<string, { views: number; clicks: number }> = {};

  let pageViews = 0, ctaClicks = 0, formSubmits = 0;

  for (const e of events) {
    const day = e.ts.slice(0, 10);
    if (!dayMap[day]) dayMap[day] = { views: 0, clicks: 0 };

    if (e.type === "page_view") {
      pageViews++;
      pageViewMap[e.page] = (pageViewMap[e.page] ?? 0) + 1;
      dayMap[day].views++;
    } else if (e.type === "cta_click" || e.type === "menu_click" || e.type === "banner_click") {
      ctaClicks++;
      const key = e.label ?? e.target ?? "unknown";
      ctaMap[key] = (ctaMap[key] ?? 0) + 1;
      dayMap[day].clicks++;
    } else if (e.type === "form_submit") {
      formSubmits++;
    }
  }

  const topPages = Object.entries(pageViewMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([page, views]) => ({ page, views }));

  const topCTAs = Object.entries(ctaMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([label, clicks]) => ({ label, clicks }));

  const byDay = Object.entries(dayMap)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, v]) => ({ date, ...v }));

  return {
    totalEvents: events.length,
    pageViews,
    ctaClicks,
    formSubmits,
    topPages,
    topCTAs,
    recentEvents: events.slice(-50).reverse(),
    byDay,
  };
}

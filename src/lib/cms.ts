import fs from "fs";
import path from "path";
import { resolveContent } from "./content";

const DATA_PATH = path.join(process.cwd(), "data", "cms", "config.json");

export interface AnnouncementBar {
  id: string;
  message: string;
  ctaText?: string;
  ctaLink?: string;
  bgColor: "primary" | "blue" | "yellow" | "red" | "purple";
  pages: string[];
  active: boolean;
  dismissible: boolean;
}

export type SectionType =
  | "hero"
  | "stats"
  | "feature_grid"
  | "testimonials"
  | "cta_banner"
  | "text_block"
  | "heading_h1"
  | "heading_h2"
  | "rich_text"
  | "image_block"
  | "video_block"
  | "gif_block"
  | "divider"
  | "button_row"
  | "two_col"
  | "image_text";

export interface SectionData {
  id: string;
  type: SectionType;
  data: Record<string, unknown>;
}

export interface NavSettings {
  showInMenu: boolean;
  menuLabel: string;
  menuGroup: "riders" | "partners" | "company" | "more" | "none";
  openInNewTab: boolean;
  menuIcon: string;
  menuDescription: string;
}

export interface DynamicPage {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  sections: SectionData[];
  navSettings: NavSettings;
}

export interface GlobalCTA {
  enabled: boolean;
  label: string;
  link: string;
  openInNewTab: boolean;
  style: "primary" | "outline" | "ghost";
  floatingEnabled: boolean;
  floatingLabel: string;
  floatingLink: string;
  floatingOpenInNewTab: boolean;
  floatingPosition: "bottom-right" | "bottom-left" | "bottom-center";
}

export const DEFAULT_GLOBAL_CTA: GlobalCTA = {
  enabled: true,
  label: "Get the App",
  link: "/contact",
  openInNewTab: false,
  style: "primary",
  floatingEnabled: false,
  floatingLabel: "Get the App",
  floatingLink: "/contact",
  floatingOpenInNewTab: false,
  floatingPosition: "bottom-right",
};

/** Per-page editable content for the built-in (static) pages.
 *  Shape: pageContent[slug][sectionKey][fieldKey] = value */
export type PageContent = Record<string, Record<string, Record<string, unknown>>>;

// ─── Cities & Hubs (operational footprint, managed from admin) ───────────────
export interface Hub {
  id: string;
  name: string;
  address: string;
  phone?: string;
  mapUrl?: string;
}
export type Region = "North" | "South" | "East" | "West" | "Central";
export interface City {
  id: string;
  name: string;
  state: string;
  region: Region;
  status: "active" | "coming-soon";
  riders: string;
  hubs: Hub[];
}

export const DEFAULT_CITIES: City[] = [
  { id: "gurgaon", name: "Gurgaon", state: "Haryana", region: "North", status: "active", riders: "6500+", hubs: [
    { id: "ggn-hq", name: "Zypp HQ — Sector 66", address: "Spaze Business Park, Tower A, 2nd Floor, Sector 66, Badshapur, Gurugram, Haryana 122018", phone: "+91 9289 222 111", mapUrl: "https://www.google.com/maps/search/?api=1&query=Spaze+Business+Park+Sector+66+Gurugram" },
  ] },
  { id: "delhi", name: "Delhi", state: "Delhi", region: "North", status: "active", riders: "4493+", hubs: [
    { id: "del-cp", name: "Delhi Hub — Connaught Place", address: "Connaught Place, New Delhi 110001", phone: "+91 9289 222 112", mapUrl: "https://www.google.com/maps/search/?api=1&query=Connaught+Place+New+Delhi" },
  ] },
  { id: "noida", name: "Noida", state: "Uttar Pradesh", region: "North", status: "active", riders: "2026+", hubs: [] },
  { id: "faridabad", name: "Faridabad", state: "Haryana", region: "North", status: "active", riders: "80+", hubs: [] },
  { id: "jaipur", name: "Jaipur", state: "Rajasthan", region: "North", status: "active", riders: "227+", hubs: [] },
  { id: "bengaluru", name: "Bengaluru", state: "Karnataka", region: "South", status: "active", riders: "7497+", hubs: [
    { id: "blr-kor", name: "Bengaluru Hub — Koramangala", address: "611, 3rd Floor, 80 Feet Road, 6th Block, Koramangala, Bengaluru, Karnataka 560095", phone: "+91 9289 222 113", mapUrl: "https://www.google.com/maps/search/?api=1&query=Koramangala+80+Feet+Road+Bengaluru" },
  ] },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", region: "South", status: "active", riders: "1319+", hubs: [] },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", region: "West", status: "active", riders: "3451+", hubs: [
    { id: "mum-gkp", name: "Mumbai Hub — Ghatkopar", address: "12, Kurla Industrial Estate, Nari Seva Sadan Road, Off L B S Marg, Ghatkopar, Mumbai 400086", phone: "+91 9289 222 111", mapUrl: "https://www.google.com/maps/search/?api=1&query=Kurla+Industrial+Estate+Ghatkopar+Mumbai" },
  ] },
  { id: "pune", name: "Pune", state: "Maharashtra", region: "West", status: "coming-soon", riders: "—", hubs: [] },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", region: "South", status: "coming-soon", riders: "—", hubs: [] },
];

export interface CMSConfig {
  announcementBars: AnnouncementBar[];
  dynamicPages: DynamicPage[];
  globalCTA: GlobalCTA;
  pageContent: PageContent;
  cities: City[];
}

export const DEFAULT_NAV_SETTINGS: NavSettings = {
  showInMenu: false,
  menuLabel: "",
  menuGroup: "none",
  openInNewTab: false,
  menuIcon: "🔗",
  menuDescription: "",
};

function ensureFile() {
  const dir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify({ announcementBars: [], dynamicPages: [] }, null, 2));
  }
}

export function readCMS(): CMSConfig {
  ensureFile();
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  const parsed = JSON.parse(raw) as Partial<CMSConfig>;
  return {
    announcementBars: parsed.announcementBars ?? [],
    dynamicPages: parsed.dynamicPages ?? [],
    globalCTA: parsed.globalCTA ?? DEFAULT_GLOBAL_CTA,
    pageContent: parsed.pageContent ?? {},
    cities: parsed.cities ?? DEFAULT_CITIES,
  };
}

/** Server-only: all operational cities (with hubs). */
export function getCities(): City[] {
  return readCMS().cities;
}

/** Server-only: load a static page's content merged over its registry defaults.
 *  Call this from server components. */
export function getContent(slug: string): Record<string, Record<string, unknown>> {
  const stored = readCMS().pageContent?.[slug];
  return resolveContent(slug, stored);
}

export function writeCMS(data: CMSConfig): void {
  ensureFile();
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

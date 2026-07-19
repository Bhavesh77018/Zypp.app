// Maps the emoji glyphs used across CMS content to professional Lucide icons.
// Keeps content authoring simple (type an emoji) while rendering crisp SVG icons.
import {
  Bike, Truck, Package, KeyRound, Megaphone, Bot, Wifi, BatteryCharging, Zap,
  Headphones, CreditCard, Banknote, Wallet, Smartphone, Rocket, Globe, TrendingUp,
  Handshake, ShieldCheck, BarChart3, MapPin, Map, Plug, Shirt, Wrench, Ticket, Cpu,
  Link2, ClipboardList, Landmark, HeartPulse, Lightbulb, Building2, Trophy, ScrollText,
  FileText, Leaf, Fuel, Users, Heart, Target, PartyPopper, Sparkles, BadgeCheck,
  Recycle, Gauge, Home, GraduationCap, Mic, Briefcase, BookOpen, Camera, RefreshCw,
  Thermometer, Radio, Monitor, Tent, Newspaper, Package2, type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

export const EMOJI_ICON: Record<string, LucideIcon> = {
  // Vehicles
  "🚚": Truck, "🚛": Truck, "🚐": Truck,
  "🛵": Bike, "🏍️": Bike, "🏍": Bike, "🚲": Bike,

  // Auth & Access
  "🔑": KeyRound,

  // Communication
  "📢": Megaphone, "📡": Radio, "🛰️": Radio, "🛰": Radio,
  "🎙": Mic, "🎙️": Mic,

  // Tech
  "🤖": Bot,
  "🔋": BatteryCharging, "⚡": Zap,
  "🎧": Headphones,
  "💻": Cpu, "🖥️": Monitor, "🖥": Monitor,
  "📡 ": Wifi,

  // Finance
  "🪪": CreditCard, "💳": CreditCard,
  "💰": Wallet, "💸": Banknote, "💵": Banknote, "🏦": Landmark,

  // Devices
  "📱": Smartphone, "📲": Smartphone,

  // Growth
  "🚀": Rocket,

  // World
  "🌍": Globe, "🌏": Globe, "🌎": Globe,
  "📈": TrendingUp, "📊": BarChart3,

  // People
  "🤝": Handshake,
  "👥": Users,

  // Shield/Safety
  "🛡️": ShieldCheck, "🛡": ShieldCheck, "⛑️": ShieldCheck, "⛑": ShieldCheck,

  // Location
  "📍": MapPin, "🗺️": Map, "🗺": Map,

  // Infrastructure
  "🔌": Plug, "📦": Package,
  "🎽": Shirt, "👕": Shirt,
  "🧑‍🔧": Wrench, "🔧": Wrench, "🧰": Wrench,

  // Documents & Data
  "🎫": Ticket,
  "🧠": Cpu,
  "🔗": Link2,
  "📋": ClipboardList, "📄": FileText, "📜": ScrollText,

  // Health
  "🏥": HeartPulse,

  // Ideas
  "💡": Lightbulb,

  // Buildings
  "🏢": Building2, "🏭": Building2, "🏛️": Landmark, "🏛": Landmark,

  // Awards
  "🏆": Trophy, "🏅": BadgeCheck, "🏏": Trophy, "♟️": Target, "♟": Target,

  // Environment
  "🌱": Leaf, "🌿": Leaf, "♻️": Recycle, "♻": Recycle, "🌳": Leaf, "☁": Leaf,

  // Fuel
  "⛽": Fuel,

  // Emotions / Social
  "❤️": Heart, "💚": Heart, "❤": Heart,

  // Achievement
  "🎯": Target, "🎉": PartyPopper, "🎊": PartyPopper, "🪔": Sparkles,
  "✨": Sparkles, "⚙️": Gauge, "⚙": Gauge,

  // Lifestyle
  "🏠": Home, "🏡": Home,

  // Education
  "🎓": GraduationCap, "📚": BookOpen,

  // Social Media
  "📸": Camera,
  "💼": Briefcase,

  // Media
  "📰": Newspaper,

  // Misc
  "🎒": Package2,
  "🌡️": Thermometer, "🌡": Thermometer,
  "🎪": Tent,
  "🔄": RefreshCw,
};

// Normalize emoji string by stripping variation selectors and whitespace
function normalizeGlyph(glyph: string): string {
  // eslint-disable-next-line no-control-regex
  return glyph.replace(/[\uFE00-\uFE0F]/g, "").trim();
}

export function iconFor(glyph?: string): LucideIcon | undefined {
  if (!glyph) return undefined;
  const normalized = normalizeGlyph(glyph);
  return EMOJI_ICON[normalized] ?? EMOJI_ICON[glyph.trim()];
}

/**
 * Renders a professional Lucide icon for the given emoji glyph.
 * Falls back to `fallback` (or nothing) when no icon mapping exists.
 * This ensures zero raw emojis appear on the public UI.
 */
/**
 * Renders a nav icon that is either a Lucide component (curated nav links)
 * or an emoji string (CMS-authored pages, mapped via EmojiIcon).
 */
export function NavItemIcon({
  icon,
  size = 20,
  className = "",
  strokeWidth = 2,
}: {
  icon: LucideIcon | string;
  size?: number;
  className?: string;
  strokeWidth?: number;
}): ReactNode {
  if (typeof icon === "string") {
    return <EmojiIcon glyph={icon} size={size} className={className} strokeWidth={strokeWidth} />;
  }
  const Icon = icon;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} />;
}

export function EmojiIcon({
  glyph,
  size = 20,
  className = "",
  fallback,
  strokeWidth = 2,
}: {
  glyph?: string;
  size?: number;
  className?: string;
  fallback?: ReactNode;
  strokeWidth?: number;
}): ReactNode {
  if (!glyph) return fallback ?? null;
  const Icon = iconFor(glyph);
  if (Icon) {
    return <Icon size={size} strokeWidth={strokeWidth} className={className} />;
  }
  return fallback ?? null;
}

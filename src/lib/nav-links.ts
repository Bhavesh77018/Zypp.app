/**
 * Single source of truth for site navigation.
 *
 * The desktop mega-menu (Navbar), the three-dots full-screen menu (FullMenu)
 * and the Footer link columns all derive from NAV_GROUPS — edit links here
 * and every surface stays in sync. Labels must match across surfaces, so
 * never re-declare a link locally in a component.
 */

export interface NavItem {
  label: string;
  href: string;
  desc: string;
  icon: string;
  newTab?: boolean;
}

export interface NavFeatured {
  eyebrow: string;
  title: string;
  desc: string;
  href: string;
  cta: string;
}

export interface NavGroup {
  key: "riders" | "business" | "company";
  label: string;
  accentClass: string;
  bgClass: string;
  gradient: string;
  items: NavItem[];
  featured: NavFeatured;
}

/** Investors is a standalone highlighted link in the navbar, but appears
 *  inside the Company column in the footer and full menu. */
export const INVESTORS_LINK: NavItem = {
  label: "Investors",
  href: "/investors",
  desc: "Pre-IPO round · EBITDA positive",
  icon: "💹",
};

export const NAV_GROUPS: NavGroup[] = [
  {
    key: "riders",
    label: "For Riders",
    accentClass: "text-primary dark:text-emerald-400",
    bgClass: "bg-primary/10 dark:bg-primary/20",
    gradient: "from-primary to-emerald-600",
    items: [
      { label: "Earn with Zypp", href: "/riders", desc: "Maximize your daily earnings effortlessly", icon: "🛵" },
      { label: "Zypp Pilot App", href: "https://play.google.com/store/apps/details?id=com.zyppdelivery", desc: "Download and start earning in minutes", icon: "📱", newTab: true },
      { label: "Find a Hub", href: "/find-hub", desc: "Find the nearest Zypp station easily", icon: "📍" },
      { label: "Zypp Pilot (B2B)", href: "/zypp-pilot", desc: "Guaranteed payouts & steady tasks", icon: "💼" },
      { label: "Zypp Rental (B2C)", href: "/zypp-rental", desc: "Flexible rentals, total freedom", icon: "🔑" },
      { label: "Rent to Own", href: "/rent-to-own", desc: "Own your EV scooter in just 1 year", icon: "🏆" },
      { label: "2W Services", href: "/2w-Service-Zypp-Pilot", desc: "Compare Pilot vs Rental plans", icon: "⚖️" },
      { label: "3W Loader", href: "/3w-Service-Zypp-Pilot", desc: "Earn up to ₹80k monthly with cargo", icon: "🚛" },
    ],
    featured: { eyebrow: "Pilot Program", title: "₹35–45K/mo", desc: "Zero downpayment. Zero fuel costs. Onboard and ride in 24 hours.", href: "/riders", cta: "Become a Pilot" },
  },
  {
    key: "business",
    label: "For Business",
    accentClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-500/10 dark:bg-blue-500/20",
    gradient: "from-blue-500 to-indigo-600",
    items: [
      { label: "EV for Delivery", href: "/ev-for-delivery", desc: "Reliable last-mile delivery fleets", icon: "📦" },
      { label: "FleetEase.ai", href: "/fleetease", desc: "AI-powered fleet management OS", icon: "🖥️" },
      { label: "Franchise Models", href: "/franchise", desc: "Compare FOFO and FOCO franchise models", icon: "🏢" },
      { label: "FOFO Franchise", href: "/fofo", desc: "Own a hub, high ROI potential", icon: "🛠️" },
      { label: "FOCO Investment", href: "/foco", desc: "Invest in EVs, we handle operations", icon: "📈" },
      { label: "Advertising", href: "/advertising", desc: "Put your brand across urban delivery routes", icon: "📢" },
      { label: "Technologies", href: "/technologies", desc: "Explore our IoT & Deep-Tech core", icon: "⚡" },
    ],
    featured: { eyebrow: "Enterprise", title: "96% Uptime", desc: "21 hubs, 400+ technicians. Guaranteed 20-minute repair turnaround.", href: "/ev-for-delivery", cta: "Partner with Us" },
  },
  {
    key: "company",
    label: "Company",
    accentClass: "text-purple-600 dark:text-purple-400",
    bgClass: "bg-purple-500/10 dark:bg-purple-500/20",
    gradient: "from-purple-500 to-fuchsia-600",
    items: [
      { label: "Our Story", href: "/about", desc: "8 years of transforming mobility", icon: "🌱" },
      { label: "HustleOS", href: "/hustleos", desc: "The operating system for gig workers", icon: "🚀" },
      { label: "Zypp Evolve", href: "/zypp-evolve", desc: "Innovation challenge · up to ₹30L funding", icon: "💡" },
      { label: "ESG & Environment", href: "/environment", desc: "Carbon reduction & sustainability goals", icon: "🌍" },
      { label: "Careers", href: "/careers", desc: "Join the revolution in mobility", icon: "🎯" },
      { label: "Life at Zypp", href: "/life-at-zypp", desc: "Our culture, perks, and people", icon: "❤️" },
      { label: "Blogs", href: "/blogs", desc: "Latest updates, stories, and EV insights", icon: "✍️" },
      { label: "News & Media", href: "/zyppNews", desc: "Latest press and announcements", icon: "📰" },
      { label: "Gig Ki Awaaz", href: "https://youtube.com/@GigKiAwaaz", desc: "Our official rider podcast", icon: "🎙", newTab: true },
    ],
    featured: { eyebrow: "Investors", title: "EBITDA Positive", desc: "On track for FY28 IPO. Join the last private entry before listing.", href: "/investors", cta: "View Investor Deck" },
  },
];

/** Footer / full-menu columns: group items plus Investors under Company. */
export function columnLinks(group: NavGroup, opts?: { internalOnly?: boolean }): NavItem[] {
  const items = opts?.internalOnly ? group.items.filter((i) => !i.newTab) : group.items;
  return group.key === "company" ? [...items, INVESTORS_LINK] : items;
}

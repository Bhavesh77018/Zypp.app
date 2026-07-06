"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, ChevronDown, ArrowRight, MoreVertical } from "lucide-react";
import { LogoLink } from "@/components/Logo";
import { EmojiIcon } from "@/components/icons/iconMap";
import FullMenu from "@/components/FullMenu";

interface CMSNavItem { label: string; href: string; desc: string; icon: string; openInNewTab: boolean; group: string; }
interface GlobalCTA { enabled: boolean; label: string; link: string; openInNewTab: boolean; style: string; floatingEnabled: boolean; floatingLabel: string; floatingLink: string; floatingOpenInNewTab: boolean; floatingPosition: string; }
interface NavItem { label: string; href: string; desc: string; icon: string; newTab?: boolean }
interface Featured { eyebrow: string; title: string; desc: string; href: string; cta: string }

const GROUP_KEY_MAP: Record<string, string> = { riders: "For Riders", partners: "For Business", company: "Company", more: "Company" };

const navGroups: {
  label: string; accentClass: string; bgClass: string; gradient: string; items: NavItem[]; featured: Featured;
}[] = [
  {
    label: "For Riders",
    accentClass: "text-primary dark:text-emerald-400",
    bgClass: "bg-primary/10 dark:bg-primary/20",
    gradient: "from-primary to-emerald-600",
    items: [
      { label: "Earn with Zypp", href: "/riders", desc: "Maximize your daily earnings effortlessly", icon: "🛵" },
      { label: "Zypp Pilot App", href: "https://play.google.com/store/apps/details?id=com.zyppdelivery", desc: "Download and start earning in minutes", icon: "📱", newTab: true },
      { label: "Locate a Hub", href: "/find-hub", desc: "Find the nearest Zypp station easily", icon: "📍" },
      { label: "Zypp Pilot (B2B)", href: "/zypp-pilot", desc: "Guaranteed payouts & steady tasks", icon: "💼" },
      { label: "Zypp Rental (B2C)", href: "/zypp-rental", desc: "Flexible rentals, total freedom", icon: "🔑" },
      { label: "Rent to Own", href: "/rent-to-own", desc: "Own your EV scooter in just 1 year", icon: "🏆" },
      { label: "2W Services", href: "/2w-Service-Zypp-Pilot", desc: "Compare Pilot vs Rental plans", icon: "⚖️" },
      { label: "3W Loader", href: "/3w-Service-Zypp-Pilot", desc: "Earn up to ₹80k monthly with cargo", icon: "🚛" },
    ],
    featured: { eyebrow: "Pilot Program", title: "₹35–45K/mo", desc: "Zero downpayment. Zero fuel costs. Onboard and ride in 24 hours.", href: "/riders", cta: "Become a Pilot" },
  },
  {
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
    label: "Company",
    accentClass: "text-purple-600 dark:text-purple-400",
    bgClass: "bg-purple-500/10 dark:bg-purple-500/20",
    gradient: "from-purple-500 to-fuchsia-600",
    items: [
      { label: "Our Story", href: "/about", desc: "8 years of transforming mobility", icon: "🌱" },
      { label: "HustleOS", href: "/hustleos", desc: "The operating system for gig workers", icon: "🚀" },
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

function FeaturedCard({ f, gradient, onClick }: { f: Featured; gradient: string; onClick: () => void }) {
  return (
    <Link
      href={f.href}
      onClick={onClick}
      className={`relative flex w-full flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-8 text-white min-h-[300px] group/feat shadow-lg transition-all hover:shadow-xl hover:-translate-y-1`}
    >
      <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/15 blur-3xl group-hover/feat:scale-125 group-hover/feat:bg-white/20 transition-all duration-500" />
      <div className="relative z-10">
        <div className="text-[11px] font-black uppercase tracking-[0.25em] opacity-80 mb-2">{f.eyebrow}</div>
        <div className="text-3xl font-black leading-none mb-3">{f.title}</div>
        <p className="text-sm text-white/90 leading-relaxed mb-6 font-medium">{f.desc}</p>
        <span className="inline-flex items-center gap-2 text-sm font-bold bg-white/20 backdrop-blur-md hover:bg-white/30 px-5 py-2.5 rounded-full transition-all group-hover/feat:gap-3 group-hover/feat:shadow-md">
          {f.cta} <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [cmsItems, setCmsItems] = useState<CMSNavItem[]>([]);
  const [globalCTA, setGlobalCTA] = useState<GlobalCTA>({ enabled: true, label: "Get the App", link: "/contact", openInNewTab: false, style: "primary", floatingEnabled: false, floatingLabel: "Get the App", floatingLink: "/contact", floatingOpenInNewTab: false, floatingPosition: "bottom-right" });
  const { theme, setTheme } = useTheme();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    fetch("/api/cms/config")
      .then((r) => r.json())
      .then((d) => {
        const pages = d.dynamicPages ?? [];
        const items: CMSNavItem[] = pages
          .filter((p: { published: boolean; navSettings?: { showInMenu: boolean; menuGroup: string } }) =>
            p.published && p.navSettings?.showInMenu && p.navSettings?.menuGroup !== "none"
          )
          .map((p: { slug: string; navSettings: { menuLabel: string; menuDescription: string; menuIcon: string; menuGroup: string; openInNewTab: boolean } }) => ({
            label: p.navSettings.menuLabel || p.slug,
            href: `/${p.slug}`,
            desc: p.navSettings.menuDescription,
            icon: p.navSettings.menuIcon,
            group: p.navSettings.menuGroup,
            openInNewTab: p.navSettings.openInNewTab,
          }));
        setCmsItems(items);
        if (d.globalCTA) setGlobalCTA(d.globalCTA);
      })
      .catch(() => {});

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mergedGroups = navGroups.map((group) => {
    const groupKey = Object.entries(GROUP_KEY_MAP).find(([, v]) => v === group.label)?.[0];
    const extra = groupKey ? cmsItems.filter((i) => i.group === groupKey) : [];
    return {
      ...group,
      items: [
        ...group.items,
        ...extra.map((e) => ({ label: e.label, href: e.href, desc: e.desc, icon: e.icon, newTab: e.openInNewTab })),
      ],
    };
  });

  const handleMouseEnter = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(i);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenGroup(null), 140);
  };
  const closeMobile = () => {
    setIsMobileOpen(false);
    setMobileOpenGroup(null);
  };

  return (
    <>
    <header
      className={`sticky top-0 z-50 w-full border-b border-card-border bg-background/90 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-black/10" : ""
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <LogoLink size={34} />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {mergedGroups.map((group, i) => (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  openGroup === i ? "bg-card text-foreground" : "text-muted hover:text-foreground hover:bg-card"
                }`}
              >
                {group.label}
                <ChevronDown size={14} className={`transition-transform duration-200 ${openGroup === i ? "rotate-180" : ""}`} />
              </button>

              {/* Mega-menu dropdown */}
              {openGroup === i && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[850px] bg-card border border-card-border rounded-3xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200"
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="grid grid-cols-[1fr_320px]">
                    {/* item grid */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 p-8">
                      {group.items.map((item, j) => (
                        <Link
                          key={j}
                          href={item.href}
                          target={item.newTab ? "_blank" : undefined}
                          rel={item.newTab ? "noopener noreferrer" : undefined}
                          onClick={() => setOpenGroup(null)}
                          className="flex items-start gap-4 p-3 rounded-2xl hover:bg-muted/30 transition-colors group/item"
                        >
                          <span className={`mt-0.5 shrink-0 w-11 h-11 rounded-xl flex items-center justify-center group-hover/item:scale-110 group-hover/item:shadow-md transition-all ${group.bgClass} ${group.accentClass}`}>
                            <EmojiIcon glyph={item.icon} size={22} />
                          </span>
                          <div className="min-w-0 flex flex-col justify-center">
                            <div className="font-bold text-sm text-foreground truncate group-hover/item:text-primary transition-colors">{item.label}</div>
                            <div className="text-[13px] text-muted leading-snug mt-0.5">{item.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {/* featured card */}
                    <div className="p-4 bg-muted/10 border-l border-card-border flex">
                      <FeaturedCard f={group.featured} gradient={group.gradient} onClick={() => setOpenGroup(null)} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Standalone highlighted Investors link */}
          <Link
            href="/investors"
            className="ml-1 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-primary hover:bg-primary/10 transition-colors"
          >
            Investors
            <span className="text-[9px] font-black uppercase tracking-wider bg-primary text-white px-1.5 py-0.5 rounded-full">IPO</span>
          </Link>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center w-9 h-9 rounded-full text-muted hover:text-foreground hover:bg-card transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          {/* Three-dots full menu trigger */}
          <button
            onClick={() => setIsFullMenuOpen(true)}
            className="flex items-center justify-center w-9 h-9 rounded-full text-muted hover:text-foreground hover:bg-card transition-colors"
            aria-label="Open full menu"
          >
            <MoreVertical size={18} />
          </button>

          {globalCTA.enabled && (
            <Link
              href={globalCTA.link}
              target={globalCTA.openInNewTab ? "_blank" : undefined}
              rel={globalCTA.openInNewTab ? "noopener noreferrer" : undefined}
              className={`hidden lg:inline-flex px-5 py-2 rounded-full font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all ${
                globalCTA.style === "outline"
                  ? "border-2 border-primary text-primary hover:bg-primary/10"
                  : globalCTA.style === "ghost"
                  ? "text-primary hover:bg-primary/10"
                  : "bg-primary text-primary-foreground hover:shadow-primary/30"
              }`}
              data-track="cta_click"
            >
              {globalCTA.label}
            </Link>
          )}

          <button
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full text-foreground hover:bg-card transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="lg:hidden border-t border-card-border bg-background max-h-[82vh] overflow-y-auto">
          {mergedGroups.map((group, i) => (
            <div key={i} className="border-b border-card-border last:border-0">
              <button
                className="w-full flex items-center justify-between px-4 py-4 text-base font-semibold text-foreground"
                onClick={() => setMobileOpenGroup(mobileOpenGroup === i ? null : i)}
              >
                <span>{group.label}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${mobileOpenGroup === i ? "rotate-180" : ""}`} />
              </button>

              {mobileOpenGroup === i && (
                <div className="pb-4 bg-muted/5 px-2">
                  {group.items.map((item, j) => (
                    <Link
                      key={j}
                      href={item.href}
                      target={item.newTab ? "_blank" : undefined}
                      rel={item.newTab ? "noopener noreferrer" : undefined}
                      onClick={closeMobile}
                      className="flex items-center gap-4 px-4 py-3.5 mb-1 rounded-xl hover:bg-muted/10 transition-colors"
                    >
                      <span className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center shadow-sm ${group.bgClass} ${group.accentClass}`}>
                        <EmojiIcon glyph={item.icon} size={20} />
                      </span>
                      <div className="flex flex-col justify-center">
                        <div className="text-sm font-bold text-foreground">{item.label}</div>
                        <div className="text-[13px] text-muted mt-0.5">{item.desc}</div>
                      </div>
                    </Link>
                  ))}
                  <div className="px-2 pt-2 pb-2">
                    <Link href={group.featured.href} onClick={closeMobile} className={`flex items-center justify-between rounded-xl bg-gradient-to-br ${group.gradient} text-white px-5 py-4 shadow-md`}>
                      <span className="text-sm font-bold tracking-wide">{group.featured.title} · {group.featured.cta}</span>
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="p-4 flex flex-col gap-3">
            <Link href="/investors" onClick={closeMobile} className="flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-primary border border-primary/40">
              Investors <span className="text-[9px] font-black uppercase bg-primary text-white px-1.5 py-0.5 rounded-full">IPO</span>
            </Link>
            {globalCTA.enabled && (
              <Link
                href={globalCTA.link}
                target={globalCTA.openInNewTab ? "_blank" : undefined}
                rel={globalCTA.openInNewTab ? "noopener noreferrer" : undefined}
                onClick={closeMobile}
                className={`block w-full text-center px-5 py-3 rounded-full font-bold text-base ${
                  globalCTA.style === "outline" ? "border-2 border-primary text-primary"
                    : globalCTA.style === "ghost" ? "text-primary"
                    : "bg-primary text-primary-foreground"
                }`}
                data-track="cta_click"
              >
                {globalCTA.label}
              </Link>
            )}
          </div>
        </div>
      )}

    </header>

    {/* Three-dots full-screen menu — rendered OUTSIDE the backdrop-blur header
        so its `fixed inset-0` resolves to the viewport, not the header box. */}
    <FullMenu open={isFullMenuOpen} onClose={() => setIsFullMenuOpen(false)} />
    </>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, ChevronDown, ArrowRight, MoreVertical } from "lucide-react";
import { LogoLink } from "@/components/Logo";
import { EmojiIcon } from "@/components/icons/iconMap";
import FullMenu from "@/components/FullMenu";
import { NAV_GROUPS, type NavFeatured } from "@/lib/nav-links";

interface CMSNavItem { label: string; href: string; desc: string; icon: string; openInNewTab: boolean; group: string; }
interface GlobalCTA { enabled: boolean; label: string; link: string; openInNewTab: boolean; style: string; floatingEnabled: boolean; floatingLabel: string; floatingLink: string; floatingOpenInNewTab: boolean; floatingPosition: string; }

const GROUP_KEY_MAP: Record<string, string> = { riders: "For Riders", partners: "For Business", company: "Company", more: "Company" };

function FeaturedCard({ f, gradient, onClick }: { f: NavFeatured; gradient: string; onClick: () => void }) {
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
  const desktopNavRef = useRef<HTMLElement | null>(null);

  // Close an open mega-menu on Escape or on any pointer-down outside the nav,
  // so click/keyboard-opened menus don't get stuck open.
  useEffect(() => {
    if (openGroup === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenGroup(null); };
    const onPointerDown = (e: MouseEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointerDown);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("mousedown", onPointerDown); };
  }, [openGroup]);

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

  const mergedGroups = NAV_GROUPS.map((group) => {
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

  // Cross-fade the whole page on theme switch where the browser supports it.
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void };
    if (doc.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      doc.startViewTransition(() => flushSync(() => setTheme(next)));
    } else {
      setTheme(next);
    }
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
        <nav ref={desktopNavRef} className="hidden lg:flex items-center gap-1">
          {mergedGroups.map((group, i) => (
            <div
              key={i}
              className="relative"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => setOpenGroup(openGroup === i ? null : i)}
                aria-expanded={openGroup === i}
                aria-haspopup="true"
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
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[850px] bg-card border border-card-border rounded-3xl shadow-2xl overflow-hidden z-50 animate-menu-in motion-reduce:animate-none"
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
              onClick={toggleTheme}
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
      <AnimatePresence>
      {isMobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="lg:hidden border-t border-card-border bg-background max-h-[82vh] overflow-y-auto overflow-x-hidden">
          {mergedGroups.map((group, i) => (
            <div key={i} className="border-b border-card-border last:border-0">
              <button
                className="w-full flex items-center justify-between px-4 py-4 text-base font-semibold text-foreground"
                onClick={() => setMobileOpenGroup(mobileOpenGroup === i ? null : i)}
              >
                <span>{group.label}</span>
                <ChevronDown size={16} className={`transition-transform duration-200 ${mobileOpenGroup === i ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
              {mobileOpenGroup === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="overflow-hidden"
                >
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
                </motion.div>
              )}
              </AnimatePresence>
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
        </motion.div>
      )}
      </AnimatePresence>

    </header>

    {/* Three-dots full-screen menu — rendered OUTSIDE the backdrop-blur header
        so its `fixed inset-0` resolves to the viewport, not the header box. */}
    <FullMenu open={isFullMenuOpen} onClose={() => setIsFullMenuOpen(false)} />
    </>
  );
}

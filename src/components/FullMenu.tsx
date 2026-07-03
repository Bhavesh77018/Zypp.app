"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ArrowRight, Smartphone } from "lucide-react";
import { Logo } from "@/components/Logo";

const COLUMNS = [
  {
    title: "For Riders",
    links: [
      { label: "Earn with Zypp", href: "/riders" },
      { label: "Zypp Pilot (B2B)", href: "/zypp-pilot" },
      { label: "Zypp Rental (B2C)", href: "/zypp-rental" },
      { label: "Rent to Own", href: "/rent-to-own" },
      { label: "3W Loader", href: "/3w-Service-Zypp-Pilot" },
      { label: "Find a Hub", href: "/find-hub" },
    ],
  },
  {
    title: "For Business",
    links: [
      { label: "EV for Delivery", href: "/ev-for-delivery" },
      { label: "FleetEase.ai", href: "/fleetease" },
      { label: "Franchise (FOFO)", href: "/franchise" },
      { label: "FOCO Investment", href: "/foco" },
      { label: "Advertising", href: "/advertising" },
      { label: "Technologies", href: "/technologies" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "HustleOS", href: "/hustleos" },
      { label: "Impact", href: "/environment" },
      { label: "Investors", href: "/investors" },
      { label: "Careers", href: "/careers" },
      { label: "Life at Zypp", href: "/life-at-zypp" },
      { label: "News", href: "/zyppNews" },
    ],
  },
];

const FEATURED = [
  { img: "/media/app-screen-5.png", title: "The Zypp Pilot App", desc: "Earnings, payouts & swaps", href: "/riders", external: false },
  { img: "/media/founder-short.jpg", title: "Gig Ki Awaaz", desc: "Real rider stories", href: "https://youtube.com/@GigKiAwaaz", external: true },
  { img: "/media/app-screen-3.png", title: "Become a Pilot", desc: "Electric mobility for gig work", href: "/riders", external: false },
];

const PARTNERS = ["Ather", "Hero Electric", "Okinawa", "Yulu", "TVS", "Zomato", "Swiggy", "Blinkit", "Zepto", "Porter", "Urban Company"];

export default function FullMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
        <motion.div
          key="full-menu"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] bg-background overflow-y-auto overscroll-contain"
          role="dialog" aria-modal="true" aria-label="Full menu"
        >
          {/* subtle accent glow (cheap, GPU-light) */}
          <div className="pointer-events-none absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-primary/10 blur-[100px]" />
          <div className="pointer-events-none absolute bottom-0 -left-24 w-[360px] h-[360px] rounded-full bg-primary/5 blur-[100px]" />

          {/* sticky top bar */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-card-border">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Logo size={34} />
              <button onClick={onClose} aria-label="Close menu"
                className="flex items-center justify-center w-11 h-11 rounded-full border border-card-border text-foreground hover:bg-card hover:rotate-90 transition-all duration-300">
                <X size={22} />
              </button>
            </div>
          </div>

          <div className="relative container mx-auto px-4 py-10 lg:py-14">
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-20"
            >
              {/* Left — nav columns */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10">
                {COLUMNS.map((col) => (
                  <nav key={col.title} aria-label={col.title}>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">{col.title}</h3>
                    <ul className="flex flex-col gap-2.5">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <Link href={l.href} onClick={onClose}
                            className="group inline-flex items-center gap-2 text-lg md:text-xl font-bold text-foreground hover:text-primary transition-colors">
                            {l.label}
                            <ArrowRight size={15} className="opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}
              </div>

              {/* Right — featured + CTAs */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted mb-4">Featured</h3>
                <div className="grid grid-cols-3 gap-3">
                  {FEATURED.map((f) => (
                    <Link key={f.title} href={f.href} onClick={onClose}
                      {...(f.external ? { target: "_blank", rel: "noopener" } : {})}
                      className="group relative rounded-2xl overflow-hidden border border-card-border aspect-[3/4] bg-card block">
                      <Image src={f.img} alt={f.title} width={300} height={400} loading="eager"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      <div className="absolute bottom-0 p-3">
                        <div className="text-white font-bold text-[13px] leading-tight">{f.title}</div>
                        <div className="text-white/70 text-[10px] mt-0.5">{f.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-3">
                  <a href="https://play.google.com/store/apps/details?id=com.zyppdelivery" target="_blank" rel="noopener"
                    className="flex items-center justify-between rounded-2xl bg-primary text-white px-5 py-4 font-bold hover:bg-primary/90 transition-colors">
                    <span className="flex items-center gap-2"><Smartphone size={18} /> Download the Zypp Pilot App</span>
                    <ArrowRight size={18} />
                  </a>
                  <Link href="/investors" onClick={onClose}
                    className="flex items-center justify-between rounded-2xl border border-card-border px-5 py-4 font-bold text-foreground hover:border-primary/40 hover:bg-card transition-colors">
                    <span className="flex items-center gap-2">Investor Relations <span className="text-[9px] font-black uppercase bg-primary text-white px-1.5 py-0.5 rounded-full">IPO</span></span>
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Partners / OEM brands */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.16 }}
              className="mt-12 pt-8 border-t border-card-border"
            >
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted mb-4">Our EV &amp; Delivery Partners</h3>
              <div className="flex flex-wrap gap-2.5">
                {PARTNERS.map((p) => (
                  <span key={p} className="px-4 py-2 rounded-full border border-card-border bg-card text-sm font-bold text-foreground/70 hover:text-primary hover:border-primary/40 transition-colors cursor-default">
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
    </>
  );
}

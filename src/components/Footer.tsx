import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { LogoLink } from "@/components/Logo";

// lucide-react dropped brand icons, so these are small inline brand SVGs.
const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/zypp_electric", path: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5 0-4.74.07-.9.04-1.38.19-1.7.31-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.12.32-.27.8-.31 1.7C3.2 8.5 3.2 8.85 3.2 12s0 3.5.07 4.74c.04.9.19 1.38.31 1.7.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.12.8.27 1.7.31 1.24.07 1.59.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.38-.19 1.7-.31.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.12-.32.27-.8.31-1.7.07-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.04-.9-.19-1.38-.31-1.7a2.86 2.86 0 00-.69-1.06 2.86 2.86 0 00-1.06-.69c-.32-.12-.8-.27-1.7-.31C15.5 4 15.15 4 12 4zm0 3.06A4.94 4.94 0 1012 17a4.94 4.94 0 000-9.88zm0 8.14A3.2 3.2 0 1112 8.8a3.2 3.2 0 010 6.4zm6.3-8.34a1.15 1.15 0 11-2.3 0 1.15 1.15 0 012.3 0z" },
  { label: "LinkedIn", href: "https://linkedin.com/company/zyppelectric", path: "M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 18.34v-7.2H6v7.2h2.34zM7.17 10.1a1.36 1.36 0 100-2.72 1.36 1.36 0 000 2.72zm11.17 8.24v-3.95c0-2.11-.45-3.74-2.92-3.74-1.19 0-1.98.65-2.31 1.27h-.03v-1.07h-2.25v7.49h2.34v-3.71c0-.98.19-1.92 1.4-1.92 1.2 0 1.21 1.12 1.21 1.99v3.64h2.34z" },
  { label: "YouTube", href: "https://youtube.com/@zyppelectric", path: "M21.58 7.19a2.5 2.5 0 00-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42a2.5 2.5 0 00-1.76 1.77A26 26 0 002 12a26 26 0 00.42 4.81 2.5 2.5 0 001.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 001.76-1.77A26 26 0 0022 12a26 26 0 00-.42-4.81zM10 15V9l5.2 3-5.2 3z" },
  { label: "X", href: "https://x.com/zyppelectric", path: "M17.53 3h2.97l-6.49 7.42L21.75 21h-5.97l-4.68-6.11L5.73 21H2.75l6.94-7.93L2.25 3h6.13l4.23 5.59L17.53 3zm-1.04 16.2h1.65L7.6 4.7H5.83l10.66 14.5z" },
  { label: "Facebook", href: "https://facebook.com/ZyppElectric", path: "M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" },
];

const COLS = [
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
      { label: "Franchise Models", href: "/franchise" },
      { label: "FOFO Franchise", href: "/fofo" },
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
      { label: "ESG & Environment", href: "/environment" },
      { label: "Investors", href: "/investors" },
      { label: "Careers", href: "/careers" },
      { label: "Blogs", href: "/blogs" },
      { label: "News", href: "/zyppNews" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-card border-t border-card-border/60">
      {/* Background decoration for a premium feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[250px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Top CTA band */}
      <div className="relative border-b border-card-border/60 bg-gradient-to-b from-transparent to-primary/[0.04]">
        <div className="container mx-auto px-4 py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="text-center lg:text-left max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">Ready to ride the gig economy?</h3>
            <p className="text-muted mt-3 text-base md:text-lg">Download the Zypp Pilot app or partner with India&apos;s leading gig OS.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4 w-full lg:w-auto mt-4 lg:mt-0">
            <a href="https://play.google.com/store/apps/details?id=com.zyppdelivery" target="_blank" rel="noopener" className="group relative flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-emerald-400 text-white font-bold hover:scale-105 transition-all shadow-xl shadow-primary/30 hover:shadow-primary/50 w-full sm:w-auto text-base overflow-hidden">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10">Download the App</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/contact" className="group flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-card border border-card-border text-foreground font-bold hover:border-primary/40 hover:bg-primary/5 transition-all w-full sm:w-auto text-base hover:scale-105 shadow-sm">
              Partner with Us
            </Link>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 flex flex-col gap-6">
            <div className="transform hover:scale-105 transition-transform origin-left inline-block w-fit">
              <LogoLink size={44} />
            </div>
            <p className="text-muted leading-relaxed max-w-sm text-base">
              Building the operating system for India&apos;s gig economy. Starting with mobility — expanding into everything a gig worker needs to thrive.
            </p>
            <div className="flex flex-col gap-3 text-base text-muted mt-2">
              <a href="mailto:help@zypp.app" className="group inline-flex items-center gap-3 hover:text-primary transition-colors w-fit"><Mail size={18} className="group-hover:scale-110 transition-transform" /> help@zypp.app</a>
              <span className="inline-flex items-center gap-3"><MapPin size={18} className="text-primary/70" /> Gurugram, Haryana, India</span>
            </div>
            <div className="flex gap-4 mt-4">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-card-border/30 text-foreground border border-transparent transition-all hover:bg-primary hover:text-white hover:border-primary hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/25">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.title} className="flex flex-col gap-5">
              <h4 className="text-sm font-black text-foreground uppercase tracking-widest">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-base text-muted transition-colors hover:text-primary relative inline-block group">
                      {l.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full rounded-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-card-border/60 text-muted text-sm">
          <p className="text-center md:text-left">© {new Date().getFullYear()} Zypp · Bicyshare Technologies Pvt. Ltd. · Made with ❤️ in India 🇮🇳</p>
          <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-8 font-medium">
            <Link href="/term-and-conditions" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

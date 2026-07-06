"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

/** Mobile-only sticky bottom bar for conversion pages — appears after the
 *  visitor scrolls past the hero. */
export default function StickyMobileCTA({
  label = "₹180/day — Apply Now",
  href = "https://play.google.com/store/apps/details?id=com.zyppdelivery",
}: { label?: string; href?: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 inset-x-0 z-40 p-3 transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}
    >
      <a
        href={href} target="_blank" rel="noopener" data-track="Sticky Mobile CTA"
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-primary text-white font-bold shadow-2xl shadow-primary/40"
      >
        {label} <ArrowRight size={17} />
      </a>
    </div>
  );
}

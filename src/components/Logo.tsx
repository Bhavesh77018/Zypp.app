import Link from "next/link";


const BRAND = "#00bc84"; // Zypp Electric brand green (matched to the real app logo)

/**
 * The Zypp mark — green speech-bubble + bold white lightning bolt with spark
 * ticks. Faithfully matched to the real Zypp app icon.
 */
export function LogoMark({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={(size * 74) / 64} viewBox="0 0 64 74" fill="none" className={className} role="img" aria-label="Zypp Electric">
      {/* round speech bubble with a short pointed tail at the bottom */}
      <path
        d="M32 2C15.46 2 2.5 14.96 2.5 31.5c0 14.2 9.96 26.06 23.2 28.86L32 72l6.3-11.64C51.54 57.56 61.5 45.7 61.5 31.5 61.5 14.96 48.54 2 32 2Z"
        fill={BRAND}
      />
      {/* bold lightning bolt */}
      <path d="M38 12 19 39h11.3L25 56 46 27H34.4L40 12z" fill="#fff" />
      {/* spark ticks — top-right and bottom-left */}
      <path d="M44.5 15.5l6-4.5M20 51l-6 4.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Full logo: mark + wordmark. `tone="light"` renders the sub-line in white
 * (for dark backgrounds like the footer); default adapts to theme.
 */
export function Logo({
  size = 34,
  showText = true,
  tone = "auto",
  className = "",
}: {
  size?: number;
  showText?: boolean;
  tone?: "auto" | "light";
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark size={size} />
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="font-black italic tracking-tight" style={{ color: BRAND, fontSize: size * 0.56 }}>ZYPP</span>
          <span
            className={`font-bold tracking-[0.34em] ${tone === "light" ? "text-white/90" : "text-foreground/80"}`}
            style={{ fontSize: size * 0.19, marginTop: size * 0.05 }}
          >
            ELECTRIC
          </span>
        </span>
      )}
    </span>
  );
}

/** Convenience: the logo wrapped in a link to home. */
export function LogoLink({ size = 34, tone = "auto", className = "" }: { size?: number; tone?: "auto" | "light"; className?: string }) {
  return (
    <Link href="/" aria-label="Zypp Electric — home" className={`shrink-0 ${className}`}>
      <Logo size={size} tone={tone} />
    </Link>
  );
}

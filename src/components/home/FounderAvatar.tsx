"use client";
import { useState } from "react";

/**
 * Founder avatar — shows the real photo at /media/akash-gupta.jpg, and falls
 * back to the "AG" monogram if the file isn't present yet. Plain <img> (not
 * next/image) so a missing file degrades gracefully instead of erroring.
 */
export default function FounderAvatar({
  src = "/media/akash-gupta.jpg",
  initials = "AG",
  className = "w-24 h-24",
}: {
  src?: string;
  initials?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`${className} rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-black text-3xl shadow-lg`}>
        {initials}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Akash Gupta — Co-Founder & CEO, Zypp"
      onError={() => setFailed(true)}
      className={`${className} rounded-2xl object-cover shadow-lg`}
    />
  );
}

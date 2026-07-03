"use client";

import { motion, useReducedMotion } from "framer-motion";

/** App Router template — re-mounts on navigation, giving a smooth page transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  // NOTE: opacity-only (no transform). A transform here would create a
  // containing block and break `position: sticky` scroll sections inside pages.
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

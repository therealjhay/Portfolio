"use client";

import { motion } from "framer-motion";

export function ContactStatus({ status }: { status?: string }) {
  if (status !== "sent") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="mb-6 flex items-center gap-3 border border-primary/40 bg-primary/10 p-3 text-sm text-foreground"
      role="status"
      aria-live="polite"
    >
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="inline-flex h-6 w-6 items-center justify-center border border-primary text-primary"
        aria-hidden="true"
      >
        ✓
      </motion.span>
      I&apos;ll respond within 24h.
    </motion.div>
  );
}

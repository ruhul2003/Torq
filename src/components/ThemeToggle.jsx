"use client";

import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "", isSolid = true, showLabel = false }) {
  const { isDark, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center opacity-0 pointer-events-none ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`relative rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
        showLabel
          ? "px-3.5 py-1.5 gap-2.5 w-full border"
          : "w-9 h-9 lg:w-10 lg:h-10 border"
      } ${
        isDark
          ? "bg-white/[0.06] text-sky-300 border-white/10 hover:bg-white/10 hover:border-sky-400/40 shadow-[0_0_15px_-3px_rgba(56,189,248,0.2)]"
          : isSolid
          ? "bg-black/[0.04] text-neutral-800 border-black/10 hover:bg-black/[0.08] hover:border-black/20"
          : "bg-white/20 text-white border-white/30 hover:bg-white/30"
      } ${className}`}
    >
      <div className="relative w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="w-4 h-4 text-sky-300" strokeWidth={2.2} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="w-4 h-4 text-amber-500" strokeWidth={2.2} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="text-xs font-semibold tracking-wider uppercase font-mono">
          {isDark ? "Dark Theme" : "Light Theme"}
        </span>
      )}
    </motion.button>
  );
}

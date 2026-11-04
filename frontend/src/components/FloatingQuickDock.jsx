"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowRightLeft, Award, ArrowUp, Volume2, Sparkles } from "lucide-react";

export default function FloatingQuickDock({
  onOpenChat,
  onOpenCompare,
  onOpenTrack,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 p-2 rounded-full bg-black/80 dark:bg-neutral-900/90 backdrop-blur-2xl border border-white/15 text-white shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
        >
          {/* AI Concierge */}
          <button
            type="button"
            onClick={onOpenChat}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 hover:bg-sky-500 hover:text-black transition-all cursor-pointer text-xs font-semibold"
            title="Chat with AI Concierge"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Concierge</span>
          </button>

          {/* Vehicle Compare */}
          <button
            type="button"
            onClick={onOpenCompare}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 transition-colors cursor-pointer"
            title="Compare Hypercars"
          >
            <ArrowRightLeft className="w-4 h-4 text-neutral-300" />
          </button>

          {/* Track Drive */}
          <button
            type="button"
            onClick={onOpenTrack}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 transition-colors cursor-pointer"
            title="Book Track Experience"
          >
            <Award className="w-4 h-4 text-amber-400" />
          </button>

          {/* Divider */}
          <div className="w-[1px] h-4 bg-white/15 mx-1" />

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

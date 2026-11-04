"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Progress Track */}
      <div className="h-[3px] w-full bg-black/5 dark:bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 origin-left shadow-[0_0_14px_rgba(56,189,248,0.7)]"
          style={{ scaleX }}
        />
      </div>

      {/* Tiny Telemetry pill on scroll */}
      {percent > 2 && percent < 98 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-3 right-4 sm:right-6 pointer-events-none z-50 px-2 py-0.5 rounded-full bg-black/60 dark:bg-neutral-900/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300"
        >
          <span className="text-sky-400 font-semibold">{percent}%</span> READ
        </motion.div>
      )}
    </div>
  );
}

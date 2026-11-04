"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function AmbientCursorGlow() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const springX = useSpring(mouseX, { stiffness: 250, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 250, damping: 28 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: fine)").matches) {
      setMounted(true);
      const handleMouseMove = (e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-30 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-25 dark:opacity-20 bg-[radial-gradient(circle,rgba(56,189,248,0.35)_0%,rgba(99,102,241,0.15)_45%,transparent_70%)]"
      style={{
        x: springX,
        y: springY,
      }}
    />
  );
}

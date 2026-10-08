"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Sparkles, ChevronDown } from "lucide-react";

export default function HeroSection({ onOpenReserve }) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden tech-grid min-h-[90vh] flex items-center">
      {/* Ambient ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-ambient-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] backdrop-blur-md mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-300">
              TORQ MOTORS // LUXURY FLEET
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.08] mb-6"
          >
            CURATED HYPERCARS.
            <br />
            <span className="bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-500 bg-clip-text text-transparent">
              IMMEDIATE DELIVERY.
            </span>
          </motion.h1>

          {/* Subheading - concise and clean */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-lg mx-auto font-normal leading-relaxed mb-8"
          >
            Handcrafted electric hypercars and exotic grand tourers. Immediate private allocations with white-glove delivery worldwide.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3.5 mb-14"
          >
            <a
              href="#inventory"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 transition-all shadow-md active:scale-98"
            >
              <span>Explore Inventory</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onOpenReserve}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-neutral-300 dark:border-white/15 hover:border-neutral-900 dark:hover:border-white text-neutral-800 dark:text-neutral-200 bg-white/70 dark:bg-white/[0.03] transition-colors cursor-pointer"
            >
              <span>Acquire or Inquire</span>
            </button>
          </motion.div>

          {/* Minimalist Showcase Preview Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="w-full rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl shadow-lg"
          >
            {/* Minimalist Graphic */}
            <div className="relative py-4 flex items-center justify-center">
              <svg
                viewBox="0 0 900 240"
                className="w-full max-w-2xl h-auto drop-shadow-md"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 170 C 120 120, 200 115, 270 110 C 330 105, 390 55, 500 54 C 610 52, 670 75, 740 110 C 790 120, 830 135, 850 170 Z"
                  className="stroke-neutral-800 dark:stroke-neutral-200 fill-neutral-950/[0.03] dark:fill-white/[0.03]"
                  strokeWidth="2"
                />
                <path
                  d="M340 105 C 380 65, 460 58, 560 58 C 620 58, 660 85, 695 110 Z"
                  className="stroke-sky-500"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <circle cx="240" cy="170" r="36" className="stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.5" />
                <circle cx="240" cy="170" r="12" className="fill-neutral-900 dark:fill-white" />
                <circle cx="750" cy="170" r="36" className="stroke-neutral-800 dark:stroke-neutral-200" strokeWidth="2.5" />
                <circle cx="750" cy="170" r="12" className="fill-neutral-900 dark:fill-white" />
                <line x1="60" y1="206" x2="880" y2="206" className="stroke-neutral-300 dark:stroke-neutral-800" strokeWidth="1" strokeDasharray="6 4" />
              </svg>
            </div>

            {/* Quick Showroom Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-neutral-200/60 dark:border-white/5 text-center">
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-0.5">
                  AVAILABLE FLEET
                </span>
                <span className="text-xl sm:text-2xl font-display font-bold text-neutral-950 dark:text-white">
                  9 Luxury Models
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-0.5">
                  DISPATCH
                </span>
                <span className="text-xl sm:text-2xl font-display font-bold text-emerald-600 dark:text-emerald-400">
                  48h Enclosed
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-0.5">
                  STARTING AT
                </span>
                <span className="text-xl sm:text-2xl font-display font-bold text-neutral-950 dark:text-white">
                  $165,000
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-0.5">
                  ESCROW
                </span>
                <span className="text-xl sm:text-2xl font-display font-bold text-sky-600 dark:text-sky-400">
                  100% Protected
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

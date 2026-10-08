"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, Sparkles, ChevronDown } from "lucide-react";

export default function HeroSection({ onOpenReserve }) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden tech-grid min-h-[90vh] flex items-center">
      {/* Ambient ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-ambient-glow" />

      <div className="w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] backdrop-blur-md mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-300">
              TORQ MOTORS // LUXURY FLEET FOR SALE
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.08] mb-5"
          >
            CURATED HYPERCARS.
            <br />
            <span className="bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-500 bg-clip-text text-transparent">
              IMMEDIATE DELIVERY.
            </span>
          </motion.h1>

          {/* Subheading - clean and minimal */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-md mx-auto font-normal leading-relaxed mb-8"
          >
            Handcrafted electric hypercars and exotic grand tourers. Immediate allocations worldwide.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3.5 mb-10"
          >
            <a
              href="#inventory"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 transition-all shadow-md active:scale-98"
            >
              <span>Explore Fleet</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onOpenReserve}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-neutral-300 dark:border-white/15 hover:border-neutral-900 dark:hover:border-white text-neutral-800 dark:text-neutral-200 bg-white/70 dark:bg-white/[0.03] transition-colors cursor-pointer"
            >
              <span>Acquire Vehicle</span>
            </button>
          </motion.div>

          {/* Hero Car Showcase with Real Photorealistic Car Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="w-full rounded-3xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-neutral-950/40 p-3 sm:p-5 backdrop-blur-xl shadow-2xl overflow-hidden group"
          >
            <div className="relative aspect-[21/9] sm:aspect-[2.2/1] rounded-2xl overflow-hidden bg-neutral-950">
              <img
                src="/images/cars/apex-gt.jpg"
                alt="TORQ Apex Hyper GT"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10 text-left">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold block mb-1">
                      FEATURED ALLOCATION // READY TO SHIP
                    </span>
                    <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
                      TORQ Apex Hyper GT
                    </h2>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-display font-black text-white">
                      $245,000
                    </span>
                    <button
                      type="button"
                      onClick={onOpenReserve}
                      className="px-5 py-2.5 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 font-semibold text-xs tracking-wider uppercase cursor-pointer transition-all shadow-md"
                    >
                      Acquire
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Showroom Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 mt-3 border-t border-neutral-200/60 dark:border-white/5 text-center">
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-0.5">
                  FLEET INVENTORY
                </span>
                <span className="text-lg sm:text-xl font-display font-bold text-neutral-950 dark:text-white">
                  9 Models For Sale
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-0.5">
                  DELIVERY
                </span>
                <span className="text-lg sm:text-xl font-display font-bold text-emerald-600 dark:text-emerald-400">
                  48h Enclosed
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-0.5">
                  STARTING PRICE
                </span>
                <span className="text-lg sm:text-xl font-display font-bold text-neutral-950 dark:text-white">
                  $165,000
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-0.5">
                  TRANSACTION
                </span>
                <span className="text-lg sm:text-xl font-display font-bold text-sky-600 dark:text-sky-400">
                  Escrow Protected
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

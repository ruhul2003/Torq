"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowRight,
  ArrowUpRight,
  Zap,
  Gauge,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import { INVENTORY } from "@/data/inventory";

export default function HeroSection({ onOpenReserve }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const activeCar = INVENTORY[currentIndex] || INVENTORY[0];

  const paginate = useCallback(
    (newDirection) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        let nextIndex = prev + newDirection;
        if (nextIndex < 0) nextIndex = INVENTORY.length - 1;
        if (nextIndex >= INVENTORY.length) nextIndex = 0;
        return nextIndex;
      });
    },
    []
  );

  const goToSlide = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Autoplay functionality with pause on hover
  useEffect(() => {
    if (!isAutoPlay || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      paginate(1);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlay, isHovered, paginate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 1.04,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    }),
  };

  return (
    <section className="relative pt-24 pb-10 md:pt-28 md:pb-16 overflow-hidden tech-grid min-h-[90vh] flex flex-col justify-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-[160px] pointer-events-none -z-10 animate-ambient-glow" />

      {/* Main Full-Width Container (Expanded to 96% / max-w-[1920px]) */}
      <div className="w-[96%] max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 w-full flex flex-col items-center">
        {/* Eyebrow & Minimal Headline */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] backdrop-blur-md mb-3 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-300">
              TORQ MOTORS // LUXURY FLEET FOR SALE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.08] mb-3"
          >
            CURATED HYPERCARS.
            <br />
            <span className="bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-500 bg-clip-text text-transparent">
              IMMEDIATE DELIVERY.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-lg mx-auto font-normal leading-relaxed mb-5"
          >
            Handcrafted electric hypercars and exotic grand tourers. Immediate allocations worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#inventory"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 transition-all shadow-md active:scale-98"
            >
              <span>Explore Fleet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => onOpenReserve?.(activeCar)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-neutral-300 dark:border-white/15 hover:border-neutral-900 dark:hover:border-white text-neutral-800 dark:text-neutral-200 bg-white/70 dark:bg-white/[0.03] transition-colors cursor-pointer"
            >
              <span>Acquire Vehicle</span>
            </button>
          </motion.div>
        </div>

        {/* FULL-WIDTH LUXURY CAR IMAGE SLIDER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/90 dark:border-white/10 bg-neutral-950"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Slide Canvas */}
          <div className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] lg:h-[680px] xl:h-[720px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeCar.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                {/* Full-Width Luxury Car Image */}
                <img
                  src={activeCar.image}
                  alt={activeCar.name}
                  className="w-full h-full object-cover object-center select-none"
                  draggable={false}
                />

                {/* Cinematic Vignette Overlays for Depth and Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40 pointer-events-none" />

                {/* Top Overlay: Model Meta & Live Allocation Badge */}
                <div className="absolute top-4 sm:top-8 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between gap-4 z-20">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase backdrop-blur-md border border-white/20 shadow-lg ${activeCar.statusColor}`}
                    >
                      {activeCar.status}
                    </span>
                    <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-neutral-300 bg-black/50 backdrop-blur-md border border-white/10">
                      VIN: {activeCar.vin}
                    </span>
                    <span className="hidden md:inline-flex px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-sky-300 bg-sky-950/40 backdrop-blur-md border border-sky-500/20">
                      {activeCar.categoryLabel}
                    </span>
                  </div>

                  {/* Slide Counter & Autoplay Toggle */}
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white font-mono text-xs tracking-wider">
                      <span className="text-white font-bold">
                        {String(currentIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-white/40"> / </span>
                      <span className="text-white/60">
                        {String(INVENTORY.length).padStart(2, "0")}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAutoPlay(!isAutoPlay)}
                      className="p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
                      title={isAutoPlay ? "Pause autoplay" : "Resume autoplay"}
                      aria-label={isAutoPlay ? "Pause autoplay" : "Resume autoplay"}
                    >
                      {isAutoPlay ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Bottom Overlay: Specs, Model Title & Immediate Action CTA */}
                <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-8 right-4 sm:right-8 z-20">
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    {/* Left: Model Name & Specs */}
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">
                          {activeCar.exterior} • {activeCar.interior}
                        </span>
                      </div>

                      <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-4 drop-shadow-md">
                        {activeCar.name}
                      </h2>

                      {/* Specs Badges */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg">
                        <div className="px-3.5 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15">
                          <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                            0–60 MPH
                          </span>
                          <span className="text-base sm:text-lg font-display font-bold text-white">
                            {activeCar.specs.zeroToSixty}
                          </span>
                        </div>
                        <div className="px-3.5 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15">
                          <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                            OUTPUT
                          </span>
                          <span className="text-base sm:text-lg font-display font-bold text-white">
                            {activeCar.specs.horsePower}
                          </span>
                        </div>
                        <div className="px-3.5 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15">
                          <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                            TOP SPEED
                          </span>
                          <span className="text-base sm:text-lg font-display font-bold text-white">
                            {activeCar.specs.topSpeed}
                          </span>
                        </div>
                        <div className="px-3.5 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15">
                          <span className="text-[10px] font-mono text-neutral-400 uppercase block">
                            RANGE
                          </span>
                          <span className="text-base sm:text-lg font-display font-bold text-white">
                            {activeCar.specs.range}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Pricing & Acquisition Buttons */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 sm:gap-4 shrink-0">
                      <div className="text-left lg:text-right">
                        <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white drop-shadow-md">
                          {activeCar.price}
                        </div>
                        <div className="text-xs font-mono text-neutral-400 mt-0.5">
                          {activeCar.leasing} • Title Delivery Available
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => onOpenReserve?.(activeCar)}
                          className="px-6 py-3.5 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 font-semibold text-xs tracking-wider uppercase cursor-pointer transition-all shadow-xl hover:scale-102 active:scale-98 flex items-center gap-2"
                        >
                          <span>Acquire Vehicle</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <Link
                          href={`/configurator?model=${activeCar.id}`}
                          className="px-5 py-3.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 hover:border-white/50 text-white font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5"
                        >
                          <span>Bespoke</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Floating Navigation Controls (Previous / Next Arrows) */}
            <button
              type="button"
              onClick={() => paginate(-1)}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xl group"
              aria-label="Previous Car"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => paginate(1)}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xl group"
              aria-label="Next Car"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Bottom Slider Strip Indicator / Pagination Dots */}
            <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-center gap-1.5 sm:gap-2">
              {INVENTORY.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`relative transition-all duration-300 cursor-pointer rounded-full h-1.5 sm:h-2 ${
                      isActive
                        ? "w-8 sm:w-12 bg-white shadow-glow"
                        : "w-2 sm:w-2.5 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Jump to ${item.name}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Quick Model Selector Thumbnail Strip along bottom of the banner */}
          <div className="hidden md:flex items-center gap-2 p-3 bg-neutral-900/90 border-t border-white/10 overflow-x-auto">
            {INVENTORY.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-white/15 border border-white/30 text-white shadow-md"
                      : "bg-white/[0.03] border border-white/5 text-neutral-400 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-7 object-cover rounded-md border border-white/10"
                  />
                  <div className="leading-tight">
                    <div className="text-xs font-semibold text-white truncate max-w-[120px]">
                      {item.name.replace("TORQ ", "")}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      {item.price}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Showroom Highlights Footer */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 mt-4 text-center">
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/5 backdrop-blur-md">
            <span className="text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block mb-1">
              FLEET INVENTORY
            </span>
            <span className="text-lg sm:text-xl font-display font-bold text-neutral-950 dark:text-white">
              9 Models Available
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/5 backdrop-blur-md">
            <span className="text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block mb-1">
              FREIGHT GUARANTEE
            </span>
            <span className="text-lg sm:text-xl font-display font-bold text-emerald-600 dark:text-emerald-400">
              48h Enclosed Transport
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/5 backdrop-blur-md">
            <span className="text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block mb-1">
              ESCROW PROTECTION
            </span>
            <span className="text-lg sm:text-xl font-display font-bold text-neutral-950 dark:text-white">
              Title Assignment Guaranteed
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/5 backdrop-blur-md">
            <span className="text-[10px] font-mono uppercase text-neutral-500 dark:text-neutral-400 block mb-1">
              FACTORY WARRANTY
            </span>
            <span className="text-lg sm:text-xl font-display font-bold text-sky-600 dark:text-sky-400">
              5-Year Unlimited Powertrain
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

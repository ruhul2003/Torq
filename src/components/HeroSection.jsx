"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Play,
  Pause,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { INVENTORY } from "@/data/inventory";

export default function HeroSection({ onOpenReserve }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const activeCar = INVENTORY[currentIndex] || INVENTORY[0];

  // Parallax on scroll for cinematic depth
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 180]);
  const opacityOverlay = useTransform(scrollY, [0, 600], [1, 0.35]);

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

  // Autoplay with pause on hover
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

  // Swipe physics calculation
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  // High-quality spring transition variants for the background car
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.08,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 280, damping: 32, mass: 0.9 },
        opacity: { duration: 0.45 },
        scale: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 280, damping: 32, mass: 0.9 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.4 },
      },
    }),
  };

  // Stagger container for active car details
  const detailsVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.07,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -14,
      transition: { duration: 0.25, ease: "easeInOut" },
    },
  };

  const itemChildVariants = {
    initial: { opacity: 0, y: 12 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      className="relative w-full h-screen min-h-[660px] h-[100dvh] overflow-hidden bg-neutral-950 flex flex-col justify-between select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* FULL-SCREEN CAR SLIDER BACKGROUND CANVAS WITH PARALLAX & GESTURE DRAG */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeCar.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold || offset.x < -80) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold || offset.x > 80) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          >
            {/* Cinematic Full Screen Image with Ken Burns Zoom */}
            <motion.img
              src={activeCar.image}
              alt={activeCar.name}
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover object-center select-none pointer-events-none"
              draggable={false}
            />

            {/* Gradient Vignettes for High Contrast & Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/60 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* TOP OVERLAY: BRAND EYEBROW & ALLOCATION METRICS */}
      <motion.div
        style={{ opacity: opacityOverlay }}
        className="relative pt-24 sm:pt-28 px-4 sm:px-8 lg:px-12 w-full max-w-[1920px] mx-auto z-20 flex items-start justify-between gap-4 pointer-events-auto"
      >
        {/* Left: Brand Headline */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md mb-2 sm:mb-3 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-200">
              TORQ MOTORS // LUXURY FLEET FOR SALE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg"
          >
            CURATED HYPERCARS.
            <br />
            <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              IMMEDIATE DELIVERY.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:block text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed mt-1.5 max-w-md drop-shadow"
          >
            Handcrafted electric hypercars and exotic grand tourers. Immediate allocations worldwide.
          </motion.p>
        </div>

        {/* Right: Allocation Status, Slide Counter, Autoplay Toggle */}
        <div className="flex flex-col items-end gap-2.5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCar.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2"
            >
              <span
                className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase backdrop-blur-md border border-white/20 shadow-lg ${activeCar.statusColor}`}
              >
                {activeCar.status}
              </span>

              <span className="hidden md:inline-flex px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-sky-300 bg-black/50 backdrop-blur-md border border-white/15">
                {activeCar.categoryLabel}
              </span>
            </motion.div>
          </AnimatePresence>

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

            <motion.button
              type="button"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.88 }}
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white/80 hover:text-white transition-colors cursor-pointer"
              title={isAutoPlay ? "Pause autoplay" : "Resume autoplay"}
              aria-label={isAutoPlay ? "Pause autoplay" : "Resume autoplay"}
            >
              {isAutoPlay ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* FLOATING PREVIOUS / NEXT ARROWS WITH MAGNETIC HOVER */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.15, x: -4, backgroundColor: "rgba(0,0,0,0.85)" }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={() => paginate(-1)}
        className="absolute left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white cursor-pointer shadow-2xl group"
        aria-label="Previous Car"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5" />
      </motion.button>

      <motion.button
        type="button"
        whileHover={{ scale: 1.15, x: 4, backgroundColor: "rgba(0,0,0,0.85)" }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={() => paginate(1)}
        className="absolute right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white cursor-pointer shadow-2xl group"
        aria-label="Next Car"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5" />
      </motion.button>

      {/* BOTTOM OVERLAY: MODEL METRICS, PRICING, THUMBNAILS & CTAS WITH ANIMATED STAGGER */}
      <div className="relative pb-6 sm:pb-8 px-4 sm:px-8 lg:px-12 w-full max-w-[1920px] mx-auto z-20 flex flex-col gap-4">
        {/* Active Car Specs & Action Row - Smooth Stagger Transitions with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCar.id}
            variants={detailsVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 bg-black/45 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 shadow-2xl"
          >
            {/* Left Column: Model Name & Technical Specs */}
            <div className="max-w-2xl">
              <motion.div
                variants={itemChildVariants}
                className="flex items-center gap-2 mb-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-sky-400 font-semibold">
                  {activeCar.exterior} • {activeCar.interior}
                </span>
              </motion.div>

              <motion.h2
                variants={itemChildVariants}
                className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-3 drop-shadow-md"
              >
                {activeCar.name}
              </motion.h2>

              {/* Spec Badges Grid with Stagger */}
              <motion.div
                variants={itemChildVariants}
                className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-lg"
              >
                <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase block">
                    0–60 MPH
                  </span>
                  <span className="text-sm sm:text-base font-display font-bold text-white">
                    {activeCar.specs.zeroToSixty}
                  </span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase block">
                    OUTPUT
                  </span>
                  <span className="text-sm sm:text-base font-display font-bold text-white">
                    {activeCar.specs.horsePower}
                  </span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase block">
                    TOP SPEED
                  </span>
                  <span className="text-sm sm:text-base font-display font-bold text-white">
                    {activeCar.specs.topSpeed}
                  </span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15">
                  <span className="text-[9px] font-mono text-neutral-400 uppercase block">
                    RANGE
                  </span>
                  <span className="text-sm sm:text-base font-display font-bold text-white">
                    {activeCar.specs.range}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Price & Acquisition CTA */}
            <motion.div
              variants={itemChildVariants}
              className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-end gap-3 sm:gap-4 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-white/10"
            >
              <div className="text-left lg:text-right">
                <div className="text-2xl sm:text-4xl font-display font-black text-white drop-shadow-md">
                  {activeCar.price}
                </div>
                <div className="text-[11px] font-mono text-neutral-300">
                  {activeCar.leasing} • Title Delivery
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => onOpenReserve?.(activeCar)}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 font-semibold text-xs tracking-wider uppercase cursor-pointer transition-colors shadow-xl flex items-center gap-2"
                >
                  <span>Acquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Link
                    href={`/configurator?model=${activeCar.id}`}
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 hover:border-white/50 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5"
                  >
                    <span>Bespoke</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* BOTTOM THUMBNAILS CAROUSEL STRIP WITH FRAMER MOTION PROGRESS BAR */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {INVENTORY.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <motion.button
                key={item.id}
                type="button"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => goToSlide(idx)}
                className={`relative overflow-hidden flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-left transition-colors shrink-0 cursor-pointer backdrop-blur-md ${
                  isActive
                    ? "bg-white/25 border border-white/40 text-white shadow-lg ring-1 ring-sky-400/50"
                    : "bg-black/40 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-9 h-6 object-cover rounded-md border border-white/15"
                />
                <div className="leading-tight">
                  <div className="text-[11px] font-semibold text-white truncate max-w-[110px]">
                    {item.name.replace("TORQ ", "")}
                  </div>
                  <div className="text-[9px] font-mono text-neutral-300">
                    {item.price}
                  </div>
                </div>

                {/* Animated Autoplay Progress Bar on the Active Slide */}
                {isActive && isAutoPlay && !isHovered && (
                  <motion.div
                    key={`progress-${currentIndex}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5.5, ease: "linear" }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 to-emerald-400 origin-left"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* MOBILE PAGINATION DOTS */}
        <div className="flex md:hidden items-center justify-center gap-1.5">
          {INVENTORY.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <motion.button
                key={item.id}
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => goToSlide(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  isActive ? "w-6 bg-white" : "w-1.5 bg-white/40"
                }`}
                aria-label={`Jump to ${item.name}`}
              />
            );
          })}
        </div>

        {/* SCROLL PROMPT WITH CONTINUOUS ANIMATION */}
        <div className="flex items-center justify-center pt-1">
          <motion.a
            href="#inventory"
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
          >
            <span>Scroll To Explore Inventory</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

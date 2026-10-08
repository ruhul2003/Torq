"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Zap, Check, SlidersHorizontal, Shield, Sparkles } from "lucide-react";
import { INVENTORY, INVENTORY_CATEGORIES } from "@/data/inventory";

export default function InventoryGallery({ onSelectVehicle }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredVehicles = useMemo(() => {
    if (activeCategory === "all") return INVENTORY;
    return INVENTORY.filter((car) => car.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="mt-14">
      {/* Category Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-sky-500 font-semibold block mb-1">
            SHOWROOM SALES FLEET
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
            Available Luxury Allocations.
          </h3>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.03] overflow-x-auto">
          {INVENTORY_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            const count =
              cat.id === "all"
                ? INVENTORY.length
                : INVENTORY.filter((c) => c.category === cat.id).length;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected
                      ? "bg-white/20 text-white dark:bg-black/20 dark:text-neutral-950"
                      : "bg-neutral-200/80 dark:bg-white/10 text-neutral-500 dark:text-neutral-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Luxury Vehicles Card Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredVehicles.map((car) => (
            <motion.div
              layout
              key={car.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white dark:bg-neutral-950/70 p-6 shadow-sm hover:shadow-xl hover:border-neutral-300 dark:hover:border-white/20 transition-all group"
            >
              <div>
                {/* Header Status & Category */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider ${car.statusColor}`}>
                    {car.status}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase">
                    {car.categoryLabel}
                  </span>
                </div>

                {/* Car Name & Price */}
                <h4 className="font-display text-xl font-bold text-neutral-950 dark:text-white tracking-tight group-hover:text-sky-500 transition-colors">
                  {car.name}
                </h4>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-display font-black text-neutral-950 dark:text-white">
                    {car.price}
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    {car.leasing}
                  </span>
                </div>

                {/* Minimalist Specs Strip */}
                <div className="grid grid-cols-4 gap-1.5 py-3 my-4 border-y border-neutral-100 dark:border-white/5 text-center bg-neutral-50/50 dark:bg-white/[0.01] rounded-lg">
                  <div>
                    <span className="text-[9px] font-mono text-neutral-400 block">0-60</span>
                    <span className="text-xs font-bold font-display text-neutral-900 dark:text-white">{car.specs.zeroToSixty}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-neutral-400 block">OUTPUT</span>
                    <span className="text-xs font-bold font-display text-neutral-900 dark:text-white">{car.specs.horsePower}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-neutral-400 block">RANGE</span>
                    <span className="text-xs font-bold font-display text-neutral-900 dark:text-white">{car.specs.range}</span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-neutral-400 block">TOP SPD</span>
                    <span className="text-xs font-bold font-display text-neutral-900 dark:text-white">{car.specs.topSpeed}</span>
                  </div>
                </div>

                {/* Minimal Trims & Highlights */}
                <div className="text-[11px] text-neutral-600 dark:text-neutral-400 space-y-1 mb-4">
                  <div className="truncate"><strong className="text-neutral-900 dark:text-white">Spec:</strong> {car.exterior}</div>
                  <div className="truncate"><strong className="text-neutral-900 dark:text-white">Interior:</strong> {car.interior}</div>
                </div>

                {/* Bullets */}
                <ul className="space-y-1.5 mb-5">
                  {car.highlights.slice(0, 2).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                      <span className="w-1 h-1 rounded-full bg-sky-500 shrink-0" />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-neutral-100 dark:border-white/5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectVehicle && onSelectVehicle(car)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-semibold text-[11px] tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-sm active:scale-98"
                >
                  <span>Acquire</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  href={`/configurator?model=${car.id}`}
                  className="py-2.5 px-3 rounded-xl border border-neutral-200 dark:border-white/10 hover:border-neutral-900 dark:hover:border-white text-neutral-700 dark:text-neutral-300 font-semibold text-[11px] tracking-wider uppercase transition-colors"
                >
                  <span>Bespoke</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

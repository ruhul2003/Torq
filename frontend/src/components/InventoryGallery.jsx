"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-sky-500 font-semibold block mb-1">
            SHOWROOM SALES FLEET
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
            Available Luxury Allocations.
          </h3>
        </motion.div>

        {/* Category Filter Tabs with Framer Motion layoutId */}
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
                className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "text-white dark:text-neutral-950 font-bold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeInventoryCategoryPill"
                    className="absolute inset-0 rounded-lg bg-neutral-950 dark:bg-white shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
                <span
                  className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
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

      {/* Luxury Vehicles Card Grid with Spring Stagger */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredVehicles.map((car) => (
            <motion.div
              layout
              key={car.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
                layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
              }}
              className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white dark:bg-neutral-950/70 p-4 sm:p-5 shadow-sm hover:shadow-2xl hover:border-neutral-300 dark:hover:border-white/25 transition-all group"
            >
              <div>
                {/* Car Photo Banner */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4 bg-neutral-950 group/cardimg">
                  <motion.img
                    src={car.image}
                    alt={car.name}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider backdrop-blur-md ${car.statusColor}`}>
                      {car.status}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md border border-white/10">
                      {car.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Car Name & Price */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-display text-lg font-bold text-neutral-950 dark:text-white tracking-tight group-hover:text-sky-500 transition-colors">
                    {car.name}
                  </h4>
                </div>

                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl sm:text-2xl font-display font-black text-neutral-950 dark:text-white">
                    {car.price}
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    {car.leasing}
                  </span>
                </div>

                {/* Minimalist Specs Strip */}
                <div className="grid grid-cols-4 gap-1 py-2.5 mb-3 border-y border-neutral-100 dark:border-white/5 text-center bg-neutral-50/60 dark:bg-white/[0.01] rounded-lg">
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

                {/* Minimal Finish Info */}
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 dark:text-neutral-400 mb-3 px-1">
                  <span className="truncate">{car.exterior}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">48h Delivery</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 border-t border-neutral-100 dark:border-white/5 flex items-center gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => onSelectVehicle && onSelectVehicle(car)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 font-semibold text-[11px] tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm"
                >
                  <span>Acquire</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </motion.button>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex-1"
                >
                  <Link
                    href={`/configurator?model=${car.id}`}
                    className="w-full py-2.5 px-3 rounded-xl border border-neutral-200 dark:border-white/10 hover:border-neutral-900 dark:hover:border-white text-neutral-700 dark:text-neutral-300 font-semibold text-[11px] tracking-wider uppercase transition-colors flex items-center justify-center"
                  >
                    <span>Bespoke</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

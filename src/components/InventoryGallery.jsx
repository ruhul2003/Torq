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
    </div>
  );
}

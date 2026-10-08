"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Tag } from "lucide-react";
import { INVENTORY } from "@/data/inventory";
import InventoryGallery from "./InventoryGallery";

export default function VehicleShowcase({ onOpenReserve }) {
  const [activeModel, setActiveModel] = useState(INVENTORY[0]);

  return (
    <section id="inventory" className="py-20 relative border-t border-neutral-200/60 dark:border-white/5">
      <div className="w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold">
                CURATED ATELIER // {INVENTORY.length} CARS FOR SALE
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950 dark:text-white tracking-tight">
              Featured Fleet.
            </h2>
          </div>

          {/* Model Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-100/70 dark:bg-white/[0.03] overflow-x-auto">
            {INVENTORY.map((item) => {
              const isSelected = activeModel.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveModel(item)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white text-neutral-950 dark:bg-neutral-800 dark:text-white shadow-sm"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {item.name.replace("TORQ ", "")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Inventory Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModel.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-neutral-200/80 dark:border-white/10 bg-white dark:bg-neutral-950/60 p-6 sm:p-10 shadow-xl backdrop-blur-md"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Price & Highlights */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider mb-3 ${activeModel.statusColor}`}>
                    {activeModel.status}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl font-black text-neutral-950 dark:text-white tracking-tight">
                    {activeModel.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-display font-black text-neutral-950 dark:text-white">
                      {activeModel.price}
                    </span>
                    <span className="text-xs text-neutral-500 font-medium">
                      {activeModel.leasing}
                    </span>
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-4 gap-2 py-4 border-y border-neutral-200/80 dark:border-white/10 text-center">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-0.5">
                      0–60 MPH
                    </span>
                    <span className="text-lg sm:text-xl font-display font-bold text-neutral-900 dark:text-white">
                      {activeModel.specs.zeroToSixty}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-0.5">
                      OUTPUT
                    </span>
                    <span className="text-lg sm:text-xl font-display font-bold text-neutral-900 dark:text-white">
                      {activeModel.specs.horsePower}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-0.5">
                      RANGE
                    </span>
                    <span className="text-lg sm:text-xl font-display font-bold text-neutral-900 dark:text-white">
                      {activeModel.specs.range}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-0.5">
                      V-MAX
                    </span>
                    <span className="text-lg sm:text-xl font-display font-bold text-neutral-900 dark:text-white">
                      {activeModel.specs.topSpeed}
                    </span>
                  </div>
                </div>

                {/* Color & Trim */}
                <div className="text-xs space-y-1 text-neutral-600 dark:text-neutral-400 font-medium">
                  <div><strong className="text-neutral-900 dark:text-white">Finish:</strong> {activeModel.exterior}</div>
                  <div><strong className="text-neutral-900 dark:text-white">Interior:</strong> {activeModel.interior}</div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2">
                  {activeModel.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-neutral-600 dark:text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onOpenReserve}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    <span>Purchase or Reserve</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <Link
                    href={`/configurator?model=${activeModel.id}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold tracking-wider uppercase border border-neutral-300 dark:border-white/15 hover:border-neutral-900 dark:hover:border-white text-neutral-800 dark:text-neutral-200 transition-colors"
                  >
                    <span>Custom Build</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Real Photorealistic Car Image */}
              <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-neutral-200/80 dark:border-white/10 bg-neutral-950 group/img">
                <img
                  src={activeModel.image}
                  alt={activeModel.name}
                  className="w-full h-full object-cover object-center group-hover/img:scale-103 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-black/60 text-white backdrop-blur-md border border-white/20">
                    {activeModel.specs.horsePower} • {activeModel.specs.zeroToSixty}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/90 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
                  <span>VIN: {activeModel.vin}</span>
                  <span className="text-emerald-400 font-semibold">WORLDWIDE FREIGHT</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Complete Showroom Inventory & Categorized Sales Fleet */}
        <InventoryGallery onSelectVehicle={onOpenReserve} />
      </div>
    </section>
  );
}

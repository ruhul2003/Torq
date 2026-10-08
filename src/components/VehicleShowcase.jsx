"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Tag } from "lucide-react";

const INVENTORY = [
  {
    id: "apex-gt",
    name: "TORQ Apex Hyper GT",
    status: "IN SHOWROOM // READY TO SHIP",
    statusColor: "text-emerald-500 bg-emerald-500/10",
    price: "$245,000",
    leasing: "Or $2,850/mo with 15% down",
    specs: {
      zeroToSixty: "1.78s",
      horsePower: "1,450 HP",
      range: "620 mi",
      topSpeed: "235 MPH",
    },
    exterior: "Satin Stealth Obsidian",
    interior: "Nordic Ceramic White Alcantara",
    highlights: [
      "Immediate title assignment & worldwide enclosed freight",
      "Factory 5-year unlimited powertrain & battery warranty",
      "Complimentary private track orientation day included",
    ],
  },
  {
    id: "stratos-gt",
    name: "TORQ Stratos Grand Coupé",
    status: "AVAILABLE // 3 UNITS IN STOCK",
    statusColor: "text-sky-500 bg-sky-500/10",
    price: "$185,000",
    leasing: "Or $2,150/mo with 15% down",
    specs: {
      zeroToSixty: "2.18s",
      horsePower: "1,180 HP",
      range: "660 mi",
      topSpeed: "210 MPH",
    },
    exterior: "Liquid Kinetic Silver",
    interior: "Tan Full-Grain Aniline Leather",
    highlights: [
      "Executive 4-seat configuration with biometric massage",
      "Electrochromic panoramic glass canopy",
      "Dual-chamber active road-scanning air suspension",
    ],
  },
  {
    id: "phantom-nero",
    name: "TORQ Phantom Nero",
    status: "LIMITED 1 OF 25 WORLDWIDE",
    statusColor: "text-amber-500 bg-amber-500/10",
    price: "$320,000",
    leasing: "Bespoke Cash / Crypto Wire",
    specs: {
      zeroToSixty: "1.69s",
      horsePower: "1,600 HP",
      range: "600 mi",
      topSpeed: "248 MPH",
    },
    exterior: "Exposed Matte Carbon Weave",
    interior: "Blackened Titanium & Hand-Stitched Suede",
    highlights: [
      "Individual chassis plaque & numbered build ledger",
      "Center-lock magnesium wheels with carbon-ceramic brakes",
      "Numbered Torq collector timepiece included with delivery",
    ],
  },
  {
    id: "monolith",
    name: "TORQ Monolith Cyber-SUV",
    status: "IN SHOWROOM // READY TO SHIP",
    statusColor: "text-emerald-500 bg-emerald-500/10",
    price: "$165,000",
    leasing: "Or $1,890/mo with 15% down",
    specs: {
      zeroToSixty: "2.90s",
      horsePower: "1,050 HP",
      range: "580 mi",
      topSpeed: "185 MPH",
    },
    exterior: "Brushed Ballistic Stainless Alloy",
    interior: "Modular Waterproof Tactical Leather",
    highlights: [
      "14-inch variable air suspension & tank-turn agility",
      "11,500 lbs towing with integrated 19.2kW power export",
      "Tri-motor heavy duty all-terrain torque vectoring",
    ],
  },
];

export default function VehicleShowcase({ onOpenReserve }) {
  const [activeModel, setActiveModel] = useState(INVENTORY[0]);

  return (
    <section id="inventory" className="py-20 relative border-t border-neutral-200/60 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-500 font-semibold block mb-2">
              CURATED SHOWROOM
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950 dark:text-white tracking-tight">
              Featured Luxury Inventory.
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
                  <div><strong className="text-neutral-900 dark:text-white">Upholstery:</strong> {activeModel.interior}</div>
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

              {/* Right Column: Minimalist Showroom Silhouette Card */}
              <div className="lg:col-span-6 p-8 rounded-2xl bg-neutral-100/70 dark:bg-black/50 border border-neutral-200/60 dark:border-white/5 flex flex-col items-center justify-center text-center">
                <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-6">
                  OFFICIAL SHOWROOM VERIFIED
                </div>

                <div className="w-full max-w-sm aspect-[16/9] border border-dashed border-neutral-300 dark:border-neutral-800 rounded-xl flex flex-col items-center justify-center p-6 bg-white/40 dark:bg-white/[0.02]">
                  <span className="font-display font-black text-2xl sm:text-3xl text-neutral-950 dark:text-white">
                    {activeModel.name}
                  </span>
                  <span className="text-xs font-mono text-sky-500 font-bold mt-1">
                    {activeModel.price}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 mt-2">
                    VIN VERIFIED // CLEAN CERTIFICATE OF TITLE
                  </span>
                </div>

                <div className="mt-6 flex items-center justify-between w-full max-w-sm text-xs font-mono text-neutral-500">
                  <span>LOCATION: ATELIER 01</span>
                  <span>GLOBAL FREIGHT READY</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

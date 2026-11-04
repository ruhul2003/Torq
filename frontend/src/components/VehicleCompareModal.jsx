"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRightLeft, Trophy, CheckCircle, Zap, Shield, Sparkles } from "lucide-react";

const COMPARISON_VEHICLES = [
  {
    id: "apex-gt",
    name: "TORQ Apex GT Monocoque",
    tagline: "The Quad-Motor Electric Hyper-GT",
    price: "$285,000",
    hp: 1250,
    zeroToSixty: 1.88,
    topSpeed: 236,
    range: 480,
    weight: 1680,
    dragCd: 0.21,
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "stradale-v12",
    name: "TORQ Stradale V12 Corsa",
    tagline: "Naturally Aspirated 6.5L Symphony",
    price: "$340,000",
    hp: 840,
    zeroToSixty: 2.65,
    topSpeed: 218,
    range: 360,
    weight: 1420,
    dragCd: 0.28,
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "phantom-electric",
    name: "TORQ Phantom Touring",
    tagline: "Bespoke Long-Range Luxury Grand Tourer",
    price: "$240,000",
    hp: 920,
    zeroToSixty: 2.15,
    topSpeed: 205,
    range: 540,
    weight: 1950,
    dragCd: 0.22,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function VehicleCompareModal({ isOpen, onClose }) {
  const [selectedA, setSelectedA] = useState(COMPARISON_VEHICLES[0]);
  const [selectedB, setSelectedB] = useState(COMPARISON_VEHICLES[1]);

  if (!isOpen) return null;

  const metrics = [
    { label: "0-60 MPH", valA: `${selectedA.zeroToSixty}s`, valB: `${selectedB.zeroToSixty}s`, winner: selectedA.zeroToSixty < selectedB.zeroToSixty ? "A" : "B" },
    { label: "Peak Output", valA: `${selectedA.hp} HP`, valB: `${selectedB.hp} HP`, winner: selectedA.hp > selectedB.hp ? "A" : "B" },
    { label: "Top Speed", valA: `${selectedA.topSpeed} MPH`, valB: `${selectedB.topSpeed} MPH`, winner: selectedA.topSpeed > selectedB.topSpeed ? "A" : "B" },
    { label: "Range Estimate", valA: `${selectedA.range} mi`, valB: `${selectedB.range} mi`, winner: selectedA.range > selectedB.range ? "A" : "B" },
    { label: "Curb Weight", valA: `${selectedA.weight} kg`, valB: `${selectedB.weight} kg`, winner: selectedA.weight < selectedB.weight ? "A" : "B" },
    { label: "Aero Drag (Cd)", valA: `${selectedA.dragCd}`, valB: `${selectedB.dragCd}`, winner: selectedA.dragCd < selectedB.dragCd ? "A" : "B" },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl rounded-3xl bg-neutral-900 border border-white/10 text-white shadow-2xl p-6 sm:p-8 my-auto"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400 mb-2">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>HEAD-TO-HEAD BENCHMARK MATRIX</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold">
              Hypercar Technical Comparison
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              Select two models to evaluate powertrain output, acceleration, and aerodynamic metrics.
            </p>
          </div>

          {/* Vehicle Selectors Header */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
            {/* Slot A */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <label className="text-[11px] font-mono text-neutral-400 uppercase mb-2 block">
                PRIMARY MODEL
              </label>
              <select
                value={selectedA.id}
                onChange={(e) => setSelectedA(COMPARISON_VEHICLES.find((v) => v.id === e.target.value))}
                className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-semibold cursor-pointer outline-none focus:border-sky-500 mb-3"
              >
                {COMPARISON_VEHICLES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
              <img
                src={selectedA.image}
                alt={selectedA.name}
                className="w-full h-36 object-cover rounded-xl border border-white/10"
              />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-neutral-400">{selectedA.tagline}</span>
                <span className="text-sm font-bold text-sky-400 font-mono">{selectedA.price}</span>
              </div>
            </div>

            {/* Slot B */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
              <label className="text-[11px] font-mono text-neutral-400 uppercase mb-2 block">
                BENCHMARK CONTENDER
              </label>
              <select
                value={selectedB.id}
                onChange={(e) => setSelectedB(COMPARISON_VEHICLES.find((v) => v.id === e.target.value))}
                className="w-full bg-neutral-800 border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-semibold cursor-pointer outline-none focus:border-sky-500 mb-3"
              >
                {COMPARISON_VEHICLES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
              <img
                src={selectedB.image}
                alt={selectedB.name}
                className="w-full h-36 object-cover rounded-xl border border-white/10"
              />
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-neutral-400">{selectedB.tagline}</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">{selectedB.price}</span>
              </div>
            </div>
          </div>

          {/* Comparison Metrics Grid */}
          <div className="space-y-3">
            {metrics.map((m, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 items-center p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
              >
                {/* Val A */}
                <div className="col-span-4 flex items-center gap-2">
                  <span className={`text-sm sm:text-base font-bold font-mono ${m.winner === "A" ? "text-sky-400" : "text-neutral-400"}`}>
                    {m.valA}
                  </span>
                  {m.winner === "A" && (
                    <Trophy className="w-3.5 h-3.5 text-sky-400" />
                  )}
                </div>

                {/* Metric Label */}
                <div className="col-span-4 text-center">
                  <span className="text-xs font-mono tracking-wider text-neutral-400 uppercase font-semibold">
                    {m.label}
                  </span>
                </div>

                {/* Val B */}
                <div className="col-span-4 flex items-center justify-end gap-2 text-right">
                  {m.winner === "B" && (
                    <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  <span className={`text-sm sm:text-base font-bold font-mono ${m.winner === "B" ? "text-emerald-400" : "text-neutral-400"}`}>
                    {m.valB}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Action */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Done Comparing
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

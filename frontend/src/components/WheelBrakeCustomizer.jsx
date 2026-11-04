"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Disc, Check, Sparkles, Layers } from "lucide-react";

const WHEELS = [
  { id: "carbon-aero", name: "21\" Aeroblade Carbon", finish: "High-Gloss Carbon Fiber", weight: "-4.2 kg/corner" },
  { id: "monoblock", name: "20\" Monoblock Forged", finish: "Satin Titanium", weight: "-3.8 kg/corner" },
  { id: "motorsport", name: "21\" GT Motorsport Spoke", finish: "Satin Bronze", weight: "-4.0 kg/corner" },
];

const CALIPERS = [
  { id: "acid", name: "Acid Green GT", hex: "#84cc16" },
  { id: "scuderia", name: "Rosso Scuderia", hex: "#dc2626" },
  { id: "cyan", name: "Torq Cyber Cyan", hex: "#38bdf8" },
  { id: "gold", name: "Anodized Racing Gold", hex: "#eab308" },
];

export default function WheelBrakeCustomizer() {
  const [activeWheel, setActiveWheel] = useState(WHEELS[0]);
  const [activeCaliper, setActiveCaliper] = useState(CALIPERS[0]);

  return (
    <section className="py-20 bg-neutral-900/40 text-white relative border-b border-white/10">
      <div className="w-[95%] max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 text-xs font-mono text-lime-400 mb-3">
              <Disc className="w-3.5 h-3.5" />
              <span>CHASSIS CORNER RUNNING GEAR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Forged Wheel & Caliper Studio
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Configure unsprung mass reduction with lightweight aerospace forged aluminum wheels and 10-piston Brembo monoblock calipers.
            </p>
          </div>
        </div>

        {/* Studio Box */}
        <div className="rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visualizer */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center relative p-8 bg-black/50 rounded-2xl border border-white/10 h-80 overflow-hidden">
              <div className="relative w-56 h-56 flex items-center justify-center">
                {/* Brake Rotor Disc */}
                <div className="w-48 h-48 rounded-full border-4 border-dashed border-neutral-600 bg-neutral-800 flex items-center justify-center shadow-inner relative">
                  {/* Caliper */}
                  <motion.div
                    className="absolute top-2 right-2 w-16 h-12 rounded-xl shadow-lg flex items-center justify-center font-bold text-[9px] text-black font-mono"
                    style={{ backgroundColor: activeCaliper.hex }}
                    animate={{ scale: [0.95, 1] }}
                    transition={{ duration: 0.2 }}
                  >
                    TORQ
                  </motion.div>
                  {/* Hub Center */}
                  <div className="w-16 h-16 rounded-full bg-neutral-900 border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white">
                    T
                  </div>
                </div>

                {/* Outer Wheel Rim Ring */}
                <div className="absolute inset-0 rounded-full border-4 border-white/20 pointer-events-none" />
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs font-mono text-neutral-400 uppercase">
                  ACTIVE COMBINATION:
                </span>
                <div className="text-sm font-bold text-white">
                  {activeWheel.name} with {activeCaliper.name} Calipers
                </div>
              </div>
            </div>

            {/* Config Selectors */}
            <div className="lg:col-span-5 space-y-6">
              {/* Wheel Selector */}
              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase block mb-3">
                  WHEEL PROFILE & FINISH
                </label>
                <div className="space-y-2">
                  {WHEELS.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setActiveWheel(w)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        activeWheel.id === w.id
                          ? "bg-white/10 border-white shadow-md"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{w.name}</div>
                        <div className="text-[11px] text-neutral-400">{w.finish}</div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">{w.weight}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Caliper Color Selector */}
              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase block mb-3">
                  CARBON CERAMIC CALIPER COLOR
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CALIPERS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setActiveCaliper(c)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        activeCaliper.id === c.id
                          ? "bg-white/15 border-white shadow-md ring-1 ring-white/50"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/30 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-xs font-medium text-white truncate">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

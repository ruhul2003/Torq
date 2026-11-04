"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye, Check, Palette } from "lucide-react";

const LEATHERS = [
  { id: "tan", name: "Saddle Tan Nappa", color: "#92400e", preview: "Warm cognac hand-stitched hide" },
  { id: "obsidian", name: "Obsidian Alcantara", color: "#18181b", preview: "Ultra-matte race lightweight suede" },
  { id: "crema", name: "Crema Magnolia", color: "#fef3c7", preview: "Perforated ventilated white hide" },
  { id: "crimson", name: "Rosso Corsa Suede", color: "#991b1b", preview: "Italian racing crimson leather" },
];

const TRIMS = [
  { id: "carbon", name: "Exposed Matte Carbon", texture: "bg-neutral-900 border-white/20" },
  { id: "walnut", name: "Open-Pore Dark Walnut", texture: "bg-amber-950/60 border-amber-900/40" },
  { id: "titanium", name: "Brushed Monoblock Titanium", texture: "bg-zinc-700/60 border-zinc-500/40" },
];

export default function CabinMaterialStudio() {
  const [activeLeather, setActiveLeather] = useState(LEATHERS[0]);
  const [activeTrim, setActiveTrim] = useState(TRIMS[0]);
  const [starlightEnabled, setStarlightEnabled] = useState(true);

  return (
    <section className="py-20 bg-neutral-900/50 text-white relative border-b border-white/10 overflow-hidden">
      <div className="w-[95%] max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 mb-3">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>TORQ ATELIER BESPOKE INTERIOR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Bespoke Cockpit Atelier
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Curate handcrafted upholstery hides, aerospace carbon trim weaves, and customizable fiber-optic starlight headliner constellations.
            </p>
          </div>

          {/* Starlight toggle */}
          <button
            type="button"
            onClick={() => setStarlightEnabled(!starlightEnabled)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              starlightEnabled
                ? "bg-amber-400 text-black shadow-lg shadow-amber-400/25"
                : "bg-white/10 text-white border border-white/20"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Starlight Headliner {starlightEnabled ? "Active" : "Off"}</span>
          </button>
        </div>

        {/* Studio Viewport */}
        <div className="rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden">
          {/* Animated Starlight Fiber Optics ceiling overlay */}
          {starlightEnabled && (
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-80">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_8px_#ffffff]"
                  style={{
                    top: `${Math.random() * 85}%`,
                    left: `${Math.random() * 95}%`,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.3],
                    scale: [0.8, 1.4, 0.8],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5 + Math.random() * 2.5,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">
            {/* Visual Cockpit Mockup */}
            <div className="lg:col-span-7 relative h-72 sm:h-84 rounded-2xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
                alt="Interior Cabin"
                className="w-full h-full object-cover filter brightness-90 contrast-110"
              />
              <div
                className="absolute inset-0 mix-blend-color opacity-40 transition-colors duration-500 pointer-events-none"
                style={{ backgroundColor: activeLeather.color }}
              />

              {/* Inlay badge */}
              <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-xs">
                <div className="font-semibold text-white">{activeLeather.name}</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Trim: {activeTrim.name}</div>
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-5 space-y-6">
              {/* Leathers */}
              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase block mb-3">
                  PRIMARY UPHOLSTERY SELECTION
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {LEATHERS.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setActiveLeather(l)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        activeLeather.id === l.id
                          ? "bg-white/15 border-amber-400/80 shadow-md ring-1 ring-amber-400/50"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/30 shrink-0"
                        style={{ backgroundColor: l.color }}
                      />
                      <span className="text-xs font-medium text-white truncate">{l.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trims */}
              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase block mb-3">
                  DASHBOARD & CONSOLE INLAYS
                </label>
                <div className="space-y-2">
                  {TRIMS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActiveTrim(t)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        activeTrim.id === t.id
                          ? "bg-white/15 border-white shadow-md"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <span className="text-xs font-medium text-white">{t.name}</span>
                      {activeTrim.id === t.id && (
                        <Check className="w-3.5 h-3.5 text-amber-400" />
                      )}
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

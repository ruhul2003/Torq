"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Radio, Sliders, Music, Headphones } from "lucide-react";

const SYSTEMS = [
  { id: "burmester", name: "Burmester High-End 4D", channels: "31 Speakers", wattage: "1,750 Watts", soundstage: "Immersive 3D Spatial" },
  { id: "meridian", name: "Meridian Trifield 3D", channels: "24 Speakers", wattage: "1,400 Watts", soundstage: "Studio Reference Audio" },
  { id: "torq", name: "TORQ Bespoke Electro-Acoustic", channels: "28 Exciters", wattage: "1,600 Watts", soundstage: "Active Noise-Cancelling Monocoque" },
];

export default function AcousticCabinVisualizer() {
  const [activeSystem, setActiveSystem] = useState(SYSTEMS[0]);
  const [soundMode, setSoundMode] = useState("spatial");

  return (
    <section className="py-20 bg-neutral-900/40 text-white relative border-b border-white/10">
      <div className="w-[95%] max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400 mb-3">
              <Headphones className="w-3.5 h-3.5" />
              <span>SPATIAL ACOUSTIC ARCHITECTURE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Cockpit Acoustic Mastering
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              High-fidelity cabin mastering with in-seat subwoofers, active headrest surround sound, and carbon composite acoustic damping.
            </p>
          </div>
        </div>

        {/* Visualizer Frame */}
        <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-10 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Equalizer Spectrum Bars */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col justify-between h-72">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-white/10 pb-3">
                <span className="flex items-center gap-2">
                  <Music className="w-3.5 h-3.5 text-indigo-400" />
                  31-BAND 32-BIT 192KHZ DSP SPECTRUM
                </span>
                <span className="text-indigo-400 font-bold">LOSSLESS FLAC</span>
              </div>

              {/* Spectrum Graphic Bars */}
              <div className="flex items-end justify-between gap-1.5 h-40 pt-4">
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-indigo-600 via-sky-400 to-cyan-300 rounded-t-sm"
                    animate={{
                      height: [
                        `${20 + (i % 6) * 12}%`,
                        `${60 + (i % 4) * 10}%`,
                        `${30 + (i % 5) * 14}%`,
                      ],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8 + (i % 7) * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <div className="flex justify-between text-[10px] font-mono text-neutral-500 pt-2 border-t border-white/5">
                <span>20 Hz Sub</span>
                <span>1 kHz Vocal</span>
                <span>20 kHz Treble</span>
              </div>
            </div>

            {/* Audio Systems & Modes */}
            <div className="lg:col-span-5 space-y-4">
              <label className="text-xs font-mono text-neutral-400 uppercase block">
                AUDIOPHILE SOUND SYSTEM SPEC
              </label>
              <div className="space-y-2.5">
                {SYSTEMS.map((sys) => (
                  <button
                    key={sys.id}
                    type="button"
                    onClick={() => setActiveSystem(sys)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      activeSystem.id === sys.id
                        ? "bg-white/15 border-indigo-400/80 shadow-md ring-1 ring-indigo-400/40"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-white">{sys.name}</div>
                      <div className="text-xs text-neutral-400 mt-0.5">{sys.soundstage}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-indigo-400 font-mono">{sys.wattage}</div>
                      <div className="text-[10px] text-neutral-400">{sys.channels}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

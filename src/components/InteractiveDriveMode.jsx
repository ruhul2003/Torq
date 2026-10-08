"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Flame, Compass, Zap, Sliders, ChevronRight } from "lucide-react";

const DRIVE_MODES = [
  {
    id: "stealth",
    name: "STEALTH",
    tagline: "Acoustic cruising and maximum range efficiency",
    icon: Compass,
    accent: "text-neutral-400 dark:text-neutral-300",
    borderActive: "border-neutral-800 dark:border-white",
    torqueBias: { front: 30, rear: 70 },
    topSpeed: "155 MPH",
    damping: "Comfort Adaptive",
    soundProfile: "Acoustic Silence",
    efficiency: "96.4%",
    aeroWing: "0° (Retracted)",
  },
  {
    id: "gt",
    name: "GT TOURING",
    tagline: "Cross-continent grand touring with active road-scan air ride",
    icon: Shield,
    accent: "text-sky-500",
    borderActive: "border-sky-500",
    torqueBias: { front: 45, rear: 55 },
    topSpeed: "185 MPH",
    damping: "Dynamic Matrix",
    soundProfile: "Harmonic Tone",
    efficiency: "93.8%",
    aeroWing: "8° (Low Drag)",
  },
  {
    id: "apex",
    name: "APEX TRACK",
    tagline: "Sub-millisecond yaw control with aggressive downforce",
    icon: Flame,
    accent: "text-amber-500",
    borderActive: "border-amber-500",
    torqueBias: { front: 20, rear: 80 },
    topSpeed: "220 MPH",
    damping: "Stiffened Magnetic Track",
    soundProfile: "Inverter Pulse",
    efficiency: "88.2%",
    aeroWing: "26° (Max Downforce)",
  },
  {
    id: "overtorq",
    name: "OVERTORQ",
    tagline: "Uncapped 1,450+ HP full-voltage launch protocol",
    icon: Zap,
    accent: "text-cyan-400",
    borderActive: "border-cyan-400",
    torqueBias: { front: 50, rear: 50 },
    topSpeed: "235+ MPH",
    damping: "Launch Optimized",
    soundProfile: "Sonic Resonance",
    efficiency: "84.5%",
    aeroWing: "Active Airbrake",
  },
];

export default function InteractiveDriveMode() {
  const [selectedMode, setSelectedMode] = useState(DRIVE_MODES[2]); // Default to APEX TRACK

  return (
    <section id="vectoring" className="py-24 relative border-t border-neutral-200/60 dark:border-white/5">
      <div className="w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-sky-500 uppercase mb-3">
              <Sliders className="w-3.5 h-3.5" />
              <span>DYNAMIC KINETIC MODES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 dark:text-white tracking-tight">
              Attitude Calibration.
            </h2>
          </div>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-sm text-sm leading-relaxed">
            Sub-millisecond recalibration. Air suspension, torque bias, and aero profile re-vector immediately.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {DRIVE_MODES.map((mode) => {
            const isSelected = selectedMode.id === mode.id;
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSelectedMode(mode)}
                className={`relative text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-lg"
                    : "bg-white/60 dark:bg-white/[0.02] border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 text-neutral-700 dark:text-neutral-300"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className={`w-5 h-5 ${isSelected ? "text-sky-400 dark:text-sky-600" : "text-neutral-400"}`} />
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-70">
                    {mode.id.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base tracking-wide mb-1">
                  {mode.name}
                </h3>
                <p className="text-xs opacity-75 line-clamp-2">
                  {mode.tagline}
                </p>

                {isSelected && (
                  <motion.div
                    layoutId="activeDriveModeRing"
                    className="absolute -inset-[1px] rounded-xl border-2 border-sky-400 pointer-events-none"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Real-time Dynamic Telemetry Box */}
        <motion.div
          key={selectedMode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Torque Split Visualizer */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                  TORQUE DISTRIBUTION SPLIT
                </span>
                <span className="text-xs font-mono font-semibold text-neutral-900 dark:text-white">
                  {selectedMode.torqueBias.front}% F / {selectedMode.torqueBias.rear}% R
                </span>
              </div>

              {/* Bias Bar with smooth framer motion */}
              <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden flex p-0.5">
                <motion.div
                  initial={false}
                  animate={{ width: `${selectedMode.torqueBias.front}%` }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="h-full bg-sky-500 rounded-l-full relative group"
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold text-white">
                    FRONT
                  </span>
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{ width: `${selectedMode.torqueBias.rear}%` }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="h-full bg-neutral-900 dark:bg-white rounded-r-full relative group"
                >
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold text-white dark:text-black">
                    REAR
                  </span>
                </motion.div>
              </div>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Bi-directional silicon carbide gate drivers cycle at 160 kHz to vary motor torque across individual wheels without mechanical differentials or friction loss.
              </p>
            </div>

            {/* Spec Matrix */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-neutral-200/60 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block mb-1">
                  V-MAX CEILING
                </span>
                <span className="text-lg sm:text-xl font-display font-bold text-neutral-900 dark:text-white">
                  {selectedMode.topSpeed}
                </span>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200/60 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block mb-1">
                  DAMPING PROFILE
                </span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white block mt-1">
                  {selectedMode.damping}
                </span>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200/60 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block mb-1">
                  ACTIVE AERO WING
                </span>
                <span className="text-sm font-semibold text-neutral-900 dark:text-white block mt-1">
                  {selectedMode.aeroWing}
                </span>
              </div>

              <div className="p-4 rounded-xl border border-neutral-200/60 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]">
                <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block mb-1">
                  THERMAL EFFICIENCY
                </span>
                <span className="text-lg sm:text-xl font-display font-bold text-emerald-600 dark:text-emerald-400">
                  {selectedMode.efficiency}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

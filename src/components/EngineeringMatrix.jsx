"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, ShieldCheck, Wind, Layers, ArrowRight, Check } from "lucide-react";

const PILLARS = [
  {
    id: "inverters",
    number: "01",
    title: "Silicon-Carbide Inverter Topology",
    summary: "160 kHz switching speed delivering 99.2% electrical power transfer efficiency.",
    icon: Cpu,
    details: [
      "Gallium-Nitride & Silicon-Carbide MOSFET hybrid gate drivers",
      "Liquid-jacket direct micro-channel die cooling",
      "Reduces high-load thermal throttling by 68% compared to standard EV inverters",
      "Enables continuous 20-minute maximum track sessions without derating",
    ],
    metric: "99.2%",
    metricLabel: "Power Transfer Efficiency",
  },
  {
    id: "battery",
    number: "02",
    title: "Structural Solid-State Core",
    summary: "Cell-to-chassis structural integration yielding 54,000 Nm/degree torsional stiffness.",
    icon: Layers,
    details: [
      "Non-flammable ceramic solid electrolyte chemistry",
      "450 Wh/kg gravimetric pack-level energy density",
      "Functions as an integrated bottom shear web, eliminating redundant housing weight",
      "3,000+ full high-power charge cycles with under 4% degradation",
    ],
    metric: "54k",
    metricLabel: "Nm/deg Torsional Rigidity",
  },
  {
    id: "aero",
    number: "03",
    title: "Active Venturi Dynamics",
    summary: "Sub-0.198 Cd drag coefficient combined with 850 lbs of high-speed downforce.",
    icon: Wind,
    details: [
      "Adaptive front underbody venturi flaps that open during high-speed cornering",
      "Twin-element dynamic carbon rear spoiler with integrated airbrake deployment",
      "Virtual boundary-layer air curtain around front and rear wheel housings",
      "Laser-trimmed aerodynamic underfloor entirely sealed from radiator to rear diffuser",
    ],
    metric: "0.198",
    metricLabel: "Drag Coefficient (Cd)",
  },
  {
    id: "os",
    number: "04",
    title: "TorqOS Deterministic Kernel",
    summary: "Sub-millisecond vehicle operating system computing 10,000 state checks per second.",
    icon: ShieldCheck,
    details: [
      "Deterministic microkernel architecture written in bare-metal Rust and C++",
      "Unified telemetry backbone linking LiDAR, radar, cameras, and motor gate drivers",
      "Instantaneous yaw angle correction before driver-perceived slip occurs",
      "Over-the-air firmware updates with dual-redundant rollback partitions",
    ],
    metric: "0.1ms",
    metricLabel: "State Loop Reaction Time",
  },
];

export default function EngineeringMatrix() {
  const [activePillar, setActivePillar] = useState(PILLARS[0]);

  return (
    <section id="engineering" className="py-24 relative border-t border-neutral-200/60 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-500 block mb-3">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 dark:text-white tracking-tight">
              Pillars of Pure Precision.
            </h2>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-md text-sm leading-relaxed">
            Every millimeter and transistor is stripped of ornament and calibrated for mechanical purity, thermal headroom, and longevity.
          </p>
        </div>

        {/* 4 Architectural Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {PILLARS.map((pillar) => {
            const isSelected = activePillar.id === pillar.id;
            const Icon = pillar.icon;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillar(pillar)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-xl scale-[1.02]"
                    : "bg-white/70 dark:bg-white/[0.02] border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 text-neutral-800 dark:text-neutral-200"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold opacity-60">
                      // {pillar.number}
                    </span>
                    <Icon className={`w-5 h-5 ${isSelected ? "text-sky-400 dark:text-sky-600" : "text-neutral-400"}`} />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs opacity-75 leading-relaxed line-clamp-3">
                    {pillar.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-current/10 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-display font-bold">{pillar.metric}</span>
                    <span className="text-[10px] font-mono block opacity-60 uppercase">{pillar.metricLabel}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Expanded Details Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="p-8 sm:p-10 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/90 dark:bg-neutral-950/70 shadow-lg backdrop-blur-md"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4">
                <span className="text-xs font-mono uppercase text-sky-500 font-semibold tracking-wider">
                  DEEP SPECIFICATION // {activePillar.number}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white mt-1 mb-3">
                  {activePillar.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {activePillar.summary}
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activePillar.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-neutral-200/60 dark:border-white/5 bg-neutral-50/60 dark:bg-white/[0.01] flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

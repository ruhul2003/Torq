"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, RefreshCw, Zap, Compass, CheckCircle2 } from "lucide-react";

const SCENARIOS = [
  {
    id: "apex-turn",
    title: "Apex Cornering (Right Turn)",
    description: "Outside rear wheel generates rotational yaw torque while inside front trims understeer.",
    motors: {
      fl: { torque: 45, kw: 165 },
      fr: { torque: 15, kw: 55 },
      rl: { torque: 98, kw: 360 },
      rr: { torque: 20, kw: 75 },
    },
    chassisYaw: "1.42 G Lateral",
    responseLatency: "0.4 ms",
  },
  {
    id: "launch",
    title: "Max Launch Control",
    description: "All 4 silicon-carbide inverters synchronize simultaneously to the maximum tire adhesion limit.",
    motors: {
      fl: { torque: 95, kw: 345 },
      fr: { torque: 95, kw: 345 },
      rl: { torque: 100, kw: 370 },
      rr: { torque: 100, kw: 370 },
    },
    chassisYaw: "1.65 G Longitudinal",
    responseLatency: "0.2 ms",
  },
  {
    id: "low-mu",
    title: "Ice & Hydroplane Recovery",
    description: "Torq-OS detects loss of micro-traction on the right flank, shunting instant power to the left wheels.",
    motors: {
      fl: { torque: 85, kw: 310 },
      fr: { torque: 10, kw: 35 },
      rl: { torque: 90, kw: 330 },
      rr: { torque: 15, kw: 50 },
    },
    chassisYaw: "Zero Slip Vector",
    responseLatency: "0.3 ms",
  },
];

export default function PowertrainVectoring() {
  const [activeScenario, setActiveScenario] = useState(SCENARIOS[0]);

  return (
    <section id="powertrain" className="py-24 relative overflow-hidden bg-neutral-50/60 dark:bg-[#07090D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-600 dark:text-sky-400 text-xs font-mono uppercase tracking-widest mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>NEURAL TORQUE ARCHITECTURE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight mb-4">
            Independent 4-Wheel Torque Vectoring.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Eliminating physical driveshafts and heavy mechanical differentials. Each wheel is propelled by its own dedicated silicon-carbide inverter motor capable of independent clockwise and counter-clockwise torque at 10,000Hz.
          </p>
        </div>

        {/* Interactive Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls & Scenario Picker */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-2">
              SIMULATE DYNAMIC DRIVING SCENARIOS
            </span>

            {SCENARIOS.map((scenario) => {
              const isSelected = activeScenario.id === scenario.id;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setActiveScenario(scenario)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-white dark:bg-neutral-900 border-neutral-900 dark:border-white shadow-md"
                      : "bg-white/40 dark:bg-white/[0.01] border-neutral-200 dark:border-white/5 hover:border-neutral-300 dark:hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-sm text-neutral-900 dark:text-white">
                      {scenario.title}
                    </h3>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-sky-500 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {scenario.description}
                  </p>
                </button>
              );
            })}

            {/* Micro Telemetry Metrics */}
            <div className="p-4 rounded-xl border border-neutral-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] flex items-center justify-between font-mono text-xs">
              <div>
                <span className="text-neutral-400 block text-[10px]">VECTOR LATENCY</span>
                <span className="font-bold text-neutral-900 dark:text-white">{activeScenario.responseLatency}</span>
              </div>
              <div className="w-[1px] h-6 bg-neutral-200 dark:bg-neutral-800" />
              <div>
                <span className="text-neutral-400 block text-[10px]">CORNER FORCE</span>
                <span className="font-bold text-sky-500">{activeScenario.chassisYaw}</span>
              </div>
              <div className="w-[1px] h-6 bg-neutral-200 dark:bg-neutral-800" />
              <div>
                <span className="text-neutral-400 block text-[10px]">INVERTER BAND</span>
                <span className="font-bold text-neutral-900 dark:text-white">160 kHz SiC</span>
              </div>
            </div>
          </div>

          {/* Interactive Top-Down Chassis Visualizer */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-md relative p-8 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white dark:bg-neutral-950/80 backdrop-blur-md shadow-2xl">
              <div className="text-center mb-6">
                <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                  TORQ QUAD-POWERTRAIN // TOPOLOGIC VIEW
                </span>
              </div>

              {/* Chassis Schematic Diagram */}
              <div className="relative w-full aspect-[4/5] flex items-center justify-center">
                {/* Central Battery Pack Outline */}
                <div className="w-36 h-64 rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-100/50 dark:bg-neutral-900/50 flex flex-col items-center justify-center p-3 text-center">
                  <Zap className="w-6 h-6 text-sky-500 mb-1 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-neutral-700 dark:text-neutral-300 uppercase">
                    135 kWh Structural Solid-State Core
                  </span>
                  <span className="text-[9px] font-mono text-neutral-400 mt-1">920V Architecture</span>
                </div>

                {/* FRONT-LEFT WHEEL MOTOR */}
                <motion.div
                  key={`fl-${activeScenario.id}`}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="absolute top-6 left-2 flex flex-col items-center"
                >
                  <div className="w-10 h-18 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-black flex flex-col items-center justify-center font-mono text-[10px] font-bold shadow-md">
                    <span>FL</span>
                    <span className="text-[8px] text-sky-400 dark:text-sky-600">{activeScenario.motors.fl.torque}%</span>
                  </div>
                  <span className="text-[9px] font-mono text-neutral-500 mt-1">{activeScenario.motors.fl.kw} kW</span>
                </motion.div>

                {/* FRONT-RIGHT WHEEL MOTOR */}
                <motion.div
                  key={`fr-${activeScenario.id}`}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="absolute top-6 right-2 flex flex-col items-center"
                >
                  <div className="w-10 h-18 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-black flex flex-col items-center justify-center font-mono text-[10px] font-bold shadow-md">
                    <span>FR</span>
                    <span className="text-[8px] text-sky-400 dark:text-sky-600">{activeScenario.motors.fr.torque}%</span>
                  </div>
                  <span className="text-[9px] font-mono text-neutral-500 mt-1">{activeScenario.motors.fr.kw} kW</span>
                </motion.div>

                {/* REAR-LEFT WHEEL MOTOR */}
                <motion.div
                  key={`rl-${activeScenario.id}`}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="absolute bottom-6 left-2 flex flex-col items-center"
                >
                  <div className="w-10 h-18 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-black flex flex-col items-center justify-center font-mono text-[10px] font-bold shadow-md">
                    <span>RL</span>
                    <span className="text-[8px] text-sky-400 dark:text-sky-600">{activeScenario.motors.rl.torque}%</span>
                  </div>
                  <span className="text-[9px] font-mono text-neutral-500 mt-1">{activeScenario.motors.rl.kw} kW</span>
                </motion.div>

                {/* REAR-RIGHT WHEEL MOTOR */}
                <motion.div
                  key={`rr-${activeScenario.id}`}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="absolute bottom-6 right-2 flex flex-col items-center"
                >
                  <div className="w-10 h-18 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-black flex flex-col items-center justify-center font-mono text-[10px] font-bold shadow-md">
                    <span>RR</span>
                    <span className="text-[8px] text-sky-400 dark:text-sky-600">{activeScenario.motors.rr.torque}%</span>
                  </div>
                  <span className="text-[9px] font-mono text-neutral-500 mt-1">{activeScenario.motors.rr.kw} kW</span>
                </motion.div>

                {/* Vectoring lines connecting to central bus */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-sky-500/40" strokeWidth="1.5" strokeDasharray="3 3">
                  <line x1="60" y1="65" x2="160" y2="150" />
                  <line x1="390" y1="65" x2="280" y2="150" />
                  <line x1="60" y1="360" x2="160" y2="280" />
                  <line x1="390" y1="360" x2="280" y2="280" />
                </svg>
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-white/10 text-center">
                <span className="text-[11px] font-mono text-neutral-400">
                  REAL-TIME TORQUE CORRECTION: <span className="text-emerald-500 font-semibold">SYNCHRONIZED</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

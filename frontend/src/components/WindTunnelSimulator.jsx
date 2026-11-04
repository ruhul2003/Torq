"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wind, Sliders, ShieldCheck, Gauge, ArrowRight } from "lucide-react";

const AERO_MODES = [
  { id: "corsa", name: "Corsa Downforce", cd: 0.31, downforce: 740, balance: "44 : 56", speed: 280, desc: "Maximum wing attack angle for track stability & apex suction." },
  { id: "speed", name: "V-Max Low Drag", cd: 0.20, downforce: 290, balance: "40 : 60", speed: 380, desc: "Active air shutters sealed, rear diffuser trimmed for terminal velocity." },
  { id: "drs", name: "Active DRS Deploy", cd: 0.17, downforce: 180, balance: "38 : 62", speed: 412, desc: "Flap open reduction in induced drag for blistering straight-line overtake." },
];

export default function WindTunnelSimulator() {
  const [activeMode, setActiveMode] = useState(AERO_MODES[0]);
  const [flowSpeed, setFlowSpeed] = useState(250); // km/h

  return (
    <section className="py-20 bg-neutral-950 text-white relative overflow-hidden border-b border-white/10">
      {/* Streamline wind particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-72 rounded-full"
            style={{
              top: `${10 + i * 7.5}%`,
              left: "-30%",
            }}
            animate={{
              x: ["0%", "450%"],
            }}
            transition={{
              duration: Math.max(0.6, 2.5 - flowSpeed / 180),
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.15,
            }}
          />
        ))}
      </div>

      <div className="w-[95%] max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
              <Wind className="w-3.5 h-3.5" />
              <span>CFD WIND TUNNEL & GROUND EFFECT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Aerodynamic Streamline Simulation
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Real-time computational fluid dynamics telemetry showing active wing articulation, drag coefficient, and vortex downforce generation.
            </p>
          </div>

          {/* Mode Selector */}
          <div className="flex flex-wrap gap-2">
            {AERO_MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveMode(mode)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  activeMode.id === mode.id
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                    : "bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10"
                }`}
              >
                {mode.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tunnel Display Viewport */}
        <div className="rounded-3xl border border-white/10 bg-neutral-900/70 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Streamlines View */}
            <div className="lg:col-span-8 relative rounded-2xl bg-black/60 border border-white/10 p-6 h-[340px] flex items-center justify-center overflow-hidden">
              {/* Silhouette outline */}
              <div className="relative w-full max-w-lg h-44 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop"
                  alt="Aero Model"
                  className="w-full h-full object-cover rounded-xl opacity-75 filter grayscale contrast-125"
                />

                {/* Animated Aero Ribbons */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 200">
                  <motion.path
                    d="M 10 120 Q 150 70, 260 85 T 480 70"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeDasharray="8 6"
                    animate={{ strokeDashoffset: [0, -40] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
                  />
                  <motion.path
                    d="M 10 145 Q 180 125, 300 135 T 480 130"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    animate={{ strokeDashoffset: [0, -40] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 0.8 }}
                  />
                  <motion.path
                    d="M 10 90 Q 140 40, 240 45 T 480 50"
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="2"
                    strokeDasharray="10 8"
                    animate={{ strokeDashoffset: [0, -40] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 1.2 }}
                  />
                </svg>

                {/* DRS Active badge */}
                {activeMode.id === "drs" && (
                  <div className="absolute top-2 right-4 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-mono text-[11px] animate-pulse">
                    WING FLAP DELAY: 0.08s
                  </div>
                )}
              </div>

              {/* Tunnel Airspeed slider */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between gap-4 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-neutral-400">TUNNEL SPEED:</span>
                <input
                  type="range"
                  min="100"
                  max="420"
                  value={flowSpeed}
                  onChange={(e) => setFlowSpeed(Number(e.target.value))}
                  className="flex-1 accent-cyan-400 cursor-pointer h-1.5 bg-white/20 rounded"
                />
                <span className="text-xs font-mono font-bold text-cyan-400">{flowSpeed} KM/H</span>
              </div>
            </div>

            {/* Aero Metrics Panel */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="text-[11px] font-mono text-neutral-400 uppercase">
                  DRAG COEFFICIENT
                </div>
                <div className="text-3xl font-display font-extrabold text-white mt-1">
                  Cd {activeMode.cd}
                </div>
                <div className="text-xs text-neutral-400 mt-1">{activeMode.desc}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-mono text-neutral-400">DOWNFORCE</div>
                  <div className="text-xl font-bold text-cyan-400 mt-1">
                    {Math.round((activeMode.downforce * flowSpeed) / 250)} KG
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-mono text-neutral-400">AERO BALANCE</div>
                  <div className="text-xl font-bold text-white mt-1">
                    {activeMode.balance}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono text-neutral-400">GROUND EFFECT CHANNELS</div>
                  <div className="text-sm font-semibold text-emerald-400 mt-0.5">Venturi Tunnels Active</div>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

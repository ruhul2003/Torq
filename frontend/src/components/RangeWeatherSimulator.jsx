"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CloudSnow, Sun, Thermometer, BatteryCharging, Gauge, Wind } from "lucide-react";

export default function RangeWeatherSimulator() {
  const [temp, setTemp] = useState(22); // Celsius
  const [speed, setSpeed] = useState(70); // MPH
  const [climate, setClimate] = useState("normal"); // "off" | "normal" | "max"
  const [wheels, setWheels] = useState("20"); // "20" | "22"

  // Base range calculation
  const baseRange = 480; // miles
  let factor = 1.0;

  // Temperature penalty
  if (temp < 0) factor -= 0.18;
  else if (temp < 10) factor -= 0.08;
  else if (temp > 35) factor -= 0.09;

  // Speed penalty
  if (speed > 70) factor -= ((speed - 70) / 10) * 0.05;
  else factor += ((70 - speed) / 10) * 0.03;

  // Climate penalty
  if (climate === "max") factor -= 0.08;
  if (climate === "off") factor += 0.04;

  // Wheels penalty
  if (wheels === "22") factor -= 0.04;

  const estimatedRange = Math.max(180, Math.round(baseRange * factor));
  const efficiency = Math.round((105 / (estimatedRange * 1.609)) * 1000); // Wh/km approx

  return (
    <section className="py-20 bg-neutral-950 text-white relative border-b border-white/10">
      <div className="w-[95%] max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400 mb-3">
              <BatteryCharging className="w-3.5 h-3.5" />
              <span>CLIMATIC RANGE TELEMETRY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Real-World Range Simulator
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Model climatic temperature extremes, cruising velocities, and cabin HVAC loads to estimate real-world touring radius.
            </p>
          </div>

          {/* Quick Output Pill */}
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-4">
            <div>
              <div className="text-[10px] font-mono text-cyan-300">ESTIMATED RANGE</div>
              <div className="text-3xl font-display font-black text-cyan-400 font-mono">
                {estimatedRange} <span className="text-sm font-normal">MILES</span>
              </div>
            </div>
          </div>
        </div>

        {/* Simulator Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-900/60 p-6 sm:p-10 rounded-3xl border border-white/10 backdrop-blur-xl">
          <div className="lg:col-span-7 space-y-6">
            {/* Ambient Temperature Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-neutral-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                  AMBIENT TEMPERATURE
                </span>
                <span className="text-white font-bold">{temp}°C ({Math.round(temp * 1.8 + 32)}°F)</span>
              </div>
              <input
                type="range"
                min="-15"
                max="45"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                <span>-15°C Subzero Arctic</span>
                <span>22°C Ideal</span>
                <span>45°C Desert Heat</span>
              </div>
            </div>

            {/* Cruising Speed Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono text-neutral-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-sky-400" />
                  CRUISING VELOCITY
                </span>
                <span className="text-white font-bold">{speed} MPH ({Math.round(speed * 1.609)} KM/H)</span>
              </div>
              <input
                type="range"
                min="45"
                max="120"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full accent-sky-400 cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
              />
            </div>

            {/* Climate Control Selection */}
            <div>
              <label className="text-xs font-mono text-neutral-400 block mb-2">
                CABIN CLIMATE COMFORT LOAD
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "off", label: "HVAC Off / Vent" },
                  { id: "normal", label: "21°C Auto" },
                  { id: "max", label: "Max Heat / Defrost" },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setClimate(c.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                      climate === c.id
                        ? "bg-white text-black border-white font-semibold"
                        : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Wheel Size Selection */}
            <div>
              <label className="text-xs font-mono text-neutral-400 block mb-2">
                WHEEL & TIRE GEOMETRY
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setWheels("20")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    wheels === "20"
                      ? "bg-white text-black border-white font-semibold"
                      : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                  }`}
                >
                  20&quot; Forged Aero Blades (Optimal Range)
                </button>
                <button
                  type="button"
                  onClick={() => setWheels("22")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    wheels === "22"
                      ? "bg-white text-black border-white font-semibold"
                      : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                  }`}
                >
                  22&quot; Monoblock Track Spec (-4% Range)
                </button>
              </div>
            </div>
          </div>

          {/* Right Metrics Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-center">
              <div className="text-xs font-mono text-neutral-400">TOUR RADIUS</div>
              <div className="text-5xl font-display font-extrabold text-cyan-400 mt-2 font-mono">
                {Math.round(estimatedRange * 1.609)} <span className="text-lg text-white">KM</span>
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                Equivalent to {estimatedRange} statute miles
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-[10px] font-mono text-neutral-400">ENERGY DENSITY</div>
                <div className="text-lg font-bold text-white mt-1">{efficiency} Wh/km</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-[10px] font-mono text-neutral-400">FAST CHARGE 10-80%</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">16.5 Mins</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

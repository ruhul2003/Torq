"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BatteryCharging, Zap, Gauge, Wind, Thermometer, Disc } from "lucide-react";

export default function RangeCalculator() {
  const [speed, setSpeed] = useState(65);
  const [temperature, setTemperature] = useState(22);
  const [wheels, setWheels] = useState("20-aero"); // '20-aero' or '22-carbon'
  const [climate, setClimate] = useState("eco"); // 'off', 'eco', 'high'

  // Dynamic range computation formula based on physics
  const baseRange = 620; // 620 miles base at 65mph, 22C, 20-aero, eco
  const speedDelta = (speed - 65) * 2.8;
  const tempDelta = temperature < 20 ? (20 - temperature) * 1.5 : (temperature - 20) * 0.8;
  const wheelPenalty = wheels === "22-carbon" ? 32 : 0;
  const climatePenalty = climate === "off" ? -15 : climate === "high" ? 42 : 0;

  const estimatedRange = Math.max(
    380,
    Math.round(baseRange - speedDelta - tempDelta - wheelPenalty - climatePenalty)
  );

  const chargeTimeMinutes = 11;
  const milesInFiveMin = Math.round((estimatedRange * 0.7) / (chargeTimeMinutes / 5));
  const efficiency = Math.round((135000 / estimatedRange)); // Wh/mile for 135kWh pack

  return (
    <section id="telemetry" className="py-24 relative overflow-hidden bg-neutral-50/50 dark:bg-[#080A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-600 dark:text-sky-400 text-xs font-mono uppercase tracking-widest mb-3">
            <BatteryCharging className="w-3.5 h-3.5" />
            <span>REAL-TIME RANGE & 920V TELEMETRY SIMULATOR</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 dark:text-white tracking-tight mb-4">
            Predictive Kinetic Endurance.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Physics-driven range projection tailored to road velocity, ambient weather, wheel diameter, and cabin thermal management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Controls Sliders */}
          <div className="lg:col-span-6 space-y-8 p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white dark:bg-neutral-950/60 shadow-lg">
            {/* Speed Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  <Gauge className="w-4 h-4 text-sky-500" />
                  <span>CRUISING VELOCITY</span>
                </span>
                <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
                  {speed} MPH
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                step="5"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1">
                <span>50 MPH (Urban)</span>
                <span>70 MPH (Highway)</span>
                <span>90 MPH (Fast Track)</span>
              </div>
            </div>

            {/* Ambient Temperature Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  <Thermometer className="w-4 h-4 text-amber-500" />
                  <span>AMBIENT TEMPERATURE</span>
                </span>
                <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
                  {temperature}°C ({Math.round(temperature * 1.8 + 32)}°F)
                </span>
              </div>
              <input
                type="range"
                min="-10"
                max="40"
                step="2"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-1">
                <span>-10°C (Freezing)</span>
                <span>20°C (Optimal)</span>
                <span>40°C (Desert Heat)</span>
              </div>
            </div>

            {/* Wheel Diameter Package */}
            <div>
              <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                <Disc className="w-4 h-4 text-neutral-500" />
                <span>WHEEL & TIRE CONFIGURATION</span>
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setWheels("20-aero")}
                  className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                    wheels === "20-aero"
                      ? "border-sky-500 bg-sky-500/10 text-neutral-900 dark:text-white font-semibold"
                      : "border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  <span className="block font-bold">20" AeroDisc Forge</span>
                  <span className="text-[10px] opacity-75">Max range optimization</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWheels("22-carbon")}
                  className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                    wheels === "22-carbon"
                      ? "border-sky-500 bg-sky-500/10 text-neutral-900 dark:text-white font-semibold"
                      : "border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  <span className="block font-bold">22" Carbon Track Spec</span>
                  <span className="text-[10px] opacity-75">Maximum lateral corner grip</span>
                </button>
              </div>
            </div>

            {/* Climate Control Mode */}
            <div>
              <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                <Wind className="w-4 h-4 text-emerald-500" />
                <span>CLIMATE & HEAT PUMP</span>
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "off", label: "Cabin Off" },
                  { id: "eco", label: "Smart Eco A/C" },
                  { id: "high", label: "Precondition / Max" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setClimate(item.id)}
                    className={`p-2.5 rounded-lg border text-[11px] font-semibold transition-all ${
                      climate === item.id
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : "border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Computed Telemetry Output Display */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative p-8 sm:p-12 rounded-3xl border border-neutral-200/80 dark:border-white/10 bg-gradient-to-br from-white via-white to-neutral-100 dark:from-[#0E1117] dark:via-[#090B0E] dark:to-[#050608] shadow-2xl">
              <div className="flex items-center justify-between pb-6 border-b border-neutral-200/80 dark:border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  PROJECTED RANGE ESTIMATE
                </span>
                <span className="text-[11px] font-mono text-emerald-500 font-semibold px-2 py-0.5 rounded bg-emerald-500/10">
                  ACCURACY ± 1.5%
                </span>
              </div>

              {/* Huge animated range number */}
              <div className="py-8 flex items-baseline gap-2">
                <motion.span
                  key={estimatedRange}
                  initial={{ opacity: 0.6, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="font-display font-black text-6xl sm:text-8xl tracking-tight text-neutral-950 dark:text-white"
                >
                  {estimatedRange}
                </motion.span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-neutral-400 dark:text-neutral-500">
                  MILES
                </span>
              </div>

              {/* Key Fast-Charging Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-200/80 dark:border-white/10">
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                    10–80% 350kW CHARGE
                  </span>
                  <span className="font-display font-bold text-xl text-neutral-900 dark:text-white">
                    {chargeTimeMinutes} Mins
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                    5-MIN CHARGE GAIN
                  </span>
                  <span className="font-display font-bold text-xl text-sky-500">
                    +{milesInFiveMin} Miles
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                    CONSUMPTION
                  </span>
                  <span className="font-display font-bold text-xl text-neutral-900 dark:text-white">
                    {efficiency} Wh/mi
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-4 text-xs font-mono text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                <Zap className="w-4 h-4 text-sky-500" />
                <span>920V Architecture with Liquid-Cooled Busbars</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldCheck, RefreshCw, Cpu, Disc, Zap, Flame } from "lucide-react";

export default function TelemetryDiagnostics() {
  const [scanning, setScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState("Just now");

  const runScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setLastScanned("Just now");
    }, 1800);
  };

  const tires = [
    { pos: "FRONT LEFT", psi: 32.4, temp: "52°C", wear: "94%" },
    { pos: "FRONT RIGHT", psi: 32.6, temp: "54°C", wear: "94%" },
    { pos: "REAR LEFT", psi: 34.1, temp: "58°C", wear: "91%" },
    { pos: "REAR RIGHT", psi: 34.0, temp: "57°C", wear: "91%" },
  ];

  return (
    <section className="py-20 bg-neutral-900/40 text-white relative border-b border-white/10">
      <div className="w-[95%] max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>TORQ OBD-VI TELEMETRY SUBSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Real-Time Hardware Diagnostics
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Inspect active sensor arrays, ceramic rotor temperatures, battery internal resistance, and pneumatic PSI ratings.
            </p>
          </div>

          <button
            type="button"
            onClick={runScan}
            disabled={scanning}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider text-white transition-all cursor-pointer self-start md:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${scanning ? "animate-spin text-emerald-400" : ""}`} />
            <span>{scanning ? "Polling Sensors..." : "Scan Telemetry Bus"}</span>
          </button>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tire Pressure & Rubber */}
          {tires.map((t, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-black/40 border border-white/10 relative overflow-hidden group hover:border-emerald-500/30 transition-colors"
            >
              {scanning && (
                <motion.div
                  className="absolute inset-0 bg-emerald-500/10 pointer-events-none"
                  animate={{ opacity: [0, 0.4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                />
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-neutral-400">{t.pos}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                {t.psi} <span className="text-xs text-neutral-400 font-normal">PSI</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-mono text-neutral-400 pt-3 border-t border-white/5">
                <span>Temp: <strong className="text-white">{t.temp}</strong></span>
                <span>Tread: <strong className="text-emerald-400">{t.wear}</strong></span>
              </div>
            </div>
          ))}
        </div>

        {/* Advanced Systems Strip */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Ceramic Rotors */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
              <Disc className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-neutral-400">CARBON ROTOR THERMAL MATRIX</div>
              <div className="text-lg font-bold text-white mt-1">362°C (Optimal Corsa Band)</div>
              <div className="text-xs text-neutral-400 mt-0.5">Silicon carbide friction coefficient: μ 0.48</div>
            </div>
          </div>

          {/* 800V Architecture */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-neutral-400">800V MONOLITHIC PACK</div>
              <div className="text-lg font-bold text-white mt-1">99.2% Health (0.012Ω)</div>
              <div className="text-xs text-neutral-400 mt-0.5">Liquid immersion dielectric cooling active</div>
            </div>
          </div>

          {/* ECU Bus */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-neutral-400">NEURAL CHASSIS ECU</div>
              <div className="text-lg font-bold text-emerald-400 mt-1">0 Diagnostic Faults</div>
              <div className="text-xs text-neutral-400 mt-0.5">Dual-redundant CAN-FD bus synchronised</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

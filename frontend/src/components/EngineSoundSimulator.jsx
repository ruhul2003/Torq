"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Gauge, Zap, Flame, Sliders } from "lucide-react";

const PROFILES = [
  { id: "v12", name: "V12 Biturbo", baseFreq: 65, type: "sawtooth", redline: 8800, boost: "2.4 bar" },
  { id: "ev", name: "Cyber Warp EV", baseFreq: 110, type: "sine", redline: 18000, boost: "1020 kW" },
  { id: "v8", name: "Pure NA V8", baseFreq: 85, type: "triangle", redline: 8200, boost: "Atmo 5.2L" },
  { id: "flat6", name: "Twin-Turbo F6", baseFreq: 75, type: "sawtooth", redline: 9000, boost: "1.9 bar" },
];

export default function EngineSoundSimulator() {
  const [activeProfile, setActiveProfile] = useState(PROFILES[0]);
  const [rpm, setRpm] = useState(900);
  const [isRevving, setIsRevving] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);
  const filterRef = useRef(null);

  // Initialize Web Audio on user gesture
  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      if (oscRef.current) return;

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      const filter = audioCtxRef.current.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, audioCtxRef.current.currentTime);
      filter.Q.setValueAtTime(3.5, audioCtxRef.current.currentTime);

      osc.type = activeProfile.type;
      osc.frequency.setValueAtTime(activeProfile.baseFreq, audioCtxRef.current.currentTime);

      gain.gain.setValueAtTime(0.08, audioCtxRef.current.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
      filterRef.current = filter;
      setIsAudioEnabled(true);
    } catch {
      // Audio not supported or blocked
    }
  };

  const stopAudio = () => {
    try {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.1);
      }
      setTimeout(() => {
        if (oscRef.current) {
          oscRef.current.stop();
          oscRef.current.disconnect();
          oscRef.current = null;
        }
        setIsAudioEnabled(false);
      }, 120);
    } catch {
      setIsAudioEnabled(false);
    }
  };

  // Adjust audio parameters based on RPM and profile
  useEffect(() => {
    if (!isAudioEnabled || !oscRef.current || !audioCtxRef.current || !filterRef.current) return;

    const targetFreq = (activeProfile.baseFreq * (rpm / 900)) * (activeProfile.id === "ev" ? 0.35 : 0.65);
    oscRef.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.05);

    const filterCutoff = 350 + (rpm / activeProfile.redline) * 2800;
    filterRef.current.frequency.setTargetAtTime(filterCutoff, audioCtxRef.current.currentTime, 0.04);

    if (gainRef.current) {
      const dynamicGain = 0.06 + (rpm / activeProfile.redline) * 0.12;
      gainRef.current.gain.setTargetAtTime(dynamicGain, audioCtxRef.current.currentTime, 0.05);
    }
  }, [rpm, activeProfile, isAudioEnabled]);

  // Revving animation loop
  useEffect(() => {
    let interval;
    if (isRevving) {
      interval = setInterval(() => {
        setRpm((prev) => {
          const step = (activeProfile.redline - prev) * 0.22 + 150;
          return Math.min(activeProfile.redline, Math.round(prev + step));
        });
      }, 35);
    } else {
      interval = setInterval(() => {
        setRpm((prev) => {
          if (prev <= 950) return 900 + Math.floor(Math.sin(Date.now() / 200) * 40);
          return Math.max(900, Math.round(prev - (prev - 900) * 0.16 - 80));
        });
      }, 35);
    }
    return () => clearInterval(interval);
  }, [isRevving, activeProfile]);

  const rpmPercent = Math.min(100, Math.round((rpm / activeProfile.redline) * 100));
  const needleRotation = -120 + (rpmPercent / 100) * 240;

  return (
    <section className="py-20 relative bg-neutral-950 text-white overflow-hidden border-y border-white/10">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-[95%] max-w-6xl mx-auto relative z-10 px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-sky-400 mb-3">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>ACOUSTIC SYNTHESIS LABORATORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white">
              Dynamic Powertrain Acoustics
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Experience the synthesized exhaust timbre and induction harmonics of TORQ powertrains. Hold the throttle to rev.
            </p>
          </div>

          {/* Audio toggle button */}
          <button
            type="button"
            onClick={isAudioEnabled ? stopAudio : startAudio}
            className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-lg ${
              isAudioEnabled
                ? "bg-sky-500 hover:bg-sky-400 text-black shadow-sky-500/25"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
          >
            {isAudioEnabled ? (
              <>
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>Audio Active • Mute</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Enable Realtime Sound</span>
              </>
            )}
          </button>
        </div>

        {/* Powertrain Profile Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {PROFILES.map((p) => {
            const isSelected = p.id === activeProfile.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setActiveProfile(p);
                  setRpm(900);
                  if (oscRef.current) oscRef.current.type = p.type;
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-white/[0.08] border-sky-500/60 shadow-[0_0_20px_rgba(56,189,248,0.15)] ring-1 ring-sky-500/50"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-neutral-400">{p.boost}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />}
                </div>
                <div className="text-base font-semibold text-white">{p.name}</div>
                <div className="text-xs font-mono text-neutral-400 mt-1">
                  Redline: {p.redline.toLocaleString()} RPM
                </div>
              </button>
            );
          })}
        </div>

        {/* Tachometer & Interactive Rev Station */}
        <div className="relative rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Tachometer Visualizer */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                {/* Dial ring SVG */}
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  {/* Background track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="5"
                    strokeDasharray="188 63"
                    strokeLinecap="round"
                  />
                  {/* Active RPM progress */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={rpmPercent > 85 ? "#ef4444" : "#38bdf8"}
                    strokeWidth="6"
                    strokeDasharray="251"
                    strokeDashoffset={251 - (251 * (rpmPercent * 0.75)) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-75"
                  />
                </svg>

                {/* Rotating needle */}
                <motion.div
                  className="absolute w-full h-full pointer-events-none flex items-center justify-center"
                  animate={{ rotate: needleRotation }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="w-1.5 h-28 bg-gradient-to-t from-red-500 via-sky-400 to-transparent -translate-y-12 rounded-full shadow-[0_0_10px_#38bdf8]" />
                </motion.div>

                {/* Center Digital Readout */}
                <div className="absolute flex flex-col items-center text-center">
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                    TACHOMETER
                  </span>
                  <span className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-white font-mono">
                    {rpm.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-sky-400 mt-0.5">RPM</span>
                </div>
              </div>

              {/* Redline Alert Pill */}
              <AnimatePresence>
                {rpmPercent > 88 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="mt-3 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/50 text-[11px] font-mono text-red-400 uppercase tracking-widest flex items-center gap-1.5"
                  >
                    <Flame className="w-3.5 h-3.5 text-red-500 animate-bounce" />
                    <span>OVERREV CUTOFF ACTIVE</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Throttle Controls & Acoustic Metrics */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
              {/* Telemetry chips */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-mono text-neutral-400">INDUCTION</div>
                  <div className="text-lg font-bold text-white mt-1">98.4 dB</div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-mono text-neutral-400">EXHAUST VALVE</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1">
                    {rpm > 4000 ? "OPEN" : "SPORT"}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[11px] font-mono text-neutral-400">OCTANE</div>
                  <div className="text-lg font-bold text-sky-400 mt-1">102 RON</div>
                </div>
              </div>

              {/* Interactive Throttle Pedal Button */}
              <div className="space-y-3">
                <label className="text-xs font-mono text-neutral-400 flex items-center justify-between">
                  <span>HOLD THROTTLE PEDAL TO REV</span>
                  <span className="text-sky-400 font-semibold">{rpmPercent}% LOAD</span>
                </label>
                <button
                  type="button"
                  onMouseDown={() => {
                    setIsRevving(true);
                    if (!isAudioEnabled) startAudio();
                  }}
                  onMouseUp={() => setIsRevving(false)}
                  onMouseLeave={() => setIsRevving(false)}
                  onTouchStart={() => {
                    setIsRevving(true);
                    if (!isAudioEnabled) startAudio();
                  }}
                  onTouchEnd={() => setIsRevving(false)}
                  className={`w-full py-8 rounded-2xl border font-display font-bold text-lg uppercase tracking-widest transition-all duration-150 cursor-pointer select-none flex flex-col items-center justify-center gap-1 shadow-2xl active:scale-[0.98] ${
                    isRevving
                      ? "bg-gradient-to-r from-red-600 via-amber-500 to-sky-500 text-black border-white shadow-[0_0_35px_rgba(239,68,68,0.5)]"
                      : "bg-white/10 hover:bg-white/15 text-white border-white/20"
                  }`}
                >
                  <Gauge className={`w-6 h-6 ${isRevving ? "animate-spin" : ""}`} />
                  <span>{isRevving ? "FULL ACCELERATION" : "PRESS & HOLD ACCELERATOR"}</span>
                  <span className="text-[10px] font-mono opacity-80 font-normal">
                    Interactive Audio Feedback Enabled
                  </span>
                </button>
              </div>

              {/* Slider fallback for precision */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono text-neutral-400">
                  <span>MANUAL RPM SLIDER</span>
                  <span>{rpm} RPM</span>
                </div>
                <input
                  type="range"
                  min="900"
                  max={activeProfile.redline}
                  value={rpm}
                  onChange={(e) => {
                    setRpm(Number(e.target.value));
                    if (!isAudioEnabled) startAudio();
                  }}
                  className="w-full accent-sky-500 cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

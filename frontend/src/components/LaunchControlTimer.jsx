"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Timer, Flame, Play, RotateCcw, Award } from "lucide-react";

export default function LaunchControlTimer() {
  const [state, setState] = useState("idle"); // "idle" | "countdown" | "ready" | "launched" | "false_start"
  const [lightCount, setLightCount] = useState(0);
  const [reactionTime, setReactionTime] = useState(null);
  const [sprintTime, setSprintTime] = useState(null);
  const [gForce, setGForce] = useState(null);
  const greenTimestamp = useRef(0);
  const timerTimeout = useRef(null);

  const startCountdown = () => {
    setState("countdown");
    setLightCount(0);
    setReactionTime(null);
    setSprintTime(null);

    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setLightCount(count);
      if (count === 4) {
        clearInterval(interval);
        // Random green delay between 1.2s and 2.8s
        const randomDelay = 1200 + Math.random() * 1600;
        timerTimeout.current = setTimeout(() => {
          setState("ready");
          greenTimestamp.current = Date.now();
        }, randomDelay);
      }
    }, 600);
  };

  const handleLaunchClick = () => {
    if (state === "countdown") {
      clearTimeout(timerTimeout.current);
      setState("false_start");
      return;
    }
    if (state === "ready") {
      const reaction = (Date.now() - greenTimestamp.current) / 1000;
      const baseSprint = 1.82 + Math.random() * 0.18;
      const totalSprint = (baseSprint + reaction * 0.15).toFixed(2);
      const peakG = (1.52 + Math.random() * 0.22).toFixed(2);

      setReactionTime(reaction.toFixed(3));
      setSprintTime(totalSprint);
      setGForce(peakG);
      setState("launched");
    }
  };

  const reset = () => {
    setState("idle");
    setLightCount(0);
    setReactionTime(null);
    setSprintTime(null);
  };

  return (
    <section className="py-20 bg-neutral-950 text-white relative border-b border-white/10 overflow-hidden">
      <div className="w-[95%] max-w-5xl mx-auto px-4 relative z-10 text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 mb-3">
          <Flame className="w-3.5 h-3.5 text-red-500" />
          <span>TORQ LAUNCH CONTROL PROTOCOL</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
          0-60 MPH Benchmark Benchmark
        </h2>
        <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
          Test your launch reaction off the start tree. Release the brake when the lights turn green to record your 0-60 sprint and peak longitudinal Gs.
        </p>

        {/* Tree Lights Visualizer */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl max-w-2xl mx-auto shadow-2xl">
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8">
            {[1, 2, 3, 4].map((num) => {
              const isLit = lightCount >= num;
              return (
                <div
                  key={num}
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 transition-all duration-150 flex items-center justify-center ${
                    isLit
                      ? "bg-red-600 border-red-400 shadow-[0_0_25px_#ef4444]"
                      : "bg-neutral-800 border-neutral-700 opacity-40"
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white/20" />
                </div>
              );
            })}
          </div>

          {/* Green Go Bar */}
          <div className="mb-8">
            <div
              className={`w-full py-4 rounded-2xl text-center font-display font-black text-xl uppercase tracking-widest transition-all duration-150 ${
                state === "ready"
                  ? "bg-emerald-500 text-black shadow-[0_0_40px_#10b981] animate-pulse"
                  : state === "false_start"
                  ? "bg-amber-500 text-black shadow-[0_0_25px_#f59e0b]"
                  : "bg-neutral-800/80 text-neutral-500 border border-white/5"
              }`}
            >
              {state === "ready"
                ? "GREEN! RELEASE BRAKE NOW!"
                : state === "false_start"
                ? "JUMP START / FALSE START DETECTED"
                : state === "countdown"
                ? "HOLD ACCELERATOR & BRAKE..."
                : "ARM LAUNCH CONTROL TO BEGIN"}
            </div>
          </div>

          {/* Interactive Trigger Button */}
          {state === "idle" && (
            <button
              type="button"
              onClick={startCountdown}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-red-600/30 cursor-pointer"
            >
              Arm Launch Control
            </button>
          )}

          {(state === "countdown" || state === "ready") && (
            <button
              type="button"
              onClick={handleLaunchClick}
              className={`w-full py-6 rounded-2xl font-display font-black text-lg uppercase tracking-wider transition-all cursor-pointer ${
                state === "ready"
                  ? "bg-emerald-400 text-black shadow-2xl shadow-emerald-400/50 scale-105"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              {state === "ready" ? "LAUNCH NOW (CLICK!)" : "READY ON BRAKE"}
            </button>
          )}

          {state === "false_start" && (
            <button
              type="button"
              onClick={reset}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Reset Start Tree
            </button>
          )}

          {/* Results Summary */}
          {state === "launched" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="pt-4 border-t border-white/10"
            >
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[10px] font-mono text-neutral-400">REACTION TIME</div>
                  <div className="text-xl font-bold text-sky-400 mt-1 font-mono">{reactionTime}s</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[10px] font-mono text-neutral-400">0-60 MPH SPRINT</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1 font-mono">{sprintTime}s</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-[10px] font-mono text-neutral-400">PEAK ACCEL</div>
                  <div className="text-xl font-bold text-amber-400 mt-1 font-mono">{gForce} G</div>
                </div>
              </div>

              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Launch Again</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

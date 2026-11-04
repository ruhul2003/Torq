"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, Sun, Moon, Sparkles, Layers, Info, Check } from "lucide-react";

const ANGLES = [
  { deg: 0, label: "Front 3/4 Dynamic", image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop" },
  { deg: 45, label: "Direct Profile Aero", image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1600&auto=format&fit=crop" },
  { deg: 90, label: "Rear Diffuser Stance", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop" },
  { deg: 135, label: "Quarter Rear Muscular", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1600&auto=format&fit=crop" },
  { deg: 180, label: "Front Fascia Aggression", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop" },
  { deg: 225, label: "Bespoke Monocoque Aero", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop" },
];

const LIGHTING_MODES = [
  { id: "studio", name: "Studio White", bg: "from-neutral-900 to-neutral-950" },
  { id: "monaco", name: "Monaco Dusk", bg: "from-amber-950/40 via-neutral-950 to-neutral-950" },
  { id: "neon", name: "Cyber Tokyo", bg: "from-cyan-950/40 via-purple-950/20 to-neutral-950" },
];

const HOTSPOTS = [
  { x: 32, y: 55, title: "Active Aero Splitter", desc: "Carbon fiber multi-stage downforce wing generating 680kg at 250km/h." },
  { x: 58, y: 68, title: "Carbon Ceramic Matrix", desc: "420mm Brembo 10-piston monoblock calipers with titanium cooling ducts." },
  { x: 78, y: 46, title: "Bespoke Dihedral Doors", desc: "Forged composite gullwing articulation with soft-close micro-servos." },
];

export default function Vehicle360Viewer() {
  const [currentAngleIndex, setCurrentAngleIndex] = useState(0);
  const [lighting, setLighting] = useState(LIGHTING_MODES[0]);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const diff = e.clientX - startX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrentAngleIndex((prev) => (prev === 0 ? ANGLES.length - 1 : prev - 1));
      } else {
        setCurrentAngleIndex((prev) => (prev === ANGLES.length - 1 ? 0 : prev + 1));
      }
      startX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const currentAngle = ANGLES[currentAngleIndex];

  return (
    <section className="py-24 relative bg-[#090b10] text-white overflow-hidden border-b border-white/10">
      <div className="w-[95%] max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400 mb-3">
              <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} />
              <span>360° BESPOKE TURNTABLE STUDIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Virtual Showroom Turntable
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Drag horizontally across the display to rotate the vehicle perspective. Switch lighting presets and inspect engineered aero features.
            </p>
          </div>

          {/* Lighting Mode Selector */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 self-start md:self-auto">
            {LIGHTING_MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setLighting(m)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  lighting.id === m.id
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* 360 Turntable Viewport */}
        <div
          className={`relative rounded-3xl border border-white/10 bg-gradient-to-b ${lighting.bg} p-4 sm:p-8 select-none shadow-2xl overflow-hidden cursor-ew-resize`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Subtle reflection floor grid */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(56,189,248,0.12)_0%,transparent_60%)] pointer-events-none" />

          {/* Image Display */}
          <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] flex items-center justify-center rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentAngle.image}
                src={currentAngle.image}
                alt={currentAngle.label}
                initial={{ opacity: 0.6, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.7 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full object-cover rounded-2xl pointer-events-none filter contrast-105"
              />
            </AnimatePresence>

            {/* Interactive Hotspots */}
            {HOTSPOTS.map((spot, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(activeHotspot === i ? null : i);
                }}
                style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                className="absolute w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/80 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-[0_0_15px_#38bdf8] hover:scale-125 transition-transform cursor-pointer z-20 group"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              </button>
            ))}

            {/* Active Hotspot Popover */}
            <AnimatePresence>
              {activeHotspot !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  style={{
                    top: `${HOTSPOTS[activeHotspot].y - 12}%`,
                    left: `${Math.min(80, Math.max(20, HOTSPOTS[activeHotspot].x))}%`,
                  }}
                  className="absolute z-30 -translate-x-1/2 w-64 p-3.5 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/20 text-white shadow-2xl pointer-events-auto"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-sky-400">
                      {HOTSPOTS[activeHotspot].title}
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(null)}
                      className="text-neutral-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {HOTSPOTS[activeHotspot].desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Drag helper hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-neutral-300 flex items-center gap-2 pointer-events-none">
              <RotateCw className="w-3.5 h-3.5 text-sky-400 animate-spin" />
              <span>DRAG TO ROTATE (360°)</span>
            </div>
          </div>

          {/* Angle Dial Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">PERSPECTIVE:</span>
              <span className="text-sm font-semibold text-white font-mono">
                {currentAngle.deg}° • {currentAngle.label}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {ANGLES.map((angle, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentAngleIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                    currentAngleIndex === idx
                      ? "bg-sky-500 text-black font-bold shadow-md shadow-sky-500/30"
                      : "bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
                  }`}
                >
                  {angle.deg}°
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

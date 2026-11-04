"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Award, CheckCircle, Car, ShieldAlert, Sparkles } from "lucide-react";

const CIRCUITS = [
  { id: "nurburgring", name: "Nürburgring Nordschleife", country: "Germany", length: "20.8 km", turns: "73 turns", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop" },
  { id: "monaco", name: "Circuit de Monaco", country: "Monaco", length: "3.3 km", turns: "19 turns", image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=800&auto=format&fit=crop" },
  { id: "dubai", name: "Dubai Autodrome GP", country: "United Arab Emirates", length: "5.4 km", turns: "16 turns", image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop" },
  { id: "laguna", name: "WeatherTech Laguna Seca", country: "California, USA", length: "3.6 km", turns: "11 turns", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop" },
];

export default function TrackDriveBookingModal({ isOpen, onClose }) {
  const [selectedCircuit, setSelectedCircuit] = useState(CIRCUITS[0]);
  const [instructor, setInstructor] = useState(true);
  const [telemetryPack, setTelemetryPack] = useState(true);
  const [helicopter, setHelicopter] = useState(false);
  const [step, setStep] = useState("form"); // "form" | "confirmed"

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl rounded-3xl bg-neutral-900 border border-white/10 text-white shadow-2xl p-6 sm:p-8 my-auto"
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {step === "form" ? (
            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 mb-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>VIP PRIVATE TRACK CONCIERGE</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold">
                  Book a Circuit Track Experience
                </h3>
                <p className="text-sm text-neutral-400 mt-1">
                  Pilot the TORQ hypercar lineup under FIA-sanctioned conditions with dedicated pit crew and telemetry briefing.
                </p>
              </div>

              {/* Circuit Grid */}
              <label className="text-xs font-mono text-neutral-400 uppercase block mb-3">
                SELECT SANCTIONED GRAND PRIX CIRCUIT
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {CIRCUITS.map((circ) => {
                  const isSelected = selectedCircuit.id === circ.id;
                  return (
                    <button
                      key={circ.id}
                      type="button"
                      onClick={() => setSelectedCircuit(circ)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-white/[0.08] border-amber-500/60 ring-1 ring-amber-500/50"
                          : "bg-white/[0.02] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <img
                        src={circ.image}
                        alt={circ.name}
                        className="w-14 h-14 rounded-xl object-cover border border-white/10"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-white truncate">{circ.name}</div>
                        <div className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>{circ.country}</span>
                        </div>
                        <div className="text-[10px] font-mono text-neutral-500 mt-0.5">
                          {circ.length} • {circ.turns}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Addons */}
              <div className="space-y-2.5 mb-8">
                <label className="text-xs font-mono text-neutral-400 uppercase block">
                  CONCIERGE AMENITIES & TELEMETRY
                </label>
                <div
                  onClick={() => setInstructor(!instructor)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className={`w-4 h-4 ${instructor ? "text-amber-400" : "text-neutral-600"}`} />
                    <span className="text-sm text-white font-medium">Dedicated FIA Pro Racing Coach</span>
                  </div>
                  <span className="text-xs font-mono text-amber-400">Included</span>
                </div>

                <div
                  onClick={() => setTelemetryPack(!telemetryPack)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className={`w-4 h-4 ${telemetryPack ? "text-amber-400" : "text-neutral-600"}`} />
                    <span className="text-sm text-white font-medium">100Hz 4K In-Cockpit Telemetry Rig & Video</span>
                  </div>
                  <span className="text-xs font-mono text-amber-400">Included</span>
                </div>

                <div
                  onClick={() => setHelicopter(!helicopter)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 cursor-pointer hover:bg-white/[0.05]"
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className={`w-4 h-4 ${helicopter ? "text-amber-400" : "text-neutral-600"}`} />
                    <span className="text-sm text-white font-medium">Helicopter Paddock Transfer to Circuit</span>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">+$2,400</span>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-xs text-neutral-400">
                  Private Session Deposit: <span className="text-amber-400 font-bold font-mono">$5,000 USD</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep("confirmed")}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-xs uppercase tracking-wider hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  Request Pit Pass Invitation
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500 text-amber-400 flex items-center justify-center mx-auto mb-4"
              >
                <Award className="w-8 h-8" />
              </motion.div>
              <h3 className="text-2xl font-bold font-display text-white">
                Track Pass Requested
              </h3>
              <p className="text-sm text-neutral-400 max-w-md mx-auto mt-2">
                Your private track reservation request for <span className="text-white font-semibold">{selectedCircuit.name}</span> has been dispatched to the TORQ Syndicate Racing Concierge.
              </p>
              <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/10 max-w-sm mx-auto font-mono text-xs text-neutral-300">
                TICKET REF: #TRQ-CORSA-{Math.floor(100000 + Math.random() * 900000)}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
              >
                Return to Showroom
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

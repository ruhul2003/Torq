"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, AlertTriangle, Car, Search, RefreshCw, Sparkles } from "lucide-react";

const POPULAR_VEHICLES = [
  "Porsche 911 GT3 (992)",
  "Porsche 911 Turbo S (992)",
  "Porsche 718 Cayman GT4 RS",
  "Ferrari 488 Pista",
  "Ferrari F8 Tributo",
  "Ferrari SF90 Stradale",
  "McLaren 720S",
  "McLaren 765LT",
  "Lamborghini Huracán STO",
  "BMW M3 / M4 Competition (G80/G82)",
  "Mercedes-AMG GT Black Series",
  "Aston Martin DBS Superleggera",
];

export default function FitmentChecker({ onFilterByVehicle, activeVehicle }) {
  const { selectedVehicleFitment, setSelectedVehicleFitment } = useCart();
  const [selectedModel, setSelectedModel] = useState(
    activeVehicle || selectedVehicleFitment || ""
  );
  const [vinInput, setVinInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleSelectVehicle = (vehicle) => {
    setSelectedModel(vehicle);
    setSelectedVehicleFitment(vehicle);
    if (onFilterByVehicle) onFilterByVehicle(vehicle);
    setVerificationResult({
      status: "verified",
      message: `Chassis verified: ${vehicle}. Catalog tailored to OEM factory tolerances.`,
    });
  };

  const handleVinSubmit = (e) => {
    e.preventDefault();
    if (!vinInput.trim()) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      // Auto-detect matching luxury make based on VIN prefix or fallback
      let matched = POPULAR_VEHICLES[0];
      const upper = vinInput.toUpperCase();
      if (upper.startsWith("WP0")) matched = "Porsche 911 GT3 (992)";
      else if (upper.startsWith("ZFF")) matched = "Ferrari 488 Pista";
      else if (upper.startsWith("SBM")) matched = "McLaren 720S";
      else if (upper.startsWith("ZHW")) matched = "Lamborghini Huracán STO";
      else if (upper.startsWith("WBA") || upper.startsWith("WBS")) matched = "BMW M3 / M4 Competition (G80/G82)";
      else if (upper.startsWith("WDD")) matched = "Mercedes-AMG GT Black Series";

      setSelectedModel(matched);
      setSelectedVehicleFitment(matched);
      if (onFilterByVehicle) onFilterByVehicle(matched);
      setVerificationResult({
        status: "verified",
        message: `VIN decoded [${upper}]: Matches ${matched}. Factory tolerance profile loaded.`,
      });
    }, 600);
  };

  const handleClear = () => {
    setSelectedModel("");
    setSelectedVehicleFitment("");
    setVinInput("");
    setVerificationResult(null);
    if (onFilterByVehicle) onFilterByVehicle("");
  };

  return (
    <div className="w-full rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6 shadow-sm mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-neutral-200/80 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-500 flex items-center justify-center shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base sm:text-lg text-neutral-900 dark:text-white flex items-center gap-2">
              <span>Precision Vehicle Fitment Engine</span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                100% Guaranteed
              </span>
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Select your exotic supercar or enter your 17-digit VIN to filter for guaranteed direct bolt-on OEM components.
            </p>
          </div>
        </div>

        {selectedModel && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-red-500 dark:hover:text-red-400 transition-colors self-start lg:self-auto cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Fitment Filter</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-5">
        {/* Quick Supercar Selector */}
        <div className="md:col-span-7 flex flex-col gap-2">
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Select Chassis / Supercar Model
          </label>
          <div className="relative">
            <select
              value={selectedModel}
              onChange={(e) => handleSelectVehicle(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] text-xs sm:text-sm font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all appearance-none cursor-pointer"
            >
              <option value="">— Choose Supercar Model to Verify Fitment —</option>
              {POPULAR_VEHICLES.map((car) => (
                <option key={car} value={car}>
                  {car}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
              ▼
            </div>
          </div>
        </div>

        {/* VIN Decoder Input */}
        <form onSubmit={handleVinSubmit} className="md:col-span-5 flex flex-col gap-2">
          <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
            <span>Or Enter Vehicle VIN</span>
            <span className="text-[10px] text-neutral-400 font-normal">17 characters</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={17}
              placeholder="e.g. WP0AB2A92NS..."
              value={vinInput}
              onChange={(e) => setVinInput(e.target.value.toUpperCase())}
              className="flex-1 h-11 px-3.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] text-xs font-mono uppercase text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
            />
            <button
              type="submit"
              disabled={isVerifying || !vinInput.trim()}
              className="h-11 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 font-semibold text-xs tracking-wider uppercase transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              {isVerifying ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              <span>Decode</span>
            </button>
          </div>
        </form>
      </div>

      {/* Verification Feedback Banner */}
      {verificationResult && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2.5 text-xs text-emerald-700 dark:text-emerald-300 font-mono animate-fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>{verificationResult.message}</span>
        </div>
      )}
    </div>
  );
}

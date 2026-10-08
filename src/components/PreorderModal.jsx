"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ShieldCheck, ArrowRight, CreditCard, Calendar } from "lucide-react";
import { INVENTORY } from "@/data/inventory";

export default function PreorderModal({ isOpen, initialModel, onClose }) {
  const [selectedModel, setSelectedModel] = useState("apex-gt");
  const [purchaseType, setPurchaseType] = useState("deposit"); // 'deposit' or 'consult'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderCode, setOrderCode] = useState("");

  useEffect(() => {
    if (initialModel) {
      setSelectedModel(initialModel);
    }
  }, [initialModel, isOpen]);

  const activeVehicleData = INVENTORY.find((c) => c.id === selectedModel) || INVENTORY[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setOrderCode(`TRQ-VIP-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 800);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleReset}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="relative w-full max-w-lg rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0B0D13] p-6 sm:p-8 shadow-2xl z-10"
          >
          <button
            type="button"
            onClick={handleReset}
            className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSuccess ? (
            <div>
              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-500 font-semibold block mb-1">
                  TORQ PRIVATE ATELIER
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
                  Acquire Vehicle.
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Reserve showroom inventory or schedule a private viewing.
                </p>
              </div>

              {/* Purchase Intent Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 dark:bg-white/[0.04] rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => setPurchaseType("deposit")}
                  className={`relative py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    purchaseType === "deposit"
                      ? "text-neutral-900 dark:text-white font-bold"
                      : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {purchaseType === "deposit" && (
                    <motion.div
                      layoutId="purchaseTypePill"
                      className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <CreditCard className="relative z-10 w-3.5 h-3.5 text-sky-500" />
                  <span className="relative z-10">Reserve ($2,500 Escrow)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPurchaseType("consult")}
                  className={`relative py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    purchaseType === "consult"
                      ? "text-neutral-900 dark:text-white font-bold"
                      : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {purchaseType === "consult" && (
                    <motion.div
                      layoutId="purchaseTypePill"
                      className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-lg shadow-sm"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <Calendar className="relative z-10 w-3.5 h-3.5 text-emerald-500" />
                  <span className="relative z-10">Private Viewing</span>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Vehicle Selection */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1.5">
                    SELECT VEHICLE ({INVENTORY.length} MODELS)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                    {INVENTORY.map((model) => (
                      <button
                        key={model.id}
                        type="button"
                        onClick={() => setSelectedModel(model.id)}
                        className={`p-2 rounded-xl border text-left transition-all ${
                          selectedModel === model.id
                            ? "border-sky-500 bg-sky-500/10 text-neutral-950 dark:text-white font-bold"
                            : "border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400"
                        }`}
                      >
                        <span className="block text-xs font-semibold truncate">{model.name.replace("TORQ ", "")}</span>
                        <span className="text-[10px] text-neutral-400">{model.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Vehicle Confirmation Box with Real Image */}
                {activeVehicleData && (
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-100/80 dark:bg-white/[0.04] border border-neutral-200/60 dark:border-white/5">
                    <img
                      src={activeVehicleData.image}
                      alt={activeVehicleData.name}
                      className="w-14 h-9 object-cover rounded-lg shrink-0 shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs text-neutral-900 dark:text-white truncate">
                        {activeVehicleData.name}
                      </div>
                      <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                        {activeVehicleData.status}
                      </div>
                    </div>
                    <span className="font-mono font-bold text-xs text-sky-500 shrink-0">
                      {activeVehicleData.price}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                      NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Julian Hayes"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50/50 dark:bg-white/[0.02] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="julian@holding.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50/50 dark:bg-white/[0.02] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                      PHONE
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 019-2834"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50/50 dark:bg-white/[0.02] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                      DESTINATION
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Miami / London / Dubai"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50/50 dark:bg-white/[0.02] text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="inline-block animate-pulse">CONNECTING...</span>
                    ) : (
                      <>
                        <span>{purchaseType === "deposit" ? "Confirm Reservation" : "Schedule Viewing"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-400 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>ESCROW SECURED // 100% REFUNDABLE</span>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono uppercase text-emerald-500 font-bold tracking-widest block mb-1">
                ACQUISITION LOGGED
              </span>
              <h3 className="font-display text-2xl font-black text-neutral-950 dark:text-white mb-2">
                Order Protocol Initialized.
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto mb-4">
                Your concierge will reach out within 2 hours to confirm vehicle delivery logistics.
              </p>

              <div className="p-3 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.02] max-w-xs mx-auto mb-6 font-mono">
                <span className="text-[10px] text-neutral-400 block uppercase">CLIENT REFERENCE TOKEN</span>
                <span className="text-base font-bold text-sky-500">{orderCode}</span>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold text-xs uppercase tracking-wider"
              >
                Close Window
              </button>
            </div>
          )}
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}

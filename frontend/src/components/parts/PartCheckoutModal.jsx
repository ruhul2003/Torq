"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { createPartOrder } from "@/lib/api";
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Car,
} from "lucide-react";

export default function PartCheckoutModal({ isOpen, onClose, onOrderComplete }) {
  const { items, subtotal, clearCart, selectedVehicleFitment } = useCart();

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    vin: "",
    vehicleModel: selectedVehicleFitment || "",
    shippingTier: "white_glove_air",
    paymentMethod: "Centurion / Black Card Escrow",
    specialInstructions: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || items.length === 0) return null;

  const shippingRates = {
    standard_freight: subtotal > 10000 ? 0 : 250,
    white_glove_air: subtotal > 10000 ? 0 : 250,
    rush_trackside_courier: 650,
  };

  const shippingFee = shippingRates[formData.shippingTier] ?? 0;
  const taxAmount = Math.round(subtotal * 0.08875 * 100) / 100;
  const grandTotal = subtotal + shippingFee + taxAmount;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone) {
      setErrorMsg("Please complete all contact identity fields.");
      return;
    }

    if (!formData.street || !formData.city || !formData.postalCode) {
      setErrorMsg("Please provide complete delivery street and city coordinates.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state || "NY",
          postalCode: formData.postalCode,
          country: formData.country,
        },
        items: items.map((it) => ({
          part: it._id,
          partNumber: it.partNumber,
          name: it.name,
          image: it.image,
          price: it.price,
          quantity: it.quantity || 1,
          oemBrand: it.oemBrand,
          subtotal: it.price * (it.quantity || 1),
        })),
        shippingTier: formData.shippingTier,
        paymentMethod: formData.paymentMethod,
        vinVerification: {
          vin: formData.vin || "NOT PROVIDED",
          vehicleModel: formData.vehicleModel || "Verified Performance Chassis",
          notes: formData.specialInstructions || "Direct fitment requested.",
        },
      };

      const res = await createPartOrder(payload);

      if (res && (res.success || res.data)) {
        clearCart();
        onClose();
        if (onOrderComplete) onOrderComplete(res.data);
      } else {
        setErrorMsg(res.error || "Unable to process order. Please try again.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Checkout submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] shadow-2xl p-6 sm:p-8 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-5 border-b border-neutral-200 dark:border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-500 border border-sky-500/20 font-semibold">
                    TORQ Logistics Escrow
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                    256-Bit SSL Encrypted
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-neutral-900 dark:text-white">
                  White-Glove OEM Parts Checkout
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {/* Contact Identity */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-sky-500" />
                  <span>1. Client Identity & Delivery Contact</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    name="customerName"
                    required
                    placeholder="Full Legal Name"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="h-11 px-3.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  />
                  <input
                    type="email"
                    name="customerEmail"
                    required
                    placeholder="Concierge Email Address"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    className="h-11 px-3.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  />
                  <input
                    type="tel"
                    name="customerPhone"
                    required
                    placeholder="Direct Phone / Mobile"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    className="h-11 px-3.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-sky-500" />
                  <span>2. Enclosed Delivery Destination</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    name="street"
                    required
                    placeholder="Street Address / Penthouse / Garage"
                    value={formData.street}
                    onChange={handleChange}
                    className="sm:col-span-2 h-11 px-3.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  />
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="h-11 px-3.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    required
                    placeholder="ZIP / Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="h-11 px-3.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  />
                </div>
              </div>

              {/* VIN Verification & Chassis */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-sky-500" />
                  <span>3. Vehicle Chassis & Fitment Verification (Optional)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="vehicleModel"
                    placeholder="Vehicle Model (e.g. Porsche 911 GT3 RS)"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    className="h-11 px-3.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  />
                  <input
                    type="text"
                    name="vin"
                    maxLength={17}
                    placeholder="Chassis VIN (for automated tolerance verification)"
                    value={formData.vin}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, vin: e.target.value.toUpperCase() }))
                    }
                    className="h-11 px-3.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs font-mono uppercase text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                  />
                </div>
              </div>

              {/* Shipping Tier & Payment Method */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2">
                    Shipping Logistics Tier
                  </label>
                  <select
                    name="shippingTier"
                    value={formData.shippingTier}
                    onChange={handleChange}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 cursor-pointer"
                  >
                    <option value="white_glove_air">
                      TORQ White-Glove Air Express ({shippingRates.white_glove_air === 0 ? "Complimentary" : "$250"})
                    </option>
                    <option value="standard_freight">
                      Standard Enclosed Freight (Complimentary)
                    </option>
                    <option value="rush_trackside_courier">
                      Rush Trackside Courier / 24-Hr Urgent ($650)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2">
                    Settlement Method
                  </label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 cursor-pointer"
                  >
                    <option value="Centurion / Black Card Escrow">
                      Centurion / Black Card Escrow
                    </option>
                    <option value="TORQ Vault Wire Settlement">
                      TORQ Vault Wire Settlement
                    </option>
                    <option value="Major Credit Card (Verified 3D Secure)">
                      Major Credit Card (Verified 3D Secure)
                    </option>
                  </select>
                </div>
              </div>

              {/* Order Summary & Submit Button */}
              <div className="pt-4 border-t border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono text-neutral-500 block">TOTAL SETTLEMENT</span>
                  <span className="font-display font-extrabold text-2xl text-neutral-900 dark:text-white">
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto h-12 px-8 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-sky-400" />
                  <span>{isSubmitting ? "Securing Escrow..." : "Authorize Escrow Purchase"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

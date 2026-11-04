"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Percent, Calendar, ShieldCheck } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

export default function FinancingCalculator() {
  const { formatPrice } = useCurrency();
  const [vehiclePrice, setVehiclePrice] = useState(285000);
  const [downPayment, setDownPayment] = useState(50000);
  const [termMonths, setTermMonths] = useState(36);
  const [type, setType] = useState("lease"); // "lease" | "loan"

  // Calculation
  const loanAmount = Math.max(0, vehiclePrice - downPayment);
  const apr = type === "lease" ? 0.042 : 0.054;
  const monthlyRate = apr / 12;

  let monthlyPayment = 0;
  if (type === "lease") {
    // Residual ~52% after 36 months
    const residual = vehiclePrice * (0.65 - (termMonths / 60) * 0.2);
    const depreciation = (vehiclePrice - downPayment - residual) / termMonths;
    const financeCharge = (vehiclePrice - downPayment + residual) * (apr / 24);
    monthlyPayment = Math.max(800, Math.round(depreciation + financeCharge));
  } else {
    monthlyPayment = Math.round(
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
        (Math.pow(1 + monthlyRate, termMonths) - 1)
    );
  }

  return (
    <section className="py-20 bg-neutral-950 text-white relative border-b border-white/10">
      <div className="w-[95%] max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>PRIVATE CAPITAL & BESPOKE FINANCING</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Bespoke Lease & Acquisition Estimator
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Calculate tailored monthly disbursements with customized down payment tranches and flexible residual structures.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setType("lease")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer ${
                type === "lease" ? "bg-white text-black" : "text-neutral-400 hover:text-white"
              }`}
            >
              White-Glove Lease
            </button>
            <button
              type="button"
              onClick={() => setType("loan")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer ${
                type === "loan" ? "bg-white text-black" : "text-neutral-400 hover:text-white"
              }`}
            >
              Ownership Loan
            </button>
          </div>
        </div>

        {/* Calculator Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-900/60 p-6 sm:p-10 rounded-3xl border border-white/10 backdrop-blur-xl">
          <div className="lg:col-span-7 space-y-6">
            {/* Vehicle Price */}
            <div>
              <div className="flex justify-between text-xs font-mono text-neutral-400 mb-2">
                <span>VEHICLE ACQUISITION VALUE</span>
                <span className="text-white font-bold">{formatPrice(vehiclePrice)}</span>
              </div>
              <input
                type="range"
                min="180000"
                max="500000"
                step="5000"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
              />
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between text-xs font-mono text-neutral-400 mb-2">
                <span>INITIAL CAPITAL DOWN PAYMENT</span>
                <span className="text-emerald-400 font-bold">{formatPrice(downPayment)}</span>
              </div>
              <input
                type="range"
                min="20000"
                max="150000"
                step="2500"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
              />
            </div>

            {/* Term Months */}
            <div>
              <label className="text-xs font-mono text-neutral-400 block mb-2">
                FINANCING AMORTIZATION TERM
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[24, 36, 48, 60].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTermMonths(t)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      termMonths === t
                        ? "bg-white text-black border-white"
                        : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {t} Months
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Box */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-black/50 border border-white/10 text-center space-y-4">
            <div className="text-xs font-mono text-neutral-400 uppercase">
              ESTIMATED MONTHLY DISBURSEMENT
            </div>
            <div className="text-4xl sm:text-5xl font-display font-extrabold text-emerald-400 font-mono">
              {formatPrice(monthlyPayment)}
              <span className="text-xs text-neutral-400 font-normal"> /mo</span>
            </div>
            <div className="text-xs text-neutral-400">
              *Based on {termMonths} months at {(apr * 100).toFixed(1)}% APR indicative rate
            </div>

            <div className="pt-4 border-t border-white/10 text-left space-y-2 text-xs font-mono text-neutral-400">
              <div className="flex justify-between">
                <span>Total Financed:</span>
                <span className="text-white font-bold">{formatPrice(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Concierge Tax & Title:</span>
                <span className="text-white font-bold">Included</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full mt-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              Apply for Syndicate Pre-Approval
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  X,
  Truck,
  Copy,
  Check,
  Printer,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";

export default function OrderReceiptModal({ isOpen, order, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !order) return null;

  const handleCopy = () => {
    if (order.orderNumber) {
      navigator.clipboard.writeText(order.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
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
            className="relative w-full max-w-2xl rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] shadow-2xl p-6 sm:p-8 overflow-hidden print:border-none print:shadow-none"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-white print:hidden cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Success Hero */}
            <div className="text-center pb-6 border-b border-neutral-200 dark:border-white/10">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                Payment Escrow Secured
              </span>
              <h3 className="mt-2 font-display font-extrabold text-2xl sm:text-3xl text-neutral-900 dark:text-white">
                OEM Parts Order Confirmed
              </h3>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                Your authentic factory components are undergoing automated laser verification prior to enclosed dispatch.
              </p>

              {/* Order Number Box */}
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10">
                <span className="text-xs font-mono text-neutral-400">ORDER NO:</span>
                <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
                  {order.orderNumber}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1 hover:text-sky-500 transition-colors cursor-pointer"
                  title="Copy Order Number"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Tracking & Carrier Dispatch Summary */}
            <div className="py-4 border-b border-neutral-200 dark:border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div>
                <span className="text-neutral-400 block text-[10px]">TRACKING ID</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {order.trackingNumber || "TRQ-EXP-891042"}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[10px]">CARRIER</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {order.carrier || "TORQ Air Express"}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-neutral-400 block text-[10px]">ESTIMATED ARRIVAL</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {order.estimatedDelivery
                    ? new Date(order.estimatedDelivery).toLocaleDateString()
                    : "Within 3 Business Days"}
                </span>
              </div>
            </div>

            {/* Purchased Items List */}
            <div className="py-4 border-b border-neutral-200 dark:border-white/10 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                Purchased OEM Components
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {order.items?.map((it, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs p-2 rounded-xl bg-neutral-50 dark:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={it.image}
                        alt={it.name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-medium text-neutral-900 dark:text-white truncate">
                          {it.name}
                        </div>
                        <div className="text-[10px] font-mono text-neutral-500">
                          {it.partNumber} • Qty: {it.quantity}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-neutral-900 dark:text-white shrink-0 ml-2">
                      ${(it.price * it.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Total Summary */}
            <div className="py-4 border-b border-neutral-200 dark:border-white/10 space-y-1.5 text-xs font-mono text-neutral-600 dark:text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.subtotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Enclosed Freight</span>
                <span>{order.shippingFee === 0 ? "Complimentary" : `$${order.shippingFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${order.taxAmount?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-900 dark:text-white pt-2 border-t border-neutral-200 dark:border-white/10">
                <span>Total Escrow Amount</span>
                <span className="font-display">${order.totalAmount?.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                className="w-full sm:w-auto h-11 px-4 rounded-xl border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Invoice</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/parts/orders"
                  onClick={onClose}
                  className="flex-1 sm:flex-none h-11 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Track Shipment Status</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

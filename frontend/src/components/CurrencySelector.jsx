"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";
import { useCurrency, CURRENCIES } from "@/context/CurrencyContext";

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-neutral-200/80 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-xs font-mono font-medium text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer"
        title="Switch Currency / Crypto"
      >
        <span className="text-xs">{currency.flag}</span>
        <span>{currency.code}</span>
        <ChevronDown className={`w-3 h-3 text-neutral-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click dismiss */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 p-2 shadow-2xl z-50 text-neutral-900 dark:text-white"
            >
              <div className="px-2.5 py-1 text-[10px] font-mono text-neutral-400 uppercase tracking-widest border-b border-neutral-100 dark:border-white/5 mb-1 flex items-center justify-between">
                <span>Select Currency</span>
                <Globe className="w-3 h-3 text-sky-500" />
              </div>

              <div className="space-y-0.5">
                {Object.values(CURRENCIES).map((curr) => {
                  const isSelected = curr.code === currency.code;
                  return (
                    <button
                      key={curr.code}
                      type="button"
                      onClick={() => {
                        setCurrency(curr);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold"
                          : "hover:bg-neutral-100 dark:hover:bg-white/5 text-neutral-700 dark:text-neutral-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{curr.flag}</span>
                        <span>{curr.name}</span>
                      </div>
                      <span className="font-mono text-[11px] text-neutral-400">{curr.symbol}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

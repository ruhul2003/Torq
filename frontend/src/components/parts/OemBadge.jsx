"use client";

import { ShieldCheck, Sparkles, Award, CheckCircle2 } from "lucide-react";

export default function OemBadge({
  brand = "Factory OEM",
  hologramCode,
  condition = "OEM Brand New",
  warrantyYears = 2,
  size = "md",
  showHologram = true,
}) {
  const isBespoke = condition?.includes("Bespoke");

  const sizeClasses = {
    sm: "text-[10px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
    lg: "text-sm px-3.5 py-1.5 gap-2",
  }[size] || "text-xs px-2.5 py-1 gap-1.5";

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {/* OEM Certified Stamp */}
      <div
        className={`inline-flex items-center font-mono font-medium rounded-full border transition-all ${sizeClasses} ${
          isBespoke
            ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400"
            : "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400"
        }`}
      >
        <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-sky-500 dark:text-sky-400" />
        <span className="tracking-tight uppercase font-semibold">
          {brand} Certified
        </span>
      </div>

      {/* Hologram Anti-Counterfeit Serial */}
      {showHologram && hologramCode && (
        <div
          title="Cryptographically verified anti-counterfeit factory hologram"
          className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-neutral-300 dark:border-white/10 bg-neutral-100 dark:bg-white/5 font-mono text-[10px] text-neutral-600 dark:text-neutral-300 tracking-wider uppercase"
        >
          <Sparkles className="w-2.5 h-2.5 text-amber-500" />
          <span>{hologramCode}</span>
        </div>
      )}

      {/* Warranty Pill */}
      {warrantyYears && (
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] tracking-wide">
          <CheckCircle2 className="w-3 h-3" />
          <span>{warrantyYears}Y OEM Warranty</span>
        </div>
      )}
    </div>
  );
}

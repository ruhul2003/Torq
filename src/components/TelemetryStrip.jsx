"use client";

import { ShieldCheck, Truck, CreditCard, Sparkles, Clock, Globe } from "lucide-react";

const PERKS = [
  { icon: Truck, title: "ENCLOSED FREIGHT", desc: "Covered global transport" },
  { icon: ShieldCheck, title: "ESCROW PROTECTED", desc: "Tier-1 bank settlement" },
  { icon: Sparkles, title: "BESPOKE ATELIER", desc: "Custom coachwork" },
  { icon: Clock, title: "RAPID DISPATCH", desc: "Instant title assignment" },
  { icon: Globe, title: "GLOBAL DUTIES", desc: "Full customs clearance" },
];

export default function TelemetryStrip() {
  return (
    <div className="w-full border-y border-neutral-200/80 dark:border-white/10 bg-white/80 dark:bg-black/40 backdrop-blur-md py-4">
      <div className="w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {PERKS.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div key={idx} className="flex items-center gap-3 py-1">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-900 dark:text-white font-bold block">
                    {perk.title}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 block truncate">
                    {perk.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

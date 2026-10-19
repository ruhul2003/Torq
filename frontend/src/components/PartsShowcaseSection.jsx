"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Sparkles, Truck, Wrench, ChevronRight } from "lucide-react";
import { PARTS_INVENTORY } from "@/data/partsInventory";

export default function PartsShowcaseSection() {
  const featuredParts = PARTS_INVENTORY.slice(0, 4);

  return (
    <section className="relative py-24 border-t border-neutral-200/80 dark:border-white/10 bg-white dark:bg-[#07090d] overflow-hidden">
      <div className="w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400 font-mono text-[11px] uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% Certified Factory Original Equipment</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-900 dark:text-white">
              Original Parts & Performance Engineering
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl font-sans">
              Direct from manufacturer archives in Weissach, Maranello, and Woking. Guaranteed authentic carbon-ceramic brakes, titanium exhaust systems, and precision aero.
            </p>
          </div>

          <Link
            href="/parts"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 font-semibold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 self-start md:self-auto cursor-pointer"
          >
            <span>Explore OEM Parts Store</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredParts.map((part) => (
            <Link
              key={part.slug}
              href="/parts"
              className="group relative rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-neutral-50/50 dark:bg-white/[0.02] p-4 flex flex-col justify-between hover:border-neutral-400 dark:hover:border-white/25 hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 mb-4">
                  <img
                    src={part.image}
                    alt={part.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/70 text-white backdrop-blur-md border border-white/10">
                      {part.oemBrand}
                    </span>
                  </div>
                </div>

                <span className="font-mono text-[10px] text-neutral-400 block mb-1">
                  SKU: {part.partNumber}
                </span>

                <h4 className="font-display font-bold text-sm text-neutral-900 dark:text-white line-clamp-2 group-hover:text-sky-500 transition-colors">
                  {part.name}
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-white/5 flex items-center justify-between">
                <span className="font-display font-extrabold text-base text-neutral-950 dark:text-white">
                  ${part.price?.toLocaleString()}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-sky-600 dark:text-sky-400 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Guarantees Strip */}
        <div className="mt-12 p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.02] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-neutral-900 dark:text-white block">
                Zero Counterfeit Policy
              </span>
              <span className="text-neutral-500">
                Laser verified with manufacturer hologram certificates.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-neutral-900 dark:text-white block">
                White-Glove Enclosed Logistics
              </span>
              <span className="text-neutral-500">
                Climate-controlled express transport direct to track or lounge.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-neutral-900 dark:text-white block">
                Factory Direct Fitment
              </span>
              <span className="text-neutral-500">
                Engineered to exact OEM factory tolerances and torque specs.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

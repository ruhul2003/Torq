"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Key, ShieldCheck, Clock, Sparkles, ArrowRight, Gauge, Check } from "lucide-react";

const FEATURED_HIRES = [
  {
    name: "TORQ Apex Hyper GT",
    category: "Hypercar",
    dailyRate: 1850,
    hourlyRate: 235,
    image: "/images/cars/apex-gt.jpg",
    slug: "apex-gt",
    zeroToSixty: "1.78s",
    power: "1,450 HP",
    topSpeed: "235 MPH",
  },
  {
    name: "TORQ Stratos Grand Coupé",
    category: "Grand Tourer",
    dailyRate: 1450,
    hourlyRate: 185,
    image: "/images/cars/stratos-gt.jpg",
    slug: "stratos-gt",
    zeroToSixty: "2.18s",
    power: "1,180 HP",
    topSpeed: "210 MPH",
  },
  {
    name: "TORQ Monolith Executive SUV",
    category: "Luxury SUV",
    dailyRate: 1250,
    hourlyRate: 160,
    image: "/images/cars/monolith.jpg",
    slug: "monolith",
    zeroToSixty: "2.85s",
    power: "920 HP",
    topSpeed: "185 MPH",
  },
];

export default function HireShowcaseSection({ onOpenHire }) {
  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-[#08090C] border-y border-neutral-200/80 dark:border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-mono tracking-widest uppercase mb-3">
              <Key className="w-3.5 h-3.5" />
              <span>TORQ Bespoke Hire Division</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-neutral-950 dark:text-white">
              Experience the Drive. Without Commitment.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl">
              Immerse yourself in precision automotive royalty. From weekend coastal getaways to red-carpet chauffeured arrivals.
            </p>
          </div>

          <Link
            href="/hire"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white dark:bg-white dark:text-black hover:scale-105 transition-all shadow-md group shrink-0"
          >
            <span>Browse Full Hire Fleet</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {FEATURED_HIRES.map((car) => (
            <div
              key={car.slug}
              className="group rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-white/10 bg-neutral-50/50 dark:bg-white/[0.02] hover:border-neutral-400 dark:hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/60 text-white backdrop-blur-md border border-white/20">
                  {car.category}
                </span>

                <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between text-white">
                  <div>
                    <span className="font-display font-bold text-2xl">${car.dailyRate.toLocaleString()}</span>
                    <span className="text-xs font-mono text-neutral-300"> / day</span>
                  </div>
                  <span className="text-[10px] font-mono text-sky-400">or ${car.hourlyRate}/hr</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-neutral-900 dark:text-white">
                    {car.name}
                  </h3>

                  <div className="mt-4 grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-white dark:bg-white/[0.03] border border-neutral-200/60 dark:border-white/5 text-center text-xs">
                    <div>
                      <span className="block text-[9px] font-mono text-neutral-400 uppercase">0-60</span>
                      <span className="font-bold text-neutral-900 dark:text-white">{car.zeroToSixty}</span>
                    </div>
                    <div className="border-x border-neutral-200/60 dark:border-white/10">
                      <span className="block text-[9px] font-mono text-neutral-400 uppercase">Power</span>
                      <span className="font-bold text-neutral-900 dark:text-white">{car.power}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-neutral-400 uppercase">Top Speed</span>
                      <span className="font-bold text-neutral-900 dark:text-white">{car.topSpeed}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200/60 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Zero Liability Included</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => (onOpenHire ? onOpenHire(car) : null)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Reserve</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

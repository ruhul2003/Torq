"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ShieldCheck,
  Zap,
  Gauge,
  Key,
  MapPin,
  Filter,
  Search,
  Sparkles,
  ArrowRight,
  Clock,
  Car as CarIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HireModal from "@/components/HireModal";
import { getCars } from "@/lib/api";

const CATEGORIES = [
  { id: "all", label: "All Fleet" },
  { id: "hypercar", label: "Hypercars" },
  { id: "gt", label: "Grand Tourers" },
  { id: "suv", label: "Luxury SUVs" },
  { id: "bespoke", label: "Bespoke & Track" },
];

export default function CarHirePage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCarForHire, setSelectedCarForHire] = useState(null);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);

  useEffect(() => {
    async function loadFleet() {
      setLoading(true);
      const data = await getCars({ category: selectedCategory, search: searchQuery });
      setCars(data);
      setLoading(false);
    }
    loadFleet();
  }, [selectedCategory, searchQuery]);

  const handleOpenHire = (car) => {
    setSelectedCarForHire(car);
    setIsHireModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#060709] text-neutral-900 dark:text-white transition-colors duration-300">
      <Navbar onOpenReserve={() => setIsHireModalOpen(true)} />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-neutral-200/60 dark:border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-mono tracking-widest uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TORQ Fleet Concierge • Car Hiring System</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-neutral-950 dark:text-white">
                Ultra-Luxury Motoring on Demand.
              </h1>
              <p className="mt-3 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl font-light">
                Experience the world&apos;s most formidable hypercars, grand tourers, and bespoke limousines.
                Available for single-day journeys, executive chauffeur hire, or private track rallies.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/hire/my-bookings"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs font-semibold uppercase tracking-wider hover:bg-neutral-100 dark:hover:bg-white/10 transition-all shadow-sm"
              >
                <Calendar className="w-4 h-4 text-sky-500" />
                <span>My Reservations</span>
              </Link>
            </div>
          </div>

          {/* Filtering and Search Controls */}
          <div className="mt-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-white/10 shadow-sm backdrop-blur-md">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-sm"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] sm:min-w-[320px]">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search model, location, or powertrain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-neutral-100/70 dark:bg-neutral-800/60 border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Catalog Grid */}
      <section className="py-12">
        <div className="w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-12 h-12 rounded-full border-2 border-neutral-300 dark:border-white/20 border-t-sky-500 animate-spin mb-4" />
              <p className="text-sm font-mono text-neutral-500 uppercase tracking-widest">
                Calibrating Fleet Telemetry...
              </p>
            </div>
          ) : cars.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-neutral-300 dark:border-white/10 rounded-3xl p-8">
              <CarIcon className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">No Vehicles Match Criteria</h3>
              <p className="text-sm text-neutral-500 mt-1 max-w-md mx-auto">
                Adjust your category filters or search parameters to view available luxury fleet.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 rounded-full text-xs font-semibold bg-neutral-900 text-white dark:bg-white dark:text-black cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {cars.map((car) => {
                const dailyRate = car.dailyRate || Math.round((car.numericPrice || 200000) / 120);
                const hourlyRate = car.hourlyRate || Math.round(dailyRate / 8);

                return (
                  <motion.div
                    key={car.slug || car.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-neutral-400 dark:hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl"
                  >
                    {/* Image Showcase */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                      <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                          {car.categoryLabel || car.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/90 text-white backdrop-blur-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>AVAILABLE FOR HIRE</span>
                        </span>
                      </div>

                      {/* Bottom Image Info */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                        <div className="flex items-center gap-1.5 text-neutral-300">
                          <MapPin className="w-3.5 h-3.5 text-sky-400" />
                          <span className="truncate max-w-[200px] text-[11px]">
                            {car.location || "TORQ Flagship Lounge, Manhattan"}
                          </span>
                        </div>
                        <span className="font-mono text-amber-300 text-[11px] font-bold">
                          ★ {car.rating || 5.0} ({car.reviewsCount || 12})
                        </span>
                      </div>
                    </div>

                    {/* Details Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display font-bold text-xl text-neutral-900 dark:text-white group-hover:text-sky-500 transition-colors">
                          {car.name}
                        </h3>
                        <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                          {car.description || "Ultra-high performance engineered for sovereign comfort and dynamic track precision."}
                        </p>

                        {/* Specs Grid */}
                        <div className="mt-4 grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-100 dark:border-white/5 text-center">
                          <div>
                            <span className="block text-[10px] font-mono text-neutral-400 uppercase">0-60 MPH</span>
                            <span className="font-display font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                              {car.specs?.zeroToSixty || "2.1s"}
                            </span>
                          </div>
                          <div className="border-x border-neutral-200/60 dark:border-white/10">
                            <span className="block text-[10px] font-mono text-neutral-400 uppercase">Power</span>
                            <span className="font-display font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                              {car.specs?.horsePower || "1,100 HP"}
                            </span>
                          </div>
                          <div>
                            <span className="block text-[10px] font-mono text-neutral-400 uppercase">Top Speed</span>
                            <span className="font-display font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                              {car.specs?.topSpeed || "210 MPH"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Pricing and Action */}
                      <div className="mt-6 pt-4 border-t border-neutral-200/60 dark:border-white/5 flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-display font-bold text-2xl text-neutral-950 dark:text-white">
                              ${dailyRate.toLocaleString()}
                            </span>
                            <span className="text-xs text-neutral-500 font-mono">/ day</span>
                          </div>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            or ${hourlyRate}/hr • Min 1 day
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleOpenHire(car)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 transition-all cursor-pointer shadow-sm group-hover:scale-105 active:scale-95"
                        >
                          <Key className="w-3.5 h-3.5" />
                          <span>Hire Car</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* White-Glove Concierge Guarantee Strip */}
      <section className="py-12 border-t border-neutral-200/60 dark:border-white/5 bg-neutral-100/50 dark:bg-white/[0.01]">
        <div className="w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  Zero Liability Protection
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Full comprehensive road damage and collision coverage included with every luxury hire.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  60-Minute Valet Delivery
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Enclosed transport directly to your hotel, private aviation hangar, or residence.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  Chauffeur or Self-Drive
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Take the steering wheel yourself or engage our multilingual executive security drivers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  Instant Better Auth Check-in
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Seamless biometric and digital credential validation with instant security deposit release.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onOpenReserve={() => setIsHireModalOpen(true)} />

      {/* Hire Reservation Modal */}
      <HireModal
        isOpen={isHireModalOpen}
        car={selectedCarForHire}
        onClose={() => setIsHireModalOpen(false)}
      />
    </div>
  );
}

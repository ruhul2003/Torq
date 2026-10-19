"use client";

import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Layers,
  Disc,
  Flame,
  Cpu,
  Activity,
  Wind,
  CircleDot,
  Compass,
  Zap,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", name: "All Components", icon: Layers },
  { id: "brakes", name: "Brakes & Rotors", icon: Disc },
  { id: "exhaust", name: "Titanium Exhaust", icon: Flame },
  { id: "powertrain", name: "Powertrain & Turbos", icon: Cpu },
  { id: "suspension", name: "Suspension Coilovers", icon: Activity },
  { id: "aerodynamics", name: "Aero & Carbon", icon: Wind },
  { id: "wheels", name: "Forged Wheels", icon: CircleDot },
  { id: "interior", name: "Cockpit & Steering", icon: Compass },
  { id: "electronics", name: "Motorsport ECUs", icon: Zap },
];

const BRANDS = [
  "All Brands",
  "Porsche Tequipment",
  "Ferrari Genuine",
  "McLaren MSO",
  "Lamborghini Squadra",
  "Akrapovič Titanium",
  "Brembo Racing",
  "BBS Motorsport",
  "Bilstein Motorsport",
  "Öhlins Racing",
  "Mercedes-AMG",
  "BMW M Motorsport",
  "Aston Martin Heritage",
  "Torq Bespoke Performance",
];

export default function PartsFilterBar({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  activeBrand,
  onBrandChange,
  inStockOnly,
  onInStockChange,
  sortOption,
  onSortChange,
  onClearFilters,
  totalResults = 0,
}) {
  const hasActiveFilters =
    searchQuery ||
    activeCategory !== "all" ||
    (activeBrand && activeBrand !== "All Brands") ||
    inStockOnly;

  return (
    <div className="w-full flex flex-col gap-4 mb-8">
      {/* Search Input & Controls Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search parts by name, OEM SKU (e.g. OEM-POR-992), brand, or model..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] text-xs sm:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Brand Selector */}
        <div className="relative min-w-[190px]">
          <select
            value={activeBrand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all appearance-none cursor-pointer"
          >
            {BRANDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">
            ▼
          </div>
        </div>

        {/* Sort Options */}
        <div className="relative min-w-[180px]">
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all appearance-none cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated (5.0★)</option>
          </select>
          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs">
            ▼
          </div>
        </div>

        {/* In-Stock Toggle */}
        <button
          type="button"
          onClick={() => onInStockChange(!inStockOnly)}
          className={`h-11 px-4 rounded-xl border font-mono text-xs tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
            inStockOnly
              ? "border-sky-500 bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold"
              : "border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-white/20"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              inStockOnly ? "bg-sky-500 animate-pulse" : "bg-neutral-400"
            }`}
          />
          <span>In Stock Only</span>
        </button>
      </div>

      {/* Category Horizontal Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold shadow-sm"
                  : "bg-white/80 dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-300 border border-neutral-200/80 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Results Count & Clear Filter Action */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400 px-1">
        <span>Showing {totalResults} certified OEM components</span>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}

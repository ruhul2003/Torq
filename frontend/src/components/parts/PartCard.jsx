"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import OemBadge from "./OemBadge";
import {
  ShoppingBag,
  Eye,
  Check,
  CheckCircle2,
  AlertCircle,
  Truck,
  Layers,
} from "lucide-react";

export default function PartCard({ part, onOpenDetail }) {
  const { addToCart, selectedVehicleFitment } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  // Check compatibility with active vehicle filter
  const isCompatible = selectedVehicleFitment
    ? part.compatibility?.some(
        (c) =>
          c.toLowerCase().includes(selectedVehicleFitment.toLowerCase()) ||
          selectedVehicleFitment.toLowerCase().includes(c.toLowerCase())
      )
    : null;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(part, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const discount = part.originalPrice
    ? Math.round(((part.originalPrice - part.price) / part.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => onOpenDetail && onOpenDetail(part)}
      className="group relative flex flex-col rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white dark:bg-[#0c0e14] overflow-hidden hover:shadow-xl hover:border-neutral-400 dark:hover:border-white/25 transition-all duration-300 cursor-pointer"
    >
      {/* Image Thumbnail with Overlay Badges */}
      <div className="relative w-full aspect-[16/10] bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
        <img
          src={part.image}
          alt={part.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <OemBadge
            brand={part.oemBrand}
            hologramCode={part.hologramCode}
            condition={part.condition}
            warrantyYears={part.specs?.warrantyYears || 2}
            size="sm"
          />

          {discount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold tracking-tight shadow-md">
              Save {discount}%
            </span>
          )}
        </div>

        {/* Bottom Part SKU & Category Pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90">
          <span className="font-mono text-[11px] font-semibold tracking-wider bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
            {part.partNumber}
          </span>
          <span className="text-[11px] font-mono tracking-tight text-neutral-300 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">
            {part.categoryLabel || part.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Vehicle Fitment Tag if active */}
          {selectedVehicleFitment && (
            <div className="mb-2">
              {isCompatible ? (
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Guaranteed Direct Fit for your vehicle</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-mono text-[11px]">
                  <AlertCircle className="w-3 h-3" />
                  <span>Check Fitment Compatibility</span>
                </div>
              )}
            </div>
          )}

          {/* Part Title */}
          <h4 className="font-display font-bold text-sm sm:text-base text-neutral-900 dark:text-white line-clamp-2 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
            {part.name}
          </h4>

          {/* Subcategory & Material */}
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
            {part.subcategory} • {part.specs?.material || "Aerospace Grade Alloy"}
          </p>

          {/* Compatibility Preview */}
          <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-600 dark:text-neutral-400 font-mono">
            <Layers className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate">
              Fits: {part.compatibility ? part.compatibility.slice(0, 2).join(", ") : "Various Exotic Models"}
              {part.compatibility?.length > 2 ? ` +${part.compatibility.length - 2} more` : ""}
            </span>
          </div>
        </div>

        {/* Pricing & Cart Action Bar */}
        <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-white/10 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-base sm:text-lg text-neutral-950 dark:text-white">
                ${part.price?.toLocaleString()}
              </span>
              {part.originalPrice && (
                <span className="font-mono text-xs text-neutral-400 line-through">
                  ${part.originalPrice?.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
              <Truck className="w-3 h-3" />
              <span>White-Glove Express</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail && onOpenDetail(part);
              }}
              className="p-2 rounded-xl border border-neutral-200 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
              title="View Technical Specs"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={part.stockQuantity === 0}
              className={`h-9 px-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-all duration-200 shadow-sm cursor-pointer ${
                justAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 active:scale-95"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import OemBadge from "./OemBadge";
import {
  X,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  Cpu,
  Layers,
  Wrench,
  Globe2,
  Calendar,
} from "lucide-react";

export default function PartDetailModal({ isOpen, part, onClose }) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!isOpen || !part) return null;

  const images = part.gallery && part.gallery.length > 0 ? part.gallery : [part.image];

  const handleAdd = () => {
    addToCart(part, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Container */}
        <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-4xl rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              {/* Left Column: Image Gallery */}
              <div className="md:col-span-6 bg-neutral-100 dark:bg-neutral-900 p-6 flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-inner border border-neutral-200/50 dark:border-white/10">
                    <img
                      src={images[selectedImage] || part.image}
                      alt={part.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute bottom-3 left-3">
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-black/70 text-white backdrop-blur-md border border-white/10">
                        {part.partNumber}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnails if multiple */}
                  {images.length > 1 && (
                    <div className="flex gap-2 mt-3">
                      {images.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedImage(idx)}
                          className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            selectedImage === idx
                              ? "border-sky-500 scale-105"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Logistics & Trust Strip */}
                <div className="mt-6 pt-5 border-t border-neutral-200 dark:border-white/10 grid grid-cols-3 gap-2 text-center text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-sky-500" />
                    <span>White-Glove Enclosed</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Hologram Verified</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-4 h-4 text-amber-500" />
                    <span>30-Day Guarantee</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Technical Specs & Actions */}
              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
                <div>
                  <div className="mb-2">
                    <OemBadge
                      brand={part.oemBrand}
                      hologramCode={part.hologramCode}
                      condition={part.condition}
                      warrantyYears={part.specs?.warrantyYears || 3}
                      size="sm"
                    />
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-neutral-900 dark:text-white leading-tight">
                    {part.name}
                  </h3>

                  <p className="mt-1 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    SKU: {part.partNumber} • Category: {part.categoryLabel || part.category}
                  </p>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-display font-extrabold text-2xl sm:text-3xl text-neutral-950 dark:text-white">
                      ${part.price?.toLocaleString()}
                    </span>
                    {part.originalPrice && (
                      <span className="font-mono text-sm text-neutral-400 line-through">
                        ${part.originalPrice?.toLocaleString()}
                      </span>
                    )}
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      In Stock ({part.stockQuantity || 5} Available)
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {part.description}
                  </p>

                  {/* Engineering Specifications Grid */}
                  <div className="mt-5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.02] p-4">
                    <h5 className="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-sky-500" />
                      <span>Technical Specification Profile</span>
                    </h5>
                    <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
                      <div>
                        <span className="text-neutral-400 block text-[10px] font-mono">MATERIAL</span>
                        <span className="font-medium text-neutral-800 dark:text-neutral-200">
                          {part.specs?.material || "Aerospace Grade Alloy"}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px] font-mono">NET WEIGHT</span>
                        <span className="font-medium text-neutral-800 dark:text-neutral-200">
                          {part.specs?.weight || "4.5 kg"}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px] font-mono">ORIGIN FACILITY</span>
                        <span className="font-medium text-neutral-800 dark:text-neutral-200">
                          {part.specs?.origin || "Germany / Italy"}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[10px] font-mono">INSTALLATION</span>
                        <span className="font-medium text-neutral-800 dark:text-neutral-200">
                          {part.installationDifficulty || "Professional"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Verified Vehicle Compatibility List */}
                  <div className="mt-4">
                    <h5 className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Guaranteed Compatible Vehicles</span>
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {part.compatibility?.map((model) => (
                        <span
                          key={model}
                          className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 font-mono text-[11px]"
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="mt-6 pt-5 border-t border-neutral-200 dark:border-white/10 flex items-center gap-3">
                  {/* Quantity Counter */}
                  <div className="flex items-center rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 h-11 px-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-mono text-sm font-semibold">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(part.stockQuantity || 10, quantity + 1))}
                      className="w-7 h-7 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add To Cart Button */}
                  <button
                    type="button"
                    onClick={handleAdd}
                    className={`flex-1 h-11 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      added
                        ? "bg-emerald-600 text-white"
                        : "bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 shadow-md active:scale-95"
                    }`}
                  >
                    {added ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart (${(part.price * quantity).toLocaleString()})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

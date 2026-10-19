"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";

export default function CartDrawer({ onProceedToCheckout }) {
  const {
    items,
    cartCount,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (!isCartOpen) return null;

  const shippingFee = subtotal > 10000 || items.length === 0 ? 0 : 250;
  const estimatedTax = Math.round(subtotal * 0.08875);
  const grandTotal = subtotal + shippingFee + estimatedTax;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    if (onProceedToCheckout) onProceedToCheckout();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="w-screen max-w-md bg-white dark:bg-[#0c0e14] border-l border-neutral-200 dark:border-white/10 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 border-b border-neutral-200 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-bold text-xs">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-neutral-900 dark:text-white">
                    Parts Order Bag
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-500">
                    {cartCount} {cartCount === 1 ? "Component" : "Components"} Selected
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[11px] font-mono text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-white/5 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 opacity-40" />
                  </div>
                  <h4 className="font-display font-bold text-neutral-800 dark:text-neutral-200 mb-1">
                    Your Parts Cart is Empty
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-xs mb-6">
                    Browse our certified original equipment parts catalog for genuine factory components and performance kits.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold text-xs tracking-wider uppercase cursor-pointer"
                  >
                    Browse OEM Catalog
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item._id || item.partNumber}
                    className="flex gap-3.5 p-3 rounded-2xl border border-neutral-100 dark:border-white/5 bg-neutral-50/50 dark:bg-white/[0.02]"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h5 className="font-display font-bold text-xs sm:text-sm text-neutral-900 dark:text-white line-clamp-1">
                            {item.name}
                          </h5>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item._id || item.partNumber)}
                            className="text-neutral-400 hover:text-red-500 transition-colors p-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] font-mono text-neutral-500 truncate mt-0.5">
                          {item.oemBrand} • {item.partNumber}
                        </p>
                      </div>

                      {/* Pricing & Quantity Controls */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-200/60 dark:border-white/5">
                        <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white">
                          ${(item.price * (item.quantity || 1)).toLocaleString()}
                        </span>

                        <div className="flex items-center rounded-lg border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] h-7 px-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item._id || item.partNumber,
                                (item.quantity || 1) - 1
                              )
                            }
                            className="p-1 text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="w-6 text-center font-mono text-xs font-semibold">
                            {item.quantity || 1}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item._id || item.partNumber,
                                (item.quantity || 1) + 1
                              )
                            }
                            className="p-1 text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.02]">
                <div className="space-y-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 mb-4">
                  <div className="flex justify-between">
                    <span>Component Subtotal</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3 text-sky-500" />
                      <span>White-Glove Enclosed Delivery</span>
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {shippingFee === 0 ? "COMPLIMENTARY" : `$${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax (NY 8.875%)</span>
                    <span>${estimatedTax.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-neutral-200 dark:border-white/10 flex justify-between text-sm font-bold text-neutral-950 dark:text-white">
                    <span>Order Total</span>
                    <span className="font-display">${grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full h-12 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <span>Proceed to White-Glove Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

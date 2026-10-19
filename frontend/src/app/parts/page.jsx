"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FitmentChecker from "@/components/parts/FitmentChecker";
import PartsFilterBar from "@/components/parts/PartsFilterBar";
import PartCard from "@/components/parts/PartCard";
import PartDetailModal from "@/components/parts/PartDetailModal";
import CartDrawer from "@/components/parts/CartDrawer";
import PartCheckoutModal from "@/components/parts/PartCheckoutModal";
import OrderReceiptModal from "@/components/parts/OrderReceiptModal";
import AuthenticityLookup from "@/components/parts/AuthenticityLookup";
import { getParts } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import {
  ShieldCheck,
  Truck,
  Sparkles,
  ShoppingBag,
  Layers,
  Wrench,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

export default function PartsPage() {
  const { isCartOpen, setIsCartOpen, cartCount } = useCart();

  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeBrand, setActiveBrand] = useState("All Brands");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOption, setSortOption] = useState("featured");
  const [vehicleFitmentFilter, setVehicleFitmentFilter] = useState("");

  // Modals
  const [selectedPart, setSelectedPart] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Fetch Parts on filter change
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const filters = {
          category: activeCategory,
          brand: activeBrand,
          inStock: inStockOnly,
          search: searchQuery,
          vehicle: vehicleFitmentFilter,
          sort: sortOption,
        };
        const data = await getParts(filters);
        if (isMounted) {
          setParts(data || []);
        }
      } catch (err) {
        console.warn("Failed to load parts catalog:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [
    searchQuery,
    activeCategory,
    activeBrand,
    inStockOnly,
    sortOption,
    vehicleFitmentFilter,
  ]);

  const handleOpenDetail = (part) => {
    setSelectedPart(part);
    setIsDetailModalOpen(true);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setActiveBrand("All Brands");
    setInStockOnly(false);
    setSortOption("featured");
    setVehicleFitmentFilter("");
  };

  const handleOrderComplete = (order) => {
    setCompletedOrder(order);
    setIsReceiptOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#060709] text-neutral-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <Navbar onOpenReserve={() => {}} />

      {/* Floating Cart Trigger Pill */}
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 shadow-2xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer font-semibold text-xs tracking-wider uppercase border border-white/10"
      >
        <ShoppingBag className="w-4 h-4 text-sky-400" />
        <span>Cart Bag</span>
        {cartCount > 0 && (
          <span className="w-5 h-5 rounded-full bg-sky-500 text-white text-[11px] font-mono flex items-center justify-center font-bold">
            {cartCount}
          </span>
        )}
      </button>

      {/* Main Content Area */}
      <main className="w-[95%] max-w-[1720px] mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
        {/* Luxury Hero Header */}
        <section className="relative rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-white/10 bg-gradient-to-br from-neutral-900 via-black to-[#090b10] text-white p-8 sm:p-14 mb-10 shadow-2xl">
          <div className="absolute inset-0 opacity-15 tech-grid pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/30 bg-sky-500/10 text-sky-400 font-mono text-[11px] uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Certified Factory Original Equipment</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08]">
              Original Supercar Parts & Performance Components
            </h1>

            <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed font-sans max-w-2xl">
              Direct access to Weissach, Maranello, Woking, and Sant'Agata OEM engineering archives. Guaranteed authentic carbon-ceramic brakes, titanium exhaust systems, forged centerlock wheels, and bespoke aerodynamic assemblies.
            </p>

            {/* Trust Badges Bar */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>100% Factory OEM Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Enclosed White-Glove Air Cargo</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Laser Hologram Anti-Counterfeit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>3-Year Direct OEM Warranty</span>
              </div>
            </div>
          </div>
        </section>

        {/* Precision Vehicle Fitment Checker */}
        <section>
          <FitmentChecker
            activeVehicle={vehicleFitmentFilter}
            onFilterByVehicle={(veh) => setVehicleFitmentFilter(veh)}
          />
        </section>

        {/* Search, Filter Toolbar & Category Pills */}
        <section>
          <PartsFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            activeBrand={activeBrand}
            onBrandChange={setActiveBrand}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
            sortOption={sortOption}
            onSortChange={setSortOption}
            onClearFilters={handleClearFilters}
            totalResults={parts.length}
          />
        </section>

        {/* Parts Grid */}
        <section className="mt-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-neutral-200 dark:border-white/5 bg-white dark:bg-[#0c0e14] p-4 h-96 animate-pulse"
                >
                  <div className="w-full aspect-[16/10] bg-neutral-200 dark:bg-neutral-800 rounded-xl mb-4" />
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2 mb-6" />
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
                </div>
              ))}
            </div>
          ) : parts.length === 0 ? (
            <div className="text-center py-20 rounded-3xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] p-8">
              <Layers className="w-12 h-12 mx-auto text-neutral-300 dark:text-neutral-700 mb-4" />
              <h3 className="font-display font-bold text-xl text-neutral-900 dark:text-white mb-2">
                No Certified Components Match Your Filter Criteria
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto mb-6">
                Try widening your vehicle model selection, clearing brand tags, or checking alternate chassis categories.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-6 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold text-xs tracking-wider uppercase cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {parts.map((part) => (
                <PartCard
                  key={part._id || part.partNumber}
                  part={part}
                  onOpenDetail={handleOpenDetail}
                />
              ))}
            </div>
          )}
        </section>

        {/* Hologram Anti-Counterfeit Verification Tool Section */}
        <section className="mt-16">
          <AuthenticityLookup />
        </section>
      </main>

      {/* Footer */}
      <Footer onOpenReserve={() => {}} />

      {/* Part Technical Detail Modal */}
      <PartDetailModal
        isOpen={isDetailModalOpen}
        part={selectedPart}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Shopping Cart Slide-over Drawer */}
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />

      {/* White-Glove Parts Checkout Modal */}
      <PartCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderComplete={handleOrderComplete}
      />

      {/* Digital Invoice / Order Receipt Modal */}
      <OrderReceiptModal
        isOpen={isReceiptOpen}
        order={completedOrder}
        onClose={() => setIsReceiptOpen(false)}
      />
    </div>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PartOrdersHistory from "@/components/parts/PartOrdersHistory";
import AuthenticityLookup from "@/components/parts/AuthenticityLookup";
import Link from "next/link";
import { Package, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";

export default function PartOrdersPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#060709] text-neutral-900 dark:text-white transition-colors duration-300">
      <Navbar onOpenReserve={() => {}} />

      <main className="w-[95%] max-w-[1440px] mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-20">
        {/* Breadcrumb & Navigation Back */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 dark:hover:text-white">
              TORQ
            </Link>
            <span>/</span>
            <Link href="/parts" className="hover:text-neutral-900 dark:hover:text-white">
              Original Parts
            </Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white font-semibold">Orders & Tracking</span>
          </div>

          <Link
            href="/parts"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-sky-500 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Parts Catalog</span>
          </Link>
        </div>

        {/* Dashboard Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/10 text-sky-500 font-mono text-[11px] uppercase tracking-wider mb-3">
            <Package className="w-3.5 h-3.5" />
            <span>Logistics Dispatch Telemetry</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-neutral-900 dark:text-white">
            Customer OEM Parts Orders & Tracking
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl">
            Review your authentic factory component orders, track white-glove enclosed transport carriers, and access holographic verification certificates.
          </p>
        </div>

        {/* Orders History Component */}
        <section className="mb-14">
          <PartOrdersHistory />
        </section>

        {/* Hologram Anti-Counterfeit Verification Tool */}
        <section>
          <AuthenticityLookup />
        </section>
      </main>

      <Footer onOpenReserve={() => {}} />
    </div>
  );
}

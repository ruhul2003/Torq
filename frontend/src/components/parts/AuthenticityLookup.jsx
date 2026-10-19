"use client";

import { useState } from "react";
import { verifyPartCertificate } from "@/lib/api";
import {
  ShieldCheck,
  Search,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Award,
  RefreshCw,
} from "lucide-react";

export default function AuthenticityLookup() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    try {
      const res = await verifyPartCertificate({
        hologramCode: code.trim(),
        partNumber: code.trim(),
      });
      setResult(res);
    } catch (err) {
      setResult({
        authentic: false,
        message: "Verification service currently unreachable.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-3xl border border-neutral-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200/80 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-neutral-900 dark:text-white">
              Holographic OEM Anti-Counterfeit Registry
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Verify your physical part authenticity certificate serial or SKU against the TORQ Global OEM Registry.
            </p>
          </div>
        </div>

        <span className="font-mono text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 self-start md:self-auto">
          Cryptographically Sealed
        </span>
      </div>

      {/* Input Form */}
      <form onSubmit={handleVerify} className="mt-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Enter Hologram Code (e.g. TRQ-OEM-POR-992-8821) or SKU..."
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] text-xs sm:text-sm font-mono uppercase text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !code.trim()}
          className="h-12 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 shrink-0"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <ShieldCheck className="w-4 h-4" />
          )}
          <span>Verify Genuine Seal</span>
        </button>
      </form>

      {/* Verification Result Display */}
      {result && (
        <div className="mt-6">
          {result.authentic ? (
            <div className="relative rounded-2xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/[0.04] via-transparent to-sky-500/[0.04] p-6 shadow-inner">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
                      VERIFICATION SUCCESSFUL
                    </span>
                    <h4 className="font-display font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
                      {result.certificate?.partName}
                    </h4>
                  </div>
                </div>

                <div className="text-right font-mono text-xs text-neutral-500">
                  <span>Serial: </span>
                  <span className="text-amber-500 font-bold">{result.certificate?.hologramCode}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs font-mono">
                <div>
                  <span className="text-neutral-400 block text-[10px]">OEM BRAND</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {result.certificate?.oemBrand}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">MANUFACTURE ORIGIN</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {result.certificate?.origin}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">LASER PRECISION SCAN</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {result.certificate?.inspectionStatus}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[10px]">ISSUED BY</span>
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    TORQ Logistics Vault
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-xs text-rose-700 dark:text-rose-400 font-mono">
              <AlertTriangle className="w-5 h-5 shrink-0 text-rose-500" />
              <span>
                {result.message ||
                  "Unrecognized OEM code. If this part was obtained outside TORQ authorized logistics, inspect physical packaging for counter-signatures."}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

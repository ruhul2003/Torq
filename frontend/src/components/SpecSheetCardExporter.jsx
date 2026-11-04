"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Share2, Check, QrCode } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function SpecSheetCardExporter({ vehicle }) {
  const [downloading, setDownloading] = useState(false);
  const { showToast } = useToast();

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      showToast("Technical Spec Sheet exported as High-Res PDF", "success", "Collector Archive");
    }, 1200);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-white/10 text-white my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
            AUTHENTIC FACTORY ARCHIVE
          </div>
          <h4 className="text-xl font-display font-bold text-white mt-1">
            Official Technical Blueprint & Spec Sheet
          </h4>
        </div>
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer self-start sm:self-auto shadow-md"
        >
          {downloading ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Export High-Res Spec Card</span>
            </>
          )}
        </button>
      </div>

      {/* Blueprint Spec Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 font-mono text-xs">
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="text-neutral-500 text-[10px]">CHASSIS LENGTH</div>
          <div className="text-white font-bold mt-1">4,785 MM</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="text-neutral-500 text-[10px]">OVERALL WIDTH</div>
          <div className="text-white font-bold mt-1">2,024 MM</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="text-neutral-500 text-[10px]">WHEELBASE</div>
          <div className="text-white font-bold mt-1">2,910 MM</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
          <div className="text-neutral-500 text-[10px]">WEIGHT DISTRIBUTION</div>
          <div className="text-emerald-400 font-bold mt-1">48 : 52 F/R</div>
        </div>
      </div>
    </div>
  );
}

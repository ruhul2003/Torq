"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Ship, MapPin, CheckCircle, Clock, ShieldCheck } from "lucide-react";

const STAGES = [
  { label: "Bespoke Inspection & PDI", location: "Stuttgart Factory, DE", status: "completed", time: "Oct 28" },
  { label: "Enclosed Climate Container Sealing", location: "Frankfurt Hub, DE", status: "completed", time: "Oct 29" },
  { label: "Air Cargo Flight TRQ-77", location: "Transatlantic Transit", status: "active", time: "In Flight" },
  { label: "US Customs & Diplomatic Escort", location: "JFK Terminal, NYC", status: "pending", time: "Expected 14:00" },
  { label: "White-Glove Flatbed Delivery", location: "Client Private Residence", status: "pending", time: "Expected 18:00" },
];

export default function GlobalLogisticsTracker() {
  const [activeTab, setActiveTab] = useState("flight");

  return (
    <section className="py-20 bg-neutral-950 text-white relative border-b border-white/10">
      <div className="w-[95%] max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400 mb-3">
              <Plane className="w-3.5 h-3.5" />
              <span>WHITE-GLOVE LOGISTICS DISPATCH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Global Enclosed Freight Radar
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Real-time telemetry tracking for client bespoke vehicle deliveries and high-priority OEM crate shipments.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab("flight")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer ${
                activeTab === "flight" ? "bg-white text-black" : "text-neutral-400 hover:text-white"
              }`}
            >
              Air Freight 777F
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("sea")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer ${
                activeTab === "sea" ? "bg-white text-black" : "text-neutral-400 hover:text-white"
              }`}
            >
              Maritime Carrier
            </button>
          </div>
        </div>

        {/* Tracker Viewport */}
        <div className="p-6 sm:p-10 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl">
          {/* Tracking flight banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase">WAYBILL CONSIGNMENT</span>
              <div className="text-lg font-mono font-bold text-white">#TRQ-CARGO-7749-FRA-JFK</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">CONTAINER CLIMATE</span>
                <div className="text-sm font-mono text-emerald-400 font-bold">19.2°C • 45% RH</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">SHOCK TELEMETRY</span>
                <div className="text-sm font-mono text-sky-400 font-bold">&lt; 0.04 G (NOMINAL)</div>
              </div>
            </div>
          </div>

          {/* Timeline steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {STAGES.map((st, i) => (
              <div key={i} className="relative flex flex-col items-start p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  {st.status === "completed" ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : st.status === "active" ? (
                    <span className="w-3 h-3 rounded-full bg-sky-400 animate-ping shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-neutral-600 shrink-0" />
                  )}
                  <span className="text-[11px] font-mono text-neutral-400">{st.time}</span>
                </div>
                <div className="text-xs font-bold text-white leading-tight">{st.label}</div>
                <div className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-sky-400" />
                  <span>{st.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

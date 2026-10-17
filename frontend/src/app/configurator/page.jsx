"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, ArrowRight, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PreorderModal from "@/components/PreorderModal";

const MODELS = [
  {
    id: "apex-gt",
    name: "TORQ Apex Hyper GT",
    basePrice: 245000,
    baseHp: 1450,
    base060: "1.78s",
    baseRange: 620,
    tag: "Hypercar",
  },
  {
    id: "stratos-gt",
    name: "TORQ Stratos Grand Coupé",
    basePrice: 185000,
    baseHp: 1180,
    base060: "2.18s",
    baseRange: 660,
    tag: "Gran Turismo",
  },
  {
    id: "phantom-nero",
    name: "TORQ Phantom Nero",
    basePrice: 320000,
    baseHp: 1600,
    base060: "1.69s",
    baseRange: 600,
    tag: "Limited 1 of 25",
  },
  {
    id: "monolith",
    name: "TORQ Monolith Cyber-SUV",
    basePrice: 165000,
    baseHp: 1050,
    base060: "2.90s",
    baseRange: 580,
    tag: "Cyber-SUV",
  },
  {
    id: "valkyrie-roadster",
    name: "TORQ Valkyrie Roadster",
    basePrice: 290000,
    baseHp: 1350,
    base060: "1.82s",
    baseRange: 610,
    tag: "Open Hypercar",
  },
  {
    id: "celestial-lwb",
    name: "TORQ Celestial LWB",
    basePrice: 210000,
    baseHp: 1100,
    base060: "2.85s",
    baseRange: 680,
    tag: "Executive Saloon",
  },
  {
    id: "ghost-spyder",
    name: "TORQ Ghost Spyder",
    basePrice: 275000,
    baseHp: 1400,
    base060: "1.74s",
    baseRange: 590,
    tag: "Barchetta",
  },
  {
    id: "safari-overland",
    name: "TORQ Safari Overland",
    basePrice: 175000,
    baseHp: 1000,
    base060: "3.10s",
    baseRange: 640,
    tag: "Expedition 4x4",
  },
  {
    id: "lemans-gte",
    name: "TORQ Le Mans GTE",
    basePrice: 380000,
    baseHp: 1700,
    base060: "1.62s",
    baseRange: 560,
    tag: "Homologation",
  },
];

const PAINTS = [
  { id: "obsidian", name: "Obsidian Black", hex: "#0b0c10", price: 0 },
  { id: "ceramic", name: "Ceramic White", hex: "#f8fafc", price: 0 },
  { id: "silver", name: "Kinetic Silver", hex: "#94a3b8", price: 3500 },
  { id: "cyan", name: "Hyper Cyan", hex: "#38bdf8", price: 4800 },
  { id: "graphite", name: "Stealth Graphite", hex: "#334155", price: 4200 },
];

const WHEELS = [
  { id: "20-aero", name: '20" AeroDisc', price: 0 },
  { id: "21-turbofan", name: '21" Turbofan Alloy', price: 5500 },
  { id: "22-carbon", name: '22" Carbon Matrix', price: 9500 },
];

const INTERIORS = [
  { id: "titanium", name: "Titanium & Alcantara", price: 0 },
  { id: "nordic-white", name: "Ceramic White Hide", price: 4200 },
  { id: "saddle-tan", name: "Cognac Aniline Leather", price: 5500 },
];

export default function ConfiguratorPage() {
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [selectedPaint, setSelectedPaint] = useState(PAINTS[0]);
  const [selectedWheel, setSelectedWheel] = useState(WHEELS[0]);
  const [selectedInterior, setSelectedInterior] = useState(INTERIORS[0]);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  const totalPrice =
    selectedModel.basePrice +
    selectedPaint.price +
    selectedWheel.price +
    selectedInterior.price;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#060709] text-neutral-900 dark:text-white transition-colors duration-300">
      <Navbar onOpenReserve={() => setIsReserveModalOpen(true)} />

      <main className="pt-28 pb-20 w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Showroom</span>
          </Link>
        </div>

        <div className="mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-sky-500 font-semibold block mb-1">
            BESPOKE ATELIER
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight">
            Tailor Your Spec.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Visual Customizer Preview */}
          <div className="lg:col-span-7">
            <div className="sticky top-28">
              <div className="relative rounded-3xl border border-neutral-200 dark:border-white/10 p-6 sm:p-8 shadow-xl overflow-hidden bg-neutral-900 dark:bg-black">
                <div className="flex items-center justify-between text-xs font-mono mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: selectedPaint.hex }}
                    />
                    <span className="uppercase text-neutral-300 font-semibold">
                      {selectedPaint.name}
                    </span>
                  </div>
                  <span className="text-sky-400 uppercase font-semibold">
                    {selectedModel.name}
                  </span>
                </div>

                {/* Real Photorealistic Vehicle Image with Subtle Reactive Tint */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-950 shadow-inner">
                  <img
                    src={`/images/cars/${selectedModel.id}.jpg`}
                    alt={selectedModel.name}
                    className="w-full h-full object-cover object-center transition-all duration-500"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-color opacity-25 transition-all duration-500"
                    style={{ backgroundColor: selectedPaint.hex }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 mt-4 border-t border-white/10 text-center">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-0.5">
                      0–60 MPH
                    </span>
                    <span className="text-xl sm:text-2xl font-display font-bold text-white">
                      {selectedModel.base060}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-0.5">
                      HORSEPOWER
                    </span>
                    <span className="text-xl sm:text-2xl font-display font-bold text-white">
                      {selectedModel.baseHp} HP
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-0.5">
                      RANGE
                    </span>
                    <span className="text-xl sm:text-2xl font-display font-bold text-white">
                      {selectedModel.baseRange} mi
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & Acquisition Action */}
              <div className="mt-6 p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/80 shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                    TOTAL PURCHASE VALUATION
                  </span>
                  <span className="text-2xl sm:text-3xl font-display font-black text-neutral-900 dark:text-white">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsReserveModalOpen(true)}
                  className="px-6 py-3 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Acquire Vehicle</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Steps */}
          <div className="lg:col-span-5 space-y-6">
            {/* Step 1: Model */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-sky-500 font-semibold block mb-2.5">
                01 // SELECT VEHICLE MODEL ({MODELS.length} AVAILABLE)
              </span>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {MODELS.map((model) => {
                  const isSelected = selectedModel.id === model.id;
                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => setSelectedModel(model)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-sky-500 bg-sky-500/5 dark:bg-sky-500/10 shadow-sm"
                          : "border-neutral-200 dark:border-white/10 hover:border-neutral-300"
                      }`}
                    >
                      <div>
                        <span className="font-display font-bold text-sm text-neutral-900 dark:text-white block">
                          {model.name}
                        </span>
                        <span className="text-xs text-neutral-500">
                          {model.tag} • {model.baseHp} HP
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white">
                        ${model.basePrice.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Paint */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-sky-500 font-semibold block mb-2.5">
                02 // EXTERIOR FINISH
              </span>
              <div className="grid grid-cols-2 gap-2">
                {PAINTS.map((paint) => {
                  const isSelected = selectedPaint.id === paint.id;
                  return (
                    <button
                      key={paint.id}
                      type="button"
                      onClick={() => setSelectedPaint(paint)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                        isSelected
                          ? "border-sky-500 bg-sky-500/5 dark:bg-sky-500/10 shadow-sm"
                          : "border-neutral-200 dark:border-white/10"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: paint.hex }}
                      />
                      <div className="truncate">
                        <span className="text-xs font-semibold block truncate">
                          {paint.name}
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          {paint.price === 0 ? "Standard" : `+$${paint.price.toLocaleString()}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Wheels */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-sky-500 font-semibold block mb-2.5">
                03 // WHEELS
              </span>
              <div className="space-y-2">
                {WHEELS.map((wheel) => {
                  const isSelected = selectedWheel.id === wheel.id;
                  return (
                    <button
                      key={wheel.id}
                      type="button"
                      onClick={() => setSelectedWheel(wheel)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-sky-500 bg-sky-500/5 dark:bg-sky-500/10 shadow-sm"
                          : "border-neutral-200 dark:border-white/10"
                      }`}
                    >
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">
                        {wheel.name}
                      </span>
                      <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white">
                        {wheel.price === 0 ? "Included" : `+$${wheel.price.toLocaleString()}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Interior */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-sky-500 font-semibold block mb-2.5">
                04 // INTERIOR UPHOLSTERY
              </span>
              <div className="space-y-2">
                {INTERIORS.map((interior) => {
                  const isSelected = selectedInterior.id === interior.id;
                  return (
                    <button
                      key={interior.id}
                      type="button"
                      onClick={() => setSelectedInterior(interior)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "border-sky-500 bg-sky-500/5 dark:bg-sky-500/10 shadow-sm"
                          : "border-neutral-200 dark:border-white/10"
                      }`}
                    >
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">
                        {interior.name}
                      </span>
                      <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white">
                        {interior.price === 0 ? "Included" : `+$${interior.price.toLocaleString()}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenReserve={() => setIsReserveModalOpen(true)} />
      <PreorderModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
      />
    </div>
  );
}

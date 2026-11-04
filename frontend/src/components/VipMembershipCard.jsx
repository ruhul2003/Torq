"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, CreditCard, Award, Check } from "lucide-react";

const TIERS = [
  {
    id: "carbon",
    name: "Carbon Founder",
    gradient: "from-neutral-900 via-neutral-800 to-black",
    border: "border-white/20",
    chip: "bg-amber-400",
    textGlow: "text-neutral-300",
    perks: ["Complimentary Track Day Access", "Priority Global Car Allocation", "24/7 Dedicated Chauffeur Fleet"],
  },
  {
    id: "syndicate",
    name: "Syndicate Black",
    gradient: "from-zinc-950 via-sky-950/40 to-neutral-950",
    border: "border-sky-500/40",
    chip: "bg-sky-400",
    textGlow: "text-sky-400",
    perks: ["Factory Bespoke Studio Access", "Zero-Deposit Luxury Hire", "Air Freight Enclosed Delivery"],
  },
  {
    id: "apex",
    name: "Apex Imperial",
    gradient: "from-neutral-950 via-amber-950/30 to-black",
    border: "border-amber-500/40",
    chip: "bg-amber-300",
    textGlow: "text-amber-400",
    perks: ["Private Jet Paddock Transfer", "Custom One-Off Coachbuilding", "Monaco GP Paddock Pass"],
  },
];

export default function VipMembershipCard() {
  const [activeTier, setActiveTier] = useState(TIERS[0]);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX((-y / rect.height) * 18);
    setRotateY((x / rect.width) * 18);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section className="py-20 bg-neutral-900/60 text-white relative border-b border-white/10 overflow-hidden">
      <div className="w-[95%] max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>TORQ SYNDICATE MEMBERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Exclusive Client Black Card
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            Interactive forged-metal membership credential. Hover and tilt to inspect the holographic security micro-weave.
          </p>
        </div>

        {/* Tier Selector Buttons */}
        <div className="flex justify-center gap-2 mb-10">
          {TIERS.map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => setActiveTier(tier)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTier.id === tier.id
                  ? "bg-white text-black shadow-lg"
                  : "bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10"
              }`}
            >
              {tier.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Card Viewport */}
          <div className="lg:col-span-7 flex justify-center [perspective:1000px]">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`relative w-full max-w-md h-64 sm:h-72 rounded-3xl p-6 sm:p-8 bg-gradient-to-br ${activeTier.gradient} border ${activeTier.border} shadow-[0_25px_60px_rgba(0,0,0,0.8)] cursor-grab flex flex-col justify-between overflow-hidden select-none`}
            >
              {/* Metallic Iridescent Sheen */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"
                style={{
                  transform: `translate(${rotateY * 4}px, ${rotateX * 4}px)`,
                }}
              />

              {/* Card Top */}
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <span className="font-display font-bold text-xl tracking-[0.2em] text-white">
                    TORQ
                  </span>
                  <div className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase">
                    SYNDICATE PRIVILEGE
                  </div>
                </div>
                <div className={`w-10 h-8 rounded-md ${activeTier.chip} opacity-90 border border-white/40 shadow-inner flex items-center justify-center`}>
                  <CreditCard className="w-4 h-4 text-black/60" />
                </div>
              </div>

              {/* Card Middle Serial */}
              <div className="relative z-10 my-auto">
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                  MEMBER ID
                </div>
                <div className="text-lg sm:text-xl font-mono font-bold tracking-widest text-white mt-0.5">
                  8842 • 9102 • 7741 • 0092
                </div>
              </div>

              {/* Card Bottom */}
              <div className="flex items-end justify-between relative z-10">
                <div>
                  <div className="text-[9px] font-mono text-neutral-400 uppercase">CARDHOLDER</div>
                  <div className="text-sm font-semibold text-white tracking-wide uppercase">
                    ESTEEMED CLIENT
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-mono text-neutral-400 uppercase">STATUS</div>
                  <div className={`text-xs font-bold font-mono tracking-wider ${activeTier.textGlow}`}>
                    {activeTier.name.toUpperCase()}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Perks list */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xl font-display font-bold text-white">
              Privileges of {activeTier.name}
            </h4>
            <div className="space-y-3">
              {activeTier.perks.map((perk, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-neutral-200 font-medium">{perk}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="w-full mt-4 py-3 rounded-2xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Inquire for Syndicate Tier Induction
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

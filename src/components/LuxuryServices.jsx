"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Sparkles, Trophy } from "lucide-react";

const SERVICES = [
  {
    icon: Truck,
    number: "01",
    title: "Enclosed Freight",
    desc: "Direct delivery to your estate or private hangar worldwide.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Escrow Settlement",
    desc: "Tier-1 bank wire, attorney escrow, and digital asset clearance.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Bespoke Coachwork",
    desc: "Paint-to-sample livery, bespoke hides, and titanium trim.",
  },
  {
    icon: Trophy,
    number: "04",
    title: "VIP Track Handover",
    desc: "Private circuit day with a factory racing instructor.",
  },
];

export default function LuxuryServices() {
  return (
    <section id="concierge" className="py-20 relative border-t border-neutral-200/60 dark:border-white/5">
      <div className="w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-sky-500 font-semibold block mb-2">
            CLIENT CONCIERGE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950 dark:text-white tracking-tight">
            The Torq Experience.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="p-6 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      // {item.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-base text-neutral-950 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

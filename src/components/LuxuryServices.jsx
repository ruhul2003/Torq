"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Sparkles, Trophy } from "lucide-react";

const SERVICES = [
  {
    icon: Truck,
    number: "01",
    title: "White-Glove Enclosed Transport",
    desc: "Delivered directly to your residence, villa, or private aviation hangar worldwide in temperature-controlled transport.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Escrow & Digital Asset Settlement",
    desc: "Seamless transactions via tier-1 bank wire, attorney escrow, or verified digital currency settlement.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Paint-to-Sample Coachwork",
    desc: "Consult directly with our bespoke design team for one-off bespoke finishes, custom leather grain, and titanium badging.",
  },
  {
    icon: Trophy,
    number: "04",
    title: "VIP Track Handover",
    desc: "Every purchase includes a complimentary private closed-circuit track day with a professional factory driver.",
  },
];

export default function LuxuryServices() {
  return (
    <section id="concierge" className="py-20 relative border-t border-neutral-200/60 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-sky-500 font-semibold block mb-2">
            CLIENT CONCIERGE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-950 dark:text-white tracking-tight">
            The Torq Purchase Experience.
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

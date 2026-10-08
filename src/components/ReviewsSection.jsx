"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const REVIEWS = [
  {
    quote:
      "TORQ rewrites mechanical intimacy in the electric era. The torque vectoring rotates into hairpins as if physics were merely advisory.",
    author: "Elena Rostova",
    role: "Nürburgring Test Driver",
    outlet: "Apex Dynamics",
  },
  {
    quote:
      "A triumph of minimalist restraint. Razor-sharp telemetry, solid-state endurance, and 1,450 pure unadulterated horsepower.",
    author: "Marcus Vance",
    role: "Engineering Editor",
    outlet: "EV Velocity",
  },
  {
    quote:
      "Charges 10% to 80% in 11 minutes flat. The first electric hypercar platform that makes range anxiety completely obsolete.",
    author: "Julian Chen",
    role: "Propulsion Analyst",
    outlet: "Kinetic Review",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-neutral-50/70 dark:bg-[#07090D] border-t border-neutral-200/60 dark:border-white/5">
      <div className="w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-sky-500 font-semibold block mb-2">
            EXPERT APPRAISAL
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 dark:text-white tracking-tight">
            Verified Velocity.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-8 rounded-2xl border border-neutral-200/80 dark:border-white/10 bg-white dark:bg-neutral-950/60 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-neutral-300 dark:text-neutral-700 mb-4" />
                <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
                  "{review.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-200/80 dark:border-white/10">
                <span className="font-display font-bold text-sm text-neutral-950 dark:text-white block">
                  {review.author}
                </span>
                <span className="text-xs text-neutral-500 block">{review.role}</span>
                <span className="text-[11px] font-mono text-sky-500 font-medium block mt-0.5">
                  {review.outlet}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

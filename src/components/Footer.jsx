"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Shield, Activity, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer({ onOpenReserve }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="relative border-t border-neutral-200/80 dark:border-white/10 bg-white dark:bg-[#050608] text-neutral-800 dark:text-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-200/80 dark:border-white/10">
          {/* Brand & Mission Statement */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-display font-black text-sm tracking-tighter shadow">
                <span>T</span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 absolute -top-0.5 -right-0.5" />
              </div>
              <span className="font-display font-bold text-xl tracking-[0.2em] text-neutral-950 dark:text-white uppercase">
                TORQ
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
              Pioneering sub-millisecond silicon-carbide torque vectoring, solid-state structural energy density, and minimal architectural purity.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>TORQ-OS GLOBAL TELEMETRY: 99.98% OPERATIONAL</span>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block">
              FLEET MODELS
            </span>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/#models" className="hover:text-sky-500 transition-colors">
                  TORQ Apex GT
                </Link>
              </li>
              <li>
                <Link href="/#models" className="hover:text-sky-500 transition-colors">
                  TORQ Stratos GT
                </Link>
              </li>
              <li>
                <Link href="/#models" className="hover:text-sky-500 transition-colors">
                  TORQ Monolith Platform
                </Link>
              </li>
              <li>
                <Link href="/configurator" className="hover:text-sky-500 transition-colors">
                  Interactive Configurator
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block">
              TECHNOLOGY
            </span>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/#powertrain" className="hover:text-sky-500 transition-colors">
                  Silicon Carbide Inverters
                </Link>
              </li>
              <li>
                <Link href="/#vectoring" className="hover:text-sky-500 transition-colors">
                  TorqOS Kernel
                </Link>
              </li>
              <li>
                <Link href="/#telemetry" className="hover:text-sky-500 transition-colors">
                  Range & 920V Charging
                </Link>
              </li>
              <li>
                <Link href="/#engineering" className="hover:text-sky-500 transition-colors">
                  Solid-State Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Allocation Priority */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block">
              ENGINEERING DISPATCH
            </span>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Receive quarterly whitepapers on power electronics, track telemetry releases, and prototype build dispatches.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="engineer@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/[0.03] text-xs focus:outline-none focus:border-sky-500 text-neutral-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold text-xs uppercase tracking-wider hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Join
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed to Torq Engineering Dispatch.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <div>
            © {new Date().getFullYear()} TORQ Kinetic Systems Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenReserve}
              className="text-sky-600 dark:text-sky-400 hover:underline cursor-pointer font-medium"
            >
              Reserve Build Slot
            </button>
            <span className="text-neutral-300 dark:text-neutral-800">|</span>
            <a href="#models" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Spec Matrix
            </a>
            <span className="text-neutral-300 dark:text-neutral-800">|</span>
            <a href="#engineering" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
              Patents
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

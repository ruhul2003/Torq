"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { name: "Inventory", href: "/#inventory" },
  { name: "Showroom", href: "/#showroom" },
  { name: "Bespoke Studio", href: "/configurator" },
  { name: "Concierge", href: "/#concierge" },
];

export default function Navbar({ onOpenReserve }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 glass-header shadow-sm"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="group flex items-center gap-2.5 focus:outline-none">
              <div className="relative w-8 h-8 rounded-lg bg-black text-white dark:bg-white dark:text-black flex items-center justify-center font-display font-black text-sm tracking-tighter shadow-md transition-transform duration-300 group-hover:scale-105">
                <span>T</span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 absolute -top-0.5 -right-0.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg tracking-[0.2em] text-neutral-900 dark:text-white uppercase transition-colors">
                  TORQ
                </span>
                <span className="text-[9px] font-mono tracking-widest text-neutral-400 dark:text-neutral-500 uppercase -mt-1">
                  Luxury Motors
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-4 py-1.5 rounded-full border border-neutral-200/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-md">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                      isActive
                        ? "text-neutral-950 dark:text-white bg-black/5 dark:bg-white/10 font-semibold"
                        : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <ThemeToggle />

              <button
                type="button"
                onClick={onOpenReserve}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase cursor-pointer transition-all duration-300 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 shadow-sm active:scale-95"
              >
                <span>Acquire Vehicle</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl border-b border-neutral-200 dark:border-white/10 p-6 sm:hidden shadow-xl"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-sky-500 transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </Link>
              ))}

              <div className="pt-3 border-t border-neutral-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenReserve) onOpenReserve();
                  }}
                  className="w-full py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Acquire Vehicle</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

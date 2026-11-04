"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Users, Award, CheckCircle, Sparkles } from "lucide-react";

const EVENTS = [
  { id: "stmoritz", title: "St. Moritz Winter Ice Concours", location: "St. Moritz, Switzerland", date: "Jan 18-21, 2027", spots: 6, image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=800&auto=format&fit=crop" },
  { id: "spa", title: "Spa-Francorchamps Night Corsa", location: "Ardennes, Belgium", date: "Apr 12-14, 2027", spots: 4, image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop" },
  { id: "yasmarina", title: "Yas Marina Twilight Hypercar Rendezvous", location: "Abu Dhabi, UAE", date: "Nov 05-08, 2027", spots: 8, image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop" },
];

export default function PrivateTrackClubModal({ isOpen, onClose }) {
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0]);
  const [guests, setGuests] = useState("1");
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl rounded-3xl bg-neutral-900 border border-white/10 text-white shadow-2xl p-6 sm:p-8 my-auto"
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!confirmed ? (
            <div>
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-400 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>TORQ SYNDICATE INVITATIONALS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold">
                  Exclusive Track Day & Rallies
                </h3>
                <p className="text-sm text-neutral-400 mt-1">
                  Private members-only gatherings at world-class circuits, alpine passes, and five-star luxury retreats.
                </p>
              </div>

              {/* Event selection */}
              <div className="space-y-3 mb-6">
                {EVENTS.map((e) => {
                  const isSelected = selectedEvent.id === e.id;
                  return (
                    <div
                      key={e.id}
                      onClick={() => setSelectedEvent(e)}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? "bg-white/10 border-purple-500/60 ring-1 ring-purple-500/50"
                          : "bg-white/[0.02] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img src={e.image} alt={e.title} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <div className="text-sm font-bold text-white">{e.title}</div>
                          <div className="text-xs text-neutral-400 flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-purple-400" />
                              {e.location}
                            </span>
                            <span>•</span>
                            <span className="font-mono text-[11px] text-neutral-300">{e.date}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-amber-400 bg-amber-400/10 px-2 py-1 rounded-lg">
                        {e.spots} passes left
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Guest selection */}
              <div className="mb-6 flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-xs font-mono text-neutral-300">ADDITIONAL VIP GUEST ENTOURAGE:</span>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="bg-neutral-800 border border-white/20 rounded-lg px-3 py-1 text-xs text-white cursor-pointer outline-none"
                >
                  <option value="0">Driver Only (Single Pass)</option>
                  <option value="1">+1 Guest Accompaniment</option>
                  <option value="2">+2 Pit Entourage Guests</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setConfirmed(true)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-purple-500/25"
                >
                  Request Syndicate Guest Pass
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-4 border border-purple-500/40">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Syndicate Guest Pass Reserved
              </h3>
              <p className="text-sm text-neutral-400 max-w-md mx-auto mt-2">
                Your reservation for <strong className="text-white">{selectedEvent.title}</strong> has been secured. Your credential package will be dispatched via courier.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-6 py-2 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200"
              >
                Close
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

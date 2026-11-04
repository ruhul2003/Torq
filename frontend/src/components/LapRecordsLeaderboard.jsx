"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Timer, Flag, Compass, ChevronRight } from "lucide-react";

const TRACKS = [
  {
    id: "nurburgring",
    name: "Nürburgring Nordschleife",
    distance: "20.832 KM",
    recordHolder: "TORQ Apex GT Prototype",
    lapTime: "6:28.44",
    topSpeed: "348 KM/H",
    records: [
      { rank: 1, car: "TORQ Apex GT Monocoque", time: "6:28.44", driver: "Marco V. (FIA Gold)", vMax: "348 km/h" },
      { rank: 2, car: "TORQ Stradale V12 Corsa", time: "6:39.12", driver: "Henri B. (Works Driver)", vMax: "336 km/h" },
      { rank: 3, car: "TORQ Phantom R-Spec", time: "6:52.80", driver: "Alex K. (Factory Test)", vMax: "318 km/h" },
    ],
  },
  {
    id: "spa",
    name: "Circuit de Spa-Francorchamps",
    distance: "7.004 KM",
    recordHolder: "TORQ Stradale V12 Corsa",
    lapTime: "2:14.08",
    topSpeed: "324 KM/H",
    records: [
      { rank: 1, car: "TORQ Stradale V12 Corsa", time: "2:14.08", driver: "Henri B. (Works Driver)", vMax: "324 km/h" },
      { rank: 2, car: "TORQ Apex GT Monocoque", time: "2:15.65", driver: "Marco V. (FIA Gold)", vMax: "331 km/h" },
      { rank: 3, car: "TORQ GT-4 Clubsport", time: "2:22.40", driver: "Sophie L. (Syndicate Coach)", vMax: "298 km/h" },
    ],
  },
];

export default function LapRecordsLeaderboard() {
  const [activeTrack, setActiveTrack] = useState(TRACKS[0]);

  return (
    <section className="py-20 bg-neutral-950 text-white relative border-b border-white/10">
      <div className="w-[95%] max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-400 mb-3">
              <Trophy className="w-3.5 h-3.5" />
              <span>OFFICIAL FACTORY LAP RECORDS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              Circuit Lap Telemetry
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Certified transponder sector timings and vMax radar captures set by TORQ factory pilots under competitive sanction.
            </p>
          </div>

          <div className="flex gap-2">
            {TRACKS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTrack(t)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTrack.id === t.id
                    ? "bg-amber-400 text-black shadow-md shadow-amber-400/20 font-bold"
                    : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Leaderboard Table Box */}
        <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8 backdrop-blur-xl">
          <div className="space-y-3">
            {activeTrack.records.map((r) => (
              <div
                key={r.rank}
                className="grid grid-cols-12 items-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-400/40 transition-colors"
              >
                {/* Rank */}
                <div className="col-span-2 sm:col-span-1 flex items-center gap-2">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                      r.rank === 1
                        ? "bg-amber-400 text-black shadow-md"
                        : "bg-white/10 text-neutral-300"
                    }`}
                  >
                    #{r.rank}
                  </span>
                </div>

                {/* Car & Driver */}
                <div className="col-span-6 sm:col-span-6">
                  <div className="text-sm sm:text-base font-bold text-white">{r.car}</div>
                  <div className="text-xs text-neutral-400 mt-0.5">{r.driver}</div>
                </div>

                {/* Trap Speed */}
                <div className="hidden sm:block col-span-2 text-right">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">vMax Trap</span>
                  <span className="text-xs font-mono font-bold text-neutral-200">{r.vMax}</span>
                </div>

                {/* Lap Time */}
                <div className="col-span-4 sm:col-span-3 text-right">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Lap Time</span>
                  <span className="text-base sm:text-lg font-mono font-bold text-amber-400">
                    {r.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

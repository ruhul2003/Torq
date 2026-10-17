"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  UserCheck,
  XCircle,
  Key,
  Star,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Car as CarIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getUserHires, cancelHireBooking, submitReview } from "@/lib/api";

export default function MyBookingsPage() {
  const [hires, setHires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReviewHire, setSelectedReviewHire] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [notification, setNotification] = useState("");

  const userEmail = "ruhul941020@gmail.com";

  useEffect(() => {
    async function loadBookings() {
      setLoading(true);
      const data = await getUserHires(userEmail);
      setHires(data);
      setLoading(false);
    }
    loadBookings();
  }, []);

  const handleCancelBooking = async (hireId, hireNumber) => {
    if (!confirm(`Are you sure you wish to cancel reservation ${hireNumber}? Security deposits will be fully released.`)) {
      return;
    }

    const res = await cancelHireBooking(hireId, "Customer requested cancellation via portal");
    if (res.success) {
      setNotification(`Reservation ${hireNumber} successfully cancelled.`);
      setHires((prev) =>
        prev.map((h) => (h._id === hireId ? { ...h, status: "cancelled" } : h))
      );
      setTimeout(() => setNotification(""), 4000);
    }
  };

  const handleOpenReview = (hire) => {
    setSelectedReviewHire(hire);
    setReviewRating(5);
    setReviewComment("");
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!selectedReviewHire) return;

    setSubmittingReview(true);
    const res = await submitReview({
      carSlug: selectedReviewHire.carSlug,
      userName: selectedReviewHire.userName,
      userEmail: selectedReviewHire.userEmail,
      rating: reviewRating,
      title: "Exemplary Motoring Experience",
      comment: reviewComment,
    });

    if (res.success) {
      setNotification("Review submitted successfully! Thank you for your feedback.");
      setSelectedReviewHire(null);
      setTimeout(() => setNotification(""), 4000);
    }
    setSubmittingReview(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#060709] text-neutral-900 dark:text-white transition-colors duration-300">
      <Navbar onOpenReserve={() => {}} />

      {/* Header */}
      <section className="relative pt-32 pb-12 border-b border-neutral-200/60 dark:border-white/5">
        <div className="w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6">
          <Link
            href="/hire"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-sky-500 transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Fleet Catalog</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-neutral-950 dark:text-white">
                My Reservations & Hire Ledger
              </h1>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                Manage your active luxury reservations, chauffeur assignments, and handover schedules.
              </p>
            </div>

            <Link
              href="/hire"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white dark:bg-white dark:text-black hover:scale-105 transition-all shadow-sm"
            >
              <span>Hire Another Vehicle</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {notification && (
            <div className="mt-6 p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{notification}</span>
            </div>
          )}
        </div>
      </section>

      {/* Bookings List */}
      <section className="py-12">
        <div className="w-[95%] max-w-[1920px] mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 rounded-full border-2 border-neutral-300 dark:border-white/20 border-t-sky-500 animate-spin mb-4" />
              <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                Retrieving reservation ledger...
              </p>
            </div>
          ) : hires.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-neutral-300 dark:border-white/10 rounded-3xl p-8 max-w-xl mx-auto">
              <Key className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                No Active Reservations
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                You have not booked any luxury vehicles yet. Browse our exclusive fleet and reserve your first drive.
              </p>
              <Link
                href="/hire"
                className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white dark:bg-white dark:text-black hover:scale-105 transition-all"
              >
                <span>Explore Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {hires.map((hire) => {
                const isCancelled = hire.status === "cancelled";
                const isCompleted = hire.status === "completed";

                return (
                  <motion.div
                    key={hire._id || hire.hireNumber}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-white/[0.02] border border-neutral-200/80 dark:border-white/10 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6"
                  >
                    {/* Vehicle & Status Section */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                      <div className="relative w-full sm:w-48 h-32 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 shrink-0">
                        <Image
                          src={hire.carImage || "/images/cars/apex-gt.jpg"}
                          alt={hire.carName}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[11px] text-sky-500 font-bold uppercase tracking-wider">
                            {hire.hireNumber}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold ${
                              isCancelled
                                ? "bg-rose-500/10 text-rose-500"
                                : isCompleted
                                ? "bg-neutral-500/10 text-neutral-400"
                                : "bg-emerald-500/10 text-emerald-500"
                            }`}
                          >
                            {hire.status}
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-xl text-neutral-950 dark:text-white">
                          {hire.carName}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(hire.startDate).toLocaleDateString()} &mdash;{" "}
                            {new Date(hire.endDate).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span>{hire.totalDays} Days</span>
                          {hire.chauffeurOption?.included && (
                            <>
                              <span>•</span>
                              <span className="text-amber-500 font-medium">Chauffeur Included</span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-neutral-400">
                          <MapPin className="w-3 h-3 text-sky-400" />
                          <span>Pickup: {hire.pickupLocation}</span>
                        </div>
                      </div>
                    </div>

                    {/* Financials & Actions */}
                    <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-neutral-100 dark:border-white/5">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase">Total Paid</span>
                        <div className="font-display font-bold text-2xl text-neutral-950 dark:text-white">
                          ${hire.totalAmount?.toLocaleString()}
                        </div>
                        <span className="text-[10px] text-emerald-500 font-mono">
                          Deposit: ${hire.securityDeposit?.toLocaleString()} (Held in Escrow)
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCompleted && (
                          <button
                            type="button"
                            onClick={() => handleOpenReview(hire)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-neutral-300 dark:border-white/20 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                          >
                            <Star className="w-3.5 h-3.5 text-amber-400" />
                            <span>Review Drive</span>
                          </button>
                        )}

                        {!isCancelled && !isCompleted && (
                          <button
                            type="button"
                            onClick={() => handleCancelBooking(hire._id, hire.hireNumber)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors border border-rose-500/20"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Cancel Hire</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedReviewHire && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReviewHire(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-white/10 shadow-2xl z-10"
            >
              <h3 className="font-display font-bold text-lg text-neutral-950 dark:text-white">
                Review Your Motoring Experience
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                {selectedReviewHire.carName} • {selectedReviewHire.hireNumber}
              </p>

              <form onSubmit={handleSubmitReview} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">
                    Rating Score
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className={`p-1.5 rounded-lg text-lg ${
                          star <= reviewRating ? "text-amber-400" : "text-neutral-300 dark:text-neutral-700"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300 ml-2">
                      {reviewRating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-500 mb-1">
                    Your Experience Appraisal
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe vehicle acceleration, handling precision, cabin amenities, and concierge delivery..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedReviewHire(null)}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white dark:bg-white dark:text-black hover:scale-105 transition-all disabled:opacity-50"
                  >
                    {submittingReview ? "Submitting..." : "Submit Appraisal"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer onOpenReserve={() => {}} />
    </div>
  );
}

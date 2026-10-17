"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  CheckCircle2,
  Shield,
  UserCheck,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Key,
} from "lucide-react";
import { calculateHireEstimate, createHireBooking } from "@/lib/api";

const LOCATIONS = [
  "TORQ Flagship Lounge, Manhattan",
  "Beverly Hills Showroom, CA",
  "Miami Design District Pavilion, FL",
  "Palm Beach Club, FL",
  "Teterboro Private Airport (KTEB)",
  "Van Nuys Airport Hangar (KVNY)",
  "Direct White-Glove Villa Delivery",
];

const INSURANCE_TIERS = [
  {
    id: "standard",
    name: "Standard Coverage",
    dailyCost: 50,
    desc: "$2,500 deductible, basic roadside assistance",
  },
  {
    id: "premium_shield",
    name: "Premium Shield Protection",
    dailyCost: 100,
    desc: "$1,000 deductible, rim & tire protection, 24/7 concierge",
  },
  {
    id: "executive_zero_liability",
    name: "Executive Zero Liability",
    dailyCost: 160,
    desc: "$0 deductible, glass/track damage included, vehicle replacement",
  },
];

export default function HireModal({ isOpen, car, onClose }) {
  const router = useRouter();

  // Dates: default start tomorrow, end 3 days later
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];
  const returnStr = new Date(Date.now() + 86400000 * 4).toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(tomorrowStr);
  const [endDate, setEndDate] = useState(returnStr);
  const [pickupLocation, setPickupLocation] = useState(LOCATIONS[0]);
  const [returnLocation, setReturnLocation] = useState(LOCATIONS[0]);
  const [chauffeurIncluded, setChauffeurIncluded] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState("premium_shield");

  // User fields
  const [userName, setUserName] = useState("Ruhul Amin");
  const [userEmail, setUserEmail] = useState("ruhul941020@gmail.com");
  const [userPhone, setUserPhone] = useState("+1 (555) 789-0123");
  const [driverLicense, setDriverLicense] = useState("DL-98234-NY");
  const [specialRequests, setSpecialRequests] = useState("");

  const [estimate, setEstimate] = useState(null);
  const [loadingEstimate, setLoadingEstimate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const activeCar = car || {
    name: "TORQ Apex Hyper GT",
    slug: "apex-gt",
    dailyRate: 1850,
    image: "/images/cars/apex-gt.jpg",
    securityDeposit: 5000,
    categoryLabel: "Hypercar",
  };

  // Recalculate whenever dates, car, or add-ons change
  useEffect(() => {
    if (!isOpen) return;

    let isCancelled = false;
    async function updateEstimate() {
      setLoadingEstimate(true);
      try {
        const res = await calculateHireEstimate({
          carSlug: activeCar.slug || activeCar.id,
          dailyRate: activeCar.dailyRate || 1850,
          startDate,
          endDate,
          chauffeurIncluded,
          insuranceTier: selectedInsurance,
        });
        if (!isCancelled && res.data) {
          setEstimate(res.data);
        }
      } catch (err) {
        console.error("Estimate calculation error:", err);
      } finally {
        if (!isCancelled) setLoadingEstimate(false);
      }
    }

    updateEstimate();
    return () => {
      isCancelled = true;
    };
  }, [isOpen, activeCar, startDate, endDate, chauffeurIncluded, selectedInsurance]);

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const chosenInsurance = INSURANCE_TIERS.find((i) => i.id === selectedInsurance);

      const bookingPayload = {
        carSlug: activeCar.slug || activeCar.id,
        carName: activeCar.name,
        carImage: activeCar.image,
        dailyRate: activeCar.dailyRate || 1850,
        userName,
        userEmail,
        userPhone,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        pickupLocation,
        returnLocation,
        deliveryOption: chauffeurIncluded ? "valet_concierge_delivery" : "showroom_pickup",
        chauffeurOption: {
          included: chauffeurIncluded,
          dailyFee: 450,
        },
        insuranceTier: {
          name: chosenInsurance.name,
          tier: chosenInsurance.id,
          dailyCost: chosenInsurance.dailyCost,
        },
        driverLicenseNumber: driverLicense,
        specialRequests,
      };

      const result = await createHireBooking(bookingPayload);
      if (result.success) {
        setBookingSuccess(result.data);
      } else {
        setErrorMessage(result.error || "Failed to confirm reservation.");
      }
    } catch (err) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setBookingSuccess(null);
    setErrorMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleModalClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-white/10 shadow-2xl z-10 text-neutral-900 dark:text-white"
        >
          {/* Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b border-neutral-200/80 dark:border-white/10 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-black flex items-center justify-center font-display font-black text-sm">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg sm:text-xl text-neutral-950 dark:text-white">
                  {bookingSuccess ? "Reservation Confirmed" : `Reserve ${activeCar.name}`}
                </h2>
                <p className="text-xs text-neutral-500 font-mono">
                  {bookingSuccess
                    ? `Booking Reference: ${bookingSuccess.hireNumber}`
                    : "Luxury Hire Agreement • Instant Better Auth Validation"}
                </p>
              </div>
            </div>

            <button
              onClick={handleModalClose}
              className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Screen */}
          {bookingSuccess ? (
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-semibold">
                  Payment & Security Deposit Authorized
                </span>
                <h3 className="text-2xl font-display font-bold mt-1 text-neutral-900 dark:text-white">
                  Your Luxury Journey is Secured
                </h3>
                <p className="text-sm text-neutral-500 mt-2 max-w-lg mx-auto">
                  A concierge confirmation has been dispatched to <b>{bookingSuccess.userEmail}</b>.
                  Our white-glove transport team will coordinate handover at your designated location.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Booking Reference:</span>
                  <span className="font-mono font-bold text-sky-500">{bookingSuccess.hireNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Vehicle:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{bookingSuccess.carName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Total Duration:</span>
                  <span>{bookingSuccess.totalDays} Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Pickup Location:</span>
                  <span className="truncate max-w-[220px]">{bookingSuccess.pickupLocation}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200/60 dark:border-white/10 pt-2 font-bold text-sm">
                  <span>Total Amount Paid:</span>
                  <span className="text-neutral-950 dark:text-white">
                    ${bookingSuccess.totalAmount?.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    handleModalClose();
                    router.push("/hire/my-bookings");
                  }}
                  className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-md hover:scale-105 transition-all"
                >
                  View in My Reservations
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-6 py-3 rounded-full text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitBooking} className="p-6 space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Vehicle Banner */}
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/5">
                <div className="relative w-full sm:w-36 h-24 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={activeCar.image || "/images/cars/apex-gt.jpg"}
                    alt={activeCar.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <span className="text-[10px] font-mono tracking-widest text-sky-500 uppercase">
                    {activeCar.categoryLabel || "Luxury Fleet"}
                  </span>
                  <h4 className="font-display font-bold text-lg text-neutral-950 dark:text-white">
                    {activeCar.name}
                  </h4>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-1 text-xs text-neutral-500">
                    <span>${(activeCar.dailyRate || 1850).toLocaleString()} / day</span>
                    <span>•</span>
                    <span>${(activeCar.securityDeposit || 3000).toLocaleString()} Refundable Deposit</span>
                  </div>
                </div>
              </div>

              {/* Dates & Logistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-neutral-700 dark:text-neutral-300">
                    Hire Start Date
                  </label>
                  <input
                    type="date"
                    required
                    min={tomorrowStr}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-neutral-700 dark:text-neutral-300">
                    Return Date
                  </label>
                  <input
                    type="date"
                    required
                    min={startDate || tomorrowStr}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-neutral-700 dark:text-neutral-300">
                    Pickup Location
                  </label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc} className="dark:bg-neutral-900 text-neutral-900 dark:text-white">
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-neutral-700 dark:text-neutral-300">
                    Return Location
                  </label>
                  <select
                    value={returnLocation}
                    onChange={(e) => setReturnLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc} className="dark:bg-neutral-900 text-neutral-900 dark:text-white">
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Chauffeur Service Option */}
              <div className="p-4 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-neutral-900 dark:text-white">
                      Include Executive Chauffeur Service
                    </h5>
                    <p className="text-[11px] text-neutral-500">
                      Trained close-protection driver in formal executive attire (+$450/day)
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chauffeurIncluded}
                    onChange={(e) => setChauffeurIncluded(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 dark:bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                </label>
              </div>

              {/* Insurance Tier Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-neutral-700 dark:text-neutral-300">
                  Select Protection Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {INSURANCE_TIERS.map((tier) => {
                    const isSelected = selectedInsurance === tier.id;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedInsurance(tier.id)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? "border-sky-500 bg-sky-500/10 shadow-sm"
                            : "border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 bg-neutral-50/50 dark:bg-white/[0.02]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-neutral-900 dark:text-white">
                            {tier.name}
                          </span>
                          <span className="text-[10px] font-mono text-sky-500 font-bold">
                            +${tier.dailyCost}/d
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 leading-tight">{tier.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Customer Credentials */}
              <div className="pt-2 border-t border-neutral-200/60 dark:border-white/5 space-y-4">
                <h5 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  Driver Credentials & Contact
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-500 mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-500 mb-1">
                      Email Address (Better Auth)
                    </label>
                    <input
                      type="email"
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-neutral-500 mb-1">
                      Driver License / Passport #
                    </label>
                    <input
                      type="text"
                      required
                      value={driverLicense}
                      onChange={(e) => setDriverLicense(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-neutral-500 mb-1">
                    Special Concierge Requests (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. In-cabin chilled Pellegrino, flight tail number for tarmac delivery..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-xs text-neutral-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Dynamic Price Breakdown Strip */}
              {estimate && (
                <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>
                      Vehicle Base ({estimate.totalDays} Days @ ${(estimate.dailyRate || 1850).toLocaleString()}/d):
                    </span>
                    <span className="font-mono text-neutral-900 dark:text-white">
                      ${estimate.baseRentalCost?.toLocaleString()}
                    </span>
                  </div>
                  {estimate.chauffeurCost > 0 && (
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>Executive Chauffeur Service:</span>
                      <span className="font-mono text-neutral-900 dark:text-white">
                        +${estimate.chauffeurCost?.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>Protection Package:</span>
                    <span className="font-mono text-neutral-900 dark:text-white">
                      +${estimate.insuranceCost?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                    <span>State & Luxury Tourism Surcharge (8.875%):</span>
                    <span className="font-mono text-neutral-900 dark:text-white">
                      +${estimate.taxAmount?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-amber-500 text-[11px] pt-1">
                    <span>Refundable Escrow Deposit (Returned upon inspection):</span>
                    <span className="font-mono font-bold">${estimate.securityDeposit?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-white/10 font-bold text-base">
                    <span className="text-neutral-950 dark:text-white">Total Amount:</span>
                    <span className="font-display text-xl text-neutral-950 dark:text-white">
                      ${estimate.totalAmount?.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200/60 dark:border-white/5">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                      <span>Confirming Hire...</span>
                    </>
                  ) : (
                    <>
                      <span>Authorize & Confirm Hire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

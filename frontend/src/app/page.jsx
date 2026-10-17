"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TelemetryStrip from "@/components/TelemetryStrip";
import VehicleShowcase from "@/components/VehicleShowcase";
import InteractiveDriveMode from "@/components/InteractiveDriveMode";
import LuxuryServices from "@/components/LuxuryServices";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import PreorderModal from "@/components/PreorderModal";

export default function HomePage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleOpenReserve = (vehicle = null) => {
    if (vehicle) {
      setSelectedVehicle(typeof vehicle === "object" ? vehicle.id : vehicle);
    }
    setIsReserveModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#060709] text-neutral-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <Navbar onOpenReserve={() => handleOpenReserve()} />

      {/* Luxury Showroom Hero */}
      <HeroSection onOpenReserve={() => handleOpenReserve()} />

      {/* Client Guarantees & White-Glove Logistics Strip */}
      <TelemetryStrip />

      {/* Featured Luxury Car Inventory */}
      <VehicleShowcase onOpenReserve={handleOpenReserve} />

      {/* Dynamic Driving Calibration */}
      <InteractiveDriveMode />

      {/* Luxury Purchase Experience */}
      <LuxuryServices />

      {/* Press & Collector Appraisals */}
      <ReviewsSection />

      {/* Footer */}
      <Footer onOpenReserve={() => handleOpenReserve()} />

      {/* Luxury Acquisition Modal */}
      <PreorderModal
        isOpen={isReserveModalOpen}
        initialModel={selectedVehicle}
        onClose={() => setIsReserveModalOpen(false)}
      />
    </div>
  );
}

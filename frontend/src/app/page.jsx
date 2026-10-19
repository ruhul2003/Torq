"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TelemetryStrip from "@/components/TelemetryStrip";
import VehicleShowcase from "@/components/VehicleShowcase";
import HireShowcaseSection from "@/components/HireShowcaseSection";
import PartsShowcaseSection from "@/components/PartsShowcaseSection";
import InteractiveDriveMode from "@/components/InteractiveDriveMode";
import LuxuryServices from "@/components/LuxuryServices";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import PreorderModal from "@/components/PreorderModal";
import HireModal from "@/components/HireModal";

export default function HomePage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedHireCar, setSelectedHireCar] = useState(null);

  const handleOpenReserve = (vehicle = null) => {
    if (vehicle) {
      setSelectedVehicle(typeof vehicle === "object" ? vehicle.id : vehicle);
    }
    setIsReserveModalOpen(true);
  };

  const handleOpenHire = (car = null) => {
    setSelectedHireCar(car);
    setIsHireModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#060709] text-neutral-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <Navbar onOpenReserve={() => handleOpenReserve()} />

      {/* Luxury Showroom Hero */}
      <HeroSection onOpenReserve={() => handleOpenReserve()} />

      {/* Client Guarantees & White-Glove Logistics Strip */}
      <TelemetryStrip />

      {/* Car Hiring Concierge Showcase */}
      <HireShowcaseSection onOpenHire={handleOpenHire} />

      {/* Certified OEM Car Parts Showcase */}
      <PartsShowcaseSection />

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

      {/* Car Hire Reservation Modal */}
      <HireModal
        isOpen={isHireModalOpen}
        car={selectedHireCar}
        onClose={() => setIsHireModalOpen(false)}
      />
    </div>
  );
}

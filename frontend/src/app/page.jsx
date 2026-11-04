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

// New Luxury Features
import Vehicle360Viewer from "@/components/Vehicle360Viewer";
import EngineSoundSimulator from "@/components/EngineSoundSimulator";
import WindTunnelSimulator from "@/components/WindTunnelSimulator";
import TelemetryDiagnostics from "@/components/TelemetryDiagnostics";
import LaunchControlTimer from "@/components/LaunchControlTimer";
import VipMembershipCard from "@/components/VipMembershipCard";
import RangeWeatherSimulator from "@/components/RangeWeatherSimulator";
import CabinMaterialStudio from "@/components/CabinMaterialStudio";
import GlobalLogisticsTracker from "@/components/GlobalLogisticsTracker";
import WheelBrakeCustomizer from "@/components/WheelBrakeCustomizer";
import FinancingCalculator from "@/components/FinancingCalculator";
import LapRecordsLeaderboard from "@/components/LapRecordsLeaderboard";
import VehicleCompareModal from "@/components/VehicleCompareModal";
import TrackDriveBookingModal from "@/components/TrackDriveBookingModal";
import ConciergeChatModal from "@/components/ConciergeChatModal";
import FloatingQuickDock from "@/components/FloatingQuickDock";

export default function HomePage() {
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
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

      {/* 360° Virtual Turntable Studio */}
      <Vehicle360Viewer />

      {/* Car Hiring Concierge Showcase */}
      <HireShowcaseSection onOpenHire={handleOpenHire} />

      {/* Dynamic Engine & Powertrain Sound Synthesizer */}
      <EngineSoundSimulator />

      {/* Certified OEM Car Parts Showcase */}
      <PartsShowcaseSection />

      {/* Featured Luxury Car Inventory */}
      <VehicleShowcase onOpenReserve={handleOpenReserve} />

      {/* Computational Wind Tunnel Simulation */}
      <WindTunnelSimulator />

      {/* Dynamic Driving Calibration */}
      <InteractiveDriveMode />

      {/* Real-World Climatic Range Simulator */}
      <RangeWeatherSimulator />

      {/* Bespoke Interior Atelier Studio */}
      <CabinMaterialStudio />

      {/* Live Chassis Telemetry Diagnostics */}
      <TelemetryDiagnostics />

      {/* Forged Wheels & Ceramic Calipers Customizer */}
      <WheelBrakeCustomizer />

      {/* 0-60 Launch Control Benchmark */}
      <LaunchControlTimer />

      {/* Bespoke Lease & Acquisition Estimator */}
      <FinancingCalculator />

      {/* Certified Circuit Lap Telemetry Leaderboard */}
      <LapRecordsLeaderboard />

      {/* Global Enclosed Freight & Cargo Radar */}
      <GlobalLogisticsTracker />

      {/* Syndicate Holographic VIP Membership Card */}
      <VipMembershipCard />

      {/* Luxury Purchase Experience */}
      <LuxuryServices />

      {/* Press & Collector Appraisals */}
      <ReviewsSection />

      {/* Footer */}
      <Footer onOpenReserve={() => handleOpenReserve()} />

      {/* Modals & Drawers */}
      <PreorderModal
        isOpen={isReserveModalOpen}
        initialModel={selectedVehicle}
        onClose={() => setIsReserveModalOpen(false)}
      />

      <HireModal
        isOpen={isHireModalOpen}
        car={selectedHireCar}
        onClose={() => setIsHireModalOpen(false)}
      />

      <VehicleCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
      />

      <TrackDriveBookingModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
      />

      <ConciergeChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
      />

      {/* Floating Quick Action Dock */}
      <FloatingQuickDock
        onOpenChat={() => setIsChatModalOpen(true)}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenTrack={() => setIsTrackModalOpen(true)}
      />
    </div>
  );
}

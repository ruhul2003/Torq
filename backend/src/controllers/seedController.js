import Car from "../models/Car.js";
import Hire from "../models/Hire.js";
import Review from "../models/Review.js";
import Part from "../models/Part.js";
import { seedCars } from "../data/seedCars.js";
import { seedParts } from "../data/seedParts.js";

/**
 * Pre-populate database with Torq luxury cars, sample reviews, bookings, and OEM original parts.
 */
export async function seedFleet(req, res, next) {
  try {
    const force = req.query.force === "true";
    const existingCarsCount = await Car.countDocuments();
    const existingPartsCount = await Part.countDocuments();

    if (existingCarsCount > 0 && existingPartsCount > 0 && !force) {
      return res.status(200).json({
        success: true,
        message: `Database already populated with ${existingCarsCount} vehicles and ${existingPartsCount} OEM car parts. Pass ?force=true to reset.`,
        carsCount: existingCarsCount,
        partsCount: existingPartsCount,
      });
    }

    if (force) {
      await Car.deleteMany({});
      await Review.deleteMany({});
      await Hire.deleteMany({});
      await Part.deleteMany({});
      console.log("[Seed] Flushed existing fleet, parts, and rental records.");
    }

    const insertedCars = await Car.insertMany(seedCars);
    const insertedParts = await Part.insertMany(seedParts);

    // Insert rich sample reviews
    const sampleReviews = [
      {
        carSlug: "apex-gt",
        carName: "TORQ Apex Hyper GT",
        userName: "Julian Vance",
        userEmail: "jvance@summitcap.com",
        userRole: "Chairman, Summit Capital",
        rating: 5,
        title: "Sensational Track Weekend at Monticello",
        comment:
          "Hiring the Apex Hyper GT for the private autumn track rally was extraordinary. The instant torque vectoring gave immense stability in high-speed chicanes. The enclosed delivery by Torq's concierge was seamless.",
        aspects: { vehiclePerformance: 5, conciergeService: 5, deliveryCondition: 5 },
      },
      {
        carSlug: "stratos-gt",
        carName: "TORQ Stratos Grand Coupé",
        userName: "Elena Rostova",
        userEmail: "elena@rostovadesign.com",
        userRole: "Principal Architect",
        rating: 5,
        title: "Unrivaled Comfort Across California Coast",
        comment:
          "Drove from Monterey to Big Sur. The acoustic glass canopy and massaging seats made a 6-hour coastal journey feel like minutes. Returning the vehicle was effortless.",
        aspects: { vehiclePerformance: 5, conciergeService: 5, deliveryCondition: 5 },
      },
      {
        carSlug: "monolith",
        carName: "TORQ Monolith Executive SUV",
        userName: "Marcus Sterling",
        userEmail: "m.sterling@sterling-holdings.co",
        userRole: "Family Office Principal",
        rating: 5,
        title: "Executive Sovereign Transport",
        comment:
          "Booked with professional chauffeur service for UN Assembly week. Impeccable presence, chilled champagne cooler in the rear console, and supreme privacy.",
        aspects: { vehiclePerformance: 5, conciergeService: 5, deliveryCondition: 5 },
      },
      {
        carSlug: "ghost-spyder",
        carName: "TORQ Ghost Spyder Speedster",
        userName: "Alistair Finch",
        userEmail: "afinch@artbasel-collector.org",
        userRole: "Art Patron",
        rating: 5,
        title: "Art Basel Miami Showstopper",
        comment:
          "Turned every head on Ocean Drive. The speedster profile and open-air titanium symphony are unmatched by any competitor.",
        aspects: { vehiclePerformance: 5, conciergeService: 5, deliveryCondition: 5 },
      },
    ];

    await Review.insertMany(sampleReviews);

    // Insert sample hire bookings
    const sampleHires = [
      {
        carSlug: "apex-gt",
        carName: "TORQ Apex Hyper GT",
        carImage: "/images/cars/apex-gt.jpg",
        dailyRate: 1850,
        userEmail: "ruhul941020@gmail.com",
        userName: "Ruhul Amin",
        userPhone: "+1 (555) 789-0123",
        startDate: new Date(Date.now() + 86400000 * 2),
        endDate: new Date(Date.now() + 86400000 * 5),
        totalDays: 3,
        pickupLocation: "TORQ Flagship Lounge, Manhattan",
        returnLocation: "TORQ Flagship Lounge, Manhattan",
        deliveryOption: "valet_concierge_delivery",
        chauffeurOption: { included: false, dailyFee: 450 },
        insuranceTier: {
          name: "Executive Zero Liability",
          tier: "executive_zero_liability",
          dailyCost: 150,
        },
        baseRentalCost: 5550,
        chauffeurCost: 0,
        insuranceCost: 450,
        securityDeposit: 5000,
        subtotal: 6000,
        taxAmount: 532.5,
        totalAmount: 6532.5,
        status: "confirmed",
        paymentStatus: "fully_paid",
        specialRequests: "Enclosed transport delivery to Upper East Side penthouse at 10:00 AM.",
      },
    ];

    await Hire.insertMany(sampleHires);

    res.status(201).json({
      success: true,
      message: `Successfully seeded ${insertedCars.length} luxury vehicles, ${insertedParts.length} OEM car parts, and sample client records.`,
      carsCount: insertedCars.length,
      partsCount: insertedParts.length,
      reviewsCount: sampleReviews.length,
    });
  } catch (error) {
    next(error);
  }
}

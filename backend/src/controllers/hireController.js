import Hire from "../models/Hire.js";
import Car from "../models/Car.js";
import { seedCars } from "../data/seedCars.js";

/**
 * Helper to calculate price breakdown for a luxury car hire.
 */
function computePricing({
  dailyRate,
  totalDays,
  securityDeposit = 3000,
  chauffeurIncluded = false,
  chauffeurDailyFee = 450,
  insuranceDailyFee = 120,
  taxRate = 0.08875, // NYC tax rate
}) {
  const baseRentalCost = dailyRate * totalDays;
  const chauffeurCost = chauffeurIncluded ? chauffeurDailyFee * totalDays : 0;
  const insuranceCost = insuranceDailyFee * totalDays;
  const subtotal = baseRentalCost + chauffeurCost + insuranceCost;
  const taxAmount = Math.round(subtotal * taxRate * 100) / 100;
  const totalAmount = subtotal + taxAmount;

  return {
    baseRentalCost,
    chauffeurCost,
    insuranceCost,
    securityDeposit,
    subtotal,
    taxAmount,
    totalAmount,
  };
}

/**
 * Calculate dynamic price breakdown before reservation.
 */
export async function calculateEstimate(req, res, next) {
  try {
    const {
      carSlug,
      startDate,
      endDate,
      chauffeurIncluded = false,
      insuranceTier = "premium_shield",
    } = req.body;

    if (!carSlug || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: "carSlug, startDate, and endDate are required.",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    let car = await Car.findOne({ slug: carSlug.toLowerCase() });
    if (!car) {
      car = seedCars.find((c) => c.slug === carSlug.toLowerCase());
    }

    if (!car) {
      return res.status(404).json({
        success: false,
        error: "Vehicle not found for estimate calculation.",
      });
    }

    let insuranceDailyFee = 0;
    if (insuranceTier === "premium_shield") insuranceDailyFee = 100;
    if (insuranceTier === "executive_zero_liability") insuranceDailyFee = 160;

    const breakdown = computePricing({
      dailyRate: car.dailyRate,
      totalDays,
      securityDeposit: car.securityDeposit || 3000,
      chauffeurIncluded: Boolean(chauffeurIncluded),
      chauffeurDailyFee: 450,
      insuranceDailyFee,
    });

    res.status(200).json({
      success: true,
      data: {
        carSlug: car.slug,
        carName: car.name,
        dailyRate: car.dailyRate,
        totalDays,
        ...breakdown,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Submit and confirm a new luxury car hire reservation.
 */
export async function createHire(req, res, next) {
  try {
    const {
      carSlug,
      userName,
      userEmail,
      userPhone,
      startDate,
      endDate,
      pickupLocation,
      returnLocation,
      deliveryOption = "showroom_pickup",
      chauffeurOption = { included: false, dailyFee: 450 },
      insuranceTier = {
        name: "Premium Shield Protection",
        tier: "premium_shield",
        dailyCost: 100,
      },
      driverLicenseNumber,
      specialRequests,
    } = req.body;

    if (!carSlug || !userName || !userEmail || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: "Vehicle, customer name, email, and hire dates are required.",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) {
      return res.status(400).json({
        success: false,
        error: "End date must be after hire start date.",
      });
    }

    const diffTime = end.getTime() - start.getTime();
    const totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    let car = await Car.findOne({ slug: carSlug.toLowerCase() });
    if (!car) {
      car = seedCars.find((c) => c.slug === carSlug.toLowerCase());
    }

    if (!car) {
      return res.status(404).json({
        success: false,
        error: "Vehicle not found in active fleet.",
      });
    }

    const pricing = computePricing({
      dailyRate: car.dailyRate,
      totalDays,
      securityDeposit: car.securityDeposit || 3000,
      chauffeurIncluded: Boolean(chauffeurOption?.included),
      chauffeurDailyFee: chauffeurOption?.dailyFee || 450,
      insuranceDailyFee: insuranceTier?.dailyCost || 100,
    });

    const newHire = await Hire.create({
      car: car._id || undefined,
      carSlug: car.slug,
      carName: car.name,
      carImage: car.image,
      dailyRate: car.dailyRate,
      userEmail: userEmail.toLowerCase().trim(),
      userName: userName.trim(),
      userPhone: userPhone || "",
      startDate: start,
      endDate: end,
      totalDays,
      pickupLocation: pickupLocation || car.location || "TORQ Flagship Lounge, Manhattan",
      returnLocation: returnLocation || pickupLocation || "TORQ Flagship Lounge, Manhattan",
      deliveryOption,
      chauffeurOption,
      insuranceTier,
      ...pricing,
      driverLicenseNumber: driverLicenseNumber || "VERIFIED-ON-FILE",
      specialRequests: specialRequests || "",
      status: "confirmed",
      paymentStatus: "fully_paid",
    });

    res.status(201).json({
      success: true,
      message: `Reservation confirmed for ${car.name}. Your booking ID is ${newHire.hireNumber}.`,
      data: newHire,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieve user's bookings and rental history.
 */
export async function getUserHires(req, res, next) {
  try {
    const { email } = req.query;

    const query = {};
    if (email) {
      query.userEmail = email.toLowerCase().trim();
    }

    const hires = await Hire.find(query).sort({ createdAt: -1 }).lean();

    res.status(200).json({
      success: true,
      count: hires.length,
      data: hires,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieve specific hire reservation details by ID or Hire Number.
 */
export async function getHireById(req, res, next) {
  try {
    const { id } = req.params;

    let hire = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      hire = await Hire.findById(id).lean();
    }
    if (!hire) {
      hire = await Hire.findOne({ hireNumber: id.toUpperCase() }).lean();
    }

    if (!hire) {
      return res.status(404).json({
        success: false,
        error: `Hire reservation not found for identifier: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: hire,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Update Hire status (Admin or Concierge dispatch).
 */
export async function updateHireStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status, paymentStatus } = req.body;

    const validStatuses = ["pending", "confirmed", "in_progress", "completed", "cancelled"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status '${status}'. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const updateFields = {};
    if (status) updateFields.status = status;
    if (paymentStatus) updateFields.paymentStatus = paymentStatus;

    const hire = await Hire.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!hire) {
      return res.status(404).json({
        success: false,
        error: "Hire reservation not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Reservation ${hire.hireNumber} status transitioned to ${hire.status}.`,
      data: hire,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Client or Concierge Cancel reservation with reason.
 */
export async function cancelHire(req, res, next) {
  try {
    const { id } = req.params;
    const { reason = "Client requested cancellation" } = req.body;

    const hire = await Hire.findById(id);
    if (!hire) {
      return res.status(404).json({
        success: false,
        error: "Hire reservation not found.",
      });
    }

    if (hire.status === "completed") {
      return res.status(400).json({
        success: false,
        error: "Completed reservations cannot be cancelled.",
      });
    }

    hire.status = "cancelled";
    hire.cancellationReason = reason;
    hire.paymentStatus = "refunded";
    await hire.save();

    res.status(200).json({
      success: true,
      message: `Reservation ${hire.hireNumber} has been successfully cancelled and security deposit refunded.`,
      data: hire,
    });
  } catch (error) {
    next(error);
  }
}

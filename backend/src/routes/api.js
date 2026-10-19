import express from "express";
import {
  getAllCars,
  getCarDetails,
  createCar,
  updateCar,
  deleteCar,
  toggleCarAvailability,
} from "../controllers/carController.js";
import {
  calculateEstimate,
  createHire,
  getUserHires,
  getHireById,
  updateHireStatus,
  cancelHire,
} from "../controllers/hireController.js";
import {
  getReviews,
  createReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { getDashboardStats } from "../controllers/statsController.js";
import { seedFleet } from "../controllers/seedController.js";
import {
  getAllParts,
  getPartDetails,
  getFeaturedParts,
  getPartCategories,
  createPart,
  updatePart,
  deletePart,
  checkFitment,
  verifyPartAuthenticity,
} from "../controllers/partController.js";
import {
  createPartOrder,
  getUserPartOrders,
  getPartOrderById,
  cancelPartOrder,
} from "../controllers/partOrderController.js";

const router = express.Router();

/**
 * System Health Check
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "online",
    system: "TORQ Luxury Motors API Engine",
    version: "1.0.0",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

/**
 * Database Seed Endpoint
 */
router.route("/seed").get(seedFleet).post(seedFleet);

/**
 * Luxury Vehicle Fleet Routes
 */
router.route("/cars").get(getAllCars).post(createCar);
router.route("/cars/:identifier").get(getCarDetails);
router.route("/cars/:id").put(updateCar).delete(deleteCar);
router.patch("/cars/:id/availability", toggleCarAvailability);

/**
 * Car Hire & Booking Routes
 */
router.post("/hires/estimate", calculateEstimate);
router.route("/hires").get(getUserHires).post(createHire);
router.route("/hires/:id").get(getHireById);
router.patch("/hires/:id/status", updateHireStatus);
router.post("/hires/:id/cancel", cancelHire);

/**
 * Authentic OEM Car Parts Routes
 */
router.get("/parts/categories", getPartCategories);
router.get("/parts/featured", getFeaturedParts);
router.post("/parts/check-fitment", checkFitment);
router.post("/parts/verify-authenticity", verifyPartAuthenticity);
router.route("/parts").get(getAllParts).post(createPart);
router.route("/parts/:identifier").get(getPartDetails);
router.route("/parts/:id").put(updatePart).delete(deletePart);

/**
 * Car Part Customer Orders & Fulfillment
 */
router.route("/parts-orders").get(getUserPartOrders).post(createPartOrder);
router.route("/parts-orders/:id").get(getPartOrderById);
router.post("/parts-orders/:id/cancel", cancelPartOrder);

/**
 * Reviews & Experience Feedback Routes
 */
router.route("/reviews").get(getReviews).post(createReview);
router.delete("/reviews/:id", deleteReview);

/**
 * Fleet & Rental Telemetry Analytics
 */
router.get("/stats/dashboard", getDashboardStats);

export default router;

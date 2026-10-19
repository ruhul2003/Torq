import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vehicle name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["hypercar", "gt", "suv", "bespoke", "sports"],
      default: "gt",
    },
    categoryLabel: {
      type: String,
      default: "Grand Tourer",
    },
    image: {
      type: String,
      required: [true, "Primary car image is required"],
    },
    gallery: {
      type: [String],
      default: [],
    },
    dailyRate: {
      type: Number,
      required: [true, "Daily hire rate is required"],
      min: [50, "Daily rate must be at least $50"],
    },
    hourlyRate: {
      type: Number,
      default: function () {
        return Math.round(this.dailyRate / 8);
      },
    },
    securityDeposit: {
      type: Number,
      required: true,
      default: 2500,
    },
    mileageLimitPerDay: {
      type: Number,
      default: 150,
    },
    extraMileageRate: {
      type: Number,
      default: 5.0,
    },
    specs: {
      zeroToSixty: { type: String, default: "2.1s" },
      horsePower: { type: String, default: "1,000 HP" },
      range: { type: String, default: "450 mi" },
      topSpeed: { type: String, default: "210 MPH" },
      transmission: { type: String, default: "Dual-Clutch AWD" },
      seats: { type: Number, default: 2 },
      fuelType: { type: String, default: "Electric Tri-Motor" },
    },
    exteriorColor: {
      type: String,
      default: "Obsidian Black",
    },
    interiorColor: {
      type: String,
      default: "Cognac Leather",
    },
    features: {
      type: [String],
      default: [
        "White-Glove Enclosed Delivery",
        "Full Comprehensive Road Insurance",
        "Private Track Telemetry Mode",
        "24/7 Roadside Concierge Service",
      ],
    },
    location: {
      type: String,
      default: "TORQ Flagship Lounge, Manhattan",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    maintenanceStatus: {
      type: String,
      enum: ["active", "in_service", "reserved"],
      default: "active",
    },
    rating: {
      type: Number,
      default: 4.9,
      min: 1.0,
      max: 5.0,
    },
    reviewsCount: {
      type: Number,
      default: 12,
    },
    vin: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      default: "Elite engineering meets peerless luxury. Ready for executive hire or weekend track touring.",
    },
  },
  {
    timestamps: true,
    collection: "cars",
  }
);

CarSchema.index({ category: 1, isAvailable: 1 });
CarSchema.index({ dailyRate: 1 });

const Car = mongoose.models.Car || mongoose.model("Car", CarSchema, "cars");

export default Car;

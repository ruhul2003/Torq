import mongoose from "mongoose";

const PartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Part name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    partNumber: {
      type: String,
      required: [true, "OEM Part Number is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    oemBrand: {
      type: String,
      required: [true, "OEM Brand manufacturer is required"],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "brakes",
        "exhaust",
        "powertrain",
        "suspension",
        "aerodynamics",
        "wheels",
        "interior",
        "electronics",
      ],
      default: "powertrain",
    },
    categoryLabel: {
      type: String,
      default: "Powertrain & Engine",
    },
    subcategory: {
      type: String,
      default: "OEM Component",
    },
    condition: {
      type: String,
      enum: [
        "OEM Brand New",
        "Factory Certified Reconditioned",
        "Bespoke Performance Edition",
      ],
      default: "OEM Brand New",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be positive"],
    },
    originalPrice: {
      type: Number,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
      default: 5,
      min: [0, "Stock cannot be negative"],
    },
    compatibility: {
      type: [String],
      required: true,
      default: [],
    },
    compatibleYears: {
      type: String,
      default: "2020 - 2026",
    },
    image: {
      type: String,
      required: [true, "Primary part photo URL is required"],
    },
    gallery: {
      type: [String],
      default: [],
    },
    specs: {
      material: { type: String, default: "Aerospace Grade Alloy" },
      weight: { type: String, default: "4.5 kg" },
      origin: { type: String, default: "Stuttgart, Germany" },
      dimensions: { type: String, default: "450 x 300 x 120 mm" },
      finish: { type: String, default: "Anodized Matte" },
      warrantyYears: { type: Number, default: 2 },
      partType: { type: String, default: "Factory Original OEM" },
    },
    features: {
      type: [String],
      default: [
        "100% Guaranteed Factory Authenticity",
        "Certified with Holographic Anti-Counterfeit Seal",
        "Engineered to Exact OEM Tolerances & Torque Specs",
        "Includes Manufacturer Certificate of Authenticity",
      ],
    },
    certificateOfAuthenticity: {
      type: Boolean,
      default: true,
    },
    hologramCode: {
      type: String,
      unique: true,
      sparse: true,
    },
    warranty: {
      type: String,
      default: "2-Year Manufacturer OEM Direct Warranty",
    },
    installationDifficulty: {
      type: String,
      enum: [
        "Plug & Play",
        "Moderate (1-2 Hours)",
        "Professional Certified Required",
      ],
      default: "Professional Certified Required",
    },
    rating: {
      type: Number,
      default: 4.9,
      min: 1.0,
      max: 5.0,
    },
    reviewsCount: {
      type: Number,
      default: 8,
    },
    description: {
      type: String,
      default:
        "Factory-original genuine component precision-crafted for flawless fitment, peak thermal endurance, and unparalleled performance.",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "parts",
  }
);

PartSchema.index({ category: 1, inStock: 1 });
PartSchema.index({ oemBrand: 1 });
PartSchema.index({ partNumber: 1 });
PartSchema.index({ price: 1 });

const Part = mongoose.models.Part || mongoose.model("Part", PartSchema, "parts");

export default Part;

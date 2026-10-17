import mongoose from "mongoose";

const HireSchema = new mongoose.Schema(
  {
    hireNumber: {
      type: String,
      unique: true,
      required: true,
      default: function () {
        const rand = Math.floor(1000 + Math.random() * 9000);
        return `TRQ-HIRE-${Date.now().toString().slice(-4)}-${rand}`;
      },
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: false,
    },
    carSlug: {
      type: String,
      required: true,
    },
    carName: {
      type: String,
      required: true,
    },
    carImage: {
      type: String,
    },
    dailyRate: {
      type: Number,
      required: true,
    },
    userEmail: {
      type: String,
      required: [true, "Customer email is required"],
      trim: true,
      lowercase: true,
    },
    userName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    userPhone: {
      type: String,
      required: false,
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Hire start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "Hire return date is required"],
    },
    totalDays: {
      type: Number,
      required: true,
      min: 1,
    },
    pickupLocation: {
      type: String,
      default: "TORQ Flagship Lounge, Manhattan",
    },
    returnLocation: {
      type: String,
      default: "TORQ Flagship Lounge, Manhattan",
    },
    deliveryOption: {
      type: String,
      enum: ["showroom_pickup", "valet_concierge_delivery", "airport_vip_meet"],
      default: "showroom_pickup",
    },
    chauffeurOption: {
      included: { type: Boolean, default: false },
      dailyFee: { type: Number, default: 450 },
    },
    insuranceTier: {
      name: { type: String, default: "Executive Zero Liability" },
      tier: {
        type: String,
        enum: ["standard", "premium_shield", "executive_zero_liability"],
        default: "premium_shield",
      },
      dailyCost: { type: Number, default: 120 },
    },
    baseRentalCost: {
      type: Number,
      required: true,
    },
    chauffeurCost: {
      type: Number,
      default: 0,
    },
    insuranceCost: {
      type: Number,
      default: 0,
    },
    securityDeposit: {
      type: Number,
      default: 2500,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    taxAmount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "in_progress", "completed", "cancelled"],
      default: "confirmed",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "deposit_held", "fully_paid", "refunded"],
      default: "fully_paid",
    },
    driverLicenseNumber: {
      type: String,
    },
    specialRequests: {
      type: String,
      default: "",
    },
    cancellationReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

HireSchema.index({ userEmail: 1, createdAt: -1 });
HireSchema.index({ status: 1 });
HireSchema.index({ carSlug: 1 });

const Hire = mongoose.models.Hire || mongoose.model("Hire", HireSchema);

export default Hire;

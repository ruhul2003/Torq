import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: false,
    },
    carSlug: {
      type: String,
      required: true,
      index: true,
    },
    carName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: [true, "Reviewer name is required"],
      trim: true,
    },
    userEmail: {
      type: String,
      required: [true, "Reviewer email is required"],
      trim: true,
      lowercase: true,
    },
    userRole: {
      type: String,
      default: "Verified Client",
    },
    rating: {
      type: Number,
      required: [true, "Rating between 1 and 5 is required"],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      default: "Exhilarating Luxury Experience",
    },
    comment: {
      type: String,
      required: [true, "Review comment is required"],
      trim: true,
    },
    aspects: {
      vehiclePerformance: { type: Number, default: 5, min: 1, max: 5 },
      conciergeService: { type: Number, default: 5, min: 1, max: 5 },
      deliveryCondition: { type: Number, default: 5, min: 1, max: 5 },
    },
    isVerifiedHire: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.index({ carSlug: 1, createdAt: -1 });

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;

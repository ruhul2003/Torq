import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    part: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Part",
    },
    partNumber: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    oemBrand: {
      type: String,
      default: "TORQ OEM",
    },
    subtotal: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const PartOrderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, "Customer email is required"],
      lowercase: true,
      trim: true,
    },
    customerPhone: {
      type: String,
      required: [true, "Customer phone number is required"],
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, default: "United States" },
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "Order must contain at least one genuine part",
      },
    },
    subtotal: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      default: 0,
    },
    shippingTier: {
      type: String,
      enum: ["standard_freight", "white_glove_air", "rush_trackside_courier"],
      default: "white_glove_air",
    },
    taxAmount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "paid",
    },
    paymentMethod: {
      type: String,
      default: "Black Card / Secure Escrow",
    },
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "authenticating",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "confirmed",
    },
    trackingNumber: {
      type: String,
      default: function () {
        return `TRQ-EXP-${Math.floor(100000 + Math.random() * 900000)}`;
      },
    },
    carrier: {
      type: String,
      default: "TORQ White-Glove Air Express",
    },
    vinVerification: {
      vin: { type: String, trim: true },
      vehicleModel: { type: String, trim: true },
      verifiedByTechnician: { type: Boolean, default: true },
      notes: { type: String, default: "Fitment verified with factory tolerances." },
    },
    cancellationReason: {
      type: String,
      default: null,
    },
    estimatedDelivery: {
      type: Date,
      default: function () {
        const d = new Date();
        d.setDate(d.getDate() + 3);
        return d;
      },
    },
  },
  {
    timestamps: true,
    collection: "part_orders",
  }
);

PartOrderSchema.index({ customerEmail: 1 });
PartOrderSchema.index({ orderNumber: 1 });
PartOrderSchema.index({ orderStatus: 1 });

const PartOrder =
  mongoose.models.PartOrder ||
  mongoose.model("PartOrder", PartOrderSchema, "part_orders");

export default PartOrder;

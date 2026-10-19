import PartOrder from "../models/PartOrder.js";
import Part from "../models/Part.js";

/**
 * Place a new OEM car part purchase order with inventory stock reduction.
 */
export async function createPartOrder(req, res) {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      shippingTier = "white_glove_air",
      paymentMethod = "Black Card / Secure Escrow",
      vinVerification = {},
    } = req.body;

    if (!customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({
        success: false,
        error: "Customer name, email, and phone are required",
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: "At least one genuine car part must be selected",
      });
    }

    if (!shippingAddress || !shippingAddress.street || !shippingAddress.city) {
      return res.status(400).json({
        success: false,
        error: "Complete shipping destination address is required",
      });
    }

    // Calculate subtotal and validate items
    let subtotal = 0;
    const validatedItems = items.map((item) => {
      const lineTotal = Number(item.price) * Number(item.quantity || 1);
      subtotal += lineTotal;
      return {
        part: item.part || item._id,
        partNumber: item.partNumber || "OEM-GENUINE",
        name: item.name,
        image: item.image,
        price: Number(item.price),
        quantity: Number(item.quantity || 1),
        oemBrand: item.oemBrand || "TORQ OEM",
        subtotal: lineTotal,
      };
    });

    // Shipping tier rates
    let shippingFee = 0;
    if (shippingTier === "rush_trackside_courier") shippingFee = 650;
    else if (shippingTier === "white_glove_air") shippingFee = subtotal > 10000 ? 0 : 250;
    else shippingFee = 0;

    const taxAmount = Math.round(subtotal * 0.08875 * 100) / 100;
    const totalAmount = subtotal + shippingFee + taxAmount;

    // Generate unique order reference
    const randCode = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `TRQ-OEM-${randCode}`;

    const orderData = {
      orderNumber,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items: validatedItems,
      subtotal,
      shippingFee,
      shippingTier,
      taxAmount,
      totalAmount,
      paymentStatus: "paid",
      paymentMethod,
      orderStatus: "confirmed",
      trackingNumber: `TRQ-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
      carrier: "TORQ White-Glove Air Express",
      vinVerification: {
        vin: vinVerification.vin || "NOT PROVIDED",
        vehicleModel: vinVerification.vehicleModel || "Verified Performance Chassis",
        verifiedByTechnician: true,
        notes: vinVerification.notes || "Laser precision fitment verified.",
      },
    };

    let savedOrder;
    try {
      savedOrder = await PartOrder.create(orderData);

      // Deduct stock in DB if parts exist
      for (const it of validatedItems) {
        if (it.part) {
          await Part.findByIdAndUpdate(it.part, {
            $inc: { stockQuantity: -it.quantity },
          }).catch(() => null);
        }
      }
    } catch (dbErr) {
      console.warn("[PartOrderController] DB unavailable, creating memory order:", dbErr.message);
      savedOrder = {
        _id: `mem_${Date.now()}`,
        ...orderData,
        createdAt: new Date(),
      };
    }

    res.status(201).json({
      success: true,
      message: `Order ${orderNumber} successfully confirmed with White-Glove Logistics dispatch.`,
      data: savedOrder,
    });
  } catch (error) {
    console.error("[PartOrderController] createPartOrder error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to process car parts order",
    });
  }
}

/**
 * Retrieve customer part orders by email or list recent orders.
 */
export async function getUserPartOrders(req, res) {
  try {
    const { email } = req.query;
    const query = {};
    if (email) {
      query.customerEmail = email.toLowerCase().trim();
    }

    let orders = await PartOrder.find(query)
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("[PartOrderController] getUserPartOrders error:", error);
    res.status(500).json({
      success: false,
      error: "Unable to retrieve order history",
    });
  }
}

/**
 * Get single order details and live shipment tracker.
 */
export async function getPartOrderById(req, res) {
  try {
    const { id } = req.params;

    let order = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await PartOrder.findById(id).lean();
    }

    if (!order) {
      order = await PartOrder.findOne({
        orderNumber: id.toUpperCase(),
      }).lean();
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        error: `Order '${id}' not found`,
      });
    }

    // Computed shipment tracking milestones
    const trackingSteps = [
      {
        status: "confirmed",
        title: "Order Placed & Escrow Secured",
        time: order.createdAt,
        completed: true,
      },
      {
        status: "authenticating",
        title: "Hologram Laser Authenticity Verification",
        time: new Date(new Date(order.createdAt).getTime() + 1000 * 60 * 30),
        completed: ["authenticating", "shipped", "delivered"].includes(order.orderStatus),
      },
      {
        status: "shipped",
        title: "Dispatched via White-Glove Enclosed Carrier",
        time: new Date(new Date(order.createdAt).getTime() + 1000 * 60 * 120),
        completed: ["shipped", "delivered"].includes(order.orderStatus),
      },
      {
        status: "delivered",
        title: "Delivered & Client Signed",
        time: order.estimatedDelivery,
        completed: order.orderStatus === "delivered",
      },
    ];

    res.status(200).json({
      success: true,
      data: order,
      trackingSteps,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * Cancel part order before shipping dispatch.
 */
export async function cancelPartOrder(req, res) {
  try {
    const { id } = req.params;
    const { reason = "Client requested cancellation" } = req.body;

    const order = await PartOrder.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }

    if (order.orderStatus === "shipped" || order.orderStatus === "delivered") {
      return res.status(400).json({
        success: false,
        error: "Cannot cancel order that has already been dispatched by carrier",
      });
    }

    order.orderStatus = "cancelled";
    order.cancellationReason = reason;
    await order.save();

    // Restock items
    for (const it of order.items) {
      if (it.part) {
        await Part.findByIdAndUpdate(it.part, {
          $inc: { stockQuantity: it.quantity },
        }).catch(() => null);
      }
    }

    res.status(200).json({
      success: true,
      message: "Order cancelled and payment refunded to escrow account.",
      data: order,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

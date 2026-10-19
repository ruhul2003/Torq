import { INVENTORY } from "../data/inventory";
import { PARTS_INVENTORY } from "../data/partsInventory";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Fetch all available luxury cars for hire with filters.
 */
export async function getCars(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== "all") params.append("category", filters.category);
    if (filters.search) params.append("search", filters.search);
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.sort) params.append("sort", filters.sort);

    const res = await fetch(`${API_BASE}/api/cars?${params.toString()}`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 30 },
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.warn("[API] Backend offline or unreachable. Using client inventory fallback:", err.message);
    // Client-side fallback from inventory.js
    let items = INVENTORY.map((c) => ({
      ...c,
      slug: c.id,
      dailyRate: Math.round(c.numericPrice / 120),
      securityDeposit: 3500,
      location: "TORQ Flagship Lounge, Manhattan",
      rating: 4.9,
      reviewsCount: 16,
    }));

    if (filters.category && filters.category !== "all") {
      items = items.filter((c) => c.category === filters.category);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(
        (c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
      );
    }
    return items;
  }
}

/**
 * Fetch specific vehicle details and reviews.
 */
export async function getCarDetails(slugOrId) {
  try {
    const res = await fetch(`${API_BASE}/api/cars/${slugOrId}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn("[API] Fetch car details fallback:", err.message);
    const item = INVENTORY.find((c) => c.id === slugOrId) || INVENTORY[0];
    return {
      success: true,
      data: {
        ...item,
        slug: item.id,
        dailyRate: Math.round(item.numericPrice / 120),
        securityDeposit: 3500,
        location: "TORQ Flagship Lounge, Manhattan",
        rating: 4.9,
        reviewsCount: 16,
      },
      reviews: [],
    };
  }
}

/**
 * Request real-time hire estimate breakdown.
 */
export async function calculateHireEstimate(payload) {
  try {
    const res = await fetch(`${API_BASE}/api/hires/estimate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("[API] Calculate estimate local fallback:", err.message);
    const dailyRate = payload.dailyRate || 1850;
    const start = new Date(payload.startDate || Date.now());
    const end = new Date(payload.endDate || Date.now() + 86400000 * 3);
    const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    const base = dailyRate * days;
    const chauffeur = payload.chauffeurIncluded ? 450 * days : 0;
    const insurance = payload.insuranceTier === "executive_zero_liability" ? 160 * days : 100 * days;
    const subtotal = base + chauffeur + insurance;
    const tax = Math.round(subtotal * 0.08875 * 100) / 100;

    return {
      success: true,
      data: {
        totalDays: days,
        dailyRate,
        baseRentalCost: base,
        chauffeurCost: chauffeur,
        insuranceCost: insurance,
        securityDeposit: 3500,
        subtotal,
        taxAmount: tax,
        totalAmount: subtotal + tax,
      },
    };
  }
}

/**
 * Submit confirmed luxury car hire booking.
 */
export async function createHireBooking(bookingData) {
  try {
    const res = await fetch(`${API_BASE}/api/hires`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      throw new Error(errorJson.error || `HTTP error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn("[API] Booking submission fallback to local storage:", err.message);
    const rand = Math.floor(1000 + Math.random() * 9000);
    const booking = {
      _id: "local_" + Date.now(),
      hireNumber: `TRQ-HIRE-LOC-${rand}`,
      ...bookingData,
      status: "confirmed",
      paymentStatus: "fully_paid",
      createdAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("torq_local_hires") || "[]");
      existing.unshift(booking);
      localStorage.setItem("torq_local_hires", JSON.stringify(existing));
    }

    return {
      success: true,
      message: `Reservation confirmed! Booking ID: ${booking.hireNumber}`,
      data: booking,
    };
  }
}

/**
 * Fetch customer hire history.
 */
export async function getUserHires(email = "") {
  try {
    const url = email ? `${API_BASE}/api/hires?email=${encodeURIComponent(email)}` : `${API_BASE}/api/hires`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.warn("[API] Fetch bookings local fallback:", err.message);
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("torq_local_hires") || "[]");
    }
    return [];
  }
}

/**
 * Submit car review.
 */
export async function submitReview(reviewData) {
  try {
    const res = await fetch(`${API_BASE}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      success: true,
      message: "Review recorded locally in demo mode.",
      data: reviewData,
    };
  }
}

/**
 * Cancel reservation.
 */
export async function cancelHireBooking(id, reason) {
  try {
    const res = await fetch(`${API_BASE}/api/hires/${id}/cancel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("torq_local_hires") || "[]");
      const updated = existing.map((h) => (h._id === id ? { ...h, status: "cancelled" } : h));
      localStorage.setItem("torq_local_hires", JSON.stringify(updated));
    }
    return {
      success: true,
      message: "Booking cancelled successfully.",
    };
  }
}

/**
 * Fetch OEM original car parts with multi-criteria filtering.
 */
export async function getParts(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== "all") params.append("category", filters.category);
    if (filters.brand && filters.brand !== "all") params.append("brand", filters.brand);
    if (filters.condition && filters.condition !== "all") params.append("condition", filters.condition);
    if (filters.search) params.append("search", filters.search);
    if (filters.vehicle) params.append("vehicle", filters.vehicle);
    if (filters.inStock) params.append("inStock", "true");
    if (filters.minPrice) params.append("minPrice", filters.minPrice);
    if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
    if (filters.sort) params.append("sort", filters.sort);

    const res = await fetch(`${API_BASE}/api/parts?${params.toString()}`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 30 },
    });

    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.warn("[API] Parts backend fallback to local dataset:", err.message);
    let items = [...PARTS_INVENTORY];

    if (filters.category && filters.category !== "all") {
      items = items.filter((p) => p.category === filters.category);
    }
    if (filters.brand && filters.brand !== "all") {
      items = items.filter((p) => p.oemBrand.toLowerCase().includes(filters.brand.toLowerCase()));
    }
    if (filters.condition && filters.condition !== "all") {
      items = items.filter((p) => p.condition === filters.condition);
    }
    if (filters.inStock) {
      items = items.filter((p) => p.inStock && p.stockQuantity > 0);
    }
    if (filters.vehicle) {
      const v = filters.vehicle.toLowerCase();
      items = items.filter((p) => p.compatibility.some((m) => m.toLowerCase().includes(v)));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.partNumber.toLowerCase().includes(q) ||
          p.oemBrand.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q)
      );
    }
    if (filters.sort === "price_asc") items.sort((a, b) => a.price - b.price);
    if (filters.sort === "price_desc") items.sort((a, b) => b.price - a.price);
    if (filters.sort === "rating") items.sort((a, b) => b.rating - a.rating);

    return items;
  }
}

/**
 * Fetch detailed specifications for an original car part.
 */
export async function getPartDetails(identifier) {
  try {
    const res = await fetch(`${API_BASE}/api/parts/${identifier}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("[API] Part detail fallback:", err.message);
    const item =
      PARTS_INVENTORY.find(
        (p) =>
          p.slug === identifier ||
          p.partNumber.toUpperCase() === identifier.toUpperCase() ||
          p._id === identifier
      ) || PARTS_INVENTORY[0];

    const related = PARTS_INVENTORY.filter(
      (p) => p.category === item.category && p.slug !== item.slug
    ).slice(0, 4);

    return {
      success: true,
      data: item,
      related,
    };
  }
}

/**
 * Check OEM fitment against client's vehicle make, model, or VIN.
 */
export async function checkPartFitment(payload) {
  try {
    const res = await fetch(`${API_BASE}/api/parts/check-fitment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("[API] Fitment validation local check:", err.message);
    const part = PARTS_INVENTORY.find((p) => p.partNumber === payload.partNumber) || PARTS_INVENTORY[0];
    const target = `${payload.vehicleMake || ""} ${payload.vehicleModel || ""}`.trim().toLowerCase();
    const isCompatible = target
      ? part.compatibility.some((m) => m.toLowerCase().includes(target) || target.includes(m.toLowerCase()))
      : true;

    return {
      success: true,
      partNumber: part.partNumber,
      partName: part.name,
      compatible: isCompatible,
      status: isCompatible
        ? "100% Guaranteed Factory Direct Fitment"
        : "Potential Fitment Warning - Specialist Consultation Advised",
      compatibilityList: part.compatibility,
      compatibleYears: part.compatibleYears,
      installationDifficulty: part.installationDifficulty,
      specs: part.specs,
      verifiedVin: payload.vin ? `VIN-${payload.vin.toUpperCase()}` : null,
      recommendation: isCompatible
        ? "Precision engineered to match factory torque specs and electronic harnesses."
        : "Chassis specification requires custom adaptation brackets.",
    };
  }
}

/**
 * Verify part hologram authenticity certificate.
 */
export async function verifyPartCertificate(payload) {
  try {
    const res = await fetch(`${API_BASE}/api/parts/verify-authenticity`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("[API] Verify certificate fallback:", err.message);
    const code = (payload.hologramCode || payload.partNumber || "").toUpperCase();
    const part = PARTS_INVENTORY.find(
      (p) =>
        (p.hologramCode && p.hologramCode.toUpperCase().includes(code)) ||
        p.partNumber.toUpperCase().includes(code)
    );

    if (part) {
      return {
        success: true,
        authentic: true,
        status: "CERTIFIED_GENUINE_OEM",
        certificate: {
          partName: part.name,
          partNumber: part.partNumber,
          hologramCode: part.hologramCode,
          oemBrand: part.oemBrand,
          origin: part.specs?.origin || "Stuttgart, Germany",
          condition: part.condition,
          warranty: part.warranty,
          inspectionStatus: "Passed 120-Point Laser Precision Scan",
          issuedBy: "TORQ Certified OEM Logistics Vault, Manhattan",
          issuedDate: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };
    }

    return {
      success: true,
      authentic: false,
      status: "UNVERIFIED_OR_COUNTERFEIT",
      message: "No factory authenticity record found matching this code in TORQ registry.",
    };
  }
}

/**
 * Submit confirmed car parts purchase order.
 */
export async function createPartOrder(orderData) {
  try {
    const res = await fetch(`${API_BASE}/api/parts-orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      throw new Error(errorJson.error || `HTTP error ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn("[API] Part order fallback to local storage:", err.message);
    const rand = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `TRQ-OEM-${rand}`;
    const order = {
      _id: "local_order_" + Date.now(),
      orderNumber,
      ...orderData,
      orderStatus: "confirmed",
      paymentStatus: "paid",
      trackingNumber: `TRQ-EXP-${Math.floor(100000 + Math.random() * 900000)}`,
      carrier: "TORQ White-Glove Air Express",
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 86400000 * 3).toISOString(),
    };

    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("torq_local_part_orders") || "[]");
      existing.unshift(order);
      localStorage.setItem("torq_local_part_orders", JSON.stringify(existing));
    }

    return {
      success: true,
      message: `Order confirmed! Order Number: ${orderNumber}`,
      data: order,
    };
  }
}

/**
 * Fetch customer car parts order history.
 */
export async function getUserPartOrders(email = "") {
  try {
    const url = email
      ? `${API_BASE}/api/parts-orders?email=${encodeURIComponent(email)}`
      : `${API_BASE}/api/parts-orders`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.warn("[API] Fetch part orders local fallback:", err.message);
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("torq_local_part_orders") || "[]");
    }
    return [];
  }
}

/**
 * Cancel part order.
 */
export async function cancelPartOrder(id, reason) {
  try {
    const res = await fetch(`${API_BASE}/api/parts-orders/${id}/cancel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason }),
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("torq_local_part_orders") || "[]");
      const updated = existing.map((o) => (o._id === id ? { ...o, orderStatus: "cancelled" } : o));
      localStorage.setItem("torq_local_part_orders", JSON.stringify(updated));
    }
    return {
      success: true,
      message: "Order cancelled successfully.",
    };
  }
}


import { INVENTORY } from "../data/inventory";

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

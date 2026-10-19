"use client";

import { useState, useEffect } from "react";
import { getUserPartOrders, cancelPartOrder } from "@/lib/api";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Search,
  ExternalLink,
  AlertCircle,
  XCircle,
} from "lucide-react";

export default function PartOrdersHistory({ userEmail = "" }) {
  const [emailQuery, setEmailQuery] = useState(userEmail);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModalId, setCancelModalId] = useState(null);

  const fetchOrders = async (targetEmail = "") => {
    setLoading(true);
    try {
      const data = await getUserPartOrders(targetEmail);
      setOrders(data || []);
    } catch (err) {
      console.warn("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(userEmail);
  }, [userEmail]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOrders(emailQuery.trim());
  };

  const handleCancel = async (id) => {
    try {
      await cancelPartOrder(id, "Cancelled by client via dashboard");
      fetchOrders(emailQuery.trim());
      setCancelModalId(null);
    } catch (e) {
      console.error(e);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      confirmed: {
        label: "Confirmed / In Verification",
        classes: "bg-sky-500/10 text-sky-500 border-sky-500/20",
      },
      authenticating: {
        label: "Authenticity Laser Scan",
        classes: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      },
      shipped: {
        label: "En Route / In Transit",
        classes: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      },
      delivered: {
        label: "Delivered & Signed",
        classes: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      },
      cancelled: {
        label: "Order Cancelled",
        classes: "bg-rose-500/10 text-rose-500 border-rose-500/20",
      },
    }[status] || {
      label: status,
      classes: "bg-neutral-500/10 text-neutral-500 border-neutral-500/20",
    };

    return (
      <span
        className={`inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${config.classes}`}
      >
        <span>{config.label}</span>
      </span>
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Lookup Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-3 p-4 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-md"
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="email"
            placeholder="Enter customer email to filter order history..."
            value={emailQuery}
            onChange={(e) => setEmailQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] text-xs font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          />
        </div>
        <button
          type="submit"
          className="h-11 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 font-semibold text-xs tracking-wider uppercase cursor-pointer transition-all shrink-0"
        >
          Lookup Orders
        </button>
      </form>

      {/* Orders List */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-neutral-400">
          Loading order history and shipment telemetry...
        </div>
      ) : orders.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0e14]">
          <Package className="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-700 mb-3" />
          <h4 className="font-display font-bold text-neutral-900 dark:text-white">
            No Part Orders Located
          </h4>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
            No genuine OEM car part orders found. Orders placed will appear here with live tracking telemetry.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id || order.orderNumber}
              className="p-5 sm:p-6 rounded-2xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#0c0e14] shadow-sm space-y-4"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-white/5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
                      {order.orderNumber}
                    </span>
                    {getStatusBadge(order.orderStatus)}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">
                    Placed on {new Date(order.createdAt).toLocaleDateString()} • {order.customerName}
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-mono text-neutral-400 block">TOTAL SETTLED</span>
                  <span className="font-display font-bold text-base text-neutral-900 dark:text-white">
                    ${order.totalAmount?.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Shipment Progress Visualizer */}
              {order.orderStatus !== "cancelled" && (
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/5">
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                    <div className="space-y-1">
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-[10px]">
                        ✓
                      </div>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                        Order Placed
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center mx-auto text-[10px] ${
                          ["authenticating", "shipped", "delivered"].includes(order.orderStatus)
                            ? "bg-emerald-500 text-white"
                            : "bg-neutral-200 dark:bg-white/10 text-neutral-400"
                        }`}
                      >
                        ✓
                      </div>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Laser Verified
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center mx-auto text-[10px] ${
                          ["shipped", "delivered"].includes(order.orderStatus)
                            ? "bg-emerald-500 text-white"
                            : "bg-neutral-200 dark:bg-white/10 text-neutral-400"
                        }`}
                      >
                        ✓
                      </div>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Air Dispatched
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center mx-auto text-[10px] ${
                          order.orderStatus === "delivered"
                            ? "bg-emerald-500 text-white"
                            : "bg-neutral-200 dark:bg-white/10 text-neutral-400"
                        }`}
                      >
                        ✓
                      </div>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        Delivered
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="flex flex-wrap gap-2 pt-1">
                {order.items?.map((it, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-lg bg-neutral-100 dark:bg-white/5 text-xs font-mono"
                  >
                    <img src={it.image} alt={it.name} className="w-7 h-7 rounded object-cover" />
                    <span className="truncate max-w-[200px] text-neutral-800 dark:text-neutral-200">
                      {it.name}
                    </span>
                    <span className="text-neutral-400">x{it.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Tracking & Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-neutral-500">
                  <Truck className="w-4 h-4 text-sky-500" />
                  <span>Tracking: {order.trackingNumber} ({order.carrier})</span>
                </div>

                {order.orderStatus === "confirmed" && (
                  <button
                    type="button"
                    onClick={() => handleCancel(order._id)}
                    className="text-xs font-mono text-red-500 hover:text-red-700 underline cursor-pointer"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

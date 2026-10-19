"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedVehicleFitment, setSelectedVehicleFitment] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from LocalStorage upon mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("torq_parts_cart");
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedVehicle = localStorage.getItem("torq_vehicle_fitment");
      if (storedVehicle) {
        setSelectedVehicleFitment(storedVehicle);
      }
    } catch (e) {
      console.warn("Cart hydration failed:", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync cart to LocalStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("torq_parts_cart", JSON.stringify(items));
      } catch (e) {
        console.warn("Cart persistence failed:", e);
      }
    }
  }, [items, isHydrated]);

  // Sync vehicle fitment to LocalStorage
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("torq_vehicle_fitment", selectedVehicleFitment);
      } catch (e) {
        console.warn("Fitment persistence failed:", e);
      }
    }
  }, [selectedVehicleFitment, isHydrated]);

  const addToCart = (part, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (it) => it.partNumber === part.partNumber || it._id === part._id
      );

      if (existingIndex > -1) {
        const next = [...prev];
        const updatedQty = next[existingIndex].quantity + quantity;
        const maxStock = part.stockQuantity || 10;
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: Math.min(updatedQty, maxStock),
        };
        return next;
      }

      return [
        ...prev,
        {
          _id: part._id || part.slug,
          partNumber: part.partNumber,
          name: part.name,
          slug: part.slug,
          oemBrand: part.oemBrand,
          price: part.price,
          originalPrice: part.originalPrice,
          image: part.image,
          condition: part.condition,
          stockQuantity: part.stockQuantity || 5,
          compatibility: part.compatibility || [],
          quantity: Math.min(quantity, part.stockQuantity || 5),
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (identifier) => {
    setItems((prev) =>
      prev.filter(
        (it) => it._id !== identifier && it.partNumber !== identifier
      )
    );
  };

  const updateQuantity = (identifier, newQty) => {
    if (newQty <= 0) {
      removeFromCart(identifier);
      return;
    }

    setItems((prev) =>
      prev.map((it) => {
        if (it._id === identifier || it.partNumber === identifier) {
          const maxStock = it.stockQuantity || 10;
          return {
            ...it,
            quantity: Math.min(newQty, maxStock),
          };
        }
        return it;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((sum, it) => sum + (it.quantity || 1), 0);
  const subtotal = items.reduce(
    (sum, it) => sum + Number(it.price) * (it.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        selectedVehicleFitment,
        setSelectedVehicleFitment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

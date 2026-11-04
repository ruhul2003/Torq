"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const CURRENCIES = {
  USD: { code: "USD", symbol: "$", rate: 1.0, flag: "🇺🇸", name: "US Dollar" },
  EUR: { code: "EUR", symbol: "€", rate: 0.92, flag: "🇪🇺", name: "Euro" },
  GBP: { code: "GBP", symbol: "£", rate: 0.79, flag: "🇬🇧", name: "British Pound" },
  AED: { code: "AED", symbol: "د.إ", rate: 3.67, flag: "🇦🇪", name: "UAE Dirham" },
  JPY: { code: "JPY", symbol: "¥", rate: 154.2, flag: "🇯🇵", name: "Japanese Yen" },
  BTC: { code: "BTC", symbol: "₿", rate: 0.000015, flag: "⚡", name: "Bitcoin" },
  ETH: { code: "ETH", symbol: "Ξ", rate: 0.00038, flag: "💎", name: "Ethereum" },
};

const CurrencyContext = createContext({
  currency: CURRENCIES.USD,
  setCurrency: () => {},
  formatPrice: (amountInUSD) => "",
});

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(CURRENCIES.USD);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("torq_currency");
      if (saved && CURRENCIES[saved]) {
        setCurrencyState(CURRENCIES[saved]);
      }
    } catch {
      // LocalStorage unavailable
    }
  }, []);

  const setCurrency = (curr) => {
    setCurrencyState(curr);
    try {
      localStorage.setItem("torq_currency", curr.code);
    } catch {}
  };

  const formatPrice = (amountInUSD) => {
    const numeric = typeof amountInUSD === "number" ? amountInUSD : parseFloat(String(amountInUSD).replace(/[^0-9.-]+/g, "")) || 0;
    const converted = numeric * currency.rate;

    if (currency.code === "BTC" || currency.code === "ETH") {
      return `${currency.symbol} ${converted.toFixed(4)}`;
    }
    if (currency.code === "JPY") {
      return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${currency.symbol}${Math.round(converted).toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

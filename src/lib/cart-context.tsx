"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { products, type Product } from "@/data/products";

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  lines: Array<{ product: Product; quantity: number; lineTotal: number }>;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "greenfield-cart-v1";
const EMPTY: CartItem[] = [];

let memoryCart: CartItem[] = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

function persist(items: CartItem[]) {
  memoryCart = items;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  emit();
}

function subscribe(listener: () => void) {
  if (!hydrated) {
    hydrated = true;
    memoryCart = loadFromStorage();
  }
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      memoryCart = loadFromStorage();
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  return memoryCart;
}

function getServerSnapshot() {
  return EMPTY;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addItem = useCallback((productId: string, quantity = 1) => {
    const current = memoryCart;
    const existing = current.find((i) => i.productId === productId);
    if (existing) {
      persist(
        current.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        ),
      );
      return;
    }
    persist([...current, { productId, quantity }]);
  }, []);

  const removeItem = useCallback((productId: string) => {
    persist(memoryCart.filter((i) => i.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      persist(memoryCart.filter((i) => i.productId !== productId));
      return;
    }
    persist(
      memoryCart.map((i) =>
        i.productId === productId ? { ...i, quantity } : i,
      ),
    );
  }, []);

  const clear = useCallback(() => persist([]), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = items
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return {
          product,
          quantity: item.quantity,
          lineTotal: product.price * item.quantity,
        };
      })
      .filter(Boolean) as Array<{
      product: Product;
      quantity: number;
      lineTotal: number;
    }>;

    return {
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
      lines,
      addItem,
      removeItem,
      setQuantity,
      clear,
    };
  }, [items, addItem, removeItem, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

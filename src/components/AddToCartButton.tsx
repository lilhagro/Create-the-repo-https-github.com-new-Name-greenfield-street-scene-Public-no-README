"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export function AddToCartButton({
  productId,
  label = "Add to cart",
}: {
  productId: string;
  label?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => {
        addItem(productId);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
    >
      {added ? "Added" : label}
    </button>
  );
}

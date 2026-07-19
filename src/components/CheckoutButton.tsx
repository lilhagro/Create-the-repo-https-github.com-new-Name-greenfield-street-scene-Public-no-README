"use client";

import { useState } from "react";
import { useCart } from "@/modules/commerce/cart-context";

export function CheckoutButton() {
  const { lines, clear } = useCart();
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function checkout() {
    setPending(true);
    setMessage(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          lines: lines.map((line) => ({
            productId: line.product.id,
            quantity: line.quantity,
          })),
        }),
      });
      const data = (await res.json()) as {
        mode?: "stripe" | "demo";
        url?: string;
        orderId?: string;
        message?: string;
        error?: string;
      };

      if (!res.ok) {
        setMessage(data.error || "Checkout failed.");
        return;
      }

      if (data.mode === "stripe" && data.url) {
        window.location.href = data.url;
        return;
      }

      clear();
      setMessage(
        data.message ||
          `Demo order ${data.orderId} created. Add Stripe keys for live payments.`,
      );
    } catch {
      setMessage("Network error — try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="checkout-box">
      <label className="checkout-label" htmlFor="checkout-email">
        Email for receipt
      </label>
      <input
        id="checkout-email"
        className="qty-input"
        type="email"
        autoComplete="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={pending}
      />
      <button
        type="button"
        className="btn btn-primary"
        disabled={pending || !email.includes("@")}
        onClick={checkout}
      >
        {pending ? "Starting checkout…" : "Checkout"}
      </button>
      {message && <p className="muted">{message}</p>}
    </div>
  );
}

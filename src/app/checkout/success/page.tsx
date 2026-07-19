"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useCart } from "@/modules/commerce/cart-context";

function SuccessInner() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <header className="page-hero">
      <p className="eyebrow">Checkout</p>
      <h1>You’re locked in</h1>
      <p>
        Thanks for riding with Greenfield Street Scene.
        {orderId ? ` Order reference: ${orderId}.` : null}
      </p>
      <div className="cta-row" style={{ marginTop: "1.5rem" }}>
        <Link href="/shop" className="btn btn-primary">
          Keep shopping
        </Link>
        <Link href="/meets" className="btn btn-ghost">
          Find a meet
        </Link>
      </div>
    </header>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<header className="page-hero"><h1>Loading…</h1></header>}>
      <SuccessInner />
    </Suspense>
  );
}

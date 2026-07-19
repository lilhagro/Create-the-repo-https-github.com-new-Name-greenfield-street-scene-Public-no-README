import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <header className="page-hero">
      <p className="eyebrow">Checkout</p>
      <h1>Checkout paused</h1>
      <p>No charge was made. Your cart is still waiting when you’re ready.</p>
      <div className="cta-row" style={{ marginTop: "1.5rem" }}>
        <Link href="/cart" className="btn btn-primary">
          Back to cart
        </Link>
        <Link href="/shop" className="btn btn-ghost">
          Browse shop
        </Link>
      </div>
    </header>
  );
}

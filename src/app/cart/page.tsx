"use client";

import Link from "next/link";
import { CheckoutButton } from "@/components/CheckoutButton";
import { formatPrice } from "@/modules/catalog/types";
import { useCart } from "@/modules/commerce/cart-context";

export default function CartPage() {
  const { lines, subtotal, setQuantity, removeItem, clear, count } = useCart();

  return (
    <>
      <header className="page-hero">
        <p className="eyebrow">Cart</p>
        <h1>Your haul</h1>
        <p>
          {count
            ? `${count} item${count === 1 ? "" : "s"} ready for checkout.`
            : "Nothing in the bag yet."}
        </p>
      </header>

      <section className="cart-panel">
        {lines.length === 0 ? (
          <div className="empty-state">
            <p>Cart’s empty. Grab a tee or hoodie from the shop.</p>
            <Link
              href="/shop"
              className="btn btn-primary"
              style={{ display: "inline-flex", marginTop: "1rem" }}
            >
              Browse shop
            </Link>
          </div>
        ) : (
          <>
            {lines.map(({ product, quantity, lineTotal }) => (
              <div key={product.id} className="cart-line">
                <div>
                  <h3 style={{ margin: "0 0 0.25rem", fontSize: "1.1rem" }}>
                    <Link href={`/shop/${product.slug}`}>{product.name}</Link>
                  </h3>
                  <p className="muted" style={{ margin: 0 }}>
                    {formatPrice(product.price)} each
                  </p>
                </div>
                <div className="cart-actions">
                  <label className="sr-only" htmlFor={`qty-${product.id}`}>
                    Quantity for {product.name}
                  </label>
                  <input
                    id={`qty-${product.id}`}
                    className="qty-input"
                    style={{ width: "4.5rem" }}
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(product.id, Number(e.target.value))
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => removeItem(product.id)}
                  >
                    Remove
                  </button>
                </div>
                <p className="price" style={{ margin: 0 }}>
                  {formatPrice(lineTotal)}
                </p>
              </div>
            ))}
            <div className="cart-summary">
              <div>
                <p className="muted" style={{ margin: 0 }}>
                  Subtotal
                </p>
                <p
                  className="price"
                  style={{ fontSize: "1.4rem", margin: "0.2rem 0 0" }}
                >
                  {formatPrice(subtotal)}
                </p>
              </div>
              <button type="button" className="btn btn-ghost" onClick={clear}>
                Clear
              </button>
            </div>
            <CheckoutButton />
          </>
        )}
      </section>
    </>
  );
}

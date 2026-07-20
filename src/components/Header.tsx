"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/modules/commerce/cart-context";
import { LOCAL_SHOP_URL, MERCH_SHOP_URL } from "@/shared/config/links";

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header ${scrolled ? "site-header--solid" : ""}`}
    >
      <div className="site-header__inner">
        <Link href="/" className="brand-mark" aria-label="Greenfield Street Scene home">
          <span className="brand-mark__word">GREENFIELD</span>
          <span className="brand-mark__sub">GREENFIELD, IN · MEETS · MERCH</span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <a
            href={MERCH_SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="is-active-external"
          >
            Merch
          </a>
          <Link
            href={LOCAL_SHOP_URL}
            className={pathname.startsWith("/shop") ? "is-active" : undefined}
          >
            Stickers
          </Link>
          <Link
            href="/meets"
            className={pathname.startsWith("/meets") ? "is-active" : undefined}
          >
            Meets
          </Link>
          <Link
            href="/#assistant"
            className={undefined}
          >
            AI Fit
          </Link>
          <Link href="/cart" className="cart-link">
            Cart
            <span className="cart-count">{count}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

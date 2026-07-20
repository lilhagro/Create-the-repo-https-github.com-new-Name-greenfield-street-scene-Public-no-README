"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/modules/commerce/cart-context";
import { MERCH_SHOP_URL } from "@/shared/config/links";

const links = [
  { href: MERCH_SHOP_URL, label: "Merch" },
  { href: "/meets", label: "Meets" },
  { href: "/#assistant", label: "AI Fit" },
];

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
          {links.map((link) => {
            const active =
              link.href !== "/#assistant" && pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "is-active" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/cart" className="cart-link">
            Cart
            <span className="cart-count">{count}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

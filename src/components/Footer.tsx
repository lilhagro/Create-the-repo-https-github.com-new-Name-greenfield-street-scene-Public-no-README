import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <p className="brand-mark__word">REDLINE</p>
          <p className="muted">
            Merch and meets for people who show up when the lot lights flicker on.
          </p>
        </div>
        <div>
          <p className="footer-label">Navigate</p>
          <div className="footer-links">
            <Link href="/shop">Shop</Link>
            <Link href="/meets">Meets</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/#assistant">AI Fit</Link>
          </div>
        </div>
        <div>
          <p className="footer-label">Note</p>
          <p className="muted">
            Demo storefront — connect payments, inventory, and your OpenAI key when you’re ready to go live.
          </p>
        </div>
      </div>
      <p className="site-footer__legal">© {new Date().getFullYear()} REDLINE</p>
    </footer>
  );
}

import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <p className="brand-mark__word">GREENFIELD</p>
          <p className="brand-mark__sub" style={{ marginBottom: "0.75rem" }}>
            STREET SCENE
          </p>
          <p className="muted">
            Greenfield, Indiana — merch and meets for people who show up when the lot lights flicker on.
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
          <p className="footer-label">Based in</p>
          <p className="muted">
            Greenfield, IN · Hancock County · Indy eastside when we go bigger.
          </p>
        </div>
      </div>
      <p className="site-footer__legal">
        © {new Date().getFullYear()} Greenfield Street Scene
      </p>
    </footer>
  );
}

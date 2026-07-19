import Link from "next/link";
import { AiAssistant } from "@/components/AiAssistant";
import { MeetCard } from "@/components/MeetCard";
import { ProductCard } from "@/components/ProductCard";
import { meets } from "@/data/meets";
import { products } from "@/data/products";

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const featuredMeets = meets.filter((m) => m.featured).slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero__visual" aria-hidden />
        <div className="hero__content">
          <p className="hero__brand">REDLINE</p>
          <h1 className="hero__headline">Merch for the lot. Meets for the night.</h1>
          <p className="hero__support">
            Shop the drop, find the meet, or ask the AI fit finder what to wear when the sodium lights kick on.
          </p>
          <div className="cta-row">
            <Link href="/shop" className="btn btn-primary">
              Shop merch
            </Link>
            <Link href="/meets" className="btn btn-ghost">
              Browse meets
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Featured drop</p>
          <h2>Built for asphalt hours</h2>
          <p className="lede">
            Tees, hoodies, and small goods that look right under lot lights — not conference-booth logos.
          </p>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <p className="eyebrow">Upcoming meets</p>
          <h2>Show up where it counts</h2>
          <p className="lede">
            Night lots, sunrise grids, and coastal cruises — pick a vibe and roll in.
          </p>
        </div>
        <div className="meet-grid">
          {featuredMeets.map((meet) => (
            <MeetCard key={meet.id} meet={meet} />
          ))}
        </div>
      </section>

      <AiAssistant />
    </>
  );
}

import Link from "next/link";
import { AiAssistant } from "@/components/AiAssistant";
import { MeetCard } from "@/components/MeetCard";
import { ProductCard } from "@/components/ProductCard";
import { listFeaturedMeets } from "@/modules/meets/repository";
import { listFeaturedProducts } from "@/modules/catalog/repository";
import { MERCH_SHOP_URL, PRINTIFY_STORE_URL } from "@/shared/config/links";

export default async function HomePage() {
  const [featuredProducts, featuredMeets] = await Promise.all([
    listFeaturedProducts(4),
    listFeaturedMeets(3),
  ]);

  return (
    <>
      <section className="hero">
        <div className="hero__visual" aria-hidden />
        <div className="hero__content">
          <p className="hero__brand">Greenfield Street Scene</p>
          <h1 className="hero__headline">Merch for the lot. Meets for the night.</h1>
          <p className="hero__support">
            Born in Greenfield, Indiana — shop the drop, find the local meet, or ask AI Fit what to wear when the lot lights kick on.
          </p>
          <div className="cta-row">
            <Link href={MERCH_SHOP_URL} className="btn btn-primary">
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
            In-stock stickers ship from Greenfield. More merch also available on Printify.
          </p>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="cta-row" style={{ marginTop: "1.5rem" }}>
          <Link href={MERCH_SHOP_URL} className="btn btn-primary">
            Open merch shop
          </Link>
          <a
            href={PRINTIFY_STORE_URL}
            className="btn btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            Printify catalog
          </a>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <p className="eyebrow">Upcoming meets</p>
          <h2>Show up where it counts</h2>
          <p className="lede">
            Courthouse nights, US-40 sunrises, and Hancock County cruises — hometown meets around Greenfield.
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

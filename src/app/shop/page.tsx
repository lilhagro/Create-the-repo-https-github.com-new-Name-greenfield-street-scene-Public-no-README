import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { listProducts } from "@/modules/catalog/repository";
import { PRINTIFY_STORE_URL } from "@/shared/config/links";

export default async function ShopPage() {
  const products = await listProducts();

  return (
    <>
      <header className="page-hero">
        <p className="eyebrow">Shop</p>
        <h1>In-stock from Greenfield</h1>
        <p>
          Stickers we have on hand ship direct. For the full tee and hoodie lineup, hit the Printify store.
        </p>
        <div className="cta-row" style={{ marginTop: "1.25rem" }}>
          <a
            href={PRINTIFY_STORE_URL}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop Printify merch
          </a>
          <Link href="/#assistant" className="btn btn-ghost">
            Ask AI Fit
          </Link>
        </div>
      </header>
      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { listProducts } from "@/modules/catalog/repository";
import { PRINTIFY_STORE_URL } from "@/shared/config/links";

export default async function ShopPage() {
  const products = await listProducts();

  return (
    <>
      <header className="page-hero">
        <p className="eyebrow">Merch</p>
        <h1>Shop Greenfield Street Scene</h1>
        <p>
          In-stock stickers ship from Greenfield, Indiana. Add to cart and checkout here.
        </p>
        <div className="cta-row" style={{ marginTop: "1.25rem" }}>
          <Link href="/cart" className="btn btn-primary">
            View cart
          </Link>
          <a
            href={PRINTIFY_STORE_URL}
            className="btn btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            More on Printify
          </a>
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

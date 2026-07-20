import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { listProducts } from "@/modules/catalog/repository";
import { MERCH_SHOP_URL } from "@/shared/config/links";

export default async function ShopPage() {
  const products = await listProducts();

  return (
    <>
      <header className="page-hero">
        <p className="eyebrow">In-stock</p>
        <h1>Stickers from Greenfield</h1>
        <p>
          Local inventory you can cart here. For the full tee and hoodie lineup, shop our Printify store.
        </p>
        <div className="cta-row" style={{ marginTop: "1.25rem" }}>
          <a
            href={MERCH_SHOP_URL}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop Printify merch
          </a>
          <Link href="/cart" className="btn btn-ghost">
            View cart
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

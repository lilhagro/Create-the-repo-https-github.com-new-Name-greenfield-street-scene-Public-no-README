import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export default function ShopPage() {
  return (
    <>
      <header className="page-hero">
        <p className="eyebrow">Shop</p>
        <h1>Merch for meet people</h1>
        <p>
          From lot tees to cold-night layers. Add what you need, then ask AI Fit if you’re unsure.
        </p>
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

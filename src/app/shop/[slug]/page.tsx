import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPrice, getProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="detail-layout">
      <div className={`detail-media product-swatch product-swatch--${product.category}`} />
      <article className="detail-panel">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="price" style={{ fontSize: "1.25rem" }}>
          {formatPrice(product.price)}
        </p>
        <p className="lede">{product.tagline}</p>
        <p>{product.description}</p>
        <div className="tag-row">
          {product.colors.map((color) => (
            <span key={color} className="chip">
              {color}
            </span>
          ))}
        </div>
        <div className="cta-row">
          <AddToCartButton productId={product.id} />
          <Link href="/shop" className="btn btn-ghost">
            Back to shop
          </Link>
        </div>
      </article>
    </div>
  );
}

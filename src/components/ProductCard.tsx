import Link from "next/link";
import Image from "next/image";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPrice, type Product } from "@/modules/catalog/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link href={`/shop/${product.slug}`} className="product-card__media">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="product-card__img"
            sizes="(max-width: 640px) 100vw, 280px"
          />
        ) : (
          <div
            className={`product-swatch product-swatch--${product.category}`}
            aria-hidden
          />
        )}
        <span className="product-card__cat">{product.category}</span>
      </Link>
      <div className="product-card__body">
        <div className="product-card__top">
          <h3>
            <Link href={`/shop/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className="price">{formatPrice(product.price)}</p>
        </div>
        <p className="muted">{product.tagline}</p>
        <AddToCartButton productId={product.id} />
      </div>
    </article>
  );
}

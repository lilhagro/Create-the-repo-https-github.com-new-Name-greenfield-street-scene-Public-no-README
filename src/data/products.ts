/** @deprecated Use @/modules/catalog — kept as compatibility shim */
export {
  seedProducts as products,
  type Product,
  type ProductCategory,
} from "@/modules/catalog/seed";
export { formatPrice } from "@/modules/catalog/types";
export { getProductBySlug as getProduct } from "@/modules/catalog/repository";

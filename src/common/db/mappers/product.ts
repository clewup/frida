import { type ProductEntityType, type ProductType } from '@/common/types/productTypes'

export function mapProduct (product: ProductEntityType): ProductType {
  return { ...product, price: product.price.toNumber() }
}

export function mapProducts (products: ProductEntityType[]): ProductType[] {
  return products.map((product) => mapProduct(product))
}

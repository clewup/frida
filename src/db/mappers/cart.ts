import { mapProduct } from '@/db/mappers/product'
import { type CartEntityType, type CartType } from '@/types/cartTypes'

export function mapCart (cart: CartEntityType): CartType {
  return {
    ...cart,
    items: cart.items.map((item) => ({ ...item, product: mapProduct(item.product) }))
  }
}

export function mapCarts (carts: CartEntityType[]): CartType[] {
  return carts.map((cart) => mapCart(cart))
}

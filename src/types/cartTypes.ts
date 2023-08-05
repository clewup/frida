import { type Product, type CartItem, type Cart } from '@prisma/client'

export type CartType = (Cart & { items: CartItemType[] })
export type CartItemType = (CartItem & { product: Product })

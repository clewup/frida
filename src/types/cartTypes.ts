import { type ProductEntityType, type ProductType } from '@/types/productTypes'
import { type CartItem, type Cart } from '@prisma/client'

export type CartType = (Cart & { items: CartItemType[] })
export type CartEntityType = (Cart & { items: CartItemEntityType[] })

export type CartItemType = (CartItem & { product: ProductType })
export type CartItemEntityType = (CartItem & { product: ProductEntityType })

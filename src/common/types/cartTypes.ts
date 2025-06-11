import { type ProductEntityType, type ProductType } from '@/common/types/productTypes'
import {type CartItem, type Cart, User} from '@prisma/client'

export type CartType = (Cart & { items: CartItemType[], createdBy: User })
export type CartEntityType = (Cart & { items: CartItemEntityType[] })

export type CartItemType = (CartItem & { product: ProductType })
export type CartItemEntityType = (CartItem & { product: ProductEntityType })

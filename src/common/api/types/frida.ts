import { type ProductType } from '@/common/types/productTypes'

export interface PatchCartRequest {
  action: 'add' | 'update' | 'remove' | 'clear'
  product?: ProductType
  quantity?: number
}

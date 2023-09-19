import { type PatchCartRequest } from '@/common/api/types/frida'
import { type CartType } from '@/common/types/cartTypes'
import ApiService from '@/lib/common/api/service'
import { type Order } from '@prisma/client'

export default class FridaApiService extends ApiService {
  async getOrders (userEmail?: string) {
    return await this.get<Order[]>('order', { headers: { 'x-user': userEmail ?? '' } })
  }

  async postOrder (req: CartType) {
    return await this.post<{ id: string }>('stripe', req)
  }

  async getCart (userEmail?: string) {
    return await this.get<CartType>('cart', { headers: { 'x-user': userEmail ?? '' } })
  }

  async patchCart (req: PatchCartRequest, userEmail?: string) {
    return await this.patch<CartType>('cart', req, { headers: { 'x-user': userEmail ?? '' } })
  }
}

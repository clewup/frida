import { type PatchCartRequest } from '@/common/api/types/frida'
import { type CartType } from '@/common/types/cartTypes'
import { type Order } from '@prisma/client'
import ApiService from '@/lib/api/service'

export default class FridaApiService extends ApiService {
  async getOrders () {
    return await this.get<Order[]>('order', { isAuthed: true })
  }

  async postOrder (req: CartType) {
    return await this.post<{ id: string }>('stripe', req)
  }

  async getCart () {
    return await this.get<CartType>('cart', { isAuthed: true })
  }

  async patchCart (req: PatchCartRequest) {
    return await this.patch<CartType>('cart', req, { isAuthed: true })
  }
}

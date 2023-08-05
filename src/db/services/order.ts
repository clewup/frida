import prisma from '@/lib/prisma'
import { type CartType } from '@/types/cartTypes'
import { OrderStatus } from '@prisma/client'
import type Stripe from 'stripe'

export default class OrderService {
  async getOrdersByUser (user: string) {
    return await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, where: { createdBy: user } })
  }

  async getOrderByTransaction (transaction: string) {
    return await prisma.order.findUnique({
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      where: { transaction }
    })
  }

  async createOrder (stripeSession: Stripe.Response<Stripe.Checkout.Session>, cart: CartType) {
    return await prisma.order.create({
      data: {
        createdBy: cart.user,
        email: stripeSession.customer_details?.email ?? cart.user,
        items: {
          createMany: {
            data: cart.items.map((item) => ({
              createdBy: cart.user,
              productId: Number(item.product.id),
              quantity: item.quantity,
              updatedBy: cart.user
            }))
          }
        },
        name: stripeSession.customer_details?.name ?? cart.user,
        status: sanitizeOrderStatus(stripeSession.status),
        total: Number(stripeSession.amount_total) / 100,
        transaction: stripeSession.id,
        updatedBy: cart.user
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })
  }
}

function sanitizeOrderStatus (status: string | null) {
  if (status === 'complete') {
    return OrderStatus.Complete
  } else {
    return OrderStatus.Pending
  }
}

import constants from '@/constants/constants'
import { OrderStatus } from '@prisma/client'
import { type NextRequest, NextResponse as response } from 'next/server'
import Stripe from 'stripe'
import prisma from '@/lib/prisma'

const stripe = new Stripe(constants.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

export async function GET (request: NextRequest) {
  const user = request.headers.get('x-user')
  if (!user) return response.json({ error: 'Missing user' }, { status: 400 })

  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, where: { createdBy: user } })

  return response.json(orders)
}

export async function POST (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')
  if (!sessionId) return response.json({ error: 'Missing session' }, { status: 400 })

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  const existingOrder = await prisma.order.findUnique({
    include: {
      items: {
        include: {
          product: true
        }
      }
    },
    where: { transaction: sessionId }
  })
  if (existingOrder) return response.json(existingOrder)

  if (!session.metadata?.cart) return response.json({ error: 'Missing cart' }, { status: 400 })
  const cart = await prisma.cart.findUnique({
    include: {
      items: {
        include: {
          product: true
        }
      }
    },
    where: { id: session.metadata.cart }
  })
  if (!cart) return response.json({ error: 'Cart not found' }, { status: 400 })

  const order = await prisma.order.create({
    data: {
      createdBy: cart.user,
      email: session.customer_details?.email ?? cart.user,
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
      name: session.customer_details?.name ?? cart.user,
      status: sanitizeOrderStatus(session.status),
      total: Number(session.amount_total) / 100,
      transaction: session.id,
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

  // reduce product stock
  for (const item of cart.items) {
    const product = await prisma.product.findUnique({ where: { id: item.product.id } })
    if (!product) return

    await prisma.product.update({
      data: {
        stock: product.stock - item.quantity
      },
      where: { id: item.product.id }
    })
  }

  await prisma.cart.delete({ where: { id: cart.id } })

  return response.json(order)
}

function sanitizeOrderStatus (status: string | null) {
  if (status === 'complete') {
    return OrderStatus.Complete
  } else {
    return OrderStatus.Pending
  }
}

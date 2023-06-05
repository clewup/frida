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

  const orders = await prisma.order.findMany({ where: { createdBy: user }, orderBy: { createdAt: 'desc' } })

  return response.json(orders)
}

export async function POST (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')
  if (!sessionId) return response.json({ error: 'Missing session' }, { status: 400 })

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  const existingOrder = await prisma.order.findUnique({ where: { transaction: sessionId } })
  if (existingOrder) return response.json(existingOrder)

  if (!session.metadata?.cart) return response.json({ error: 'Missing cart' }, { status: 400 })
  const cart = await prisma.cart.findUnique({ include: { products: true }, where: { id: session.metadata.cart } })

  const order = await prisma.order.create({
    include: { products: true },
    data: {
      createdBy: cart?.user ?? '',
      updatedBy: cart?.user ?? '',
      email: session.customer_details?.email ?? '',
      name: session.customer_details?.name ?? '',
      status: sanitizeOrderStatus(session.status),
      products: {
        connect: session.metadata.products.split(',').map((id) => ({ id: Number(id) }))
      },
      total: Number(session.amount_total) / 100,
      transaction: session.id
    }
  })

  await prisma.cart.delete({ where: { id: cart?.id } })

  return response.json(order)
}

function sanitizeOrderStatus (status: string | null) {
  if (status === 'complete') {
    return OrderStatus.Complete
  } else {
    return OrderStatus.Pending
  }
}

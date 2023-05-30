import constants from '@/constants/constants'
import { OrderStatus } from '@prisma/client'
import { type NextRequest, NextResponse as response } from 'next/server'
import Stripe from 'stripe'
import prisma from '@/lib/prisma'

const stripe = new Stripe(constants.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')
  if (!sessionId) return response.json({ error: 'Missing session ID' }, { status: 400 })

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  const existingOrder = await prisma.order.findUnique({ where: { transaction: sessionId } })
  if (existingOrder) return response.json(existingOrder)

  const { data } = await stripe.checkout.sessions.listLineItems(sessionId)
  const products = await prisma.product.findMany({
    where: { name: { in: data.map((product) => (product.description)) } }
  })

  const order = await prisma.order.create({
    include: { products: true },
    data: {
      createdBy: session.customer_details?.email ?? '',
      updatedBy: session.customer_details?.email ?? '',
      email: session.customer_details?.email ?? '',
      name: session.customer_details?.name ?? '',
      status: sanitizeOrderStatus(session.status),
      products: {
        connect: products.map((product) => ({ id: product.id })) ?? []
      },
      total: Number(session.amount_total) / 100,
      transaction: session.id
    }
  })

  return response.json(order)
}

function sanitizeOrderStatus (status: string | null) {
  if (status === 'complete') {
    return OrderStatus.Complete
  } else {
    return OrderStatus.Pending
  }
}

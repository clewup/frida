import constants from '@/constants/constants'
import { type CartItem, type Product } from '@prisma/client'
import { type NextRequest, NextResponse as response } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(constants.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

export async function POST (request: NextRequest) {
  const body = await request.json()

  const session = await stripe.checkout.sessions.create({
    submit_type: 'pay',
    mode: 'payment',
    payment_method_types: ['card'],
    shipping_options: [
      {
        shipping_rate: constants.STRIPE_SHIPPING_RATE
      }
    ],
    line_items: body.items.map((item: (CartItem & { product: Product })) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.product.name,
          images: [item.product.image]
        },
        unit_amount: Number(item.product.price) * 100
      },
      adjustable_quantity: {
        enabled: false
      },
      quantity: item.quantity
    })),
    metadata: {
      cart: body.id
    },
    success_url: `${constants.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${constants.APP_URL}`,
    automatic_tax: { enabled: true }
  })

  if (!session.url) { return response.json({ error: 'Missing session URL' }, { status: 500 }) }

  return response.json(session)
}

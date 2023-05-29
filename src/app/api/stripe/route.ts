import constants from '@/constants/constants'
import { type Product } from '@prisma/client'
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
    billing_address_collection: 'auto',
    shipping_options: [
      {
        shipping_rate: constants.STRIPE_SHIPPING_RATE
      }
    ],
    line_items: body.products.map((product: Product) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: product.name,
          images: [product.image]
        },
        unit_amount: Number(product.price) * 100
      },
      adjustable_quantity: {
        enabled: false
      },
      quantity: 1
    })),
    success_url: `${constants.APP_URL}/?success=true`,
    cancel_url: `${constants.APP_URL}/?canceled=true`,
    automatic_tax: { enabled: true }
  })

  if (!session.url) { return response.json({ error: 'Missing session URL' }, { status: 500 }) }

  return response.json(session)
}

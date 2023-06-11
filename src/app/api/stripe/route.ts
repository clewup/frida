import constants from '@/constants/constants'
import { type Cart, type CartItem, type Product } from '@prisma/client'
import { type NextRequest, NextResponse as response } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(constants.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

export async function POST (request: NextRequest) {
  const body = await request.json() as Cart & { items: Array<CartItem & { product: Product }> }

  const user = request.headers.get('x-user')
  if (!user) return response.json({ error: 'Missing user' }, { status: 400 })

  // if cart total is £30 or more, apply free shipping rate
  let cartTotal = 0
  for (const item of body.items) {
    cartTotal = cartTotal + (Number(item.product.price) * item.quantity)
  }
  const shippingRate = cartTotal >= 30 ? constants.STRIPE_FREE_SHIPPING_RATE : constants.STRIPE_SHIPPING_RATE

  const session = await stripe.checkout.sessions.create({
    customer_email: user,
    allow_promotion_codes: true,
    submit_type: 'pay',
    mode: 'payment',
    payment_method_types: ['card', 'paypal', 'klarna'],
    shipping_options: [
      {
        shipping_rate: shippingRate
      }
    ],
    shipping_address_collection: {
      allowed_countries: ['GB']
    },
    line_items: body.items.map((item: (CartItem & { product: Product })) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.product.name,
          images: [item.product.image]
        },
        unit_amount: Number((Number(item.product.price) * 100).toFixed(2))
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

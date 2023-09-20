import constants from '@/common/constants/constants'
import { cartService, orderService, productService } from '@/common/db/handler'
import { extractAndDecodeAccessToken } from '@/common/utils/auth'
import { type NextRequest, NextResponse as response } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(constants.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
})

export async function GET (request: NextRequest) {
  const user = extractAndDecodeAccessToken(request.headers.get('Authorization'))
  if (user === null) return response.error()

  const orders = await orderService.getOrdersByUser(user.email)

  return response.json(orders)
}

export async function POST (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')
  if (sessionId === null) return response.error()

  const session = await stripe.checkout.sessions.retrieve(sessionId)

  const existingOrder = await orderService.getOrderByTransaction(sessionId)
  if (existingOrder != null) return response.json(existingOrder)

  if ((session.metadata?.cart) == null) return response.error()

  const cart = await cartService.getCartById(session.metadata.cart)
  if (cart == null) return response.error()

  const order = await orderService.createOrder(session, cart)

  // reduce product stock
  for (const cartItem of cart.items) {
    const product = await productService.getProductById(cartItem.product.id)
    if (product == null) return

    await productService.reduceProductStock(product, cartItem)
  }

  // delete the cart
  await cartService.deleteCart(cart)

  return response.json(order)
}

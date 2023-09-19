import { cartService, productService } from '@/common/db/handler'
import { type ProductType } from '@/common/types/productTypes'
import { type NextRequest, NextResponse as response } from 'next/server'

export async function GET (request: NextRequest) {
  const user = request.headers.get('x-user')
  if (user === null) return response.error()

  const cart = await cartService.getCartByUser(user)
  if (cart == null) return response.json(undefined, { status: 404 })

  return response.json(cart)
}

export async function PATCH (request: NextRequest) {
  const body = await request.json()

  const { errors, isValid } = validate(body)
  if (!isValid) {
    return response.json(
      { error: `Invalid ${errors.join(', ')}` },
      { status: 400 }
    )
  }

  const user = request.headers.get('x-user')
  if (user === null) {
    console.log('4')
    return response.error()
  }

  const action: string = body.action
  const product: ProductType = body.product
  const quantity: number = body.quantity

  const cart = await cartService.getCartByUser(user)

  const liveProduct = await productService.getProductById(product.id)
  if (liveProduct == null) {
    console.log('10')
    return response.error()
  }

  // create a new cart if one does not exist
  if (cart == null) {
    const cart = await cartService.createCart(user, product, liveProduct)
    return response.json(cart)
  }

  // check to see if the actioned product exists in the cart
  const cartItem = cart.items.find((item) => item.product.id === product.id)

  switch (action) {
    case 'add':
      await cartService.addToCart(user, cart, product, quantity, cartItem)
      break
    case 'update':
      await cartService.updateCartItem(user, cart, quantity, cartItem)
      break
    case 'remove':
      await cartService.removeFromCart(cart, cartItem)
      break
    case 'clear':
      await cartService.clearCart(cart)
      break
  }

  const actionedCart = await cartService.getCartById(cart.id)
  if (actionedCart == null) {
    console.log('1')
    return response.error()
  }

  const totalledCart = await cartService.updateCartTotal(actionedCart)
  if (totalledCart == null) {
    console.log('2')
    return response.error()
  }

  return response.json(totalledCart)
}

function validate (body: any) {
  const errors: string[] = []

  if (body.action === null || body.action === undefined) errors.push('action')
  if ((body.product === null || body.action === undefined) && body.action !== 'clear') errors.push('product')

  return {
    errors,
    isValid: errors.length === 0
  }
}

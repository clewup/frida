import { type Cart, type Product } from '@prisma/client'
import { type NextRequest, NextResponse as response } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET (request: NextRequest) {
  const user = request.headers.get('x-user')
  if (!user) return response.json({ error: 'Missing user' }, { status: 400 })

  const cart = await prisma.cart.findFirst({
    include: { products: true },
    where: { user }
  })
  if (cart == null) return response.json({}, { status: 404 })

  return response.json(cart)
}

export async function PATCH (request: NextRequest) {
  const body = await request.json()

  const { isValid, errors } = validate(body)
  if (!isValid) {
    return response.json(
      { error: `Invalid ${errors.join(', ')}` },
      { status: 400 }
    )
  }

  const user = request.headers.get('x-user')
  if (!user) return response.json({ error: 'Missing user' }, { status: 400 })

  // determine what products have been removed from the cart
  const cart = await prisma.cart.findUnique({
    include: { products: true },
    where: { user }
  })
  const removedProducts: Product[] = getRemovedProducts(cart, body)

  // calculate the total using live product data
  const products = await prisma.product.findMany({
    where: { id: { in: body.products.map((product: Product) => product.id) } }
  })
  const total = calculateTotal(products)

  const upsertedCart = await prisma.cart.upsert({
    include: { products: true },
    where: { user },
    update: {
      updatedBy: user,
      products: {
        connect:
          body.products.map((product: Product) => ({ id: product.id })) || [],
        disconnect:
          removedProducts.map((product: Product) => ({ id: product.id })) || []
      },
      total
    },
    create: {
      createdBy: user,
      updatedBy: user,
      products: {
        connect:
          body.products.map((product: Product) => ({ id: product.id })) || []
      },
      total,
      user
    }
  })

  return response.json(upsertedCart)
}

function calculateTotal (products: Product[]) {
  let total = 0

  for (const product of products) {
    total = total + Number(product.price)
  }

  return total
}

function getRemovedProducts (
  originalCart: (Cart & { products: Product[] }) | null,
  newCart: Cart & { products: Product[] }
) {
  if (originalCart == null) return []

  return originalCart.products.filter(
    (origProd) =>
      newCart.products.find((newProd) => newProd.id === origProd.id) == null
  )
}

function validate (body: Partial<Cart & { products: Product[] }>) {
  const errors: string[] = []

  return {
    isValid: errors.length === 0,
    errors
  }
}

import { type NextRequest, NextResponse as response } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const latest = searchParams.get('latest')
  const id = searchParams.get('id')
  const category = searchParams.get('category')

  if (id) {
    const product = await prisma.product.findUnique({ include: { category: true }, where: { id: Number(id) } })
    if (!product) return response.json({}, { status: 404 })

    return response.json(product)
  }

  if (latest) {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
    return response.json(products)
  }

  if (category) {
    const products = await prisma.product.findMany({ include: { category: true }, where: { category: { name: category } }, orderBy: { createdAt: 'desc' } })
    return response.json(products)
  }

  const products = await prisma.product.findMany()
  return response.json(products)
}

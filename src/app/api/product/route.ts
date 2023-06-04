import { type NextRequest, NextResponse as response } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const latest = searchParams.get('latest')

  if (latest) {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
    return response.json(products)
  }

  const products = await prisma.product.findMany()
  return response.json(products)
}

import { type NextRequest, NextResponse as response } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET (request: NextRequest) {
  const categories = await prisma.category.findMany({ include: { subcategories: true }, orderBy: { id: 'asc' } })

  return response.json(categories)
}

import { type CategoryWithSubcategoriesType } from '@/types/categoryTypes'
import { type NextRequest, NextResponse as response } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET (request: NextRequest) {
  const categoriesWithSubcategories: CategoryWithSubcategoriesType[] = []

  const categories = await prisma.category.findMany({})
  for (const category of categories) {
    const products = await prisma.product.findMany({ include: { category: true, subcategory: true }, where: { category } })
    if (!products.length) return

    const subcategories = products.map((product) => product.subcategory.name)

    categoriesWithSubcategories.push({ category: category.name, subcategories: subcategories.filter((value, index) => subcategories.indexOf(value) === index) })
  }

  return response.json(categoriesWithSubcategories)
}

import { type CategoryWithSubcategoriesType } from '@/types/categoryTypes'
import { type NextRequest, NextResponse as response } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET (request: NextRequest) {
  const categoriesWithSubcategories: CategoryWithSubcategoriesType[] = []

  const categories = await prisma.category.findMany({ orderBy: { id: 'asc' } })
  for (const category of categories) {
    const products = await prisma.product.findMany({ include: { category: true, subcategory: true }, where: { category } })

    const subcategories = products.map((product) => product.subcategory.name)

    categoriesWithSubcategories.push({ category: category.name, image: category.image, subcategories: subcategories.filter((value, index) => subcategories.indexOf(value) === index) })
  }

  return response.json(categoriesWithSubcategories)
}

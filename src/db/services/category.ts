import prisma from '@/lib/prisma'
import { type CategoryType } from '@/types/categoryTypes'

export default class CategoryService {
  async getCategories (): Promise<CategoryType[]> {
    return await prisma.category.findMany({ include: { subcategories: true }, orderBy: { id: 'asc' } })
  }
}

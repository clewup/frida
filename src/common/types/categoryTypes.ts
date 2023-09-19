import { type Category as PrismaCategory, type Subcategory } from '@prisma/client'

export type CategoryType = PrismaCategory & { subcategories: Subcategory[] }

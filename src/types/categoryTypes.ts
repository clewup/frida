import { type Category as PrismaCategory, type Subcategory } from '@prisma/client'

export type Category = PrismaCategory & { subcategories: Subcategory[] }

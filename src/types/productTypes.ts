import { type Category, type Product, type Subcategory } from '@prisma/client'

export type ProductType = (Product & { category: Category, subcategory: Subcategory })

import {type Category, type Product, type Subcategory} from '@prisma/client'

export type ProductType = (Omit<Product, 'price'> & { category: Category, subcategory: Subcategory, price: number })
export type ProductEntityType = Product & { category: Category, subcategory: Subcategory }

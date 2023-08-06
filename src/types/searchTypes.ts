import { type Category, type Product, type Subcategory } from '@prisma/client'
import Dict = NodeJS.Dict

export interface SearchRequestType extends Dict<string | number | boolean | readonly string[] | readonly number[] | readonly boolean[] | null> {
  search?: string | null
  category?: string | null
  subcategory?: string | null
  colour?: string | null
  page?: string | null
  sort?: string | null
}

export interface SearchResponseType {
  results: Array<Product & { category: Category, subcategory: Subcategory }>
  pagination: Pagination
}

export interface Pagination {
  totalResults: number
  pageResults: number
  page: number
  totalPages: number
  resultsPerPage: number
}

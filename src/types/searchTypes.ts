import { type Product } from '@prisma/client'
import Dict = NodeJS.Dict

export interface SearchRequestType extends Dict<string | number | boolean | readonly string[] | readonly number[] | readonly boolean[] | null> {
  search?: string
  category?: string
  subcategory?: string
  page?: string
  sort?: string
}

export interface SearchResponseType {
  results: Product[]
  pagination: Pagination
}

export interface Pagination {
  totalResults: number
  pageResults: number
  page: number
  totalPages: number
  resultsPerPage: number
}

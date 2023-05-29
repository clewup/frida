import { type Product } from '@prisma/client'

export interface SearchRequestType {
  search?: string
  category?: string
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

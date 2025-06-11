import {type ProductType} from '@/common/types/productTypes'
import Dict = NodeJS.Dict

export interface SearchType {
    search?: string | null
    category?: string | null
    subcategory?: string | null
    colour?: string | null
    page?: string | null
    sort?: string | null
}

export interface SearchResultsType {
    results: ProductType[]
    pagination: Pagination
}

export interface Pagination {
    totalResults: number
    pageResults: number
    page: number
    totalPages: number
    resultsPerPage: number
}

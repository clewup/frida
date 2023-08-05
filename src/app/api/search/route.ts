import { productService } from '@/db/handler'
import { type NextRequest, NextResponse as response } from 'next/server'

export async function GET (request: NextRequest) {
  const PAGE_SIZE = 8

  const { searchParams } = new URL(request.url)

  const search = searchParams.get('search')
  const category = searchParams.get('category')
  const page = searchParams.get('page') ?? '1'
  const sort = searchParams.get('sort')
  const subcategory = searchParams.get('subcategory')

  let products = await productService.getProducts()
  if (search != null) {
    products = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
  }
  if (category != null) {
    products = products.filter((product) =>
      product.category.name.toLowerCase() === category.toLowerCase()
    )
  }
  if (subcategory != null) {
    products = products.filter((product) =>
      product.subcategory.name.toLowerCase() === subcategory.toLowerCase()
    )
  }
  if (sort != null) {
    if (sort === 'price-asc') {
      products = products.sort(
        (a, b) => Number(a.price) - Number(b.price)
      )
    }
    if (sort === 'price-desc') {
      products = products.sort(
        (a, b) => Number(b.price) - Number(a.price)
      )
    }
  }

  const paginatedProducts = products.slice(
    (Number(page) - 1) * PAGE_SIZE,
    Number(page) * PAGE_SIZE
  )
  const totalPages = Math.ceil(products.length / PAGE_SIZE)

  return response.json({
    pagination: {
      page: Number(page),
      pageResults: paginatedProducts.length,
      resultsPerPage: PAGE_SIZE,
      totalPages,
      totalResults: products.length
    },
    results: paginatedProducts
  })
}

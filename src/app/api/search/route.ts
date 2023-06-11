import prisma from '@/lib/prisma'
import { type NextRequest, NextResponse as response } from 'next/server'

export async function GET (request: NextRequest) {
  const PAGE_SIZE = 8

  const { searchParams } = new URL(request.url)

  const search = searchParams.get('search')
  const category = searchParams.get('category')
  const page = searchParams.get('page') ?? '1'
  const sort = searchParams.get('sort')
  const subcategory = searchParams.get('subcategory')

  const products = await prisma.product.findMany({
    include: { category: true, subcategory: true },
    orderBy: { createdAt: 'desc' }
  })

  let filteredProducts = products
  if (search) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
  }
  if (category) {
    filteredProducts = filteredProducts.filter((product) =>
      product.category.name.toLowerCase() === category.toLowerCase()
    )
  }
  if (subcategory) {
    filteredProducts = filteredProducts.filter((product) =>
      product.subcategory.name.toLowerCase() === subcategory.toLowerCase()
    )
  }
  if (sort) {
    if (sort === 'price-asc') {
      filteredProducts = filteredProducts.sort(
        (a, b) => Number(a.price) - Number(b.price)
      )
    }
    if (sort === 'price-desc') {
      filteredProducts = filteredProducts.sort(
        (a, b) => Number(b.price) - Number(a.price)
      )
    }
  }

  const paginatedProducts = filteredProducts.slice(
    (Number(page) - 1) * PAGE_SIZE,
    Number(page) * PAGE_SIZE
  )
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE)

  return response.json({
    results: paginatedProducts,
    pagination: {
      totalResults: filteredProducts.length,
      pageResults: paginatedProducts.length,
      page: Number(page),
      totalPages,
      resultsPerPage: PAGE_SIZE
    }
  })
}

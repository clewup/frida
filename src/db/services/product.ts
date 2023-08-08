import { productService } from '@/db/handler'
import prisma from '@/lib/prisma'
import { type CartItemType } from '@/types/cartTypes'
import { type ProductType } from '@/types/productTypes'
import { type SearchResultsType, type SearchType } from '@/types/searchTypes'

export default class ProductService {
  async getProducts (): Promise<ProductType[]> {
    return await prisma.product.findMany({ include: { category: true, subcategory: true } })
  }

  async getProductById (id: number): Promise<ProductType | null> {
    return await prisma.product.findUnique({ include: { category: true, subcategory: true }, where: { id } })
  }

  async getLatestProducts (): Promise<ProductType[]> {
    return await prisma.product.findMany({ include: { category: true, subcategory: true }, orderBy: { createdAt: 'desc' } })
  }

  async getProductsByCategory (category: string): Promise<ProductType[]> {
    return await prisma.product.findMany({ include: { category: true, subcategory: true }, orderBy: { createdAt: 'desc' }, where: { category: { name: category } } })
  }

  async getProductsBySubcategory (subcategory: string): Promise<ProductType[]> {
    return await prisma.product.findMany({ include: { category: true, subcategory: true }, orderBy: { createdAt: 'desc' }, where: { subcategory: { name: subcategory } } })
  }

  async reduceProductStock (product: ProductType, cartItem: CartItemType) {
    return await prisma.product.update({
      data: {
        stock: product.stock - cartItem.quantity
      },
      where: { id: cartItem.product.id }
    })
  }

  async getTrendingProducts (): Promise<ProductType[]> {
    const trendingCartItems = await prisma.cartItem.groupBy({
      by: ['productId'],
      _count: { id: true },
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    })

    const mappedTrendingCartItems = await Promise.all(
      trendingCartItems.map(async ({ productId }) =>
        await prisma.product.findUnique({ include: { category: true, subcategory: true }, where: { id: productId } }))
    )

    return mappedTrendingCartItems.filter((product) => product !== null) as ProductType[]
  }

  async getSearchedProducts ({ search, category, subcategory, sort, colour, page }: SearchType): Promise<SearchResultsType> {
    const PAGE_SIZE = 8

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
    if (colour != null) {
      products = products.filter((product) =>
        product.colour.toLowerCase() === colour.toLowerCase()
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

    return {
      pagination: {
        page: Number(page),
        pageResults: paginatedProducts.length,
        resultsPerPage: PAGE_SIZE,
        totalPages,
        totalResults: products.length
      },
      results: paginatedProducts
    }
  }
}

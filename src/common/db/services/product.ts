import { productService } from '@/common/db/handler'
import { mapProduct, mapProducts } from '@/common/db/mappers/product'
import prisma from '@/lib/prisma'
import { type CartItemType } from '@/common/types/cartTypes'
import { type ProductEntityType, type ProductType } from '@/common/types/productTypes'
import { type SearchResultsType, type SearchType } from '@/common/types/searchTypes'

export default class ProductService {
  async getProducts (): Promise<ProductType[]> {
    const products = await prisma.product.findMany({ include: { category: true, subcategory: true } })
    return mapProducts(products)
  }

  async getProductById (id: number): Promise<ProductType | null> {
    const product = await prisma.product.findUnique({ include: { category: true, subcategory: true }, where: { id } })
    return (product != null) ? mapProduct(product) : null
  }

  async getProductByName (name: string): Promise<ProductType | null> {
    const decodedName = decodeURIComponent(name)
    const product = await prisma.product.findFirst({ include: { category: true, subcategory: true }, where: { name: decodedName } })
    return (product != null) ? mapProduct(product) : null
  }

  async getLatestProducts (): Promise<ProductType[]> {
    const products = await prisma.product.findMany({ include: { category: true, subcategory: true }, orderBy: { createdAt: 'desc' } })
    return mapProducts(products)
  }

  async getProductsByCategory (category: string): Promise<ProductType[]> {
    const products = await prisma.product.findMany({ include: { category: true, subcategory: true }, orderBy: { createdAt: 'desc' }, where: { category: { name: category } } })
    return mapProducts(products)
  }

  async getProductsBySubcategory (subcategory: string): Promise<ProductType[]> {
    const products = await prisma.product.findMany({ include: { category: true, subcategory: true }, orderBy: { createdAt: 'desc' }, where: { subcategory: { name: subcategory } } })
    return mapProducts(products)
  }

  async reduceProductStock (product: ProductType, cartItem: CartItemType): Promise<ProductType> {
    const updatedProduct = await prisma.product.update({
      include: {
        category: true,
        subcategory: true
      },
      data: {
        stock: product.stock - cartItem.quantity
      },
      where: { id: cartItem.product.id }
    })
    return mapProduct(updatedProduct)
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
    const filteredTrendingCartItems = mappedTrendingCartItems.filter((product) => product !== null) as ProductEntityType[]

    if (filteredTrendingCartItems.length < 5) {
      return await this.getSpotlightedProducts([2, 9, 32, 35, 43])
    } else {
      return mapProducts(filteredTrendingCartItems)
    }
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

  async getSpotlightedProducts (ids: number[]): Promise<ProductType[]> {
    const spotlightedProducts: ProductType[] = []

    for (const id of ids) {
      const product = await this.getProductById(id)

      if (product != null) {
        spotlightedProducts.push(product)
      }
    }

    return spotlightedProducts
  }
}

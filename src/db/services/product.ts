import prisma from '@/lib/prisma'
import { type CartItemType } from '@/types/cartTypes'
import { type ProductType } from '@/types/productTypes'

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
}

import { productService } from '@/db/handler'
import { type NextRequest, NextResponse as response } from 'next/server'

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const id = searchParams.get('id')
  const category = searchParams.get('category')
  const subcategory = searchParams.get('subcategory')
  const trending = searchParams.get('trending')

  if (id !== null) {
    const product = await productService.getProductById(parseInt(id))
    if (product === null) return response.json({}, { status: 404 })

    return response.json(product)
  }

  if (category !== null) {
    const products = await productService.getProductsByCategory(category)
    return response.json(products)
  }

  if (subcategory !== null) {
    const products = await productService.getProductsBySubcategory(subcategory)
    return response.json(products)
  }

  if (trending !== null && trending === 'true') {
    const products = await productService.getTrendingProducts()
    return response.json(products)
  }

  const products = await productService.getProducts()
  return response.json(products)
}

import { productService } from '@/common/db/handler'
import { type ProductType } from '@/common/types/productTypes'
import { type TestimonialType } from '@/common/types/testimonialTypes'

export default class TestimonialService {
  async getTestimonials (): Promise<TestimonialType[]> {
    const productIds = [5, 10, 20]
    const products: ProductType[] = []

    for (const id of productIds) {
      const product = await productService.getProductById(id)
      if (product != null) {
        products.push(product)
      }
    }

    return await Promise.resolve([
      {
        rating: 4,
        product: products[0],
        review: 'Finished off my living room perfectly!'
      },
      {
        rating: 5,
        product: products[1],
        review: 'Super comfortable and trendy.'
      },
      {
        rating: 4,
        product: products[2],
        review: 'Really high quality and easy to assemble.'
      }
    ])
  }
}

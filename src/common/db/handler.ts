import CartService from '@/common/db/services/cart'
import CategoryService from '@/common/db/services/category'
import OrderService from '@/common/db/services/order'
import ProductService from '@/common/db/services/product'
import TestimonialService from '@/common/db/services/testimonial'

export const categoryService = new CategoryService()
export const cartService = new CartService()
export const productService = new ProductService()
export const orderService = new OrderService()
export const testimonialService = new TestimonialService()

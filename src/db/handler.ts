import CartService from '@/db/services/cart'
import CategoryService from '@/db/services/category'
import OrderService from '@/db/services/order'
import ProductService from '@/db/services/product'

export const categoryService = new CategoryService()
export const cartService = new CartService()
export const productService = new ProductService()
export const orderService = new OrderService()

'use client'

import useApi from '@/lib/common/hooks/useApi/useApi'
import { type Cart, type Product } from '@prisma/client'
import React, {
  createContext,
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  useContext,
  useState
} from 'react'

interface CartContextValues {
  cart: (Cart & { products: Product[] }) | null
  setCart: Dispatch<SetStateAction<(Cart & { products: Product[] }) | null>>
}

const CartContext = createContext<CartContextValues>({
  cart: null,
  setCart: () => null
})

interface CartProviderProps {
  children: ReactNode
}

const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<(Cart & { products: Product[] }) | null>(
    null
  )

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => {
  const context = useContext(CartContext)

  if (!context) { throw new Error('useCart may only be used within the CartContext') }

  const { cart, setCart } = context
  const { get, patch } = useApi()

  const [isLoading, setLoading] = useState(false)

  async function getCart () {
    setLoading(true)
    const cart = await get<Cart & { products: Product[] }>('/api/cart')
    setCart(cart)
    setLoading(false)
    return cart
  }

  async function addToCart (product: Product) {
    if (cart != null) {
      setLoading(true)
      const formattedCart = {
        ...cart,
        products: [...cart.products, product]
      }
      const updatedCart = await patch<Cart & { products: Product[] }>(
        '/api/cart',
        formattedCart
      )

      setCart(updatedCart)
      setLoading(false)
      return updatedCart
    }

    setLoading(true)
    const newCart: Partial<Cart & { products: Product[] }> = {
      products: [product]
    }
    const createdCart = await patch<Cart & { products: Product[] }>(
      '/api/cart',
      newCart
    )

    setCart(createdCart)
    setLoading(false)
    return createdCart
  }

  async function removeFromCart (product: Product) {
    if (cart != null) {
      setLoading(true)
      const formattedCart = {
        ...cart,
        products: cart.products.filter((prod) => prod.id !== product.id)
      }
      const updatedCart = await patch<Cart & { products: Product[] }>(
        '/api/cart',
        formattedCart
      )

      setCart(updatedCart)
      setLoading(false)
      return updatedCart
    }
  }

  async function clearCart () {
    if (cart != null) {
      setLoading(true)
      const formattedCart = {
        ...cart,
        products: []
      }
      const updatedCart = await patch<Cart & { products: Product[] }>(
        '/api/cart',
        formattedCart
      )

      setCart(updatedCart)
      setLoading(false)
      return updatedCart
    }
  }

  return {
    ...context,
    isLoading,
    getCart,
    addToCart,
    removeFromCart,
    clearCart
  }
}

export { CartProvider, useCart }

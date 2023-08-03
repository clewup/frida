'use client'

import useApi from '@/lib/common/hooks/useApi/useApi'
import { type Cart, type Product, type CartItem } from '@prisma/client'
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
  cart: (Cart & { items: Array<CartItem & { product: Product }> }) | null
  setCart: Dispatch<SetStateAction<(Cart & { items: Array<CartItem & { product: Product }> }) | null>>
}

const CartContext = createContext<CartContextValues>({
  cart: null,
  setCart: () => null
})

interface CartProviderProps {
  children: ReactNode
}

const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<(Cart & { items: Array<CartItem & { product: Product }> }) | null>(
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

  if (context === null) { throw new Error('useCart may only be used within the CartContext') }

  const { cart, setCart } = context
  const { get, patch } = useApi()

  const [isLoading, setLoading] = useState(false)

  async function getCart () {
    setLoading(true)
    const cart = await get<Cart & { items: Array<CartItem & { product: Product }> }>('/api/cart')
    setCart(cart)
    setLoading(false)
    return cart
  }

  async function addToCart (product: Product) {
    setLoading(true)
    const updatedCart = await patch<Cart & { items: Array<CartItem & { product: Product }> }>(
      '/api/cart',
      {
        action: 'add',
        product
      }
    )

    setCart(updatedCart)
    setLoading(false)
    return cart
  }

  async function removeFromCart (product: Product) {
    if (cart != null) {
      setLoading(true)

      const updatedCart = await patch<Cart & { items: Array<CartItem & { product: Product }> }>(
        '/api/cart',
        {
          action: 'remove',
          product
        }
      )

      setCart(updatedCart)
      setLoading(false)
      return updatedCart
    }
  }

  async function clearCart () {
    if (cart != null) {
      setLoading(true)

      const updatedCart = await patch<Cart & { items: Array<CartItem & { product: Product }> }>(
        '/api/cart',
        {
          action: 'clear'
        }
      )

      setCart(updatedCart)
      setLoading(false)
      return updatedCart
    }
  }

  return {
    ...context,
    addToCart,
    clearCart,
    getCart,
    isLoading,
    removeFromCart
  }
}

export { CartProvider, useCart }

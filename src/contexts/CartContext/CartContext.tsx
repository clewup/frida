'use client'

import useApi from '@/lib/common/hooks/useApi/useApi'
import { type CartType } from '@/types/cartTypes'
import { type ProductType } from '@/types/productTypes'
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
  cart: CartType | null
  setCart: Dispatch<SetStateAction<CartType | null>>
}

const CartContext = createContext<CartContextValues>({
  cart: null,
  setCart: () => null
})

interface CartProviderProps {
  children: ReactNode
}

const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartType | null>(
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
    const cart = await get<CartType>('/api/cart')
    setCart(cart)
    setLoading(false)
    return cart
  }

  async function addToCart (product: ProductType) {
    setLoading(true)
    const updatedCart = await patch<CartType>(
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

  async function removeFromCart (product: ProductType) {
    if (cart != null) {
      setLoading(true)

      const updatedCart = await patch<CartType>(
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

      const updatedCart = await patch<CartType>(
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

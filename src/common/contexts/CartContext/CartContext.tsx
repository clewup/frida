'use client'

import { fridaApi } from '@/common/api/handler'
import { type CartType } from '@/common/types/cartTypes'
import { type ProductType } from '@/common/types/productTypes'
import { useAuthKitty } from '@/lib/authkitty/contexts/AuthKittyContext/AuthKittyContext'
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
  const { user } = useAuthKitty()

  if (context === null) { throw new Error('useCart may only be used within the CartContext') }

  const { cart, setCart } = context

  const [isLoading, setLoading] = useState(false)

  async function getCart () {
    setLoading(true)
    const cart = await fridaApi.getCart()
    setCart(cart)
    setLoading(false)
    return cart
  }

  async function addToCart (product: ProductType, quantity?: number) {
    setLoading(true)
    const updatedCart = await fridaApi.patchCart(
      {
        action: 'add',
        product,
        quantity: quantity ?? 1
      }
    )

    setCart(updatedCart)
    setLoading(false)
    return cart
  }

  async function updateCartItem (product: ProductType, quantity: number) {
    setLoading(true)
    const updatedCart = await fridaApi.patchCart(
      {
        action: 'update',
        product,
        quantity
      }
    )

    setCart(updatedCart)
    setLoading(false)
    return cart
  }

  async function removeFromCart (product: ProductType) {
    if (cart != null) {
      setLoading(true)

      const updatedCart = await fridaApi.patchCart(
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

      const updatedCart = await fridaApi.patchCart(
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
    updateCartItem,
    clearCart,
    getCart,
    isLoading,
    removeFromCart
  }
}

export { CartProvider, useCart }

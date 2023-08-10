'use client'

import IconButton from '@/components/IconButton/IconButton'
import { useCart } from '@/contexts/CartContext/CartContext'
import { type ProductType } from '@/types/productTypes'
import React, { type FC } from 'react'
import { Trash2 as RemoveIcon } from 'react-feather'
import { motion as m, type Variants } from 'framer-motion'

interface CartProductCardProps {
  product: ProductType
  quantity: number
}

const CartProductCard: FC<CartProductCardProps> = ({ product, quantity }) => {
  const { removeFromCart, isLoading } = useCart()

  const { id, image, name, price } = product

  const containerVariants: Variants = {
    hidden: {},
    hover: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const ctaVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    hover: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <m.div variants={containerVariants} initial="hidden" whileHover="hover" className="bg-white rounded-md p-5 flex justify-between">
      <div className="flex gap-5 w-4/5">
        <span className="w-1/4 aspect-square">
          <img src={image} alt={name} className="rounded-md" />
        </span>
        <span>
            <h1 className="text-xl">{name}</h1>
            <p className="text-xl">£{Number(price).toFixed(2)}</p>
            <p className="text-xl">x{quantity}</p>
        </span>
      </div>

        <m.div variants={ctaVariants}>
            <IconButton tooltipId={`cart-remove-tooltip-${id}`} tooltipText="Remove from cart" onClick={() => {
              void removeFromCart(product)
            }} isLoading={isLoading}>
                <RemoveIcon size={20} />
            </IconButton>
        </m.div>
    </m.div>
  )
}

export default CartProductCard

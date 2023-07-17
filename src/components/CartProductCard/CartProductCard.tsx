'use client'

import Button from "@/components/Button/Button";
import { useCart } from '@/contexts/CartContext/CartContext'
import { type Product } from '@prisma/client'
import React, { type FC } from 'react'
import { Trash2 as RemoveIcon } from 'react-feather'

interface CartProductCardProps {
  product: Product
  quantity: number
}

const CartProductCard: FC<CartProductCardProps> = ({ product, quantity }) => {
  const { isLoading, removeFromCart } = useCart()

  const { image, name, price } = product

  return (
    <div className="flex justify-between">
      <div className="flex gap-5">
        <span className="w-1/4 aspect-square">
          <img src={image} alt={name} className="rounded-md" />
        </span>
        <span>
            <h1 className="text-2xl">{name}</h1>
            <p className="text-2xl">£{Number(price).toFixed(2)}</p>
            <p className="text-2xl">x{quantity}</p>
        </span>
      </div>

        <Button
            className="h-fit bg-transparent text-black hover:border-transparent"
            onClick={async () => await removeFromCart(product)}
        >
            <RemoveIcon size={20} />
        </Button>
    </div>
  )
}

export default CartProductCard

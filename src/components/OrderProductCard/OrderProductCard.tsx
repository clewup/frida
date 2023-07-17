'use client'

import { type Product } from '@prisma/client'
import React, { type FC } from 'react'

interface OrderProductCardProps {
  product: Product
  quantity: number
}

const OrderProductCard: FC<OrderProductCardProps> = ({ product, quantity }) => {
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
    </div>
  )
}

export default OrderProductCard

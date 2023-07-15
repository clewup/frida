'use client'

import { useCart } from '@/contexts/CartContext/CartContext'
import { type Product } from '@prisma/client'
import cx from 'classnames'
import React, { type FC } from 'react'
import { Trash2 as RemoveIcon } from 'react-feather'

interface CartProductProps {
  product: Product
  quantity: number
}

const CartProduct: FC<CartProductProps> = ({ product, quantity }) => {
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

        <button
            type="button"
            className={cx('btn btn-ghost btn-sm', { loading: isLoading })}
            onClick={async () => await removeFromCart(product)}
        >
            <RemoveIcon size={20} />
        </button>
    </div>
  )
}

export default CartProduct

'use client'

import { useCart } from '@/contexts/CartContext/CartContext'
import { type Product as PrismaProduct } from '@prisma/client'
import cx from 'classnames'
import Link from 'next/link'
import React, { type FC } from 'react'
import { ShoppingCart as CartIcon } from 'react-feather'

interface ProductProps {
  product: PrismaProduct
  isFullProduct?: boolean
}

const Product: FC<ProductProps> = ({ product, isFullProduct = false }) => {
  const { isLoading, addToCart } = useCart()

  const { id, name, description, image, price } = product

  if (isFullProduct) {
    return (
            <div className="border-[1px] rounded-md flex w-full">
                <div className="p-10 w-1/2">
                    <img src={image} alt={name} className="rounded-md" />
                </div>
                <div className="flex flex-col justify-between w-1/2 p-10">
                    <div className="text-center">
                        <h1 className="text-3xl h-20">{name}</h1>
                        <div className="p-2">
                            <p>{description}</p>
                        </div>
                    </div>
                    <div className="p-10 flex justify-between items-center">
                        <p className="text-3xl">£{Number(price).toFixed(2)}</p>
                        <button
                            className={cx('btn btn-lg btn-primary', { loading: isLoading })}
                            onClick={async () => await addToCart(product)}
                        >
                            <CartIcon />
                        </button>
                    </div>
                </div>
            </div>
    )
  }

  return (
    <div className="border-[1px] rounded-md flex flex-col justify-between">
      <Link href={`/product/${id}`} className="p-10">
        <img src={image} alt={name} className="rounded-md" />
      </Link>
      <div className="text-center">
        <h1 className="text-3xl h-20">{name}</h1>
      </div>
      <div className="p-10 flex justify-between items-center">
        <p className="text-3xl">£{Number(price).toFixed(2)}</p>
        <button
          className={cx('btn btn-lg btn-primary', { loading: isLoading })}
          onClick={async () => await addToCart(product)}
        >
          <CartIcon />
        </button>
      </div>
    </div>
  )
}
export default Product

'use client'

import { useCart } from '@/contexts/CartContext/CartContext'
import { type Category, type Subcategory } from '@prisma/client'
import cx from 'classnames'
import React, { type FC } from 'react'
import { Package as PackageIcon, ShoppingCart as CartIcon } from 'react-feather'
import { type Product as PrismaProduct } from '.prisma/client'

interface DetailedProductProps {
  product: PrismaProduct & { category: Category, subcategory: Subcategory }
}

const DetailedProduct: FC<DetailedProductProps> = ({ product }) => {
  const { isLoading, addToCart } = useCart()

  const { name, description, image, price, stock } = product

  return (
        <div className="border-[1px] rounded-md flex flex-col w-full md:flex-row">
            <div className="p-10 md:w-1/2">
                <img src={image} alt={name} className="rounded-md" />
            </div>
            <div className="flex flex-col justify-between p-10 md:w-1/2">
                <div className="text-center">
                    <h1 className="text-3xl h-20">{name}</h1>
                    <div className="p-2">
                        <p>{description}</p>
                    </div>
                </div>

                <div className="border-y-2 p-4">
                        <span className="flex gap-5 justify-center">
                            <PackageIcon/>
                            <p>Free shipping over £30!</p>
                        </span>
                </div>

                <div className="p-10 flex justify-between items-center">
                    <p className="text-3xl">£{Number(price).toFixed(2)}</p>
                    {stock > 0
                      ? (
                            <button
                                className={cx('btn btn-lg btn-primary', { loading: isLoading })}
                                onClick={async () => await addToCart(product)}
                            >
                                <CartIcon />
                            </button>
                        )
                      : (
                            <p>Out of Stock</p>
                        )}
                </div>
            </div>
        </div>
  )
}

export default DetailedProduct

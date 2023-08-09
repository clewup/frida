'use client'

import Button from '@/components/Button/Button'
import { useCart } from '@/contexts/CartContext/CartContext'
import { type ProductType } from '@/types/productTypes'
import React, { type FC } from 'react'
import { Package as PackageIcon, ShoppingCart as CartIcon } from 'react-feather'

interface ProductProps {
  product: ProductType
}

const Product: FC<ProductProps> = ({ product }) => {
  const { addToCart, isLoading } = useCart()

  const { description, image, name, price, stock } = product

  return (
        <div className="bg-white rounded-md flex flex-col w-full md:flex-row">
            <div className="p-10 md:w-1/2">
                {/* TODO: convert to next/image */}
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
                            <Button
                                isLoading={isLoading}
                                onClick={() => {
                                  void addToCart(product)
                                }}
                            >
                                <CartIcon />
                                Add to cart
                            </Button>
                        )
                      : (
                            <p>Out of Stock</p>
                        )}
                </div>
            </div>
        </div>
  )
}

export default Product

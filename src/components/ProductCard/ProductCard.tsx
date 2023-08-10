'use client'

import { Tooltip } from 'react-tooltip'
import { useCart } from '@/contexts/CartContext/CartContext'
import { type ProductType } from '@/types/productTypes'
import Image from 'next/image'
import Link from 'next/link'
import React, { type FC } from 'react'
import { Heart, ShoppingCart as CartIcon } from 'react-feather'

interface ProductCardProps {
  product: ProductType
  showAddToCartButton?: boolean
}

const ProductCard: FC<ProductCardProps> = ({ product, showAddToCartButton = true }) => {
  const { addToCart, isLoading } = useCart()

  const { id, image, name, price, stock } = product

  return (
    <div className="bg-white rounded-md flex flex-col justify-between overflow-hidden items-center relative p-10 w-full">
          <Link href={`/product/${name}`} className="p-10 w-full z-0 relative">
              <div className="relative w-full aspect-square">
                  <Image src={image} alt={name} fill={true} className="rounded-md transition-zoom"/>
              </div>
          </Link>

        {showAddToCartButton &&
            <div className="flex justify-center gap-2 items-center">
                {stock > 0
                  ? (
                        <button
                            data-tooltip-id={`cart-tooltip-${id}`}
                            className="shadow-md bg-white rounded-[50%] p-3 aspect-square flex items-center justify-center hover:bg-black hover:text-white"
                            onClick={() => {
                              void addToCart(product)
                            }}
                            disabled={isLoading}>
                            <CartIcon size={20} />
                        </button>
                    )
                  : (
                        <p>Out of Stock</p>
                    )}
                <button
                    data-tooltip-id={`like-tooltip-${id}`}
                    className="shadow-md bg-white rounded-[50%] p-3 aspect-square flex items-center justify-center cursor-not-allowed hover:bg-black hover:text-white"
                    >
                    <Heart size={20}/>
                </button>

                {/* Button Tooltips */}
                <Tooltip
                    id={`cart-tooltip-${id}`}
                    place="top"
                    content="Add to cart"
                />
                <Tooltip
                    id={`like-tooltip-${id}`}
                    place="top"
                    content="Save for later"
                />
            </div>
        }

          <div className="flex flex-col gap-3 text-center z-20 pt-10 px-5">
              <h1 className="text-xl">{name}</h1>

              <p className="text-xl text-gray-400">£{Number(price).toFixed(2)}</p>
          </div>
    </div>
  )
}
export default ProductCard

'use client'

import Button from '@/components/Button/Button'
import { useCart } from '@/contexts/CartContext/CartContext'
import { type Category, type Product as PrismaProduct, type Subcategory } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React, { type FC } from 'react'
import { ShoppingCart as CartIcon } from 'react-feather'

interface ProductCardProps {
  product: PrismaProduct & { category: Category, subcategory: Subcategory }
  showAddToCartButton?: boolean
}

const ProductCard: FC<ProductCardProps> = ({ product, showAddToCartButton = true }) => {
  const { addToCart, isLoading } = useCart()

  const { id, image, name, price, stock, subcategory: { name: subcategory } } = product

  return (
    <div className="bg-white rounded-md flex flex-col justify-between overflow-hidden items-center">
          <Link href={`/product/${id}`} className="p-10 w-full z-0">
              <div className="relative w-full aspect-square">
                  <Image src={image} alt={name} fill={true} className="rounded-md transition-zoom"/>
              </div>
          </Link>
          <div className="flex flex-col gap-3 text-center z-20 px-5">
              <h2 className="text-gray-400">{subcategory}</h2>
              <h1 className="text-xl">{name}</h1>

              <p className="text-xl text-gray-400">£{Number(price).toFixed(2)}</p>
          </div>

        {showAddToCartButton &&
            <div className="p-10 flex justify-between items-center">
                {stock > 0
                  ? (
                        <Button
                            onClick={() => {
                              void addToCart(product)
                            }}
                            isLoading={isLoading}
                        >
                            <CartIcon />
                            Add to cart
                        </Button>
                    )
                  : (
                        <p>Out of Stock</p>
                    )}
            </div>
        }

    </div>
  )
}
export default ProductCard

'use client'

import Button from "@/components/Button/Button";
import { useCart } from '@/contexts/CartContext/CartContext'
import { type Category, type Product as PrismaProduct, type Subcategory } from '@prisma/client'
import cx from 'classnames'
import Link from 'next/link'
import React, { type FC } from 'react'
import { ShoppingCart as CartIcon } from 'react-feather'
import { motion as m } from 'framer-motion'

interface ProductProps {
  product: PrismaProduct & { category: Category, subcategory: Subcategory }
}

const Product: FC<ProductProps> = ({ product }) => {
  const { addToCart, isLoading } = useCart()

  const { id, image, name, price, stock, subcategory: { name: subcategory } } = product

  return (
    <m.div variants={{
      hidden: { opacity: 0, y: 75 },
      visible: { opacity: 1, y: 0 }
    }} initial="hidden" animate="visible" className="border-[1px] rounded-md flex flex-col justify-between overflow-hidden items-center">
          <Link href={`/product/${id}`} className="p-10 z-0">
            <m.img src={image} alt={name} className="rounded-md" variants={{ hover: { scale: 1.2, transition: { duration: 1.5 } }, initial: { scale: 1 } }} initial="initial" whileHover="hover"/>
          </Link>
          <div className="flex flex-col gap-3 text-center z-20 px-5">
              <h2 className="text-base-300">{subcategory}</h2>
              <h1 className="text-3xl ">{name}</h1>

              <p className="text-3xl">£{Number(price).toFixed(2)}</p>
          </div>


      <div className="p-10 flex justify-between items-center">
          {stock > 0
            ? (
                <Button
                    onClick={async () => await addToCart(product)}
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
    </m.div>
  )
}
export default Product

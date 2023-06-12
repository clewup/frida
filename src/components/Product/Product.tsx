'use client'

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
  const { isLoading, addToCart } = useCart()

  const { id, name, image, price, stock, subcategory: { name: subcategory } } = product

  return (
    <m.div variants={{
      hidden: { y: 75, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    }} initial="hidden" animate="visible" className="border-[1px] rounded-md flex flex-col justify-between overflow-hidden">
      <Link href={`/product/${id}`} className="p-10 z-0">
        <m.img src={image} alt={name} className="rounded-md" variants={{ initial: { scale: 1 }, hover: { scale: 1.2, transition: { duration: 1.5 } } }} initial="initial" whileHover="hover"/>
      </Link>
      <div className="flex flex-col gap-3 text-center h-20 z-20">
          <h1 className="text-3xl ">{name}</h1>
          <h2 className="text-base-300">{subcategory}</h2>
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
    </m.div>
  )
}
export default Product

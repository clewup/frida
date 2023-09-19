'use client'

import IconButton from '@/components/IconButton/IconButton'
import { useRouter } from 'next/navigation'
import { useCart } from '@/common/contexts/CartContext/CartContext'
import { type ProductType } from '@/common/types/productTypes'
import Image from 'next/image'
import Link from 'next/link'
import React, { type FC } from 'react'
import { Eye, Heart, ShoppingCart } from 'react-feather'
import { motion as m, type Variants } from 'framer-motion'

interface ProductCardProps {
  product: ProductType
  showAddToCartButton?: boolean
}

const ProductCard: FC<ProductCardProps> = ({ product, showAddToCartButton = true }) => {
  const { addToCart, isLoading } = useCart()
  const router = useRouter()

  const { id, image, name, price } = product

  const containerVariants: Variants = {
    hidden: {},
    hover: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const ctaVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    hover: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  const ctaButtons = [
    {
      icon: <ShoppingCart size={20}/>,
      onClick: () => {
        void addToCart(product)
      },
      isLoading,
      tooltipId: `cart-tooltip-${id}`,
      tooltipText: 'Add to cart'
    },
    {
      icon: <Eye size={20}/>,
      onClick: () => { router.push(`/product/${name}`) },
      tooltipId: `view-tooltip-${id}`,
      tooltipText: 'Quick view'
    },
    {
      icon: <Heart size={20}/>,
      tooltipId: `like-tooltip-${id}`,
      tooltipText: 'Save for later'
    }
  ]

  return (
    <m.div variants={containerVariants} initial="hidden" whileHover="hover" className="bg-white rounded-md flex flex-col justify-between overflow-hidden items-center relative p-10 w-full h-full">
          <Link href={`/product/${name}`} className="p-10 w-full z-0 relative">
              <div className="relative w-full aspect-square">
                  <Image src={image} alt={name} fill={true} className="rounded-md transition-zoom"/>
              </div>
          </Link>

        {showAddToCartButton &&
            <div className="flex justify-center gap-2 items-center">
                {ctaButtons.map(({ icon, onClick, isLoading, tooltipId, tooltipText }, index) => (
                    <m.div variants={ctaVariants} key={index}>
                        <IconButton onClick={onClick} isLoading={isLoading} tooltipId={tooltipId} tooltipText={tooltipText}>
                            {icon}
                        </IconButton>
                    </m.div>
                ))
                }
            </div>
        }

          <div className="flex flex-col gap-3 text-center z-20 pt-10 px-5">
              <h1 className="text-xl">{name}</h1>

              <p className="text-xl text-gray-400">£{Number(price).toFixed(2)}</p>
          </div>
    </m.div>
  )
}

export default ProductCard

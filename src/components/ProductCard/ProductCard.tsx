'use client'

import { useRouter } from 'next/navigation'
import { TailSpin } from 'react-loader-spinner'
import { Tooltip } from 'react-tooltip'
import { useCart } from '@/contexts/CartContext/CartContext'
import { type ProductType } from '@/types/productTypes'
import Image from 'next/image'
import Link from 'next/link'
import React, { type FC, type ReactNode } from 'react'
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
                        <CtaButton onClick={onClick} isLoading={isLoading} tooltipId={tooltipId} tooltipText={tooltipText}>
                            {icon}
                        </CtaButton>
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

interface CtaButtonProps {
  children: ReactNode
  onClick?: () => void
  isLoading?: boolean
  tooltipId: string
  tooltipText: string
}

const CtaButton: FC<CtaButtonProps> = ({ children, onClick, isLoading, tooltipId, tooltipText }) => {
  return (
        <>
            <button
                data-tooltip-id={tooltipId}
                className="shadow-md bg-white rounded-[50%] p-3 aspect-square flex items-center justify-center hover:bg-black hover:text-white"
                onClick={onClick}
                disabled={isLoading}>
                <>
                    {(isLoading === true)
                      ? (<TailSpin color="#fff" height={20} width={20}/>)
                      : (children)
                    }
                </>
            </button>

            <Tooltip
                id={tooltipId}
                place="top"
                content={tooltipText}
            />
        </>
  )
}

export default ProductCard

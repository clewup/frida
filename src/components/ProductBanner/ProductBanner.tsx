'use client'

import Button from '@/components/Button/Button'
import { type ProductType } from '@/types/productTypes'
import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { type FC, useLayoutEffect, useRef } from 'react'
import { motion as m, type Variants } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ProductBannerProps {
  product: ProductType
  backgroundColour: string
}

const ProductBanner: FC<ProductBannerProps> = ({ product: { price, name, image, subcategory: { name: subcategory } }, backgroundColour }) => {
  const containerRef = useRef(null)
  const imageRef = useRef(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: 1
      }
    })

    timeline.to(imageRef.current, {
      yPercent: -30
    })
  }, [])

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const animationVariants: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  return (
        <m.div ref={containerRef} variants={containerVariants} initial="hidden" whileInView="visible" className={cx('h-screen-header bg-theme-mint flex overflow-hidden rounded-md relative', backgroundColour)}>
            <div className="w-3/5 flex flex-col justify-center items-center px-40">
                <div className="flex flex-col gap-5">
                    <m.div variants={animationVariants} className="flex gap-5 items-center">
                        <div className="h-[1px] bg-theme-black w-10"/>
                        <p className="text-3xl">Best price of £{price}</p>
                    </m.div>

                    <m.p variants={animationVariants} className="text-8xl font-semibold text-left">{name}</m.p>

                    <m.div variants={animationVariants} className="relative z-50">
                        <Link href={`/product/${name}`}>
                            <Button className="text-2xl">
                                Shop now
                            </Button>
                        </Link>
                    </m.div>
                </div>
            </div>

            <div className="w-2/5 h-full bg-white"/>

            <div className="absolute right-[10%] h-full flex items-center">
                <div ref={imageRef} className="h-[80%] aspect-square relative">
                    <Image src={image} alt="product" fill={true} className="object-contain"/>
                </div>
            </div>

            <h1 className="absolute -bottom-9 left-[50%] -translate-x-[50%] text-9xl font-bold whitespace-nowrap opacity-10">{subcategory.toLowerCase()}</h1>
        </m.div>
  )
}

export default ProductBanner

'use client'

import ProductBanner from '@/components/ProductBanner/ProductBanner'
import { type ProductType } from '@/common/types/productTypes'
import React, { type FC } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface HeroProps {
  spotlightedProducts: ProductType[]
}

const Hero: FC<HeroProps> = ({ spotlightedProducts }) => {
  const bannerBackgroundColours = [
    'bg-banner-mint',
    'bg-banner-blue',
    'bg-banner-cream'
  ]

  return (
        <Carousel emulateTouch={true} showStatus={false} infiniteLoop={true}>
            {spotlightedProducts.map((product, index) => (
                    <ProductBanner key={index} product={product} backgroundColour={bannerBackgroundColours[index]}/>
            ))}
        </Carousel>
  )
}

export default Hero

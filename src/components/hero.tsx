'use client'

import {ProductBanner} from '@/components/product-banner'
import {type ProductType} from '@/common/types/productTypes'
import React, {type FC} from 'react'
import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface Props {
    spotlightedProducts: ProductType[]
}

export const Hero: FC<Props> = ({spotlightedProducts}) => {
    const bannerBackgroundColours = [
        'bg-banner-mint',
        'bg-banner-blue',
        'bg-banner-cream'
    ]

    return (
        <Carousel emulateTouch={true} showStatus={false} infiniteLoop={true} showThumbs={false}>
            {spotlightedProducts.map((product, index) => (
                <ProductBanner key={index} product={product} backgroundColour={bannerBackgroundColours[index]}/>
            ))}
        </Carousel>
    )
}

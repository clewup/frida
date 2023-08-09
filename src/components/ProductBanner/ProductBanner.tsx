import Button from '@/components/Button/Button'
import { type ProductType } from '@/types/productTypes'
import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, { type FC } from 'react'

interface ProductBannerProps {
  product: ProductType
  backgroundColour: string
}

const ProductBanner: FC<ProductBannerProps> = ({ product: { price, name, image, subcategory: { name: subcategory } }, backgroundColour }) => {
  return (
        <div className={cx('h-screen-header bg-theme-mint flex overflow-hidden rounded-md relative', backgroundColour)}>
            <div className="w-3/5 flex flex-col justify-center items-center px-40">
                <div className="flex flex-col gap-5">
                    <div className="flex gap-5 items-center">
                        <div className="h-[1px] bg-theme-black w-10"/>
                        <p className="text-3xl">Best price of £{price}</p>
                    </div>

                    <p className="text-8xl font-semibold text-left">{name}</p>

                    <Link href={`/product/${name}`} className="relative z-50">
                        <Button className="text-2xl">
                            Shop now
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="w-2/5 h-full bg-white"/>

            <div className="absolute right-[10%] h-full flex items-center">
                <div className="h-[80%] aspect-square relative">
                    <Image src={image} alt="product" fill={true} className="object-contain"/>
                </div>
            </div>

            <h1 className="absolute -bottom-9 left-[50%] -translate-x-[50%] text-9xl font-bold whitespace-nowrap opacity-10">{subcategory.toLowerCase()}</h1>
        </div>
  )
}

export default ProductBanner

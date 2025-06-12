'use client'

import {type ProductType} from '@/common/types/productTypes'
import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, {type FC, useLayoutEffect, useRef} from 'react'
import {motion as m, type Variants} from 'framer-motion'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {Button} from "@/components/ui/button";

interface Props {
    product: ProductType
    backgroundColour: string
}

export const ProductBanner: FC<Props> = ({
                                             product: {price, name, image, subcategory: {name: subcategory}},
                                             backgroundColour
                                         }) => {
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
        hidden: {opacity: 0, x: -100},
        visible: {opacity: 1, x: 0, transition: {duration: 0.5}}
    }

    return (
        <m.div ref={containerRef} variants={containerVariants} initial="hidden" whileInView="visible"
               className={cx('h-screen-header bg-theme-mint flex flex-col overflow-hidden rounded-md relative md:flex-row', backgroundColour)}>
            <div className="w-3/5 flex flex-col justify-center items-center px-40">
                <div className="flex flex-col gap-5 py-10 md:py-0">
                    <m.div variants={animationVariants} className="flex gap-5 items-center select-none">
                        <div className="h-[1px] bg-theme-black w-10"/>
                        <p className="text-2xl md:text-3xl">Now only £{price}</p>
                    </m.div>

                    <m.p variants={animationVariants}
                         className="text-5xl select-none font-semibold text-left md:text-8xl">{name}</m.p>

                    <m.div variants={animationVariants} className="relative z-50">
                        <Link href={`/product/${name}`}>
                            <Button size="lg">
                                Shop now
                            </Button>
                        </Link>
                    </m.div>
                </div>
            </div>

            <div className="w-2/5 h-full md:bg-white"/>

            <div
                className="absolute bottom-[10%] h-[50%] md:right-[10%] md:h-[100%] md:-bottom-[0%] flex items-center select-none">
                <div ref={imageRef} className="h-[80%] aspect-square relative">
                    <Image src={image} alt="product" fill={true} className="object-contain"/>
                </div>
            </div>

            <h1 className="absolute -bottom-5 md:-bottom-9 left-[50%] -translate-x-[50%] text-7xl md:text-9xl font-bold whitespace-nowrap opacity-10">{subcategory.toLowerCase()}</h1>
        </m.div>
    )
}


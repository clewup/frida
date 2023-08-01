'use client'

import { type TestimonialType } from '@/types/testimonialTypes'
import Image from "next/image";
import React, { type FC } from 'react'
import { motion as m } from 'framer-motion'

interface TestimonialProps {
  testimonial: TestimonialType
}

const Testimonial: FC<TestimonialProps> = ({ testimonial: { image, name, rating, review } }) => {
  return (
        <m.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }} initial="hidden" whileInView="visible" className="p-10 flex flex-col gap-5 bg-white rounded-md">
                <h1 className="text-xl">{review}</h1>
                <span className="flex gap-5 items-center">
                    <div className="w-20 aspect-square relative">
                        <Image src={image} alt={name} fill={true} className="rounded-[50%] object-cover"/>
                    </div>
                    <p>- {name}</p>
                </span>
        </m.div>
  )
}

export default Testimonial

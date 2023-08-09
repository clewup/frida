import { type TestimonialType } from '@/types/testimonialTypes'
import Image from 'next/image'
import React, { type FC } from 'react'

interface TestimonialProps {
  testimonial: TestimonialType
}

const Testimonial: FC<TestimonialProps> = ({ testimonial: { image, name, rating, review } }) => {
  return (
        <div className="p-10 flex flex-col gap-5 bg-white rounded-md">
                <h1 className="text-xl">{review}</h1>
                <span className="flex gap-5 items-center">
                    <div className="w-20 aspect-square relative">
                        <Image src={image} alt={name} fill={true} className="rounded-[50%] object-cover"/>
                    </div>
                    <p>- {name}</p>
                </span>
        </div>
  )
}

export default Testimonial

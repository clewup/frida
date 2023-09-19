import { type TestimonialType } from '@/common/types/testimonialTypes'
import Image from 'next/image'
import Link from 'next/link'
import React, { type FC } from 'react'

interface TestimonialProps {
  testimonial: TestimonialType
}

const Testimonial: FC<TestimonialProps> = ({ testimonial: { product: { image, name }, rating, review } }) => {
  const ratingStars = []
  for (let i = 0; i < rating; i++) {
    ratingStars.push(<p>&#9733;</p>)
  }

  return (
        <div className="p-10 flex gap-5 bg-white rounded-md">
            <Link href={`/product/${name}`}>
                <div className="w-20 aspect-square relative">
                    <Image src={image} alt={name} fill={true} className="object-cover"/>
                </div>
            </Link>

            <div>
                <h1 className="text-lg font-bold">{name}</h1>
                <div className="flex">
                    {ratingStars}
                </div>
                <p>{review}</p>
            </div>
        </div>
  )
}

export default Testimonial

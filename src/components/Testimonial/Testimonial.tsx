'use client'

import { type TestimonialType } from '@/types/testimonialTypes'
import React, { type FC } from 'react'
import { motion as m } from 'framer-motion'

interface TestimonialProps {
  testimonial: TestimonialType
}

const Testimonial: FC<TestimonialProps> = ({ testimonial: { image, name, rating, review } }) => {
  return (
        <m.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }} initial="hidden" whileInView="visible" className="p-10 flex flex-col gap-5">
                <h1 className="text-xl">{review}</h1>
                <Rating rating={rating}/>
                <span className="flex gap-5 items-center">
                    <img src={image} alt={name} className="mask mask-squircle w-20"/>
                    <p>- {name}</p>
                </span>
        </m.div>
  )
}

interface RatingProps {
  rating: number
}

const Rating: FC<RatingProps> = ({ rating }) => {
  return (
      <div className="rating">
          {
              Array.from({ length: rating }).map((rating, index) => (<input key={index} type="radio" name="rating-2" className="mask mask-star-2" checked onChange={() => null} />))
          }
      </div>
  )
}

export default Testimonial

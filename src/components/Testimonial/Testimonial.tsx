import { type TestimonialType } from '@/types/testimonialTypes'
import React, { type FC } from 'react'

interface TestimonialProps {
  testimonial: TestimonialType
}

const Testimonial: FC<TestimonialProps> = ({ testimonial: { name, image, review, rating } }) => {
  return (
        <div className="bg-base-100 rounded-md p-10 flex gap-5 items-center">
            <span className="w-1/3">
                <img src={image} alt={name} className="mask mask-squircle"/>
            </span>
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl">{name}</h1>
                <p>{review}</p>
                <Rating rating={rating}/>
            </div>
        </div>
  )
}

interface RatingProps {
  rating: number
}

const Rating: FC<RatingProps> = ({ rating }) => {
  return (
      <div className="rating">
          {
              Array.from({ length: rating }).map((rating, index) => (<input key={index} type="radio" name="rating-2" className="mask mask-star-2 bg-primary" checked/>))
          }
      </div>
  )
}

export default Testimonial

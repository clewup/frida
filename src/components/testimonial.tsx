import {type TestimonialType} from '@/common/types/testimonialTypes'
import Image from 'next/image'
import Link from 'next/link'
import React, {type FC} from 'react'

interface Props {
    testimonial: TestimonialType
}

export const Testimonial: FC<Props> = ({testimonial: {product, rating, review}}) => {
    const ratingStars = []
    for (let i = 0; i < rating; i++) {
        ratingStars.push(<p key={`star_${i}`}>&#9733;</p>)
    }

    return (
        <div className="p-10 flex gap-5 bg-white rounded-md">
            {product &&
                <Link href={`/product/${product?.name}`}>
                    <div className="w-20 aspect-square relative">
                        <Image src={product?.image} alt={product?.name} fill={true} className="object-cover"/>
                    </div>
                </Link>
            }

            <div className="lowercase">
                <h1 className="text-lg font-bold">{product?.name}</h1>
                <div className="flex">
                    {ratingStars}
                </div>
                <p>{review}</p>
            </div>
        </div>
    )
}


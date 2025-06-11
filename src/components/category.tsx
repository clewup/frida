'use client'

import {type CategoryType} from '@/common/types/categoryTypes'
import cx from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import React, {type FC} from 'react'

interface Props {
    category: CategoryType
    className?: string
}

export const Category: FC<Props> = ({category: {name: category, image}, className}) => {
    return (
        <Link href={`/search?category=${category}`}
              className={cx('bg-white relative rounded-md p-10 flex flex-col items-center justify-center overflow-hidden', className)}>
            <Image src={image} alt={category} fill={true}
                   className="absolute object-cover z-0 rounded-md transition-zoom"/>
            <div
                className="absolute bottom-5 bg-theme-white py-3 px-5 text-xl rounded-md w-[90%] hover:bg-black hover:text-white transition-colors">
                <p className="lowercase">{category}</p>
            </div>
        </Link>
    )
}

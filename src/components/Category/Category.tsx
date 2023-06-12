'use client'

import { type CategoryWithSubcategoriesType } from '@/types/categoryTypes'
import Image from 'next/image'
import Link from 'next/link'
import React, { type FC } from 'react'

interface CategoryProps {
  categoryWithSubcategories: CategoryWithSubcategoriesType
}

const Category: FC<CategoryProps> = ({ categoryWithSubcategories }) => {
  return (
          <Link href={`/search?category=${categoryWithSubcategories.category}`} className="relative rounded-md p-10 flex flex-col items-center justify-center h-60">
              <h1 className="uppercase text-5xl text-white font-bold z-10">{categoryWithSubcategories.category}</h1>
              <Image src={categoryWithSubcategories.image} alt={categoryWithSubcategories.category} fill={true} className="absolute object-cover z-0 rounded-md"/>
              <div className="absolute inset-0 bg-secondary opacity-80 rounded-md"></div>
          </Link>
  )
}

export default Category

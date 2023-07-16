'use client'

import { type CategoryWithSubcategoriesType } from '@/types/categoryTypes'
import cx from "classnames";
import Image from 'next/image'
import Link from 'next/link'
import React, { type FC } from 'react'

interface CategoryProps {
  categoryWithSubcategories: CategoryWithSubcategoriesType
    className?: string;
}

const Category: FC<CategoryProps> = ({ categoryWithSubcategories, className }) => {
  return (
          <Link href={`/search?category=${categoryWithSubcategories.category}`} className={cx("relative rounded-md p-10 flex flex-col items-center justify-center", className)}>
              <Image src={categoryWithSubcategories.image} alt={categoryWithSubcategories.category} fill={true} className="absolute object-cover z-0 rounded-md"/>
              <div className="absolute bottom-5 bg-neutral-100 py-3 px-5 text-xl rounded-md w-[90%] hover:bg-black hover:text-white transition-colors">
                  <p>{categoryWithSubcategories.category}</p>
              </div>
          </Link>
  )
}

export default Category

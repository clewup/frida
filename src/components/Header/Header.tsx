'use client'

import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useApi from '@/lib/common/hooks/useApi/useApi'
import useAuth from '@/lib/common/hooks/useAuth/useAuth'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { type CategoryWithSubcategoriesType } from '@/types/categoryTypes'
import cx from "classnames";
import Image from "next/image";
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Marquee from "react-fast-marquee";
import {
  ShoppingCart as CartIcon,
  Search as SearchIcon,
  User as UserIcon
} from 'react-feather'
import constants from '@/constants/constants'
import { motion as m } from 'framer-motion'

const Header = () => {
  const { user } = useLockr()
  const { signIn } = useAuth({ redirectUri: constants.APP_URL })
  const { get } = useApi()

  const [categories, setCategories] = useState<CategoryWithSubcategoriesType[]>([])
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  async function getCategoriesWithSubcategories () {
    const categories = await get<CategoryWithSubcategoriesType[]>('/api/category')
    setCategories(categories)
  }

  useEffect(() => {
    getCategoriesWithSubcategories()
  }, [])

  return (
      <div className="w-full bg-neutral-black pb-5">
        <Marquee>
          <div className="py-5 flex gap-20 items-center">
            <p className="text-white">FREE SHIPPING ON ORDERS OVER £30</p>
            <div className="h-[1px] bg-white w-10"/>
            <p className="text-white">SUMMER SALE DISCOUNT 20% OFF</p>
            <div className="h-[1px] bg-white w-10"/>
            <p className="text-white">FREE WORLDWIDE SHIPPING</p>
          </div>
        </Marquee>

        <div className="flex items-center justify-between px-5 md:px-10">
          <div className="flex gap-20 items-center pr-5 md:pr-0">
            <m.div variants={{
              hidden: { opacity: 0, y: -75 },
              visible: { opacity: 1, y: 0 }
            }} initial="hidden" animate="visible">
              <Link href="/" className="flex flex-col items-center">
                <Image src="https://res.cloudinary.com/dliog6kq6/image/upload/v1689457765/Logo_kn5qbu.png" alt="logo" width={160} height={100}/>
              </Link>
            </m.div>

            {categories.length > 0 &&
                <m.ul variants={{
                  hidden: { opacity: 0, x: -75 },
                  visible: { opacity: 1, transition: { delay: 0.5 }, x: 0 }
                }} initial="hidden" animate="visible" className="flex gap-10 text-white">
                  {categories.map(({category, subcategories}, index) => {
                    return (
                        <li key={index} className="cursor-pointer">
                          <Link href={`/search?category=${category}`}
                                onMouseEnter={() => setHoveredCategory(category)}
                          >
                            <button type="button" aria-haspopup="menu" className="text-lg">{category}</button>
                          </Link>

                          <div className={cx("absolute bg-white text-black px-5 py-3 text-lg rounded-md z-50 mt-2", hoveredCategory === category ? "block" : "hidden")} onMouseLeave={() => setHoveredCategory(null)}>
                            <ul className="flex flex-col gap-3 w-40">
                              {subcategories.map((subcategory, index) =>
                                      (<li key={index}>
                                        <Link href={`/search?category=${category}&subcategory=${subcategory}`}>
                                          <button type="button" className="text-lg">{subcategory}</button>
                                        </Link>
                                      </li>)
                              )}
                            </ul>
                          </div>
                        </li>
                    )
                  })}
                </m.ul>
            }

          </div>

          <div className="flex justify-end items-center gap-2 h-full">
            {(user == null)
                ? (
                    <span>
              <button className="text-white" onClick={signIn}>
                  <UserIcon size={15}/>
              </button>
            </span>
                )
                : (
                    <>
                      <Link href="/search" className="text-white">
                        <SearchIcon size={20}/>
                      </Link>

                      <Link href="/cart" className="text-white">
                        <CartIcon size={20}/>
                      </Link>

                      <Link href="/account" className="text-white">
                        <UserIcon size={20}/>
                      </Link>
                    </>
                )}
          </div>
        </div>
      </div>

  )
}
export default Header

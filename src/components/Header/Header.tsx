'use client'

import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useApi from '@/lib/common/hooks/useApi/useApi'
import useAuth from '@/lib/common/hooks/useAuth/useAuth'
import { type CategoryWithSubcategoriesType } from '@/types/categoryTypes'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'
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
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  async function getCategoriesWithSubcategories () {
    const categories = await get<CategoryWithSubcategoriesType[]>('/api/category')
    setCategories(categories)
  }

  useEffect(() => {
    void getCategoriesWithSubcategories()
  }, [])

  return (
      <div className="w-full bg-theme-black">
        <Marquee>
          <div className="py-5 flex gap-20 items-center">
            <p className="text-white">FREE SHIPPING ON ORDERS OVER £30</p>
            <div className="h-[1px] bg-white w-10"/>
            <p className="text-white">SUMMER SALE DISCOUNT 20% OFF</p>
            <div className="h-[1px] bg-white w-10"/>
            <p className="text-white">FREE WORLDWIDE SHIPPING</p>
          </div>
        </Marquee>

        <div className="flex items-center justify-between pb-5 md:px-40">
          <div className="flex gap-20 items-center pr-5 md:pr-0">
            <m.div variants={{
              hidden: { opacity: 0, y: -75 },
              visible: { opacity: 1, y: 0 }
            }} initial="hidden" animate="visible">
              <Link href="/" className="flex flex-col items-center">
                <h1 className="font-druk text-white text-4xl">FRIDA</h1>
              </Link>
            </m.div>

            {categories.length > 0 &&
                <m.ul variants={{
                  hidden: { opacity: 0, x: -75 },
                  visible: { opacity: 1, transition: { delay: 0.5 }, x: 0 }
                }} initial="hidden" animate="visible" className="flex gap-10 text-white">
                  {categories.map(({ category, subcategories }, index) => {
                    return (
                        <li key={index} className="cursor-pointer">
                          <Link href={`/search?category=${category}`}
                                onMouseEnter={() => { setHoveredCategory(index) }}
                                onClick={() => { setHoveredCategory(null) }}
                          >
                            <button type="button" aria-haspopup="menu" className="text-lg">{category}</button>
                          </Link>
                        </li>
                    )
                  })}
                </m.ul>
            }
          </div>

          <div className="flex justify-end items-center gap-2 h-full">
            {(user == null)
              ? (
              <button className="text-white" onClick={signIn}>
                  <UserIcon size={20}/>
              </button>
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

        {hoveredCategory != null &&
            <div className="absolute bg-white text-black w-[100vw] min-h-[40vh] py-10 text-lg z-50 px-40" onMouseLeave={() => { setHoveredCategory(null) }}>
              <ul className="flex flex-col gap-3">
                <div className="grid grid-cols-5">
                  {categories[hoveredCategory].subcategories.map((subcategory, index) =>
                    (<li key={index}>
                        <div className="flex gap-5 items-center w-full justify-between border-b-[2px] border-theme-gray pb-2">
                          <div className="flex gap-5 items-center">
                            <div className="w-6 h-6 relative">
                              <Image src={categories[hoveredCategory].image} alt={categories[hoveredCategory].category} fill={true} className="rounded-[50%]"/>
                            </div>
                            <h3>{subcategory}</h3>
                          </div>
                          <Link href={`/search?category=${categories[hoveredCategory].category}&subcategory=${subcategory}`} onClick={() => { setHoveredCategory(null) }}>
                            <button type="button" className="text-sm">View all</button>
                          </Link>
                        </div>

                      </li>)
                  )}
                </div>
              </ul>
            </div>
        }
      </div>

  )
}
export default Header

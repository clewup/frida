'use client'

import ShopSection from '@/components/Header/components/ShopSection/ShopSection'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useApi from '@/lib/common/hooks/useApi/useApi'
import useAuth from '@/lib/common/hooks/useAuth/useAuth'
import { type CategoryWithSubcategoriesType } from '@/types/categoryTypes'
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

  const [categories, setCategories] = useState<CategoryWithSubcategoriesType[]>([])
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItems | null>(null)

  function closeSection () {
    setActiveMenuItem(null)
  }

  const { get } = useApi()

  async function getCategoriesWithSubcategories () {
    const categories = await get<CategoryWithSubcategoriesType[]>('/api/category')
    setCategories(categories)
  }

  useEffect(() => {
    void getCategoriesWithSubcategories()
  }, [])

  enum MenuItems {
    SHOP = 'Shop',
  }

  const menuItems = [
    MenuItems.SHOP
  ]

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

        <div className="flex items-center justify-between pb-5 relative md:px-20">
          <div className="flex gap-20 items-center pr-5 md:pr-0">
            <m.div variants={{
              hidden: { opacity: 0, y: -75 },
              visible: { opacity: 1, y: 0 }
            }} initial="hidden" animate="visible">
              <Link href="/" className="flex flex-col items-center">
                <h1 className="font-druk text-white text-4xl">FRIDA</h1>
              </Link>
            </m.div>

            <div className="absolute left-[50%] -translate-x-[50%]">
                  <ul className="flex gap-10 text-white">
                    {menuItems.map((menuItem, index) => {
                      return (
                          <li key={index} className="cursor-pointer">
                            <div
                                  onMouseEnter={() => { setActiveMenuItem(menuItem) }}
                                  onClick={() => { setActiveMenuItem(null) }}
                            >
                              <button type="button" aria-haspopup="menu">{menuItem}</button>
                            </div>
                          </li>
                      )
                    })}
                  </ul>
            </div>

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

        {activeMenuItem &&
            <div className="absolute bg-white text-black w-[100vw] py-10 z-50 px-40">
              {
                {
                  [MenuItems.SHOP]: <ShopSection closeSection={closeSection} categories={categories}/>
                }[activeMenuItem]
              }
            </div>
        }
      </div>

  )
}

export default Header

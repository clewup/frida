'use client'

import ShopSection from '@/components/Header/components/ShopView/ShopView'
import useCategories from '@/hooks/useCategories/useCategories'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useAuth from '@/lib/common/hooks/useAuth/useAuth'
import Link from 'next/link'
import React, { useState } from 'react'
import Marquee from 'react-fast-marquee'
import {
  ShoppingCart as CartIcon,
  Search as SearchIcon,
  User as UserIcon
} from 'react-feather'
import constants from '@/constants/constants'
import { motion as m } from 'framer-motion'

enum MenuItems {
  SHOP = 'Shop',
  TRENDING = 'Trending',
  ABOUT = 'About',
  CONTACT = 'Contact'
}

const Header = () => {
  const { user } = useLockr()
  const { signIn } = useAuth({ redirectUri: constants.APP_URL })
  const { categories } = useCategories()

  const [activeView, setActiveView] = useState<MenuItems | null>(null)

  function closeView () {
    setActiveView(null)
  }

  return (
      <div className="w-full bg-theme-black">
        <div className="flex items-center justify-between py-5 relative md:px-20">
          <div className="flex gap-20 items-center pr-5 md:pr-0 h-full">
            <div className="absolute left-[50%] -translate-x-[50%] h-full">
              <Link href="/" className="flex flex-col items-center h-full justify-center">
                <h1 className="font-druk text-white text-4xl">FRIDA</h1>
              </Link>
            </div>

            <div className="">
                  <ul className="flex gap-10 text-white items-center h-full text-xl">
                    {Object.values(MenuItems).map((menuItem, index) => {
                      return (
                          <li key={index} className="cursor-pointer">
                            <div
                                  onMouseEnter={() => { setActiveView(menuItem) }}
                            >
                              <button type="button" aria-haspopup="menu">{menuItem}</button>
                            </div>
                          </li>
                      )
                    })}
                  </ul>
            </div>

          </div>

          <div className="flex justify-end items-center gap-5 h-full">
            {(user == null)
              ? (
              <button className="text-white" onClick={signIn}>
                  <UserIcon size={20}/>
              </button>
                )
              : (
                    <>
                      <Link href="/search" className="text-white flex gap-2">
                        <SearchIcon size={20}/>
                        <p>Search</p>
                      </Link>

                      <Link href="/cart" className="text-white flex gap-2">
                        <CartIcon size={20}/>
                        <p>Cart</p>
                      </Link>

                      <Link href="/account" className="text-white flex gap-2">
                        <UserIcon size={20}/>
                        <p>Account</p>
                      </Link>
                    </>
                )}
          </div>
        </div>

        {activeView &&
            <div className="absolute bg-white text-black w-[100vw] z-50 px-40">
              {
                {
                  [MenuItems.SHOP]: <ShopSection closeView={closeView} categories={categories}/>,
                  [MenuItems.TRENDING]: <></>,
                  [MenuItems.ABOUT]: <></>,
                  [MenuItems.CONTACT]: <></>
                }[activeView]
              }
            </div>
        }
      </div>

  )
}

export default Header

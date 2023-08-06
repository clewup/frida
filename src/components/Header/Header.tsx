'use client'

import ShopSection from '@/components/Header/components/ShopView/ShopView'
import useCategories from '@/hooks/useCategories/useCategories'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useAuth from '@/lib/common/hooks/useAuth/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {
  ShoppingCart as CartIcon,
  Search as SearchIcon,
  User as UserIcon
} from 'react-feather'
import constants from '@/constants/constants'

enum MenuItems {
  SHOP = 'Shop',
  TRENDING = 'Trending',
  ABOUT = 'About',
  CONTACT = 'Contact'
}

const menuItems = [
  {
    label: MenuItems.SHOP,
    route: '/search'
  },
  {
    label: MenuItems.TRENDING,
    route: '/'
  },
  {
    label: MenuItems.ABOUT,
    route: '/'
  },
  {
    label: MenuItems.CONTACT,
    route: '/'
  }
]

const Header = () => {
  const { user } = useLockr()
  const { signIn } = useAuth({ redirectUri: constants.APP_URL })
  const { categories } = useCategories()
  const router = useRouter()

  const [activeView, setActiveView] = useState<MenuItems | null>(null)

  function closeView () {
    setActiveView(null)
  }

  return (
      <div className="w-full">
        <div className="flex items-center justify-between py-7 relative md:px-20">
          <div className="flex gap-20 items-center pr-5 md:pr-0 h-full">
            <div className="absolute left-[50%] -translate-x-[50%] h-full">
              <Link href="/" className="flex flex-col items-center h-full justify-center">
                <h1 className="font-druk text-4xl">FRIDA</h1>
              </Link>
            </div>

            <div className="">
                  <ul className="flex gap-10 items-center h-full text-xl">
                    {menuItems.map(({ label, route }, index) => {
                      return (
                          <li key={index} className="cursor-pointer">
                            <div
                                  onMouseEnter={() => { setActiveView(label) }}
                                  onClick={() => { router.push(route); setActiveView(null) }}
                            >
                              <button type="button" aria-haspopup="menu">{label}</button>
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
              <button onClick={signIn}>
                  <UserIcon size={20}/>
              </button>
                )
              : (
                    <>
                      <Link href="/search" className="flex gap-2">
                        <SearchIcon size={20}/>
                      </Link>

                      <Link href="/cart" className="flex gap-2">
                        <CartIcon size={20}/>
                      </Link>

                      <Link href="/account" className="flex gap-2">
                        <UserIcon size={20}/>
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

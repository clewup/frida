'use client'

import ShopView from '@/components/Header/components/ShopView/ShopView'
import TrendingView from '@/components/Header/components/TrendingView/TrendingView'
import { type CategoryType } from '@/common/types/categoryTypes'
import { type ProductType } from '@/common/types/productTypes'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { type FC, useEffect, useState } from 'react'
import {
  ShoppingCart as CartIcon,
  Search as SearchIcon,
  User as UserIcon, ChevronDown, ChevronUp
} from 'react-feather'
import constants from '@/common/constants/constants'

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
    route: '/search'
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

interface HeaderProps {
  categories: CategoryType[]
  trendingProducts: ProductType[]
}

const Header: FC<HeaderProps> = ({ categories, trendingProducts }) => {
  const router = useRouter()
  const pathname = usePathname()

  const [activeView, setActiveView] = useState<MenuItems | null>(null)

  function closeView () {
    setActiveView(null)
  }

  useEffect(() => {
    closeView()
  }, [pathname])

  const hasDropdown = (label: MenuItems) => [MenuItems.SHOP, MenuItems.TRENDING].includes(label)

  return (
      <div className="w-full ">
        <div className="flex items-center justify-between py-7 relative md:px-20">
          <div className="flex gap-20 items-center pr-5 md:pr-0 h-full">
            <div className="absolute left-[50%] -translate-x-[50%] h-full">
              <Link href="/" className="flex flex-col items-center h-full justify-center">
                <h1 className="font-druk text-4xl">FRIDA</h1>
              </Link>
            </div>

            <div className="hidden md:block">
                  <ul className="flex gap-10 items-center h-full text-xl">
                    {menuItems.map(({ label, route }, index) => {
                      return (
                          <li key={index}>
                              <Link href={hasDropdown(label) ? '' : route}
                                    onClick={() => { activeView === label ? closeView() : setActiveView(label) }}
                                    aria-haspopup="menu"
                              className="flex gap-2 items-center w-full h-full">
                                {label}

                                {
                                  hasDropdown(label) &&
                                  (activeView === label
                                    ? <ChevronUp/>
                                    : <ChevronDown/>)
                                }
                              </Link>
                          </li>
                      )
                    })}
                  </ul>
            </div>

          </div>

          <div className="justify-end items-center gap-5 h-full hidden md:block md:flex">
            {true
              ? (
              <button>
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
            <div className="absolute  bg-theme-white  text-black w-[100vw] z-50 px-40 border-b-2 border-theme-gray">
              {
                {
                  [MenuItems.SHOP]: <ShopView closeView={closeView} categories={categories}/>,
                  [MenuItems.TRENDING]: <TrendingView closeView={closeView} trendingProducts={trendingProducts}/>,
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

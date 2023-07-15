'use client'

import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useApi from '@/lib/common/hooks/useApi/useApi'
import useAuth from '@/lib/common/hooks/useAuth/useAuth'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { type CategoryWithSubcategoriesType } from '@/types/categoryTypes'
import { Field, Form, Formik } from 'formik'
import Image from "next/image";
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  ShoppingCart as CartIcon,
  ShoppingBag as BagIcon,
  Search as SearchIcon,
  User as UserIcon
} from 'react-feather'
import constants from '@/constants/constants'
import { motion as m } from 'framer-motion'

const Header = () => {
  const { queryParams, setQueryParams } = useQueryParams()
  const searchParams = useSearchParams()
  const { user } = useLockr()
  const { signIn } = useAuth({ redirectUri: constants.APP_URL })
  const { get } = useApi()

  const [categoriesWithSubcategories, setCategoriesWithSubcategories] = useState<CategoryWithSubcategoriesType[]>([])

  async function getCategoriesWithSubcategories () {
    const categoriesWithSubcategories = await get<CategoryWithSubcategoriesType[]>('/api/category')
    setCategoriesWithSubcategories(categoriesWithSubcategories)
  }

  useEffect(() => {
    getCategoriesWithSubcategories()
  }, [])

  return (
    <div className="py-5 w-screen flex items-center justify-between px-5 bg-black h-[10vh] md:px-10">
      <div className="flex gap-10 items-center pr-5 md:pr-0">
        <m.div variants={{
          hidden: { opacity: 0, y: -75 },
          visible: { opacity: 1, y: 0 }
        }} initial="hidden" animate="visible">
          <Link href="/" className="flex flex-col items-center">
            <Image src="https://res.cloudinary.com/dliog6kq6/image/upload/v1689457765/Logo_kn5qbu.png" alt="logo" width={200} height={100}/>
          </Link>
        </m.div>

        {categoriesWithSubcategories.length > 0 &&
            <m.div variants={{
              hidden: { opacity: 0, x: -75 },
              visible: { opacity: 1, transition: { delay: 0.5 }, x: 0 }
            }} initial="hidden" animate="visible" className="hidden md:block">
              {categoriesWithSubcategories.map((categoryWithSubcategories, index) => (
                  <div key={index} className="dropdown dropdown-hover">
                    <label tabIndex={0} className="btn btn-ghost text-white btn-lg m-1"><Link href={`/search?category=${categoryWithSubcategories.category}`}>{categoryWithSubcategories.category}</Link></label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                      {categoryWithSubcategories.subcategories.map((subcategory, index) => (
                          <li key={index}><Link href={`/search?category=${categoryWithSubcategories.category}&subcategory=${subcategory}`}>{subcategory}</Link></li>
                      ))}
                    </ul>
                  </div>
              ))}
            </m.div>
        }

      </div>

      <div className="flex gap-5 items-center md:gap-10">
        <Formik
          initialValues={{ search: searchParams.get('search') ?? '' }}
          onSubmit={(formValues) => {
            const updatedQuery = {
              ...queryParams,
              page: null,
              search: formValues.search
            }
            setQueryParams(updatedQuery, '/search')
          }}
        >
          <Form>
            <div className="input-group">
              <Field
                name="search"
                type="text"
                placeholder="Search"
                className="input input-primary w-40 md:w-60"
              />
              <button className="btn btn-square btn-primary">
                <SearchIcon />
              </button>
            </div>
          </Form>
        </Formik>

        <div className="flex justify-end items-center gap-2">
          {(user == null)
            ? (
            <span>
              <button className="btn btn-outline btn-circle btn-sm btn-primary" onClick={signIn}>
                  <UserIcon size={15}/>
              </button>
            </span>
              )
            : (
            <>
              <Link href="/cart">
                <button className="btn btn-outline btn-circle btn-sm btn-primary">
                  <CartIcon size={15}/>
                </button>
              </Link>

              <Link href="/account">
                <button className="btn btn-outline btn-circle btn-sm btn-primary">
                  <UserIcon size={15}/>
                </button>
              </Link>
            </>
              )}
        </div>
      </div>
    </div>
  )
}
export default Header

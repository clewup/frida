'use client'

import { colourMap } from '@/components/Filter/utils/colourMap'
import AutoSubmit from '@/lib/common/components/AutoSubmit/AutoSubmit'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { type CategoryType } from '@/types/categoryTypes'
import { type SearchType } from '@/types/searchTypes'
import cx from 'classnames'
import { Field, Form, Formik, type FormikValues } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { type FC } from 'react'

interface FilterProps {
  categories: CategoryType[]
}

const Filter: FC<FilterProps> = ({ categories }) => {
  const searchParams = useSearchParams()
  const { queryParams, setQueryParams } = useQueryParams<SearchType>()
  const router = useRouter()

  interface FilterFormValues {
    sort: string
    colour: string
    subcategory: string
    category: string
  }

  const initialValues: FilterFormValues = {
    sort: searchParams.get('sort') ?? 'default',
    colour: searchParams.get('colour') ?? 'default',
    subcategory: searchParams.get('subcategory') ?? 'default',
    // category needs to be last for the reset to function
    category: searchParams.get('category') ?? 'default'
  }

  function onSubmit (formValues: FormikValues) {
    const reservedValues = ['default']
    let updatedQuery = queryParams

    Object.entries(formValues).forEach(([key, value]) => {
      const isNotFiltered = reservedValues.includes(value)

      // reset the subcategory search if the category is not queried
      if (updatedQuery.category == null) { updatedQuery.subcategory = null }

      // reset the subcategory search if the category is changed
      if (key === 'category' && value !== queryParams.category) {
        updatedQuery.subcategory = null
      }

      updatedQuery = {
        ...updatedQuery,
        [key]: isNotFiltered ? null : value,
        page: null
      }
    })

    setQueryParams(updatedQuery)
    router.refresh()
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
    >
      {({ handleChange, values, setFieldValue }) => {
        return (
          <Form className="flex flex-col w-full items-center justify-between rounded-md p-5 gap-5 md:gap-20">
            <div className="flex flex-col gap-5 w-full">
              {/* <p className="text-gray-400"> */}
              {/*  {searchResults.pagination.pageResults + */}
              {/*      searchResults.pagination.resultsPerPage **/}
              {/*      (searchResults.pagination.page - 1)} */}
              {/*  /{searchResults.pagination.totalResults} results */}
              {/* </p> */}

              <span className="flex flex-col gap-2">
                <label>Category</label>
                <Field name="category">
                  {() => (
                    <select
                      name="category"
                      className="px-2 py-2 focus:outline-0"
                      value={values.category}
                      onChange={handleChange}
                    >
                      <option value="default">All</option>
                      {categories.map(({ name: category, subcategories }, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
              </span>

              <span className="flex flex-col gap-2">
                <label >Subcategory</label>
                <Field name="subcategory">
                  {() => (
                      <select
                          name="subcategory"
                          className="px-2 py-2 focus:outline-0 disabled:opacity-40 disabled:cursor-not-allowed"
                          value={values.subcategory}
                          onChange={handleChange}
                          disabled={(values.category === '') || values.category === 'default'}
                      >
                        <option value="default">All</option>
                        {categories.find(({ name: category }) => category === values.category)?.subcategories.map(({ name: subcategory }, index) => (
                            <option key={index} value={subcategory}>
                              {subcategory}
                            </option>
                        ))}
                      </select>
                  )}
                </Field>
              </span>

              <span className="flex flex-col gap-2">
                <label className="label">Sort</label>
                <Field name="sort">
                  {() => (
                      <select
                          name="sort"
                          className="px-2 py-2 focus:outline-0"
                          value={values.sort}
                          onChange={handleChange}
                      >
                        <option value="default">Any</option>
                        <option value="price-asc">Price Low-High</option>
                        <option value="price-desc">Price High-Low</option>
                      </select>
                  )}
                </Field>
              </span>

              <span className="flex flex-col gap-2">
                <label >Colour</label>

                <div className="grid grid-cols-7 gap-2">
                  {Object.entries(colourMap).map(([key, value], index) => {
                    const className = `w-full aspect-square rounded-[50%] ${value}`

                    return (
                        <div key={index} className={cx('rounded-[50%] overflow-hidden w-full aspect-square transition-transform duration-300', values.colour !== 'default' && values.colour !== key ? 'scale-[0.9] opacity-75' : 'scale-[1] opacity-100')}>
                          <button className={className} onClick={() => {
                            void setFieldValue('colour', key)
                          }}/>
                        </div>
                    )
                  })}
                  <div className="rounded-[50%] overflow-hidden w-full aspect-square flex items-center justify-center">
                          <button className="text-gray-400" onClick={() => {
                            void setFieldValue('colour', 'default')
                          }}>
                            All
                          </button>
                        </div>
                </div>
              </span>
            </div>
            <AutoSubmit />
          </Form>
        )
      }}
    </Formik>
  )
}

export default Filter

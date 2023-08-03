'use client'

import AutoSubmit from '@/lib/common/components/AutoSubmit/AutoSubmit'
import useApi from '@/lib/common/hooks/useApi/useApi'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { type CategoryWithSubcategoriesType } from '@/types/categoryTypes'
import { type SearchRequestType, type SearchResponseType } from '@/types/searchTypes'
import { Field, Form, Formik, type FormikValues } from 'formik'
import { useSearchParams } from 'next/navigation'
import React, { type FC, useEffect, useState } from 'react'

interface FilterProps {
  searchResults: SearchResponseType
}

const Filter: FC<FilterProps> = ({ searchResults }) => {
  const searchParams = useSearchParams()
  const { queryParams, setQueryParams } = useQueryParams<SearchRequestType>()
  const { get } = useApi()
  const [categoriesWithSubcategories, setCategoriesWithSubcategories] = useState<CategoryWithSubcategoriesType[]>([])

  async function getCategoriesWithSubcategories () {
    const categoriesData = await get<CategoryWithSubcategoriesType[]>('/api/category')
    setCategoriesWithSubcategories(categoriesData)
  }

  useEffect(() => {
    void getCategoriesWithSubcategories()
  }, [])

  interface FilterFormValues {
    category: string
    subcategory: string
    sort: string
  }

  const initialValues: FilterFormValues = {
    category: searchParams.get('category') ?? 'default',
    sort: searchParams.get('sort') ?? 'default',
    // order is specific so that reset can occur
    subcategory: searchParams.get('subcategory') ?? 'default'
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
  }

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
    >
      {({ handleChange, values }) => {
        return (
          <Form className="flex flex-col items-center justify-between bg-theme-gray rounded-md p-2 px-5 gap-5 md:flex-row md:gap-20">
            <div className="flex flex-col gap-5 md:flex-row">
              <span className="flex gap-2 items-center">
                <label>Category</label>
                <Field name="category">
                  {() => (
                    <select
                      name="category"
                      className="border-b-[2px] border-gray-400 py-2 w-52 md:w-60 focus:outline-0"
                      value={values.category}
                      onChange={handleChange}
                    >
                      <option value="default">All</option>
                      {categoriesWithSubcategories.map((categoryWithSubcategories, index) => (
                        <option key={index} value={categoryWithSubcategories.category}>
                          {categoryWithSubcategories.category}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
              </span>
              <span className="flex gap-2 items-center">
                <label >Subcategory</label>
                <Field name="subcategory">
                  {() => (
                      <select
                          name="subcategory"
                          className="border-b-[2px] border-gray-400 py-2 w-52 md:w-60 focus:outline-0"
                          value={values.subcategory}
                          onChange={handleChange}
                          disabled={(values.category === '') || values.category === 'default'}
                      >
                        <option value="default">All</option>
                        {categoriesWithSubcategories.find((categoryWithSubcategories) => categoryWithSubcategories.category === values.category)?.subcategories.map((subcategory, index) => (
                            <option key={index} value={subcategory}>
                              {subcategory}
                            </option>
                        ))}
                      </select>
                  )}
                </Field>
              </span>
            </div>

            <div className="flex gap-5 items-center">
              <span className="flex gap-2 items-center">
                <label className="label">Sort</label>
                <Field name="sort">
                  {() => (
                    <select
                      name="sort"
                      className="border-b-[2px] border-gray-400 py-2 md:w-40 focus:outline-0"
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
              <p className="text-lg">
                {searchResults.pagination.pageResults +
                  searchResults.pagination.resultsPerPage *
                    (searchResults.pagination.page - 1)}
                /{searchResults.pagination.totalResults} results
              </p>
            </div>

            <AutoSubmit />
          </Form>
        )
      }}
    </Formik>
  )
}

export default Filter

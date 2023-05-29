'use client'

import AutoSubmit from '@/lib/common/components/AutoSubmit/AutoSubmit'
import useApi from '@/lib/common/hooks/useApi/useApi'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { type SearchResponseType } from '@/types/searchTypes'
import { Field, Form, Formik, type FormikValues } from 'formik'
import { useSearchParams } from 'next/navigation'
import React, { type FC, useEffect, useState } from 'react'
import { type Category } from '@prisma/client'

interface FilterProps {
  searchResults: SearchResponseType
}

const Filter: FC<FilterProps> = ({ searchResults }) => {
  const searchParams = useSearchParams()
  const { queryParams, setQueryParams } = useQueryParams()
  const { get } = useApi()
  const [categories, setCategories] = useState<Category[]>([])

  async function getCategories () {
    const categoriesData = await get<Category[]>('/api/category')
    setCategories(categoriesData)
  }

  useEffect(() => {
    getCategories()
  }, [])

  interface FilterFormValues {
    category: string
    sort: string
  }

  const initialValues: FilterFormValues = {
    category: searchParams.get('category') ?? 'default',
    sort: searchParams.get('sort') ?? 'default'
  }

  function onSubmit (formValues: FormikValues) {
    const reservedValues = ['default']
    let updatedQuery = queryParams

    Object.entries(formValues).forEach(([key, value]) => {
      const isNotFiltered = reservedValues.includes(value)

      updatedQuery = {
        ...updatedQuery,
        page: null,
        [key]: isNotFiltered ? null : value
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
      {({ values, handleChange }) => {
        return (
          <Form className="flex flex-col items-center justify-between bg-black rounded-md text-base-100 p-2 gap-5 md:flex-row md:gap-20">
            <div className="flex gap-5">
              <span className="form-control flex-row gap-2">
                <label className="label">Category</label>
                <Field name="category">
                  {() => (
                    <select
                      name="category"
                      className="select select-bordered w-60 text-black"
                      disabled={categories.length === 0}
                      value={values.category}
                      onChange={handleChange}
                    >
                      <option value="default">Select...</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
              </span>
            </div>

            <div className="flex gap-5 items-center">
              <span className="form-control flex-row gap-2">
                <label className="label">Sort</label>
                <Field name="sort">
                  {() => (
                    <select
                      name="sort"
                      className="select select-bordered w-44 text-black"
                      value={values.sort}
                      onChange={handleChange}
                    >
                      <option value="default">Select...</option>
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

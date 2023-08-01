'use client'

import Button from "@/components/Button/Button";
import Filter from '@/components/Filter/Filter'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import ProductCard from '@/components/ProductCard/ProductCard'
import useApi from '@/lib/common/hooks/useApi/useApi'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { type SearchRequestType, type SearchResponseType } from '@/types/searchTypes'
import cx from 'classnames'
import { useSearchParams } from 'next/navigation'
import { stringify } from 'querystring'
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'

export default function Search () {
  const { queryParams, setQueryParams } = useQueryParams()
  const searchParams = useSearchParams()
  const { get } = useApi()

  const [searchResults, setSearchResults] = useState<SearchResponseType>({
    pagination: {
      page: 1,
      pageResults: 0,
      resultsPerPage: 0,
      totalPages: 1,
      totalResults: 0
    },
    results: []
  })
  const [isLoading, setLoading] = useState(true)

  async function getFilteredProducts (query: string) {
    const searchData = await get<SearchResponseType>(`/api/search?${query}`, {
      cache: 'no-store'
    })
    setSearchResults(searchData)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const subcategory = searchParams.get('subcategory')
    const page = searchParams.get('page')
    const sort = searchParams.get('sort')

    const queryObject: SearchRequestType = {}
    if (search) queryObject.search = search
    if (category) queryObject.category = category
    if (subcategory) queryObject.subcategory = subcategory
    if (page) queryObject.page = page
    if (sort) queryObject.sort = sort

    const formattedQuery = stringify(queryObject)
    getFilteredProducts(formattedQuery)
  }, [searchParams])

  return (
    <PageWrapper className="relative flex flex-col gap-5 pb-24 min-h-screen-header">
      <Filter searchResults={searchResults} />

      {isLoading
        ? (
        <div className="w-full h-60 flex justify-center items-center">
          <TailSpin color="#111111" />
        </div>
          )
        : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {searchResults.results.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
          )}

      <div className="flex my-5 absolute bottom-0 left-[50%] -translate-x-[50%]">
        {Array.from(
          { length: searchResults.pagination.totalPages },
          (_, index) => index + 1
        ).map((pageNumber, index) => {
          return (
            <Button
              key={index}
              className={cx('aspect-square rounded-none text-black',
                  pageNumber === searchResults.pagination.page ? 'bg-theme-black' : 'bg-gray-400',
              )}
              isLoading={searchResults.pagination.page > 1 && isLoading}
              onClick={() => {
                const updatedQuery = { ...queryParams, page: pageNumber }
                setQueryParams(updatedQuery)
              }}
            >
              {pageNumber}
            </Button>
          )
        })}
      </div>
    </PageWrapper>
  )
}

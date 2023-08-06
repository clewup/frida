'use client'

import Filter from '@/components/Filter/Filter'
import Heading from '@/components/Heading/Heading'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import ProductCard from '@/components/ProductCard/ProductCard'
import useApi from '@/lib/common/hooks/useApi/useApi'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { type SearchRequestType, type SearchResponseType } from '@/types/searchTypes'
import cx from 'classnames'
import { useSearchParams } from 'next/navigation'
import { stringify } from 'querystring'
import React, { useEffect, useState } from 'react'

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
    if (search != null) queryObject.search = search
    if (category != null) queryObject.category = category
    if (subcategory != null) queryObject.subcategory = subcategory
    if (page != null) queryObject.page = page
    if (sort != null) queryObject.sort = sort

    const formattedQuery = stringify(queryObject)
    void getFilteredProducts(formattedQuery)
  }, [searchParams])

  return (
    <PageWrapper>
      <Heading className="py-20">Shop furniture</Heading>

      <div className="flex gap-5">
        <div className="w-1/5">
          <Filter searchResults={searchResults} />
        </div>

        <div className="w-4/5 h-full relative min-h-screen pb-24">
          {isLoading
            ? (
                  <></>
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
                  <button
                      key={index}
                      className={cx('rounded-none text-black w-10 aspect-square',
                        pageNumber === searchResults.pagination.page ? 'bg-theme-gray rounded-[50%]' : 'bg-theme-white'
                      )}
                      disabled={searchResults.pagination.page > 1 && isLoading}
                      onClick={() => {
                        const updatedQuery = { ...queryParams, page: pageNumber }
                        setQueryParams(updatedQuery)
                      }}
                  >
                    {pageNumber}
                  </button>
              )
            })}
          </div>
        </div>

      </div>
    </PageWrapper>
  )
}

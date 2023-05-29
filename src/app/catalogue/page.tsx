'use client'

import Filter from '@/components/Filter/Filter'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Product from '@/components/Product/Product'
import useApi from '@/lib/common/hooks/useApi/useApi'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { type SearchRequestType, type SearchResponseType } from '@/types/searchTypes'
import cx from 'classnames'
import { useSearchParams } from 'next/navigation'
import { stringify } from 'querystring'
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'

export default function Catalogue () {
  const { queryParams, setQueryParams } = useQueryParams()
  const searchParams = useSearchParams()
  const { get } = useApi()

  const [searchResults, setSearchResults] = useState<SearchResponseType>({
    results: [],
    pagination: {
      totalResults: 0,
      pageResults: 0,
      page: 1,
      totalPages: 1,
      resultsPerPage: 0
    }
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
    const page = searchParams.get('page')
    const sort = searchParams.get('sort')

    const queryObject: SearchRequestType = {}
    if (search) queryObject.search = search
    if (category) queryObject.category = category
    if (page) queryObject.page = page
    if (sort) queryObject.sort = sort

    const formattedQuery = stringify(queryObject)
    getFilteredProducts(formattedQuery)
  }, [searchParams])

  return (
    <PageWrapper className="relative flex flex-col gap-5 pb-20 min-h-screen-header">
      <Filter searchResults={searchResults} />

      {isLoading
        ? (
        <div className="w-full h-60 flex justify-center items-center">
          <TailSpin color="#111111" />
        </div>
          )
        : (
        <div className="grid grid-cols-4 gap-5">
          {searchResults.results.map((product, index) => (
            <Product product={product} key={index} />
          ))}
        </div>
          )}

      <div className="btn-group absolute bottom-0 mb-5">
        {Array.from(
          { length: searchResults.pagination.totalPages },
          (_, index) => index + 1
        ).map((pageNumber, index) => {
          return (
            <button
              key={index}
              className={cx(
                'btn',
                {
                  'btn-ghost': pageNumber !== searchResults.pagination.page
                },
                {
                  'btn-accent text-base-100':
                    pageNumber === searchResults.pagination.page
                }
              )}
              onClick={() => {
                const updatedQuery = { ...queryParams, page: pageNumber }
                setQueryParams(updatedQuery)
              }}
              disabled={searchResults.pagination.page > 1 && isLoading}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
    </PageWrapper>
  )
}

'use client'

import ProductCard from '@/components/ProductCard/ProductCard'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { type SearchResultsType } from '@/common/types/searchTypes'
import cx from 'classnames'

import React, { type FC } from 'react'

interface SearchResultsProps {
  searchResults: SearchResultsType
}

const SearchResults: FC<SearchResultsProps> = ({
  searchResults = {
    pagination: {
      page: 1,
      pageResults: 0,
      resultsPerPage: 0,
      totalPages: 1,
      totalResults: 0
    },
    results: []
  }
}) => {
  const { queryParams, setQueryParams } = useQueryParams()

  return (
        <div className="w-full h-full relative min-h-screen pb-24">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {searchResults.results.map((product, index) => (
                <ProductCard product={product} key={index} />
            ))}
          </div>

          <div className="flex my-5 absolute bottom-0 left-[50%] -translate-x-[50%]">
            {Array.from(
              { length: searchResults.pagination.totalPages },
              (_, index) => index + 1
            ).map((pageNumber, index) => {
              return (
                  <button
                      key={index}
                      className={cx('rounded-[50%] text-black w-10 aspect-square hover:bg-theme-gray transition-colors',
                        pageNumber === searchResults.pagination.page ? 'bg-theme-gray' : 'bg-theme-white'
                      )}
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
  )
}

export default SearchResults

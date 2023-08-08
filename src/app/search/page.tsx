import Filter from '@/components/Filter/Filter'
import Heading from '@/components/Heading/Heading'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import SearchResults from '@/components/SearchResults/SearchResults'
import { categoryService, productService } from '@/db/handler'
import { type PageContext } from '@/lib/common/types/nextTypes'
import React from 'react'

export default async function Search ({ searchParams }: PageContext) {
  const categories = await categoryService.getCategories()
  const searchResults = await productService.getSearchedProducts({
    search: searchParams?.search,
    category: searchParams?.category,
    subcategory: searchParams?.subcategory,
    sort: searchParams?.sort,
    colour: searchParams?.colour,
    page: searchParams?.page ?? 1
  })

  const heading = `Shop ${(searchParams?.category !== undefined ? searchParams.category : 'furniture').toLowerCase()}`

  return (
    <PageWrapper>
      <Heading className="py-20">{heading}</Heading>

      <div className="flex gap-5">
        <div className="w-1/5">
          <Filter categories={categories}/>
        </div>

        <div className="w-4/5">
          <SearchResults searchResults={searchResults}/>
        </div>
      </div>
    </PageWrapper>
  )
}

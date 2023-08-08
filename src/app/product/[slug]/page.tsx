import Heading from '@/components/Heading/Heading'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Product from '@/components/Product/Product'
import RelatedProducts from '@/components/RelatedProducts/RelatedProducts'
import { productService } from '@/db/handler'
import { type PageContext } from '@/lib/common/types/nextTypes'
import { type Metadata, type ResolvingMetadata } from 'next'
import Link from 'next/link'
import React from 'react'

export async function generateMetadata ({ params }: PageContext, parent: ResolvingMetadata): Promise<Metadata> {
  const product = await productService.getProductByName(params.slug)

  return {
    title: `Store - ${product != null ? product.name : '404'}`
  }
}

export default async function ProductSlug ({ params }: PageContext) {
  const product = await productService.getProductByName(params.slug)

  if (product === null) {
    return (
        <div className="w-full h-screen-header flex items-center justify-center">
          <div className="text-center w-1/5 bg-white rounded-md p-10">
            <Heading>404</Heading>
            <p className="mt-5">{decodeURIComponent(params.slug)} was not found.</p>
          </div>
        </div>
    )
  }

  return (
      <PageWrapper className="flex flex-col gap-5 px-20">
        <div className="text-sm">
          <ul className="flex gap-1">
            <li>
              <Link href="/search">Products</Link> {'>'}
            </li>
            <li>
              <Link href={`/search?category=${product.category.name}`}>{product.category.name}</Link> {'>'}
            </li>
            <li>
              <Link href={`/search?category=${product.category.name}&subcategory=${product.subcategory.name}`}>{product.subcategory.name}</Link>
            </li>
          </ul>
        </div>

        <Product product={product} />

        {/* @ts-expect-error Server Component */}
        <RelatedProducts product={product} />
      </PageWrapper>
  )
}

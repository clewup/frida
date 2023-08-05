import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Product from '@/components/Product/Product'
import RelatedProducts from '@/components/RelatedProducts/RelatedProducts'
import constants from '@/constants/constants'
import { type PageContext } from '@/lib/common/types/nextTypes'
import { type Category, type Product as PrismaProduct, type Subcategory } from '@prisma/client'
import { type Metadata, type ResolvingMetadata } from 'next'
import Link from 'next/link'
import React from 'react'

async function getProductById (id: number): Promise< PrismaProduct & { category: Category, subcategory: Subcategory }> {
  const productResponse = await fetch(`${constants.APP_URL}/api/product?id=${id}`, {
    method: 'GET',
    cache: 'no-store'
  })
  return await productResponse.json()
}

export async function generateMetadata ({ params }: PageContext, parent: ResolvingMetadata): Promise<Metadata> {
  const product = await getProductById(Number(params.slug))

  return {
    title: `Store - ${product.name}`
  }
}

export default async function ProductSlug ({ params }: PageContext) {
  const product = await getProductById(Number(params.slug))

  if (product === null) {
    return <p>Not found.</p>
  }

  return (
      <PageWrapper className="flex flex-col gap-5">
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
          <RelatedProducts product={product} />
      </PageWrapper>
  )
}

import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Product from '@/components/Product/Product'
import RelatedProducts from '@/components/RelatedProducts/RelatedProducts'
import constants from '@/constants/constants'
import { type PageContext } from '@/lib/common/types/nextTypes'
import { type Category, type Product as PrismaProduct } from '@prisma/client'
import { type Metadata, type ResolvingMetadata } from 'next'
import React, { Suspense } from 'react'

async function getProductById (id: number): Promise< PrismaProduct & { category: Category }> {
  const productResponse = await fetch(`${constants.APP_URL}/api/product?id=${id}`, {
    method: 'GET'
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

  if (!product) {
    return <p>Not found.</p>
  }

  return (
      <PageWrapper className="flex flex-col gap-5">
          <Product product={product} isFullProduct={true}/>
          <RelatedProducts product={product}/>
      </PageWrapper>
  )
}

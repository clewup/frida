import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Product from '@/components/Product/Product'
import constants from '@/constants/constants'
import { type PageContext } from '@/lib/common/types/nextTypes'
import { type Product as PrismaProduct } from '@prisma/client'
import React from 'react'

async function getProductById (id: number): Promise<PrismaProduct> {
  const productResponse = await fetch(`${constants.APP_URL}/api/product?id=${id}`, {
    method: 'GET'
  })
  return await productResponse.json()
}

export default async function ProductSlug ({ params }: PageContext) {
  const product = await getProductById(Number(params.slug))

  if (!product) {
    return <p>Not found.</p>
  }

  return (
      <PageWrapper>
          <Product product={product} isFullProduct={true}/>
      </PageWrapper>
  )
}

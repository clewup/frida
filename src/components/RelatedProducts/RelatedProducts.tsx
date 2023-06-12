'use client'

import Product from '@/components/Product/Product'
import useApi from '@/lib/common/hooks/useApi/useApi'
import { type Category, type Product as PrismaProduct, type Subcategory } from '@prisma/client'
import React, { type FC, useEffect, useState } from 'react'

interface RelatedProductsProps {
  product: PrismaProduct & { category: Category, subcategory: Subcategory }
}

const RelatedProducts: FC<RelatedProductsProps> = ({ product }) => {
  const { get } = useApi()

  const [products, setProducts] = useState<Array<PrismaProduct & { category: Category, subcategory: Subcategory }>>([])

  async function getRelatedProducts () {
    const products = await get<Array<PrismaProduct & { category: Category, subcategory: Subcategory }>>(`/api/product?subcategory=${product.subcategory.name}`)
    setProducts(products.filter((prod) => prod.id !== product.id).slice(0, 5))
  }

  useEffect(() => {
    getRelatedProducts()
  }, [product])

  return (
      <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold md:text-5xl">RELATED PRODUCTS</h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
              {products.map((product, index) => (<Product key={index} product={product}/>))}
          </div>
      </div>
  )
}

export default RelatedProducts

import Heading from '@/components/Heading/Heading'
import ProductCard from '@/components/ProductCard/ProductCard'
import { productService } from '@/db/handler'
import { type ProductType } from '@/types/productTypes'
import React from 'react'

interface RelatedProductsProps {
  product: ProductType
}

export default async function RelatedProducts ({ product }: RelatedProductsProps) {
  const relatedProducts = await productService.getProductsBySubcategory(product.subcategory.name)

  return (
      <div className="flex flex-col gap-5">
          <Heading className="py-10">You might also like</Heading>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
              {relatedProducts.map((product, index) => (<ProductCard key={index} product={product}/>))}
          </div>
      </div>
  )
}

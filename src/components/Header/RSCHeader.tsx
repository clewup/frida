import { categoryService, productService } from '@/common/db/handler'
import React from 'react'
import Header from './Header'

export default async function RSCHeader () {
  const categories = await categoryService.getCategories()
  const trendingProducts = await productService.getTrendingProducts()

  return <Header categories={categories} trendingProducts={trendingProducts}/>
}

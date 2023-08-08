import { categoryService, productService } from '@/db/handler'
import React from 'react'
import Header from './Header'

export default async function RSCHeader () {
  const categories = await categoryService.getCategories()
  const trendingProducts = await productService.getTrendingProducts()

  return <Header categories={categories} trendingProducts={trendingProducts}/>
}

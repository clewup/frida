'use client'

import useApi from '@/lib/common/hooks/useApi/useApi'
import { type ProductType } from '@/types/productTypes'
import { useEffect, useState } from 'react'

export default function useTrendingProducts () {
  const { get } = useApi()

  const [trendingProducts, setTrendingProducts] = useState<ProductType[]>([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    setLoading(true)
    get<ProductType[]>('/api/product?trending=true')
      .then((res) => { setTrendingProducts(res) })
      .catch((err) => { setError(err) })
      .finally(() => { setLoading(false) })
  }, [])

  return {
    trendingProducts,
    isLoading,
    error
  }
}

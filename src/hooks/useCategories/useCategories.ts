'use client'

import useApi from '@/lib/common/hooks/useApi/useApi'
import { type CategoryType } from '@/types/categoryTypes'
import { useEffect, useState } from 'react'

export default function useCategories () {
  const { get } = useApi()

  const [categories, setCategories] = useState<CategoryType[]>([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    setLoading(true)
    get<CategoryType[]>('/api/category')
      .then((res) => { setCategories(res) })
      .catch((err) => { setError(err) })
      .finally(() => { setLoading(false) })
  }, [])

  return {
    categories,
    isLoading,
    error
  }
}

import { categoryService } from '@/db/handler'
import { type NextRequest, NextResponse as response } from 'next/server'

export async function GET (request: NextRequest) {
  const categories = await categoryService.getCategories()
  return response.json(categories)
}

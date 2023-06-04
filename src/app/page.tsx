import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Product from '@/components/Product/Product'
import Testimonial from '@/components/Testimonial/Testimonial'
import constants from '@/constants/constants'
import { type TestimonialType } from '@/types/testimonialTypes'
import { type Category, type Product as PrismaProduct } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { Users as UsersIcon } from 'react-feather'

async function getProducts (): Promise<PrismaProduct[]> {
  const productsResponse = await fetch(`${constants.APP_URL}/api/product`)
  return await productsResponse.json()
}

async function getCategories (): Promise<Category[]> {
  const productsResponse = await fetch(`${constants.APP_URL}/api/category`)
  return await productsResponse.json()
}

const mockTestimonials: TestimonialType[] = [
  {
    name: 'User 1',
    image: 'https://res.cloudinary.com/dliog6kq6/image/upload/v1684696514/xqlrb2zgkwc77a53zbyr.png',
    review: 'Super cool',
    rating: 4
  },
  {
    name: 'User 1',
    image: 'https://res.cloudinary.com/dliog6kq6/image/upload/v1684696514/xqlrb2zgkwc77a53zbyr.png',
    review: 'Super cool',
    rating: 5
  },
  {
    name: 'User 1',
    image: 'https://res.cloudinary.com/dliog6kq6/image/upload/v1684696514/xqlrb2zgkwc77a53zbyr.png',
    review: 'Super cool',
    rating: 4
  }
]

export default async function Home () {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <PageWrapper className="min-h-screen-header flex flex-col gap-20">
      <div className="flex flex-col gap-5">
        <h1 className="text-6xl font-bold text-center">TOP SELLERS</h1>
        <div className="grid grid-cols-4 gap-5">
          {products.splice(0, 4).map((product, index) => (
              <Product product={product} key={index} />
          ))}
        </div>
      </div>

      <div className={`grid grid-cols-${categories.length} gap-5 h-60`}>
        {categories.map((category, index) => (
            <Link href={`/catalogue?category=${category.name}`} key={index} className="border-[1px] border-primary rounded-md p-10 flex flex-col items-center justify-center">
              <h1 className="uppercase text-4xl">{category.name}</h1>
            </Link>
        ))}
      </div>

      <div className="flex flex-col gap-5 bg-primary rounded-md p-5">
        <span className="flex gap-5 items-center text-base-100 justify-center">
        <h1 className="text-6xl font-bold text-base-100">TESTIMONIALS </h1>
          <UsersIcon size={55}/>
        </span>
        <div className="grid grid-cols-3 gap-20">
          {mockTestimonials.map((testimonial, index) => (<Testimonial key={index} testimonial={testimonial}/>))}
        </div>
      </div>

    </PageWrapper>
  )
}

import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Product from '@/components/Product/Product'
import Promotion from '@/components/Promotion/Promotion'
import Testimonial from '@/components/Testimonial/Testimonial'
import constants from '@/constants/constants'
import { type TestimonialType } from '@/types/testimonialTypes'
import { type Category, type Product as PrismaProduct } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

async function getLatestProducts () {
  const productsResponse = await fetch(`${constants.APP_URL}/api/product?latest=true`)
  return await productsResponse.json() as PrismaProduct[]
}

async function getCategories () {
  const productsResponse = await fetch(`${constants.APP_URL}/api/category`)
  return await productsResponse.json() as Category[]
}

export default async function Home () {
  const latestProducts = await getLatestProducts()
  const categories = await getCategories()

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

  return (
    <PageWrapper>
      <Promotion/>

      <div className="flex flex-col gap-20 mt-10">
        <div className="flex flex-col gap-5">
          <h1 className="text-9xl font-bold">JUST DROPPED</h1>
          <div className="grid grid-cols-4 gap-5">
            {latestProducts.splice(0, 4).map((product, index) => (
                <Product product={product} key={index} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-9xl font-bold">BROWSE BY CATEGORY</h1>

          <div className={`grid grid-cols-${categories.length} gap-5 h-60`}>
            {categories.map((category, index) => (
                <Link href={`/search?category=${category.name}`} key={index} className="border-[1px] border-primary rounded-md p-10 flex flex-col items-center justify-center">
                  <h1 className="uppercase text-4xl">{category.name}</h1>
                </Link>
            ))}
          </div>
        </div>

        <div className="bg-primary rounded-md p-5">
          <div className="grid grid-cols-3 gap-20">
            {mockTestimonials.map((testimonial, index) => (<Testimonial key={index} testimonial={testimonial}/>))}
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

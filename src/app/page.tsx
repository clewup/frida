import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Product from '@/components/Product/Product'
import Promotion from '@/components/Promotion/Promotion'
import Testimonial from '@/components/Testimonial/Testimonial'
import constants from '@/constants/constants'
import { type CategoryWithSubcategoriesType } from '@/types/categoryTypes'
import { type TestimonialType } from '@/types/testimonialTypes'
import { type Category, type Product as PrismaProduct, type Subcategory } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function getLatestProducts (): Promise<Array<PrismaProduct & { category: Category, subcategory: Subcategory }>> {
  const productsResponse = await fetch(`${constants.APP_URL}/api/product?latest=true`, {
    cache: 'no-store'
  })
  return await productsResponse.json()
}

async function getCategoriesWithSubcategories (): Promise<CategoryWithSubcategoriesType[]> {
  const productsResponse = await fetch(`${constants.APP_URL}/api/category`)
  return await productsResponse.json()
}

export default async function Home () {
  const latestProducts = await getLatestProducts()
  const categoriesWithSubcategories = await getCategoriesWithSubcategories()

  const mockTestimonials: TestimonialType[] = [
    {
      name: 'Olivia Bennett',
      image: 'https://res.cloudinary.com/dliog6kq6/image/upload/v1686525461/olivia_ycexg8.avif',
      review: 'This luxury bath/skincare brand is an absolute game-changer, leaving my skin nourished, hydrated, and glowing like never before!',
      rating: 4
    },
    {
      name: 'Marcus Sullivan',
      image: 'https://res.cloudinary.com/dliog6kq6/image/upload/v1686525675/marcus_afoq3x.avif',
      review: 'I\'ve tried countless skincare brands, but this luxury bath/skincare brand exceeded all expectations, giving my skin a renewed vitality and a silky-smooth texture.',
      rating: 5
    },
    {
      name: 'Emily Anderson',
      image: 'https://res.cloudinary.com/dliog6kq6/image/upload/v1686525778/emily_rr3whw.avif',
      review: 'I\'m a skincare enthusiast, and let me tell you, this luxury bath/skincare brand is a true gem. Its innovative formulas have transformed my skincare routine, leaving my complexion radiant and youthful.',
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

          <div className={`grid grid-cols-${categoriesWithSubcategories.length} gap-5 h-60`}>
            {categoriesWithSubcategories.map((categoryWithSubcategories, index) => (
                <Link href={`/search?category=${categoryWithSubcategories.category}`} key={index} className="relative border-[1px] rounded-md p-10 flex flex-col items-center justify-center">
                  <h1 className="uppercase text-5xl text-white font-bold z-10">{categoryWithSubcategories.category}</h1>
                  <Image src={categoryWithSubcategories.image} alt={categoryWithSubcategories.category} fill={true} className="absolute object-cover z-0 rounded-md"/>
                  <div className="absolute inset-0 bg-secondary opacity-80"></div>
                </Link>
            ))}
          </div>
        </div>

        <div className="bg-primary rounded-md p-5">
          <div className="grid grid-cols-3 gap-20">
            {mockTestimonials.map((testimonial, index) => (<Testimonial key={index} testimonial={testimonial}/>))}
          </div>
          <p className="text-sm">* Fictional testimonials</p>
        </div>
      </div>
    </PageWrapper>
  )
}

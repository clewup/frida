import Hero from "@/components/Hero/Hero";
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import ProductCard from '@/components/ProductCard/ProductCard'
import Testimonial from '@/components/Testimonial/Testimonial'
import constants from '@/constants/constants'
import { type CategoryWithSubcategoriesType } from '@/types/categoryTypes'
import { type TestimonialType } from '@/types/testimonialTypes'
import { type Category as PrismaCategory, type Product as PrismaProduct, type Subcategory } from '@prisma/client'
import React from 'react'
import Category from '@/components/Category/Category'

async function getLatestProducts (): Promise<Array<PrismaProduct & { category: PrismaCategory, subcategory: Subcategory }>> {
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
  const categories = await getCategoriesWithSubcategories()

  const mockTestimonials: TestimonialType[] = [
    {
      image: 'https://res.cloudinary.com/dliog6kq6/image/upload/v1686525461/olivia_ycexg8.avif',
      name: 'Olivia Bennett',
      rating: 4,
      review: 'Squeaky Clean is an absolute game-changer, leaving my skin nourished, hydrated, and glowing like never before!'
    },
    {
      image: 'https://res.cloudinary.com/dliog6kq6/image/upload/v1686525675/marcus_afoq3x.avif',
      name: 'Marcus Sullivan',
      rating: 5,
      review: 'I\'ve tried countless skincare brands, but Squeaky Clean exceeded all expectations, giving my skin a renewed vitality and a silky-smooth texture.'
    },
    {
      image: 'https://res.cloudinary.com/dliog6kq6/image/upload/v1686525778/emily_rr3whw.avif',
      name: 'Emily Anderson',
      rating: 4,
      review: 'I\'m a skincare enthusiast, and let me tell you, Squeaky Clean is a true gem. Its innovative formulas have transformed my skincare routine, leaving my complexion radiant and youthful.'
    }
  ]

  return (
    <PageWrapper>
      <Hero/>

      <div className="flex flex-col gap-20 mt-10">
        <div className="flex flex-col gap-10">

          <div className="flex flex-col items-center gap-5">
            <p className="text-xl underline">JUST DROPPED</p>
            <p className="text-5xl">Our new arrivals</p>
          </div>


          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {latestProducts.splice(0, 4).map((product, index) => (
                <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center">
            <p className="text-xl underline">SHOP BY CATEGORY</p>
          </div>

          <div className={`grid grid-cols-1 gap-5 md:grid-cols-${categories.length} min-h-[50vh] items-center`}>
            {categories.map((category, index) => (
                <Category key={index} category={category} className="odd:h-full even:h-[80%]"/>
            ))}
          </div>
        </div>

        <div className="bg-base-200 rounded-md py-20 px-5 flex flex-col gap-10 relative overflow-hidden">
          <h1 className="text-5xl pl-40 font-semibold">Happy customers</h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-20">
            {mockTestimonials.map((testimonial, index) => (<Testimonial key={index} testimonial={testimonial}/>))}
          </div>
          <p className="text-sm">* Fictional testimonials</p>

          <h1 className="absolute -bottom-9 left-[50%] -translate-x-[50%] text-9xl font-bold whitespace-nowrap text-base-300">customer reviews</h1>
        </div>
      </div>
    </PageWrapper>
  )
}

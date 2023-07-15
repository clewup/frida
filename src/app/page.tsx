import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Product from '@/components/Product/Product'
import Promotion from '@/components/Promotion/Promotion'
import Testimonial from '@/components/Testimonial/Testimonial'
import constants from '@/constants/constants'
import FallingText from '@/lib/framer-motion/components/FallingText'
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
  const categoriesWithSubcategories = await getCategoriesWithSubcategories()

  const mockTestimonials: TestimonialType[] = [
    {
      image: 'https://res.cloudinary.com/dliog6kq6/image/upload/v1686525461/olivia_ycexg8.avif',
      name: 'Olivia Bennett',
      rating: 4,
      review: 'This luxury bath/skincare brand is an absolute game-changer, leaving my skin nourished, hydrated, and glowing like never before!'
    },
    {
      image: 'https://res.cloudinary.com/dliog6kq6/image/upload/v1686525675/marcus_afoq3x.avif',
      name: 'Marcus Sullivan',
      rating: 5,
      review: 'I\'ve tried countless skincare brands, but this luxury bath/skincare brand exceeded all expectations, giving my skin a renewed vitality and a silky-smooth texture.'
    },
    {
      image: 'https://res.cloudinary.com/dliog6kq6/image/upload/v1686525778/emily_rr3whw.avif',
      name: 'Emily Anderson',
      rating: 4,
      review: 'I\'m a skincare enthusiast, and let me tell you, this luxury bath/skincare brand is a true gem. Its innovative formulas have transformed my skincare routine, leaving my complexion radiant and youthful.'
    }
  ]

  return (
    <PageWrapper>
      <Promotion/>

      <div className="flex flex-col gap-20 mt-10">
        <div className="flex flex-col gap-5">
          <FallingText className="text-4xl font-bold md:text-9xl">JUST DROPPED</FallingText>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {latestProducts.splice(0, 4).map((product, index) => (
                <Product product={product} key={index} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold md:text-9xl">BROWSE BY CATEGORY</h1>

          <div className={`grid grid-cols-1 gap-5 md:grid-cols-${categoriesWithSubcategories.length}`}>
            {categoriesWithSubcategories.map((categoryWithSubcategories, index) => (
                <Category key={index} categoryWithSubcategories={categoryWithSubcategories}/>
            ))}
          </div>
        </div>

        <div className="bg-primary rounded-md p-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-20">
            {mockTestimonials.map((testimonial, index) => (<Testimonial key={index} testimonial={testimonial}/>))}
          </div>
          <p className="text-sm">* Fictional testimonials</p>
        </div>
      </div>
    </PageWrapper>
  )
}

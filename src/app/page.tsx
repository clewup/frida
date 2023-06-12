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
          <FallingText className="text-9xl font-bold">JUST DROPPED</FallingText>

          <div className="grid grid-cols-4 gap-5">
            {latestProducts.splice(0, 4).map((product, index) => (
                <Product product={product} key={index} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-9xl font-bold">BROWSE BY CATEGORY</h1>

          <div className={`grid grid-cols-${categoriesWithSubcategories.length} gap-5`}>
            {categoriesWithSubcategories.map((categoryWithSubcategories, index) => (
                <Category key={index} categoryWithSubcategories={categoryWithSubcategories}/>
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

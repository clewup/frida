import Heading from '@/components/Heading/Heading'
import Hero from '@/components/Hero/Hero'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import ProductCard from '@/components/ProductCard/ProductCard'
import ServiceBenefits from '@/components/ServiceBenefits/ServiceBenefits'
import Testimonial from '@/components/Testimonial/Testimonial'
import { categoryService, productService } from '@/db/handler'
import { type TestimonialType } from '@/types/testimonialTypes'
import React from 'react'
import Category from '@/components/Category/Category'

export default async function Home () {
  const spotlightedProducts = await productService.getSpotlightedProducts([12, 19, 27])
  const latestProducts = await productService.getLatestProducts()
  const categories = await categoryService.getCategories()
  const trendingProducts = await productService.getTrendingProducts()

  const mockTestimonials: TestimonialType[] = [
    {
      image: 'https://res.cloudinary.com/dliog6kq6/image/upload/v1686525461/olivia_ycexg8.avif',
      name: 'Olivia Bennett',
      rating: 4,
      review: 'Wow! The furniture store of dreams! Stylish selection, fantastic prices, and top-notch service. My living room is now magazine-worthy! A must-visit for every home decorator. 5 stars!"'
    },
    {
      image: 'https://res.cloudinary.com/dliog6kq6/image/upload/v1686525675/marcus_afoq3x.avif',
      name: 'Marcus Sullivan',
      rating: 5,
      review: 'Best furniture shopping experience ever! I found my perfect dining set in no time. The staff was incredibly helpful, and the quality is unmatched. This store nailed it! Highly recommended!'
    },
    {
      image: 'https://res.cloudinary.com/dliog6kq6/image/upload/v1686525778/emily_rr3whw.avif',
      name: 'Emily Anderson',
      rating: 4,
      review: '5/5 for this gem of a furniture store! From cozy couches to elegant bedroom sets, they\'ve got it all. Plus, the delivery was a breeze. Say goodbye to bland decor – this place transforms your space into pure bliss!'
    }
  ]

  return (
    <PageWrapper>
      <Hero spotlightedProducts={spotlightedProducts}/>

      <ServiceBenefits/>

      <div className="flex flex-col gap-20">
         <div className="flex flex-col gap-10">
          <Heading>
            Trending products
          </Heading>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {trendingProducts.splice(0, 4).map((product, index) => (
                <ProductCard product={product} key={index} />
            ))}
          </div>
         </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-center">
            <p className="text-xl text-gray-400">Shop by category</p>
          </div>

          <div className={`grid grid-cols-1 gap-5 md:grid-cols-${categories.length} min-h-[50vh] items-center`}>
            {categories.map((category, index) => (
                <Category key={index} category={category} className="odd:h-full even:h-[80%]"/>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <Heading>
            Fresh arrivals
          </Heading>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {latestProducts.splice(0, 4).map((product, index) => (
                <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>

        <div className="bg-theme-gray rounded-md py-20 px-5 flex flex-col gap-10 relative overflow-hidden">
          <Heading className="absolute left-40">Happy customers</Heading>
          <div className="grid grid-cols-1 gap-5 mt-20 md:grid-cols-3 md:gap-20">
            {mockTestimonials.map((testimonial, index) => (<Testimonial key={index} testimonial={testimonial}/>))}
          </div>
          <p className="text-sm">* Fictional testimonials</p>

          <h1 className="absolute -bottom-9 left-[50%] -translate-x-[50%] text-9xl font-bold whitespace-nowrap opacity-10">customer reviews</h1>
        </div>
      </div>
    </PageWrapper>
  )
}

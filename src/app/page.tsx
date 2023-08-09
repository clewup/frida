import Heading from '@/components/Heading/Heading'
import Hero from '@/components/Hero/Hero'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import ProductCard from '@/components/ProductCard/ProductCard'
import ServiceBenefits from '@/components/ServiceBenefits/ServiceBenefits'
import Testimonial from '@/components/Testimonial/Testimonial'
import { categoryService, productService, testimonialService } from '@/db/handler'
import React from 'react'
import Category from '@/components/Category/Category'

export default async function Home () {
  const spotlightedProducts = await productService.getSpotlightedProducts([12, 19, 27])
  const latestProducts = await productService.getLatestProducts()
  const categories = await categoryService.getCategories()
  const trendingProducts = await productService.getTrendingProducts()
  const testimonials = await testimonialService.getTestimonials()

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
          <div className="grid grid-cols-1 gap-5 my-20 md:grid-cols-3 md:gap-10">
            {testimonials.map((testimonial, index) => (<Testimonial key={index} testimonial={testimonial}/>))}
          </div>

          <h1 className="absolute -bottom-9 left-[50%] -translate-x-[50%] text-9xl font-bold whitespace-nowrap opacity-10">customer reviews</h1>
        </div>
      </div>
    </PageWrapper>
  )
}

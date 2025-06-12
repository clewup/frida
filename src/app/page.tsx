import {Heading} from '@/components/heading'
import {Hero} from '@/components/hero'
import {PageWrapper} from '@/components/page-wrapper'
import {ProductCard} from '@/components/product-card'
import {ServiceBenefits} from '@/components/service-benefits'
import {Testimonial} from '@/components/testimonial'
import React from 'react'
import {Category} from '@/components/category'
import getTrendingProducts from "@/actions/get-trending-products";
import getCategories from "@/actions/get-categories";
import getLatestProducts from "@/actions/get-latest-products";
import getTestimonials from "@/actions/get-testimonials";
import getProductByIds from "@/actions/get-products-by-ids";

export default async function Home() {
    const spotlightedProducts = await getProductByIds([19, 27, 41])
    const latestProducts = await getLatestProducts()
    const categories = await getCategories()
    const trendingProducts = await getTrendingProducts()
    const testimonials = await getTestimonials()

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
                            <ProductCard product={product} key={`trending_${index}`}/>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-10">
                    <div className="flex flex-col items-center">
                        <p className="text-xl text-gray-400">Shop by category</p>
                    </div>

                    <div className={'grid grid-cols-1 gap-5 md:grid-cols-3 min-h-[70vh] items-center'}>
                        {categories.map((category, index) => (
                            <Category key={`category_${index}`} category={category}
                                      className="h-[30vh] md:odd:h-full md:even:h-[80%]"/>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-10">
                    <Heading>
                        Fresh arrivals
                    </Heading>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                        {latestProducts.splice(0, 4).map((product, index) => (
                            <ProductCard product={product} key={`fresh_${index}`}/>
                        ))}
                    </div>
                </div>

                <div className="bg-banner-mint rounded-md py-20 px-5 flex flex-col gap-10 relative overflow-hidden">
                    <Heading className="md:absolute md:left-40">Happy customers</Heading>
                    <div className="grid grid-cols-1 gap-5 my-20 md:grid-cols-3 md:gap-10">
                        {testimonials.map((testimonial, index) => (
                            <Testimonial key={`testimonial_${index}`} testimonial={testimonial}/>))}
                    </div>

                    <h1 className="absolute -bottom-9 left-[50%] -translate-x-[50%] text-9xl font-bold whitespace-nowrap opacity-10">customer
                        reviews</h1>
                </div>
            </div>
        </PageWrapper>
    )
}

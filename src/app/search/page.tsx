import {ProductFilters} from '@/components/product-filters/product-filters'
import {ProductsList} from '@/components/products-list'
import React, {Suspense} from 'react'
import getCategories from "@/actions/get-categories";
import {Skeleton} from '@/components/ui/skeleton'
import getProducts from "@/actions/get-products";

export default async function ProductsPage() {
    const categories = await getCategories()
    const products = await getProducts()

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
                <div className="lg:col-span-2">
                    <Suspense fallback={<FiltersSkeleton/>}>
                        <ProductFilters categories={categories}/>
                    </Suspense>
                </div>

                <div className="lg:col-span-10">
                    <Suspense fallback={<ProductsSkeleton/>}>
                        <ProductsList products={products}/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

function FiltersSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <Skeleton className="h-4 w-20"/>
                <div className="space-y-2">
                    {Array.from({length: 4}).map((_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-4"/>
                            <Skeleton className="h-4 w-24"/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="space-y-3">
                <Skeleton className="h-4 w-16"/>
                <div className="space-y-2">
                    {Array.from({length: 3}).map((_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <Skeleton className="h-4 w-4"/>
                            <Skeleton className="h-4 w-20"/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function ProductsSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32"/>
                <Skeleton className="h-10 w-40"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({length: 6}).map((_, i) => (
                    <div key={i} className="space-y-3">
                        <Skeleton className="aspect-square w-full"/>
                        <Skeleton className="h-4 w-3/4"/>
                        <Skeleton className="h-4 w-1/2"/>
                        <Skeleton className="h-4 w-1/4"/>
                    </div>
                ))}
            </div>
        </div>
    )
}
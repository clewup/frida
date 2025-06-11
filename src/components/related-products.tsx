import {Heading} from '@/components/heading'
import {ProductCard} from '@/components/product-card'
import {type ProductType} from '@/common/types/productTypes'
import React from 'react'
import getProductsBySubcategory from "@/actions/get-products-by-subcategory";

interface Props {
    product: ProductType
}

export async function RelatedProducts({product}: Props) {
    const relatedProducts = await getProductsBySubcategory(product.subcategory.name)

    return (
        <div className="flex flex-col gap-5">
            <Heading className="py-10">you might also like</Heading>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
                {relatedProducts.map((product, index) => (<ProductCard key={index} product={product}/>))}
            </div>
        </div>
    )
}

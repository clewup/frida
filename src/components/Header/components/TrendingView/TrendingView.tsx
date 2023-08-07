import ProductCard from '@/components/ProductCard/ProductCard'
import { type ProductType } from '@/types/productTypes'
import React, { type FC } from 'react'

interface TrendingViewProps {
  closeView: () => void
  trendingProducts: ProductType[]
}

const TrendingView: FC<TrendingViewProps> = ({ closeView, trendingProducts }) => {
  return (
        <ul className="flex flex-col gap-3 py-10" onMouseLeave={closeView}>
            <div className="grid grid-cols-5 gap-10">
                {trendingProducts?.slice(0, 5).map((product, index) => (
                    <ProductCard key={index} product={product} showAddToCartButton={false}/>
                ))}
            </div>
        </ul>
  )
}

export default TrendingView

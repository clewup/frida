import { type CategoryWithSubcategoriesType } from '@/types/categoryTypes'
import Image from 'next/image'
import Link from 'next/link'
import React, { type FC } from 'react'

interface ShopViewProps {
  closeView: () => void
  categories: CategoryWithSubcategoriesType[]
}

const ShopSection: FC<ShopViewProps> = ({ closeView, categories }) => {
  return (
            <ul className="flex flex-col gap-3" onMouseLeave={closeView}>
                <div className="grid grid-cols-5 gap-10">
                    {categories.map(({ category, subcategories, image }, index) =>
                      (<li key={index}>
                            <div className="flex flex-col gap-5 items-center w-full border-b-[2px] border-theme-gray pb-2 relative">
                                <div className="w-full aspect-video relative overflow-hidden">
                                    <Image src={image} alt={category} fill={true} className="object-cover transition-transform duration-1000 hover:scale-[1.2]"/>
                                </div>

                                <div className="flex flex-col justify-between w-full">
                                    <div className="flex w-full justify-between">
                                        <h3>{category}</h3>
                                        <Link href={`/search?category=${category}`} onClick={closeView}>
                                            <p className="text-gray-400">View all</p>
                                        </Link>
                                    </div>

                                    {subcategories.map((subcategory, index) => (
                                        <Link key={index} href={`/search?category=${category}&subcategory=${subcategory}`} onClick={closeView}>
                                            <h2 className="text-gray-400">{subcategory}</h2>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                        </li>)
                    )}
                </div>
            </ul>
  )
}

export default ShopSection

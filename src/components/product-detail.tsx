'use client'

import {type ProductType} from '@/common/types/productTypes'
import React, {type FC} from 'react'
import {IconMinus, IconPackage, IconPlus} from "@tabler/icons-react";

interface Props {
    product: ProductType
}

export const ProductDetail: FC<Props> = ({product}) => {
    const {description, image, name, price, stock} = product

    interface ProductFormValues {
        quantity: number
    }

    const initialValues: ProductFormValues = {
        quantity: 1
    }

    return (
        <div className="bg-white rounded-md flex flex-col w-full md:flex-row">
            <div className="p-10 md:w-1/2">
                <img src={image} alt={name} className="rounded-md"/>
            </div>
            <div className="flex flex-col justify-between p-10 md:w-1/2">
                <div className="text-center lowercase">
                    <h1 className="text-3xl h-20">{name}</h1>
                    <div className="p-2">
                        <p>{description}</p>
                    </div>
                </div>

                <div className="border-y-2 p-4">
                        <span className="flex gap-5 justify-center">
                            <IconPackage/>
                            <p>free shipping over £30!</p>
                        </span>
                </div>

                <div className="p-10 flex flex-col justify-between items-center gap-5 md:gap-0 md:flex-row ">
                    <p className="text-3xl">£{price}</p>
                    {stock > 0
                        ? (
                            <div className="flex h-full gap-10">
                                <div className="flex border-theme-gray border-[2px] rounded-md h-full px-2">
                                    <button type="button">
                                        <IconMinus size={20} className="text-gray-400"/>
                                    </button>
                                    <button type="button">
                                        <IconPlus size={20} className="text-gray-400"/>
                                    </button>
                                </div>

                                <div>
                                    {/*<AddToCartButton product={product}/>*/}
                                </div>
                            </div>

                        )
                        : (
                            <p>Out of stock</p>
                        )}
                </div>
            </div>
        </div>
    )
}

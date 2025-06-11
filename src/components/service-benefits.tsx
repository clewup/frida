'use client'

import React from 'react'
import {IconMessage, IconPackage, IconShoppingCart, IconTag} from "@tabler/icons-react";

export const ServiceBenefits = () => {
    return (
        <div className="flex justify-center items-center md:px-40 py-20">
            <div className="flex flex-col gap-5 w-fit md:flex-row md:gap-20">
                <div className="flex gap-5 items-center">
                    <IconPackage size={40}/>
                    <div>
                        <h1 className="text-xl">free shipping</h1>
                        <p className="text-gray-400 text-lg">standard shipping</p>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <IconTag size={40}/>
                    <div>
                        <h1 className="text-xl">selected discounts</h1>
                        <p className="text-gray-400 text-lg">guaranteed savings</p>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <IconShoppingCart size={40}/>
                    <div>
                        <h1 className="text-xl">buyers protection</h1>
                        <p className="text-gray-400 text-lg">secure payment</p>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <IconMessage size={40}/>
                    <div>
                        <h1 className="text-xl">customer service</h1>
                        <p className="text-gray-400 text-lg">give us feedback</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

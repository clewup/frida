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
                        <h1 className="text-xl">Free shipping</h1>
                        <p className="text-gray-400 text-lg">Standard shipping</p>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <IconTag size={40}/>
                    <div>
                        <h1 className="text-xl">Selected discounts</h1>
                        <p className="text-gray-400 text-lg">Guaranteed savings</p>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <IconShoppingCart size={40}/>
                    <div>
                        <h1 className="text-xl">Buyers protection</h1>
                        <p className="text-gray-400 text-lg">Secure payment</p>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <IconMessage size={40}/>
                    <div>
                        <h1 className="text-xl">Customer service</h1>
                        <p className="text-gray-400 text-lg">Give us feedback</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

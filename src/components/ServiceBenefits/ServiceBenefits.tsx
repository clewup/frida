'use client'

import React from 'react'
import { MessageSquare, Package, ShoppingCart, Tag } from 'react-feather'

const ServiceBenefits = () => {
  return (
        <div className="flex justify-center items-center md:px-40 py-20">
            <div className="flex flex-col gap-5 w-fit md:flex-row md:gap-20">
                <div className="flex gap-5 items-center">
                    <Package size={40}/>
                    <div>
                        <h1 className="text-2xl">Free shipping</h1>
                        <p className="text-gray-400 text-xl">Standard shipping</p>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <Tag size={40}/>
                    <div>
                        <h1 className="text-2xl">Selected discounts</h1>
                        <p className="text-gray-400 text-xl">Guaranteed savings</p>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <ShoppingCart size={40}/>
                    <div>
                        <h1 className="text-2xl">Buyers protection</h1>
                        <p className="text-gray-400 text-xl">Secure payment</p>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    <MessageSquare size={40}/>
                    <div>
                        <h1 className="text-2xl">Customer service</h1>
                        <p className="text-gray-400 text-xl">Give us feedback</p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ServiceBenefits

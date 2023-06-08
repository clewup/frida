import React from 'react'
import { Package } from 'react-feather'

const Promotion = () => {
  return (
        <div>
            <div className="flex items-center gap-5">
                <span className="w-1/2 text-center bg-primary text-base-100 text-xl rounded-tl-md py-2">
                    <p>New here? Get 10% off everything</p>
                    <p>with code: NEWHERE</p>
                </span>
                <span className="w-1/2 flex gap-2 items-center">
                    <Package/>
                    <p className="text-2xl">FREE SHIPPING ON ORDERS OVER £30!</p>
                </span>
            </div>
            <div className="text-center py-20 bg-secondary text-base-100 rounded-bl-md rounded-br-md">
                <h1 className="font-bold text-5xl">20% OFF SELECTED PRODUCTS</h1>
                <p className="text-3xl">with code: PROMO20</p>
            </div>
        </div>
  )
}

export default Promotion

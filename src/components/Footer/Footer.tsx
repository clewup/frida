'use client'

import Link from 'next/link'
import React from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import PaymentIcon from 'react-payment-icons'

const Footer = () => {
  return (
        <div>
            <div className="flex justify-center py-2">
                <PaymentIcon id="visa"
                             style={{ margin: 10, width: 50 }}
                             className="payment-icon" />
                <PaymentIcon id="mastercard"
                             style={{ margin: 10, width: 50 }}
                             className="payment-icon" />
                <PaymentIcon id="paypal"
                             style={{ margin: 10, width: 50 }}
                             className="payment-icon" />
            </div>
            <div className="px-40 py-5 bg-base-200 flex justify-between">
                <span className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">Help and Information</h1>
                    <Link href="/" >Support</Link>
                    <Link href="/" >Track your order</Link>
                    <Link href="/" >Delivery and returns</Link>
                </span>
                <span className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">About</h1>
                    <Link href="/" >About us</Link>
                    <Link href="/" >Careers</Link>
                </span>
                <span className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">More</h1>
                    <Link href="/" >Mobile application</Link>
                    <Link href="/" >Gift cards</Link>
                </span>
                <span className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">Connect</h1>
                    <Link href="/" >Twitter</Link>
                    <Link href="/" >Instagram</Link>
                </span>
            </div>
            <div className="flex justify-between px-40 py-5 bg-base-300">
                <p className="text-primary">© 2023 CLEWUP</p>
                <span className="flex gap-10">
                    <p>Privacy Policy</p>
                    <p>Terms</p>
                </span>
            </div>

        </div>
  )
}

export default Footer

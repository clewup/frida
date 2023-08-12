'use client'

import Link from 'next/link'
import React from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import PaymentIcon from 'react-payment-icons'

const Footer = () => {
  return (
        <div>
            <div className="mt-5 px-5 text-center w-full md:px-64">All major payment methods accepted!</div>
            <div className="flex justify-center pb-5 items-center">
                <PaymentIcon id="visa"
                             style={{ margin: 10, width: 50 }}
                             className="payment-icon" />
                <PaymentIcon id="mastercard"
                             style={{ margin: 10, width: 50 }}
                             className="payment-icon" />
                <PaymentIcon id="paypal"
                             style={{ margin: 10, width: 50 }}
                             className="payment-icon" />
                <img src="https://res.cloudinary.com/dliog6kq6/image/upload/v1686519110/klarna_eznp8a.png" width={50} className="h-[32px] w-[50px] m-[10px] rounded-[2px]"/>
            </div>
            <div className="bg-theme-black flex flex-col gap-20 text-white m-5 rounded-md px-20 py-10">
                <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between">
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

                <div className="flex justify-between">
                    <p>© 2023 FRIDA</p>
                    <span className="flex gap-10">
                    <p>Privacy Policy</p>
                    <p>Terms</p>
                </span>
                </div>
            </div>

        </div>
  )
}

export default Footer

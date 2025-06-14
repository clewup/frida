'use client'

import Link from 'next/link'
import React from 'react'

export const Footer = () => {
    return (
        <div className="bg-theme-white relative z-[998]">
            <div className="bg-theme-black flex flex-col gap-20 text-white m-5 rounded-md px-20 py-10 ">
                <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between">
                    <span className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">Help and information</h1>
                    <Link href="/">Support</Link>
                    <Link href="/">Track your order</Link>
                    <Link href="/">Delivery and returns</Link>
                </span>
                    <span className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">About</h1>
                    <Link href="/">About us</Link>
                    <Link href="/">Careers</Link>
                </span>
                    <span className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">More</h1>
                    <Link href="/">Gift cards</Link>
                </span>
                    <span className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">Connect</h1>
                    <Link href="/">X</Link>
                    <Link href="/">Instagram</Link>
                </span>
                </div>

                <div className="flex justify-between">
                    <p>© 2025 FRIDA</p>
                    <span className="flex gap-10">
                    <p>Privacy policy</p>
                    <p>Terms</p>
                </span>
                </div>
            </div>

        </div>
    )
}

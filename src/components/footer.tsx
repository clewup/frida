'use client'

import Link from 'next/link'
import React from 'react'

export const Footer = () => {
    return (
        <div>
            <div className="bg-theme-black flex flex-col gap-20 text-white m-5 rounded-md px-20 py-10">
                <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between">
                    <span className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">help and information</h1>
                    <Link href="/">support</Link>
                    <Link href="/">track your order</Link>
                    <Link href="/">delivery and returns</Link>
                </span>
                    <span className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">about</h1>
                    <Link href="/">about us</Link>
                    <Link href="/">careers</Link>
                </span>
                    <span className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">more</h1>
                    <Link href="/">gift cards</Link>
                </span>
                    <span className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">connect</h1>
                    <Link href="/">twitter</Link>
                    <Link href="/">instagram</Link>
                </span>
                </div>

                <div className="flex justify-between">
                    <p>© 2025 <span className="font-druk">FRIDA</span></p>
                    <span className="flex gap-10">
                    <p>privacy policy</p>
                    <p>terms</p>
                </span>
                </div>
            </div>

        </div>
    )
}

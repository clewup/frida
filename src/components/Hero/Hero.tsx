import Button from "@/components/Button/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
    return (
            <div className="h-screen-header bg-neutral-mint flex relative overflow-hidden rounded-md">
                <div className="w-1/2 relative bg-[#eeeeee]">
                    <Image src="https://res.cloudinary.com/dliog6kq6/image/upload/v1689624897/Product_Transparent_sfc4gs.png" alt="product" fill={true} className="w-[90%] object-contain p-20"/>
                </div>
                <div className="w-1/2 flex flex-col justify-center gap-5 p-10">
                    <div className="flex gap-5 items-center">
                        <div className="h-[1px] bg-neutral-black w-10"/>
                        <p className="text-3xl">Summer sale!</p>
                    </div>

                    <div>
                        <p className="text-5xl font-semibold">Get 20% off using code</p>
                        <p className="text-6xl font-bold">20OFF</p>
                    </div>

                    <Link href="/search">
                        <Button className="text-2xl">
                            Shop now
                        </Button>
                    </Link>

                </div>

                <h1 className="absolute -bottom-9 left-[50%] -translate-x-[50%] text-9xl font-bold whitespace-nowrap opacity-10">summer sale</h1>
            </div>
    )
}

export default Hero;
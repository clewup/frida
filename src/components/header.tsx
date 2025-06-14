import Link from 'next/link'
import React from 'react'
import {login} from '@/actions/login'
import {Button} from "@/components/ui/button";
import {
    IconBusinessplan,
    IconChairDirector,
    IconHelp,
    IconMoneybag, IconPackage,
    IconPhone,
    IconSearch,
    IconShoppingCart, IconUser,
} from "@tabler/icons-react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle
} from './ui/navigation-menu'
import Image from "next/image";
import getCategories from '@/actions/get-categories'
import {auth} from "@/auth";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuTrigger
} from './ui/dropdown-menu';

export async function Header() {
    const categories = await getCategories();
    const session = await auth();

    return (
        <NavigationMenu className="bg-white fixed z-[998]">
            <NavigationMenuList className="flex justify-between w-screen px-20 py-3">
                <NavigationMenuItem>
                    <Link href="/" className="flex flex-col items-center h-full justify-center text-center mr-5">
                        <h1 className="font-druk text-4xl">FRIDA</h1>
                    </Link>
                </NavigationMenuItem>

                <div className="flex">
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/">Home</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/search">Shop</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Furniture</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="flex flex-col gap-3 bg-white p-5 mx-auto w-screen">
                                <div className="grid grid-cols-5 px-[15%] gap-10 relative">
                                    {categories.map(({name: category, subcategories, image}, index) =>
                                        (<li key={index}>
                                            <div
                                                className="flex flex-col gap-5 items-center w-full h-full border-b-[2px] border-theme-gray pb-5 relative">
                                                <div className="w-full aspect-video relative overflow-hidden">
                                                    <Image src={image} alt={category} fill={true}
                                                           className="object-cover rounded-md transition-zoom"/>
                                                </div>

                                                <div className="flex flex-col justify-between w-full">
                                                    <div className="flex w-full justify-between">
                                                        <h3>{category}</h3>
                                                        <Link href={`/search?categories=${category}`}>
                                                            <p className="text-gray-400">View all</p>
                                                        </Link>
                                                    </div>

                                                    {subcategories.map(({name: subcategory}, index) => (
                                                        <Link key={index}
                                                              href={`/search?categories=${category}&subcategories=${subcategory}`}>
                                                            <h2 className="text-gray-400">{subcategory}</h2>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                        </li>)
                                    )}
                                </div>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="w-screen flex px-[15%] py-7 items-center">
                                <ul className="w-[60%] grid grid-cols-2 gap-4">
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link href="#" className="flex flex-row items-center gap-2">
                                                <IconHelp size={17}/>
                                                Customer service
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link href="#" className="flex flex-row items-center gap-2">
                                                <IconPhone size={17}/>
                                                Contact us
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link href="#" className="flex flex-row items-center gap-2">
                                                <IconMoneybag size={17}/>
                                                Financing
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link href="#" className="flex flex-row items-center gap-2">
                                                <IconChairDirector size={17}/>
                                                Interior design
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link href="#" className="flex flex-row items-center gap-2">
                                                <IconPackage size={17}/>
                                                Delivery information
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <li>
                                        <NavigationMenuLink asChild>
                                            <Link href="#" className="flex flex-row items-center gap-2">
                                                <IconBusinessplan size={17}/>
                                                Experts in the field
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                </ul>
                                <div className="w-[40%] h-full grid grid-cols-2 gap-5">
                                    <div className="h-32 w-full bg-theme-gray rounded-md"></div>
                                    <div className="h-full w-full bg-theme-gray rounded-md"></div>
                                </div>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </div>

                <div className="flex justify-end items-center gap-2">
                    <Link href="/search" className="flex gap-2">
                        <IconSearch size={20}/>
                    </Link>

                    <Link href="/cart" className="flex gap-2">
                        <IconShoppingCart size={20}/>
                    </Link>

                    <Link href="/account">
                        {session ? (<Avatar className="w-7 h-7 text-sm">
                            <AvatarImage
                                src={session?.user?.image!}
                                alt={session?.user?.name!}/>
                            <AvatarFallback className="bg-blue-200">
                                {session?.user?.name?.charAt(0) ?? "U"}
                            </AvatarFallback>
                        </Avatar>) : (
                            <IconUser size={20}/>
                        )}

                    </Link>
                </div>

            </NavigationMenuList>

        </NavigationMenu>
    )
}

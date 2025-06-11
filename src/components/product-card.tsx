"use client"

import {useRouter} from 'next/navigation'
import {type ProductType} from '@/common/types/productTypes'
import Image from 'next/image'
import React, {type FC} from 'react'
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {ShoppingCart} from 'lucide-react'
import {Badge} from "@/components/ui/badge";
import {addToCart} from "@/actions/cart-actions";
import {IconButton} from "@/components/icon-button";

interface Props {
    product: ProductType
    showAddToCartButton?: boolean
}

export const ProductCard: FC<Props> = ({product, showAddToCartButton = true}) => {
    const router = useRouter()

    async function handleAddToCart() {
        try {
            await addToCart(product.id, 1)
        } catch (error) {
            console.error("Failed to add to cart:", error)
        }
    }

    return (
        <Card className="h-full flex flex-col overflow-hidden">
            <CardHeader className="p-0 ">
                <div className="w-[70%] mx-auto m-10 aspect-square relative rounded-t-lg"
                     onClick={() => router.push(`/product/${product.name}`)}>
                    <Image
                        src={product.image || "/placeholder.svg?height=300&width=300"}
                        alt={product.name}
                        fill
                        className="object-cover transition-zoom"
                    />
                </div>
            </CardHeader>
            <CardContent className="flex-1 p-4">
                <CardTitle className="text-lg mb-5 lowercase">{product.name}</CardTitle>
                <div className="flex items-center justify-between relative w-full">
                    <span className="text-4xl font-bold">£{product.price}</span>

                    {product.stock === 0
                        ? <Badge variant="destructive">out of stock</Badge>
                        : (
                            <form action={handleAddToCart} className="absolute bottom-0 right-0">
                                <Button type="submit" disabled={product.stock === 0}>
                                    <ShoppingCart className="w-4 h-4"/>
                                    add to cart
                                </Button>
                            </form>
                        )
                    }
                </div>
            </CardContent>
        </Card>
    )
}


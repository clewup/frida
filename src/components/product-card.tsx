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
                <div className="w-[70%] mx-auto m-10 aspect-square relative rounded-t-lg cursor-pointer"
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
                <CardTitle className="text-2xl font-normal mb-2">{product.name}</CardTitle>
                <div className="flex items-center justify-between relative w-full">
                    <span className="text-4xl">£{product.price}</span>


                    <form action={handleAddToCart} className="absolute bottom-0 right-0">
                        {product.stock > 0
                            ? (
                                <Button type="submit" disabled={product.stock === 0}>
                                    <ShoppingCart className="w-4 h-4"/>
                                    Add to cart
                                </Button>
                            )
                            : <Badge variant="destructive" className="px-4 py-2">Out of stock</Badge>
                        }
                    </form>

                </div>
            </CardContent>
        </Card>
    )
}


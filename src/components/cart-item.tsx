"use client"

import Image from "next/image"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Minus, Plus, Trash2} from "lucide-react"
import {removeFromCart, updateCartItemQuantity} from "@/actions/cart-actions";
import {CartItemType} from "@/common/types/cartTypes";

interface CartItemProps {
    item: CartItemType
}

export default function CartItem({item}: CartItemProps) {
    async function handleQuantityChange(newQuantity: number) {
        try {
            await updateCartItemQuantity(item.id, newQuantity)
        } catch (error) {
            console.error("Failed to update quantity:", error)
        }
    }

    async function handleRemove() {
        try {
            await removeFromCart(item.id)
        } catch (error) {
            console.error("Failed to remove item:", error)
        }
    }

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden">
                        <Image
                            src={item.product.image || "/placeholder.svg?height=64&width=64"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex-1">
                        <h3 className="font-semibold lowercase">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">£{item.product.price.toFixed(2)} each</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <form action={() => handleQuantityChange(item.quantity - 1)}>
                            <Button type="submit" variant="outline" size="icon" className="h-8 w-8"
                                    disabled={item.quantity <= 1}>
                                <Minus className="h-4 w-4"/>
                            </Button>
                        </form>

                        <span className="w-8 text-center font-medium">{item.quantity}</span>

                        <form action={() => handleQuantityChange(item.quantity + 1)}>
                            <Button type="submit" variant="outline" size="icon" className="h-8 w-8">
                                <Plus className="h-4 w-4"/>
                            </Button>
                        </form>
                    </div>

                    <div className="text-right">
                        <p className="font-semibold">£{(item.product.price * item.quantity).toFixed(2)}</p>
                        <form action={handleRemove}>
                            <Button type="submit" variant="ghost" size="sm"
                                    className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4"/>
                            </Button>
                        </form>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

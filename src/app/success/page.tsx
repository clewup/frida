import constants from '@/common/constants/constants'
import React from 'react'
import {notFound} from "next/navigation"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Separator} from "@/components/ui/separator"
import {CheckCircle, Package, Truck, CreditCard, Home, ShoppingBag} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

async function getOrder(session: string) {
    const orderResponse = await fetch(`${constants.APP_URL}/api/order?session_id=${session}`, {
        cache: 'no-store',
        method: 'POST'
    })
    return await orderResponse.json()
}

export const metadata = {
    title: 'FRIDA - Order successful'
}

export default async function Success({searchParams}: any) {
    const order = await getOrder(searchParams.session_id)

    if (!order) {
        notFound()
    }

    const estimatedDelivery = new Date()
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 3)

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-green-50">
                <div className="container mx-auto px-4 py-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-green-600"/>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-green-800 mb-2">Order Confirmed!</h1>
                    <p className="text-green-700">Thank you for your purchase. Your order has been successfully
                        placed.</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Package className="w-5 h-5"/>
                                    <span>Order Details</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Order Number</p>
                                        <p className="font-semibold">#{order.id.slice(-8).toUpperCase()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Order Date</p>
                                        <p className="font-semibold">{order.createdAt.toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Status</p>
                                        <Badge variant="default" className="bg-green-100 text-green-800">
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                                        <p className="font-semibold">{estimatedDelivery.toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Order Items */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Items Ordered ({order.items.length})</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {order.items.map((item: any) => (
                                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                                        <div className="relative w-16 h-16 rounded-md overflow-hidden">
                                            <Image
                                                src={item.product.image || "/placeholder.svg?height=64&width=64"}
                                                alt={item.productName}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold">{item.productName}</h3>
                                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">${(item.productPrice * item.quantity).toFixed(2)}</p>
                                            <p className="text-sm text-muted-foreground">${item.productPrice} each</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Shipping Address */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <Truck className="w-5 h-5"/>
                                    <span>Shipping Address</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">{order.shippingAddress || "123 Main St, City, State 12345"}</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary & Actions */}
                    <div className="space-y-6">
                        {/* Order Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <CreditCard className="w-5 h-5"/>
                                    <span>Order Summary</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${order.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span className="text-green-600">Free</span>
                                </div>
                                <Separator/>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${order.total.toFixed(2)}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Next Steps */}
                        <Card>
                            <CardHeader>
                                <CardTitle>What's Next?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                        <div>
                                            <p className="font-medium">Order Confirmation</p>
                                            <p className="text-muted-foreground">You'll receive an email confirmation
                                                shortly</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                        <div>
                                            <p className="font-medium">Processing</p>
                                            <p className="text-muted-foreground">We'll prepare your items for
                                                shipping</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                                        <div>
                                            <p className="font-medium">Shipping</p>
                                            <p className="text-muted-foreground">Your order will be shipped within 1-2
                                                business days</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Button asChild className="w-full">
                                <Link href="/">
                                    <Home className="w-4 h-4 mr-2"/>
                                    Continue Shopping
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="w-full">
                                <Link href="/orders">
                                    <ShoppingBag className="w-4 h-4 mr-2"/>
                                    View All Orders
                                </Link>
                            </Button>
                        </div>

                        {/* Support */}
                        <Card>
                            <CardContent className="p-4 text-center">
                                <p className="text-sm text-muted-foreground mb-2">Need help with your order?</p>
                                <Button variant="link" className="p-0 h-auto">
                                    Contact Support
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

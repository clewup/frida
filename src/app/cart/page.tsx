import {redirect} from "next/navigation"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import Link from "next/link"
import {ShoppingBag} from "lucide-react"
import {auth} from "@/auth";
import CartItem from "@/components/cart-item";
import {getCart} from "@/actions/cart-actions";

export default async function CartPage() {
    const session = await auth();

    if (!session) {
        redirect("/api/auth/signin")
    }

    const cart = await getCart()

    const subtotal = cart?.items.reduce((total, item) => total + item.product.price * item.quantity, 0) ?? 0

    const delivery = subtotal >= 30 ? 3.99 : 0
    const total = subtotal + delivery

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-5xl mb-8">your cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {
                        cart?.items?.length
                            ? cart?.items.map((item) => (<CartItem key={item.id} item={item}/>))
                            : <p className="text-muted-foreground mb-6">Your cart is empty</p>

                    }
                </div>

                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>order summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span>subtotal ({cart?.items.reduce((total, item) => total + item.quantity, 0)} items)</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>delivery</span>
                                <span>£{delivery.toFixed(2)}</span>
                            </div>

                            <Separator/>

                            <div className="flex justify-between font-bold text-lg">
                                <span>total</span>
                                <span>£{total.toFixed(2)}</span>
                            </div>

                            <Button className="w-full" size="lg">
                                proceed to checkout
                            </Button>

                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/">continue shopping</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

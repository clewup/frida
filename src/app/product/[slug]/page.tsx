import {Heading} from '@/components/heading'
import {PageWrapper} from '@/components/page-wrapper'
import {RelatedProducts} from '@/components/related-products'
import {type Metadata, type ResolvingMetadata} from 'next'
import Link from 'next/link'
import React from 'react'
import getProductByName from "@/actions/get-product-by-name";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ShoppingCart, Star} from 'lucide-react'
import Image from 'next/image'
import {Badge} from "@/components/ui/badge";
import {Separator} from "@radix-ui/react-menu";
import {addToCart} from "@/actions/cart-actions";
import {auth} from "@/auth";
import {Card, CardContent} from "@/components/ui/card";

export async function generateMetadata({params}: any, parent: ResolvingMetadata): Promise<Metadata> {
    const product = await getProductByName(params.slug)

    return {
        title: `Shop - ${product != null ? product.name : '404'}`
    }
}

export default async function ProductSlug({params}: any) {
    const product = await getProductByName(params.slug)
    const session = await auth();

    if (!product) {
        return (
            <div className="w-full h-screen-header flex items-center justify-center">
                <div className="text-center w-1/5 p-10">
                    <Heading>404</Heading>
                    <p className="mt-5">{decodeURIComponent(params.slug)} was not found.</p>
                </div>
            </div>
        )
    }

    async function handleAddToCart() {
        "use server"
        try {
            await addToCart(product!.id, 1)
        } catch (error) {
            console.error("Failed to add to cart:", error)
        }
    }

    return (
        <PageWrapper className="flex flex-col gap-5 md:px-20 pb-10">
            <div className="min-h-screen">
                {/* Header */}
                <header className="pt-8 pb-2">
                    <ul className="flex gap-1 text-sm">
                        <li>
                            <Link href="/search">Products</Link> {'>'}
                        </li>
                        <li>
                            <Link
                                href={`/search?category=${product.category.name}`}>{product.category.name}</Link> {'>'}
                        </li>
                        <li>
                            <Link
                                href={`/search?category=${product.category.name}&subcategory=${product.subcategory.name}`}>{product.subcategory.name}</Link>
                        </li>
                    </ul>
                </header>

                {/* Product Detail */}
                <main className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Product Image */}
                        <div className="space-y-4 bg-white border rounded-lg">
                            <div className="aspect-square relative overflow-hidden m-20">
                                <Image
                                    src={product.image || "/placeholder.svg?height=600&width=600"}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                                        ))}
                                        <span className="ml-2 text-sm text-muted-foreground">(4.8) • 124 reviews</span>
                                    </div>
                                </div>
                                <p className="text-4xl font-bold text-primary mb-4">£{product.price}</p>
                                <Badge variant={product.stock > 0 ? "default" : "destructive"} className="mb-6">
                                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                                </Badge>
                            </div>

                            <Separator/>

                            <div>
                                <h3 className="text-lg font-semibold mb-3">Description</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {product.description || "No description available for this product."}
                                </p>
                            </div>

                            <Separator/>

                            {/* Features */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Key features</h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li className="flex items-center space-x-2">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                        <span>Premium quality materials</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                        <span>1-year manufacturer warranty</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                        <span>Free shipping on orders over £30</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                        <span>30-day return policy</span>
                                    </li>
                                </ul>
                            </div>

                            <Separator/>

                            {/* Add to Cart */}
                            <div className="space-y-4">
                                {session ? (
                                    <form action={handleAddToCart}>
                                        <Button type="submit" size="lg" className="w-full"
                                                disabled={product.stock === 0}>
                                            <ShoppingCart className="w-5 h-5 mr-2"/>
                                            {product.stock === 0 ? "Out of stock" : "Add to cart"}
                                        </Button>
                                    </form>
                                ) : (
                                    <div className="space-y-3">
                                        <p className="text-sm text-muted-foreground text-center">Sign in to add items to
                                            your cart</p>
                                        <Button asChild size="lg" className="w-full">
                                            <Link href="/signin">Sign In to purchase</Link>
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Additional Info */}
                            <Card>
                                <CardContent className="p-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="font-medium">Category:</span>
                                            <span
                                                className="ml-2 text-muted-foreground">{product.category.name}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium">Subcategory:</span>
                                            <span
                                                className="ml-2 text-muted-foreground">{product.subcategory.name}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium">Shipping:</span>
                                            <span className="ml-2 text-muted-foreground">2-3 days</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Related Products Section */}
                    <section className="mt-16">
                        <RelatedProducts product={product}/>
                    </section>
                </main>
            </div>

        </PageWrapper>
    )
}

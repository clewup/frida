"use server"

import {revalidatePath} from "next/cache"
import {auth} from "@/auth";
import prisma from "@/lib/prisma";
import {sanitizeProduct, sanitizeProducts} from "@/common/utils/mappers";
import {redirect} from "next/navigation";

export async function addToCart(productId: number, quantity = 1) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect('/signin')
    }

    try {
        // Find or create cart for user
        let cart = await prisma.cart.findFirst({
            where: {createdById: session.user.id},
        })

        if (!cart) {
            cart = await prisma.cart.create({
                data: {createdById: session.user.id, total: 0},
            })
        }

        // Check if item already exists in cart
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId,
            },
        })

        if (existingItem) {
            // Update quantity
            await prisma.cartItem.update({
                where: {id: existingItem.id},
                data: {quantity: existingItem.quantity + quantity},
            })
        } else {
            // Create new cart item
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: productId,
                    quantity: quantity,
                    createdById: session.user.id,
                },
            })
        }

        revalidatePath("/cart")
        return {success: true}
    } catch (error) {
        console.error("Error adding to cart:", error)
        throw new Error("Failed to add item to cart")
    }
}

export async function removeFromCart(cartItemId: number) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("User not authenticated")
    }

    try {
        await prisma.cartItem.delete({
            where: {id: cartItemId},
        })

        revalidatePath("/cart")
        return {success: true}
    } catch (error) {
        console.error("Error removing from cart:", error)
        throw new Error("Failed to remove item from cart")
    }
}

export async function updateCartItemQuantity(cartItemId: number, quantity: number) {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("User not authenticated")
    }

    try {
        if (quantity <= 0) {
            await prisma.cartItem.delete({
                where: {id: cartItemId},
            })
        } else {
            await prisma.cartItem.update({
                where: {id: cartItemId},
                data: {quantity: quantity},
            })
        }

        revalidatePath("/cart")
        return {success: true}
    } catch (error) {
        console.error("Error updating cart item quantity:", error)
        throw new Error("Failed to update cart item quantity")
    }
}

export async function getCart() {
    const session = await auth();

    if (!session?.user?.id) {
        return null
    }

    try {
        const cart = await prisma.cart.findFirst({
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                category: true,
                                subcategory: true
                            }
                        }
                    }
                },
                createdBy: true,
            },
            where: {createdById: session?.user?.id}
        })

        return cart ? {
            ...cart,
            items: cart?.items.map(x => ({...x, product: sanitizeProduct(x.product)}))
        } : null;
    } catch (error) {
        console.error("Error fetching cart:", error)
        return null
    }
}

export async function getCartItemCount() {
    const session = await auth();

    if (!session?.user?.id) {
        return 0
    }

    try {
        const cart = await prisma.cart.findFirst({
            where: {createdById: session.user.id},
            include: {
                items: true,
            },
        })

        if (!cart) return 0

        return cart.items.reduce((total, item) => total + item.quantity, 0)
    } catch (error) {
        console.error("Error fetching cart item count:", error)
        return 0
    }
}

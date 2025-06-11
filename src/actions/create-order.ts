'use server'

import { auth } from '@/auth'
import prisma from "@/lib/prisma";
import type Stripe from "stripe";
import type {CartType} from "@/common/types/cartTypes";
import {OrderStatus} from "@prisma/client";

export async function createOrder (stripeSession: Stripe.Response<Stripe.Checkout.Session>, createdCart: CartType) {
    const session = await auth()

    if (!session?.user?.id) {
        return;
    }

    return prisma.order.create({
        data: {
            createdBy: { connect: { id: session.user.id }},
            email: stripeSession.customer_details?.email ?? createdCart.createdBy.email,
            items: {
                createMany: {
                    data: createdCart.items.map((item) => ({
                        createdById: session.user!.id as string,
                        productId: Number(item.product.id),
                        quantity: item.quantity,
                    }))
                }
            },
            name: stripeSession.customer_details?.name ?? createdCart.createdBy.name ?? "Unknown",
            status: sanitizeOrderStatus(stripeSession.status),
            total: Number(stripeSession.amount_total) / 100,
            transaction: stripeSession.id,
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    })
}

function sanitizeOrderStatus (status: string | null) {
    if (status === 'complete') {
        return OrderStatus.Complete
    } else {
        return OrderStatus.Pending
    }
}
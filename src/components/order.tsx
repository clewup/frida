'use client'

import {OrderProductCard} from '@/components/order-product-card'
import metadata from '@/common/constants/metadata'
import {type ProductType} from '@/common/types/productTypes'
import Link from 'next/link'
import React, {type FC, useEffect} from 'react'
import {type Order as PrismaOrder, type OrderItem} from '@prisma/client'
import {Button} from "@/components/ui/button";
import {IconCheck} from "@tabler/icons-react";

interface Props {
    order: PrismaOrder & { items: Array<OrderItem & { product: ProductType }> }
}

export const Order: FC<Props> = ({order}) => {
    return (
        <div className="text-center flex flex-col justify-center items-center gap-10">
            <span className="flex text-3xl items-center gap-5">
                <h1 className="font-bold">Thank you for your order, {order.name}!</h1>
                <IconCheck className="text-theme-black"/>
            </span>
            <span className="flex flex-col gap-5 text-left md:w-1/2">
                  {order.items.map((item, index) => (
                      <OrderProductCard key={index} product={item.product} quantity={item.quantity}/>))}
              </span>
            <span>
                <p className="text-2xl">Total: £{Number(order.total)}</p>
            </span>
            <span>
                <p>Check your email inbox for the receipt.</p>
                <p>If you have any questions, please reach out to <a
                    href={`mailto:${metadata.supportEmail}`}>{metadata.supportEmail}</a></p>
            </span>
            <span>
                <Link href="/public">
                    <Button>Continue Shopping</Button>
                </Link>
            </span>
        </div>
    )
}

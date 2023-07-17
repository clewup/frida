'use client'

import Button from "@/components/Button/Button";
import OrderProductCard from '@/components/OrderProductCard/OrderProductCard'
import metadata from '@/constants/metadata'
import { useCart } from '@/contexts/CartContext/CartContext'
import { runFireworks } from '@/lib/confetti'
import Link from 'next/link'
import React, { type FC, useEffect } from 'react'
import { CheckCircle as CheckIcon } from 'react-feather'
import { type Order as PrismaOrder, type OrderItem, type Product } from '@prisma/client'

interface OrderProps {
  order: PrismaOrder & { items: Array<OrderItem & { product: Product }> }
}

const Order: FC<OrderProps> = ({ order }) => {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
    runFireworks()
  }, [])

  return (
          <div className="text-center flex flex-col justify-center items-center gap-10">
            <span className="flex text-3xl items-center gap-5">
                <h1 className="font-bold">Thank you for your order, {order.name}!</h1>
                <CheckIcon className="text-secondary"/>
            </span>
              <span className="flex flex-col gap-5 text-left md:w-1/2">
                  {order.items.map((item, index) => (<OrderProductCard key={index} product={item.product} quantity={item.quantity}/>))}
              </span>
              <span>
                <p className="text-2xl">Total: £{Number(order.total)}</p>
            </span>
              <span>
                <p>Check your email inbox for the receipt.</p>
                <p>If you have any questions, please reach out to <a href={`mailto:${metadata.supportEmail}`}>{metadata.supportEmail}</a></p>
            </span>
              <span>
                <Link href="/">
                    <Button>Continue Shopping</Button>
                </Link>
            </span>
          </div>
  )
}
export default Order

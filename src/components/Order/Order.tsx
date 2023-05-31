'use client'

import metadata from '@/constants/metadata'
import { useCart } from '@/contexts/CartContext/CartContext'
import { runFireworks } from '@/lib/confetti'
import Link from 'next/link'
import React, { type FC, useEffect } from 'react'
import { CheckCircle as CheckIcon } from 'react-feather'
import { type Order as PrismaOrder, type Product } from '@prisma/client'

interface OrderProps {
  order: PrismaOrder & { products: Product[] }
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
                <CheckIcon/>
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
                    <button className="btn btn-accent text-base-100">Continue Shopping</button>
                </Link>
            </span>
        </div>
  )
}
export default Order

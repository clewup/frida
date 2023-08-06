import { type Order } from '@prisma/client'
import moment from 'moment/moment'
import Link from 'next/link'
import React, { type FC } from 'react'

interface OrderListProps {
  orders: Order[]
}

const OrderList: FC<OrderListProps> = ({ orders }) => {
  return (
        <div className="flex flex-col">
            <h1 className="text-3xl pb-5">Order history</h1>

            {
                orders.length === 0
                  ? (
                    <p className="text-lg text-gray-400">You haven&apos;t placed any orders yet.</p>

                    )
                  : (
                    <table className="table table-zebra">
                        <thead>
                        <tr>
                            <th>ORDER</th>
                            <th>DATE</th>
                            <th>STATUS</th>
                            <th>TOTAL</th>
                            <th>DETAILS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.transaction}</td>
                                <td>{moment(order.createdAt).format('DD/MM/YYYY')}</td>
                                <td>{order.status}</td>
                                <td>£{Number(order.total)}</td>
                                <td><Link href={`/success?session_id=${order.transaction}`} className="underline">Details</Link></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    )
            }
        </div>
  )
}

export default OrderList

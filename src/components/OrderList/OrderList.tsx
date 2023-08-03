import { type Order } from '@prisma/client'
import moment from 'moment/moment'
import Link from 'next/link'
import React, { type FC } from 'react'

interface OrderListProps {
  orders: Order[]
}

const OrderList: FC<OrderListProps> = ({ orders }) => {
  return (
        <div className="flex flex-col gap-5">
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
        </div>
  )
}

export default OrderList

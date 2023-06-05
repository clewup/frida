'use client'

import PageWrapper from '@/components/PageWrapper/PageWrapper'
import constants from '@/constants/constants'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useApi from '@/lib/common/hooks/useApi/useApi'
import useAuth from '@/lib/common/hooks/useAuth/useAuth'
import { type Order } from '@prisma/client'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

export default function Account () {
  const { get } = useApi()
  const { user } = useLockr()
  const { signOut } = useAuth({ redirectUri: constants.APP_URL })

  const [orders, setOrders] = useState<Order[]>([])

  async function getOrders () {
    const orders = await get<Order[]>('/api/order')
    setOrders(orders)
  }

  useEffect(() => {
    getOrders()
  }, [user])

  return (
        <PageWrapper className="gap-20">
            <div className="flex flex-col gap-5">
                <h1 className="text-5xl">ACCOUNT INFORMATION</h1>
                <span>
                    <h1 className="text-2xl font-bold">{user?.name}</h1>
                    <p className="text-xl">{user?.email}</p>
                </span>
                <span>
                    <button className="btn btn-primary" onClick={signOut}>
                        Log Out
                    </button>
                </span>
            </div>

            <div className="flex flex-col gap-5">
                <h1 className="text-5xl">ORDER HISTORY</h1>
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>ORDER</th>
                            <th>DATE</th>
                            <th>STATUS</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.transaction}</td>
                            <td>{moment(order.createdAt).format('DD/MM/YYYY')}</td>
                            <td>{order.status}</td>
                            <td>£{Number(order.total)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </PageWrapper>
  )
}

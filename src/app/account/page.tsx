'use client'

import OrderList from '@/components/OrderList/OrderList'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import UserDetails from '@/components/UserDetails/UserDetails'
import constants from '@/constants/constants'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useApi from '@/lib/common/hooks/useApi/useApi'
import useAuth from '@/lib/common/hooks/useAuth/useAuth'
import { type Order } from '@prisma/client'
import cx from 'classnames'
import React, { useEffect, useState } from 'react'
import { ArrowLeft, Map, Package, User } from 'react-feather'

export default function Account () {
  const { get } = useApi()
  const { user } = useLockr()
  const { signOut } = useAuth({ redirectUri: constants.APP_URL })

  const [orders, setOrders] = useState<Order[]>([])
  const [activeMenuItem, setActiveMenuItem] = useState(0)

  async function getOrders () {
    const orders = await get<Order[]>('/api/order')
    setOrders(orders)
  }

  useEffect(() => {
    void getOrders()
  }, [user])

  const menuItems = [
    {
      label: 'Account',
      icon: <User size={20}/>,
      component: <UserDetails/>,
      disabled: false
    },
    {
      label: 'Orders',
      icon: <Package size={20}/>,
      component: <OrderList orders={orders}/>,
      disabled: false
    },
    {
      label: 'Address Book',
      icon: <Map size={20}/>,
      component: <div/>,
      disabled: true
    }
  ]

  return (
    <PageWrapper className="gap-10">
      <div className="border-b-[2px] border-b-theme-gray pt-5">
      </div>

      <div className="flex w-full flex-col gap-10 md:gap-0 md:flex-row md:px-40">
        <div className="md:w-1/4">
          <ul className="flex flex-col gap-2">
            {menuItems.map((menuItem, index) => (
                <li key={index}>
                  <button className={cx('flex gap-5 items-center', menuItem.disabled ? 'cursor-not-allowed' : 'cursor-pointer')} onClick={() => { setActiveMenuItem(index) }} disabled={menuItem.disabled}>
                    {menuItem.icon}
                    <p>{menuItem.label}</p>
                  </button>
                </li>
            ))}
            <li>
              <button className="flex gap-5 items-center" onClick={signOut}>
                <ArrowLeft size={20}/>
                <p>Log out</p>
              </button>

            </li>
          </ul>
        </div>
        <div className="md:w-3/4">
          {menuItems[activeMenuItem].component}
        </div>
      </div>
    </PageWrapper>
  )
}

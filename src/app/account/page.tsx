'use client'

import Button from '@/components/Button/Button'
import OrderList from '@/components/OrderList/OrderList'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import UserForm from '@/components/UserForm/UserForm'
import constants from '@/constants/constants'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useApi from '@/lib/common/hooks/useApi/useApi'
import useAuth from '@/lib/common/hooks/useAuth/useAuth'
import { type Order } from '@prisma/client'
import cx from 'classnames'
import React, { useEffect, useState } from 'react'
import { Map, Package, User } from 'react-feather'

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
      label: 'Orders',
      icon: <Package/>,
      component: <OrderList orders={orders}/>,
      disabled: false
    },
    {
      label: 'Account',
      icon: <User/>,
      component: <UserForm/>,
      disabled: false
    },
    {
      label: 'Address Book',
      icon: <Map/>,
      component: <div/>,
      disabled: true
    }
  ]

  return (
    <PageWrapper className="gap-10 px-20">
      <div className="border-b-[2px] border-b-theme-gray">
        <h1 className="text-2xl">Welcome back, {user?.name}.</h1>
      </div>

      <div className="flex w-full">
        <div className="w-1/4">
          <ul className="flex flex-col gap-10">
            {menuItems.map((menuItem, index) => (
                <li key={index}>
                  <button className={cx('text-xl flex gap-5', menuItem.disabled ? 'cursor-not-allowed' : 'cursor-pointer')} onClick={() => { setActiveMenuItem(index) }} disabled={menuItem.disabled}>
                    {menuItem.icon}
                    <p>{menuItem.label}</p>
                  </button>
                </li>
            ))}
            <li>
              <Button onClick={signOut}>Log out</Button>
            </li>
          </ul>
        </div>
        <div className="w-3/4">
          {menuItems[activeMenuItem].component}
        </div>
      </div>
    </PageWrapper>
  )
}

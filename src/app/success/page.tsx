import Order from '@/components/Order/Order'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import constants from '@/constants/constants'
import { type PageContext } from '@/lib/common/types/nextTypes'
import React from 'react'

async function getOrder (session: string) {
  const orderResponse = await fetch(`${constants.APP_URL}/api/order?session_id=${session}`, {
    method: 'POST',
    cache: 'no-store'
  })
  return await orderResponse.json()
}

export const metadata = {
  title: 'Store - Order Success!'
}

export default async function Success ({ searchParams }: PageContext) {
  const order = await getOrder(searchParams.session_id)

  return (
        <PageWrapper className="min-h-screen-header flex flex-col justify-center items-center">
            <Order order={order}/>
        </PageWrapper>
  )
}

import Order from '@/components/Order/Order'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import constants from '@/common/constants/constants'
import React from 'react'

async function getOrder (session: string) {
  const orderResponse = await fetch(`${constants.APP_URL}/api/order?session_id=${session}`, {
    cache: 'no-store',
    method: 'POST'
  })
  return await orderResponse.json()
}

export const metadata = {
  title: 'FRIDA - Order Successful'
}

export default async function Success ({ searchParams }: PageContext) {
  const order = await getOrder(searchParams.session_id)

  return (
        <PageWrapper className="min-h-screen-header flex flex-col justify-center items-center">
            <Order order={order}/>
        </PageWrapper>
  )
}

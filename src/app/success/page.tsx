import {Order} from '@/components/order'
import {PageWrapper} from '@/components/page-wrapper'
import constants from '@/common/constants/constants'
import React from 'react'

async function getOrder(session: string) {
    const orderResponse = await fetch(`${constants.APP_URL}/api/order?session_id=${session}`, {
        cache: 'no-store',
        method: 'POST'
    })
    return await orderResponse.json()
}

export const metadata = {
    title: 'FRIDA - order successful'
}

export default async function Success({searchParams}: any) {
    const order = await getOrder(searchParams.session_id)

    return (
        <PageWrapper className="min-h-screen-header flex flex-col justify-center items-center">
            <Order order={order}/>
        </PageWrapper>
    )
}

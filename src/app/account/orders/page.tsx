import {OrderList} from '@/components/order-list'
import {PageWrapper} from '@/components/page-wrapper'
import React from 'react'
import {getOrders} from "@/actions/get-orders";

export default async function Orders() {
    const orders = await getOrders();

    return (
        <PageWrapper className="gap-10">
            <OrderList orders={orders}/>
        </PageWrapper>
    )
}

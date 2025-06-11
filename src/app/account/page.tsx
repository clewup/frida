import {PageWrapper} from '@/components/page-wrapper'
import {UserDetail} from '@/components/user-detail'
import React from 'react'

export default async function Account() {
    return (
        <PageWrapper className="gap-10">
            <UserDetail/>
        </PageWrapper>
    )
}

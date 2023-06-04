'use client'

import PageWrapper from '@/components/PageWrapper/PageWrapper'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useApi from '@/lib/common/hooks/useApi/useApi'
import { type UserType } from '@/lib/common/types/userTypes'
import React from 'react'

export default function Account () {
  const { get } = useApi()
  const { user } = useLockr()

  return (
        <PageWrapper className="gap-20">
            <div className="flex flex-col gap-5">
                <h1 className="text-5xl">ACCOUNT INFORMATION</h1>
                <span>
                    <h1 className="text-2xl font-bold">{user?.name}</h1>
                    <p className="text-xl">{user?.email}</p>
                </span>
            </div>

            <div className="flex flex-col gap-5">
                <h1 className="text-5xl">ORDER HISTORY</h1>
                <span>
                </span>
            </div>
        </PageWrapper>
  )
}

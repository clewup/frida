'use client'

import React from 'react'
import {useSession} from 'next-auth/react'

export const UserDetail = () => {
    const session = useSession()

    return (
        <div className="flex flex-col gap-10">
            <div className="flex gap-2">
                <p className="text-xl text-gray-400">Hello,</p>
                <p className="text-xl font-bold">{session.data?.user?.name}.</p>
            </div>

            <div>
                <h1 className="text-3xl pb-5">Account details</h1>

                <div className="w-full flex border-b-[2px] border-theme-gray py-5">
                    <p className="text-lg w-1/4">Name</p>
                    <p className="text-lg text-gray-400">{session.data?.user?.name}</p>
                </div>
                <div className="w-full flex border-b-[2px] border-theme-gray py-5">
                    <p className="text-lg w-1/4">Email</p>
                    <p className="text-lg text-gray-400">{session.data?.user?.email}</p>
                </div>
            </div>

        </div>
    )
}


'use client'

import { useAuthKitty } from '@/lib/authkitty/contexts/AuthKittyContext/AuthKittyContext'
import React from 'react'

const UserDetails = () => {
  const { user } = useAuthKitty()

  if (user == null) return <></>

  return (
        <div className="flex flex-col gap-10">
            <div className="flex gap-2">
                <p className="text-xl text-gray-400">Hello,</p>
                <p className="text-xl font-bold">{user.firstName}.</p>
            </div>

            <div>
                <h1 className="text-3xl pb-5">Account details</h1>

                <div className="w-full flex border-b-[2px] border-theme-gray py-5">
                    <p className="text-lg w-1/4">Name</p>
                    <p className="text-lg text-gray-400">{user.firstName} {user.lastName}</p>
                </div>
                <div className="w-full flex border-b-[2px] border-theme-gray py-5">
                    <p className="text-lg w-1/4">Email</p>
                    <p className="text-lg text-gray-400">{user.email}</p>
                </div>
            </div>

        </div>
  )
}

export default UserDetails

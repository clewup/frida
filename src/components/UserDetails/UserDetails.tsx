'use client'

import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import moment from 'moment/moment'
import React from 'react'

const UserDetails = () => {
  const { user } = useLockr()

  if (user == null) return <></>

  return (
        <div className="flex flex-col gap-10">
            <div className="flex gap-2">
                <p className="text-xl text-gray-400">Hello,</p>
                <p className="text-xl font-bold">{user.name}.</p>
            </div>

            <div>
                <h1 className="text-3xl pb-5">Account details</h1>

                <div className="w-full flex border-b-[2px] border-theme-gray py-5">
                    <p className="text-lg w-1/4">Name</p>
                    <p className="text-lg text-gray-400">{user.name}</p>
                </div>
                <div className="w-full flex border-b-[2px] border-theme-gray py-5">
                    <p className="text-lg w-1/4">Email</p>
                    <p className="text-lg text-gray-400">{user.email}</p>
                </div>
                <div className="w-full flex border-b-[2px] border-theme-gray py-5">
                    <p className="text-lg w-1/4">Joined</p>
                    <p className="text-lg text-gray-400">{moment(user.createdAt).format('DD/MM/yyyy')}</p>
                </div>
            </div>

        </div>
  )
}

export default UserDetails

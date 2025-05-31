'use client'

import GenericError from '@/components/GenericError/GenericError'
import React from 'react'

export default function Error ({ error, reset }: any) {
  return (
        <GenericError error={error} reset={reset}/>
  )
}

'use client'

import {GenericError} from '@/components/generic-error'
import React from 'react'

export default function Error({error, reset}: { error: Error, reset: () => void }) {
    return (
        <GenericError error={error} reset={reset}/>
    )
}

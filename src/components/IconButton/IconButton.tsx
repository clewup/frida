'use client'

import React, { type FC, type ReactNode } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Tooltip } from 'react-tooltip'

interface IconButtonProps {
  children: ReactNode
  type?: 'button' | 'submit'
  onClick?: () => void
  isLoading?: boolean
  tooltipId: string
  tooltipText: string
}

const IconButton: FC<IconButtonProps> = ({ children, type = 'button', onClick, isLoading, tooltipId, tooltipText }) => {
  return (
        <>
            <button
                type={type}
                data-tooltip-id={tooltipId}
                className="shadow-md bg-white rounded-[50%] p-3 aspect-square flex items-center justify-center hover:bg-black hover:text-white"
                onClick={onClick}
                disabled={isLoading}>
                <>
                    {(isLoading === true)
                      ? (<TailSpin color="#fff" height={20} width={20}/>)
                      : (children)
                    }
                </>
            </button>

            <Tooltip
                id={tooltipId}
                place="top"
                content={tooltipText}
            />
        </>
  )
}

export default IconButton

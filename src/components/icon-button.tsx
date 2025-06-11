'use client'

import React, {type FC, type ReactNode} from 'react'
import {TailSpin} from 'react-loader-spinner'
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

interface Props {
    children: ReactNode
    type?: 'button' | 'submit'
    onClick?: () => void
    isLoading?: boolean
    tooltipText: string
    disabled: boolean
}

export const IconButton: FC<Props> = ({children, type = 'button', onClick, isLoading, disabled, tooltipText}) => {
    return (
        <Tooltip>
            <TooltipTrigger>
                <div
                    className="shadow-md bg-white rounded-[50%] p-3 aspect-square flex items-center justify-center hover:bg-black hover:text-white"
                    onClick={disabled ? () => null : onClick}>
                    <>
                        {isLoading
                            ? (<TailSpin color="#fff" height={20} width={20}/>)
                            : (children)
                        }
                    </>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                {tooltipText}
            </TooltipContent>
        </Tooltip>
    )
}


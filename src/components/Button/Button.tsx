'use client'

import cx from 'classnames'
import React, { type FC, type ReactNode, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'

interface ButtonProps {
  children: ReactNode
  className?: string
  isLoading?: boolean
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
}

const Button: FC<ButtonProps> = ({ children, className, disabled, isLoading, onClick, type = 'button' }) => {
  const [isHovering, setHovering] = useState(false)

  const spinnerColor = isHovering ? '#111111' : '#ffffff'

  return (
        <button
            onMouseEnter={() => { setHovering(true) }}
            onMouseLeave={() => { setHovering(false) }}
            className={cx('bg-theme-black text-white py-2 px-5 rounded-md whitespace-nowrap normal-case flex gap-5 border-[1px] border-transparent hover:bg-white hover:text-black hover:border-theme-black transition-colors items-center justify-center', className)}
            onClick={onClick}
            disabled={(disabled === true) || isLoading}
            type={type}
        >
            {children}

            {(isLoading === true) &&
                <TailSpin color={spinnerColor} height={20} width={20}/>
            }
        </button>
  )
}

export default Button

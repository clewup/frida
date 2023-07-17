'use client'

import cx from "classnames";
import React, {FC, ReactNode, useState} from "react";
import {TailSpin} from "react-loader-spinner";

interface ButtonProps {
    children: ReactNode;
    className?: string;
    isLoading?: boolean;
    onClick?: () => void;
    disabled?: boolean;
}

const Button: FC<ButtonProps> = ({children, className, disabled, isLoading, onClick}) => {
    const [isHovering, setHovering] = useState(false);

    const spinnerColor = isHovering ? '#111111' : '#ffffff';

    return (
        <button
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cx('bg-neutral-black text-white py-2 px-5 rounded-md whitespace-nowrap normal-case flex gap-5 border-[1px] border-transparent hover:bg-white hover:text-black hover:border-neutral-black transition-colors items-center justify-center', className)}
            onClick={onClick}
            disabled={disabled || isLoading}
        >
            {children}

            {isLoading &&
                <TailSpin color={spinnerColor} height={20} width={20}/>
            }
        </button>
    )
}

export default Button;
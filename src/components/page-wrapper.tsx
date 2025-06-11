import React, {type FC, type ReactNode} from 'react'
import cx from 'classnames'

interface Props {
    children: ReactNode
    className?: string
}

export const PageWrapper: FC<Props> = ({children, className}) => {
    return (
        <main className={cx('w-full p-5 py-0 flex flex-col min-h-screen-header', className)}>
            {children}
        </main>
    )
}

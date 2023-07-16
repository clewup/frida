import React, { type FC, type ReactNode } from 'react'
import cx from 'classnames'

interface PageWrapperProps {
  children: ReactNode
  className?: string
}

const PageWrapper: FC<PageWrapperProps> = ({ children, className }) => {
  return (
        <main className={cx('w-full p-5 flex flex-col min-h-screen-header', className)}>
            {children}
        </main>
  )
}

export default PageWrapper

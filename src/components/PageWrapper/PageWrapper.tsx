import {FC, ReactNode} from "react";
import cx from 'classnames';

interface PageWrapperProps {
    children: ReactNode;
    className?: string;
}

const PageWrapper: FC<PageWrapperProps> = ({children, className}) => {
    return (
        <main className={cx("w-screen p-5", className)}>
            {children}
        </main>
    )
}

export default PageWrapper;
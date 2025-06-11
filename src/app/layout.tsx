import './globals.css'
import {Footer} from '@/components/footer'
import React from 'react'
import {SessionProvider} from 'next-auth/react'
import localFont from 'next/font/local'
import cx from 'classnames'
import {TooltipProvider} from "@/components/ui/tooltip";
import {Header} from "@/components/header";

export const metadata = {
    title: 'FRIDA | furniture & homeware'
}

const druk = localFont({
    src: '../../public/fonts/Druk-Medium.otf',
    variable: '--font-druk'
})

const mabry = localFont({
    src: '../../public/fonts/Mabry.ttf',
    variable: '--font-mabry'
})

export default function RootLayout({
                                       children
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={cx(mabry.variable, druk.variable, 'font-mabry')}>
        <TooltipProvider>
            <SessionProvider>
                <body>
                <div className="bg-gray-50">
                    <Header/>
                    <div className="min-h-screen pt-16">
                        {children}
                    </div>
                    <Footer/>
                </div>
                </body>
            </SessionProvider>
        </TooltipProvider>
        </html>
    )
}

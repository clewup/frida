import './globals.css'
import {Footer} from '@/components/footer'
import React from 'react'
import {SessionProvider} from 'next-auth/react'
import localFont from 'next/font/local'
import cx from 'classnames'
import {TooltipProvider} from "@/components/ui/tooltip";
import {Header} from "@/components/header";
import {auth} from "@/auth";

export const metadata = {
    title: 'FRIDA | Furniture & Homeware'
}

const druk = localFont({
    src: '../../public/fonts/Druk-Medium.otf',
    variable: '--font-druk'
})

const mabry = localFont({
    src: '../../public/fonts/Mabry.ttf',
    variable: '--font-mabry'
})

export default async function RootLayout({
                                             children
                                         }: {
    children: React.ReactNode
}) {
    const session = await auth()

    return (
        <html lang="en" className={cx(mabry.variable, druk.variable, 'font-mabry')}>
        <body>
        <SessionProvider session={session}>
            <TooltipProvider>
                <div className="bg-gray-50">
                    <Header/>
                    <div className="min-h-screen pt-16">
                        {children}
                    </div>
                    <Footer/>
                </div>
            </TooltipProvider>
        </SessionProvider>
        </body>
        </html>
    )
}

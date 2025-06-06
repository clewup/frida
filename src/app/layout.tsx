import './globals.css'
import Footer from '@/components/Footer/Footer'
import RSCHeader from '@/components/Header/RSCHeader'
import { CartProvider } from '@/common/contexts/CartContext/CartContext'
import React from 'react'

export const metadata = {
  title: 'FRIDA | Furniture & Homeware'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <CartProvider>
        <body>
        <div>
            {/* @ts-expect-error Server Component */}
            <RSCHeader />
            <div className="min-h-screen">
                {children}
            </div>
            <Footer/>
        </div>
        </body>
    </CartProvider>
    </html>
  )
}

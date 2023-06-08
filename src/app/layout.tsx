import './globals.css'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { CartProvider } from '@/contexts/CartContext/CartContext'
import { LockrProvider } from '@/lib/common/contexts/LockrContext/LockrContext'
import React from 'react'

export const metadata = {
  title: 'Store'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="store">
      <LockrProvider>
        <CartProvider>
          <body>
            <Header />
            {children}
            <Footer/>
          </body>
        </CartProvider>
      </LockrProvider>
    </html>
  )
}

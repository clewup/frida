import './globals.css'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { CartProvider } from '@/contexts/CartContext/CartContext'
import { LockrProvider } from '@/lib/common/contexts/LockrContext/LockrContext'
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
      <LockrProvider>
          <CartProvider>
                  <body>
                  <div>
                      <Header />
                      <div className="min-h-screen">
                          {children}
                      </div>
                      <Footer/>
                  </div>
                  </body>
          </CartProvider>
      </LockrProvider>
    </html>
  )
}

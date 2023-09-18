import './globals.css'
import Footer from '@/components/Footer/Footer'
import RSCHeader from '@/components/Header/RSCHeader'
import { CartProvider } from '@/contexts/CartContext/CartContext'
import { AuthKittyContextProvider } from '@/lib/authkitty-helpers/contexts/AuthKittyContext/AuthKittyContext'
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
      <AuthKittyContextProvider>
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
      </AuthKittyContextProvider>
    </html>
  )
}

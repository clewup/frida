import './globals.css'

export const metadata = {
  title: 'Store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="store">
      <body>{children}</body>
    </html>
  )
}

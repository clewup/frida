import './globals.css'
import Header from "@/components/Header/Header";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";

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
      <body>
      <Header/>
      {children}
      </body>
    </html>
  )
}

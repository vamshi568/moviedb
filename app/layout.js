import Navbar from '@/components/navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MovieDB',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      {/* <link rel="icon" href=".svg" /> */}
      </head>
      <body >
        <Navbar/>
        {children}</body>
    </html>
  )
}

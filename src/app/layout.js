import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next To do List App',
  description: 'To do list application for personal use by Aitisam Yaseen',
  keywords: 'next, react, javascript, todo, list, app',
  author: 'Aitisam Yaseen',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inconsolata } from 'next/font/google'
import './globals.css'
import Footer from './footer';


const inconsolata = Inconsolata({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Imogen Heap',
  description: 'Imogen Heap official website and portal.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inconsolata.className}>{children}
      <Footer />
      </body>
    </html>
  )
}

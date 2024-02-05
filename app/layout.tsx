import type { Metadata } from 'next'
import { Inconsolata } from 'next/font/google'
import './globals.css'
import Footer from './footer';
import {Providers} from "./providers";


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
    <html lang="en" className='dark'>
      <body className={inconsolata.className}>
      <Providers> 
      {children}
      <Footer />
      </Providers> 
      </body>
    </html>
  )
}

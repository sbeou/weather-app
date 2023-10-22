import './globals.css'
import type { Metadata } from 'next'
import {Roboto_Condensed } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'

import { AddressProvider } from '@/context/address'

const robotoCondensed = Roboto_Condensed({
   weight: '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Consulta o tempo de sua cidade',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${robotoCondensed.className} text-white min-h-screen relative`}>
        <header className='max-w-screen-sm mx-auto pt-5 flex justify-center gap-3 items-end'>
          <h1 className="text-3xl text-center font-extrabold">
            Weather App
          </h1>
          <Image 
            src="/logo.png"
            alt="Weather App"
            width={60}
            height={60}
          />
        </header>
        <AddressProvider>
          {children}
        </AddressProvider>
        <footer className="w-full fixed bottom-0 bg-sky-800 py-1 text-center">
          © Developpment <Link href={"https://french.dev.br"} target='_Blank' className="hover:underline hover:opacity-75 transition-all">Sébastien Guilet</Link> 
        </footer>
        </body>
    </html>
  )
}

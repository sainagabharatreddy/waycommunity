"use client"
import { Outfit } from 'next/font/google'
import './globals.css'
import { UserDetailContext } from './_context/userDetailContext'
import { ClerkProvider } from '@clerk/nextjs'
import { useState } from 'react'

import { Toaster } from "@/components/ui/toaster"



const inter = Outfit({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  const [userDetail,setUserDetail]=useState();
  return (
    <ClerkProvider >
      <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
        <html lang="en">
          <body className={inter.className} >{children}
          <Toaster />
          </body>
        </html>
    </UserDetailContext.Provider>
    </ClerkProvider>
    
    


  )
}
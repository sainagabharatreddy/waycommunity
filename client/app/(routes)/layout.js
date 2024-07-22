"use client"
import React, { useContext, useEffect, useState } from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'
import GlobalApi from '../_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { UserDetailContext } from '../_context/userDetailContext'
const img = 'data:image/jpeg;base64,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JdMA4HVnCirzvSkuZ9xLg9z9DEQnKV7STy5zsKb7r2uLQ66SbpyMtI2HbOS8BSnoO59VrU3ONke2uqHuDhTa0C5yQZDrrrxDuSMDlkcypJ1k5J7CKGHcYyW0zttoFQNApNpwSZaZJwIjuRhjP/SEq1lONhSoOEriraAaQpijTaRc5QOV0g4C6M4jPWtp4hSTWs0p4VxaerUTaGFM1ofdPIdAdGd5mUrqbg8OfQvE5X6ivvdPpZvu16HMp+S1emsjyl2O16HMp+S1LIXY7Xocyn5LUshdnj6VnAktpAbwxYdlrZlXbshYxerNIEAvphgiOTTl5dGr6XUNsLi1q0a2KWhkkdlUnQwUtPU5PLqOI7Nvzqz/AGTvXK6mHyZx2dt2L/1TZ/4v41RQ1uGwsjqlCZCAIAgOP7LP6qq+HS/EapqHDByvYP8AlbV4FL1qilxOSMI+tKoZCAIAgCAIAgCAIAgCAIAgK7mVpwfTjV8U4/5iGdR5crc+n5p3vEGoitdjqVWGm91MtP8A+TgcMQQeMwIOtYaTVmb06jpyU4amjlLR2N6NRxc91MuJJJFFzSd7rtUAnfC0jCcVaM2kXpboQm71KUW9pF/wvs21nm6nvlt6Xls18so+4j2j/hfZ9rPN1ffLHpeWzPllH3Ee0N7GFnBmafjpVCPGDWgpao/72FjaK1qhEv0+BbwI7ZB6aOP4mP8AvPNc+W5dJu6bXUXYbv1krOKfWZ/oc79oHmT7xa/tNPlPsNv6hq8hdbH6HO/aB5k+8T9pp8p9g/qGryF1sfoc79oHmT7xP2mnyn2D+oavIXWyWxcFX0y48ex16Ab1A4ATgPjMv5+ICaO59OKsmyCe7VWbvKKLXwA7n0v7OfeLbyGO1mv7vLko8+AH8+j/AGc+8TyGO1j93lyUefo+/n0f7MfeJ5DHax+7y5KPW6BqDEVKQO0WY+9TyGO1j93nyUWrDo2pT5XGMc8iC40nZZw0CpDR6TAkmFZp0o01aJQxGKnXd59XEaLhdwGOkKjKlS0hhY0tAbRwIJmTL1Zp1XBaivqNvwd0LUsdmZZmVmuay9DnUTJvPc7GKkfSWk5aTuNRsblbn0/NO94tTOoXK3Pp+ad7xBqFytz6fmne8Qahcrc+n5p3vEGo1fCbQNS22Z1mfWaxri0lzaJnkuDtdTct4ScXcajW8EOBR0e6o6naA/jA0G/RiLpJwh+9bVKrnmY1HTXK3Pp+ad7xRGdRlTbVnlPYRrApuB8RLzHUg1E6GAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCA/9k='

function layout({ children }) {
  const [toggleSideBar, setToggleSideBar] = useState(false)
  const {user}=useUser();
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  useEffect(()=>{
    user&&getUserDetails();
    
  },[user])
  const getUserDetails=()=>{
    GlobalApi.getUserByEmail(user.primaryEmailAddress.emailAddress).then(resp=>{
      setUserDetail(resp.data);
    })
  }
  return (
    <div>

      {/* This side bar used when screen size is medium or larger  */}
      <div className=' hidden md:w-64 md:block h-screen fixed'>
        <SideNav />
      </div>
      {/* This side bar used when screen size is smaller/mobile  */}
      {toggleSideBar &&
        <div className='bg-white absolute md:w-64 md:block h-screen 
        animate-in duration-700'>
          <SideNav toggleSideBar={() => setToggleSideBar(false)} />
        </div>}

        
      <div className='md:ml-64'>
        {/* Header  */}
        <Header toggleSideBar={() => setToggleSideBar(true)} />
        <div className='grid grid-cols-1 md:grid-cols-3'>
          {/* user used render page route  */}
          <div className='md:col-span-2'>
            {children}
          </div>
          {/* Right Most Section of page */}
          <div className='p-5'>
                    <Image src={img} width={500} height={300}
                    className='w-full rounded-lg shadow-sm'
                    alt='post'/>
                    <Image src={img} width={500} height={300}
                    className='w-full rounded-lg shadow-sm mt-5'
                    alt='post'/>

        <Image src={img} width={500} height={300}
                    className='w-full rounded-lg shadow-sm mt-5'
                    alt='post'/>

        <Image src={img} width={500} height={300}
                    className='w-full rounded-lg shadow-sm mt-5'
                    alt='post'/>

        <Image src={img} width={500} height={300}
                    className='w-full rounded-lg shadow-sm mt-5'
                    alt='post'/>
                    <Image src={img} width={500} height={300}
                    className='w-full rounded-lg shadow-sm mt-5'
                    alt='post'/>

        <Image src={img} width={500} height={300}
                    className='w-full rounded-lg shadow-sm mt-5'
                    alt='post'/>
                    <Image src={img} width={500} height={300}
                    className='w-full rounded-lg shadow-sm mt-5'
                    alt='post'/> <Image src={img} width={500} height={300}
                    className='w-full rounded-lg shadow-sm mt-5'
                    alt='post'/>

          </div>
        </div>

      </div>

    </div>
  )
}

export default layout
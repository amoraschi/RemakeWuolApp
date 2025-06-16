'use client'

import { open } from '@tauri-apps/api/shell'
import { MouseEvent } from 'react'
import { Link } from 'lucide-react'
import Ranking from '@/components/ranking/ranking'
import Loader from '@/components/loader'
import Search from '@/components/search/search'
import { useUserContext } from '@/app/dashboard/layout'
import DashboardTitle from '@/components/dashboard/dashboard-title'

export default function Dashboard () {
  const userInfo = useUserContext()

  const handleLinkClick = (e: MouseEvent) => {
    e.preventDefault()
    open(`https://wuolah.com/${userInfo?.defaultCommunity?.community?.slug ?? ''}`)
  }

  return (
    <main
      className='h-full w-full p-4'
    >
      {
        userInfo != null ? (
          <>
            <div
              className='flex flex-row mb-4'
            >
              <DashboardTitle
                userInfo={userInfo}
              />
              <Link
                className='ml-auto w-5 h-5 cursor-pointer hover:scale-110 transition'
                onClick={handleLinkClick}
              />
            </div>
            <div
              className='flex justify-center gap-2'
            >
              <Ranking />
              <Search />
            </div>
          </>
        ) : (
          <Loader />
        )
      }
    </main>
  )
}

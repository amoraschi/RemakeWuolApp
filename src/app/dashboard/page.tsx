'use client'

import { open } from '@tauri-apps/api/shell'
import { fetchMe } from '@/lib/api'
import { getLocalItem, setLocalItem } from '@/lib/storage'
import { User } from '@/types/User'
import { MouseEvent, useEffect, useState } from 'react'
import { Link, Loader2 } from 'lucide-react'
import Ranking from '@/components/ranking/ranking'
import Posts from '@/components/posts/posts'

export default function Dashboard () {
  const [userInfo, setUserInfo] = useState<User | null>(null)

  useEffect(() => {
    const storedUserInfo = getLocalItem('userInfo', true)

    if (storedUserInfo != null) {
      setUserInfo(storedUserInfo)
      return
    }

    const abortController = new AbortController()
    const fetch = async () => {
      const fetchedUserInfo = await fetchMe(abortController.signal)
      if (fetchedUserInfo != null) {
        setLocalItem('userInfo', fetchedUserInfo, true)
        setUserInfo(fetchedUserInfo)
      }
    }

    fetch()

    return () => {
      abortController.abort('Component unmounted')
    }
  }, [])

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
              <div>
                <span
                  className='text-2xl font-semibold'
                >
                  {userInfo.defaultCommunity.community.segmentations.study.item?.name ?? 'Sin estudios'}
                </span>
                <br />
                <span
                  className='text-md'
                >
                  {userInfo.defaultCommunity.community.segmentations.center.item?.name ?? 'Sin centro'} - {userInfo.defaultCommunity.community.segmentations.university.item?.name ?? 'Sin universidad'}
                </span>
              </div>
              <Link
                className='ml-auto w-5 h-5 cursor-pointer'
                href='/settings'
                onClick={handleLinkClick}
              />
            </div>
            <div
              className='flex justify-center gap-2'
            >
              <Ranking />
              <Posts />
            </div>
          </>
        ) : (
          <span
            className='flex flex-row items-center'
          >
            <Loader2
              className='mr-2 h-4 w-4 animate-spin'
            /> Cargando datos
          </span>
        )
      }
    </main>
  )
}

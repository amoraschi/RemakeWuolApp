'use client'

import { fetchMe } from '@/lib/api'
import { getLocalItem, setLocalItem } from '@/lib/storage'
import { User } from '@/types/User'
import { useEffect, useState } from 'react'
import { Link, Loader2 } from 'lucide-react'
import Ranking from '@/components/users/ranking'

export default function DashboardPanel () {
  const [me, setMe] = useState<User | null>(null)

  useEffect(() => {
    const storedMe = getLocalItem('me', true)

    if (storedMe != null) {
      setMe(storedMe)
      return
    }

    const abortController = new AbortController()
    const fetch = async () => {
      const fetchedMe = await fetchMe(abortController.signal)
      if (fetchedMe != null) {
        setLocalItem('me', fetchedMe, true)
        setMe(fetchedMe)
      }
    }

    fetch()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <div
      className='h-screen w-screen'
    >
      {
        me != null ? (
          <div
            className='flex flex-row p-4'
          >
            <div>
              <span
                className='text-2xl font-semibold'
              >
                {me.defaultCommunity.community.segmentations.study.item?.name ?? 'Sin estudios'}
              </span>
              <br />
              <span
                className='text-md'
              >
                {me.defaultCommunity.community.segmentations.center.item?.name ?? 'Sin centro'} - {me.defaultCommunity.community.segmentations.university.item?.name ?? 'Sin universidad'}
              </span>
            </div>
            <Link
              className='ml-auto w-5 h-5'
              href='/settings'
            />
            <Ranking />
          </div>
        ) : (
          <span
            className='flex flex-row items-center m-2'
          >
            <Loader2
              className='mr-2 h-4 w-4 animate-spin'
            /> Cargando datos
          </span>
        )
      }
    </div>
  )
}

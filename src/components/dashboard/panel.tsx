'use client'

import { fetchMe } from '@/lib/api'
import { getLocalItem, setLocalItem } from '@/lib/storage'
import { User } from '@/types/User'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Link, Loader2 } from 'lucide-react'

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
      className='h-full w-full'
    >
      {
        me != null ? (
          <>
            <Image
              src={me.defaultCommunity.community.segmentations.center.item?.backgroundUrl as string}
              alt='Universidad'
              width={100}
              height={100}
              className='w-full h-1/3 object-cover rounded-bl-lg'
            />
            <div
              className='flex flex-row m-2'
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
            </div>
          </>
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

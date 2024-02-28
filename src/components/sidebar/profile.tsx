'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useEffect, useState } from 'react'
import { User } from '@/types/User'
import { getLocalItem, setLocalItem } from '@/lib/storage'
import { Skeleton } from '@/components/ui/skeleton'
import { fetchMe } from '@/lib/api'

export default function SidebarProfile () {
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
      className='flex mt-auto px-1 mb-1 w-full'
    >
      <Card
        className='flex items-center p-2 gap-2 w-full'
      >
        <Avatar
          className='grid place-items-center w-fit'
        >
          {
            me != null ? (
              <>
                <AvatarImage
                  src={me.avatarUrl}
                  alt='Avatar'
                  className='h-7 w-7 rounded-full'
                />
                <AvatarFallback
                  className='h-7 w-7 p-1 rounded-full'
                >
                  <AvatarImage
                    src={me.fallbackAvatarUrl}
                    alt='Avatar'
                    className='h-5 w-5 rounded-full'
                  />
                </AvatarFallback>
              </>
            ) : (
              <Skeleton
                className='h-7 w-7 rounded-full'
              />
            )
          }
        </Avatar>
        <div
          className='flex flex-col w-full overflow-hidden'
        >
          {
            me != null ? (
              <span
                className='text-sm font-semibold pt-1'
              >
                {me.nickname}
              </span>
            ) : (
              <Skeleton
                className='w-full h-7'
              />
            )
          }
          <Popover>
            <PopoverTrigger
              asChild
            >
              {
                me != null && (
                  <Button
                    variant='link'
                    className='text-xs text-gray-500 h-fit w-fit px-0 py-1'
                  >
                    {me.defaultCommunity.community.segmentations.study.item?.name ?? 'Estudiante'}
                  </Button>
                )
              }
            </PopoverTrigger>
            <PopoverContent>
              <div
                className='flex'
              >
                <Avatar
                  className='flex items-center'
                >
                  <AvatarImage
                    src={me?.avatarUrl}
                    alt='Avatar'
                    className='h-7 w-7 rounded-full'
                  />
                  <AvatarFallback>
                    <AvatarImage
                      src={me?.fallbackAvatarUrl}
                      alt='Avatar'
                      className='h-5 w-5 rounded-full'
                    />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <span
                    className='text-md font-semibold'
                  >
                    {me?.defaultCommunity.community.segmentations.university.item?.name ?? 'Universidad'}
                  </span>
                  <br />
                  <span
                    className='text-sm'
                  >
                    {me?.defaultCommunity.community.segmentations.center.item?.name ?? 'Centro'}
                  </span>
                  <br />
                  <span
                    className='text-xs'
                  >
                    {me?.defaultCommunity.community.segmentations.study.item?.name ?? 'Estudiante'}
                  </span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Card>
    </div>
  )
}

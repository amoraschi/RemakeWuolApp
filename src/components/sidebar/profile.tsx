'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useEffect, useState } from 'react'
import { User } from '@/types/User'
import { getLocalItem, setLocalItem } from '@/lib/storage'
import { fetchMe } from '@/lib/api'

export default function SidebarProfile () {
  const [userInfo, setUserInfo] = useState<User | null>(null)

  useEffect(() => {
    const storedUserInfo = getLocalItem('userInfo', true)

    if (storedUserInfo != null) {
      setUserInfo(storedUserInfo)
      return
    }

    const abortController = new AbortController()
    const fetch = async () => {
      const fetchedstoredUserInfo = await fetchMe(abortController.signal)
      if (fetchedstoredUserInfo != null) {
        setLocalItem('userInfo', fetchedstoredUserInfo, true)
        setUserInfo(fetchedstoredUserInfo)
      }
    }

    fetch()

    return () => {
      abortController.abort('Component unmounted')
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
            userInfo != null && (
              <>
                <AvatarImage
                  src={userInfo.avatarUrl}
                  alt='Avatar'
                  className='h-7 w-7 rounded-full'
                />
                <AvatarFallback
                  className='h-7 w-7 p-1 rounded-full'
                >
                  <AvatarImage
                    src={userInfo.fallbackAvatarUrl}
                    alt='Avatar'
                    className='h-5 w-5 rounded-full'
                  />
                </AvatarFallback>
              </>
            )
          }
        </Avatar>
        <div
          className='flex flex-col w-full overflow-hidden'
        >
          {
            userInfo != null && (
              <span
                className='text-sm font-semibold pt-1'
              >
                {userInfo.nickname}
              </span>
            )
          }
          <Popover>
            <PopoverTrigger
              asChild
            >
              {
                userInfo != null && (
                  <Button
                    variant='link'
                    className='text-xs text-gray-500 h-fit w-fit px-0 py-1'
                  >
                    {userInfo.defaultCommunity.community.segmentations.study.item?.name ?? 'Estudiante'}
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
                    src={userInfo?.avatarUrl}
                    alt='Avatar'
                    className='h-7 w-7 rounded-full'
                  />
                  <AvatarFallback>
                    <AvatarImage
                      src={userInfo?.fallbackAvatarUrl}
                      alt='Avatar'
                      className='h-5 w-5 rounded-full'
                    />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <span
                    className='text-md font-semibold'
                  >
                    {userInfo?.defaultCommunity.community.segmentations.university.item?.name ?? 'Universidad'}
                  </span>
                  <br />
                  <span
                    className='text-sm'
                  >
                    {userInfo?.defaultCommunity.community.segmentations.center.item?.name ?? 'Centro'}
                  </span>
                  <br />
                  <span
                    className='text-xs'
                  >
                    {userInfo?.defaultCommunity.community.segmentations.study.item?.name ?? 'Estudiante'}
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

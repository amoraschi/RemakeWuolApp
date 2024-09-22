import { useEffect, useState } from 'react'
import { fetchMe } from '@/lib/api'
import { getLocalItem, setLocalItem } from '@/lib/storage'
import { User } from '@/types/User'
import Image from 'next/image'
import { formatNumber } from '@/lib/utils'

export default function Self () {
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

  return (
    <div
      className='flex flex-col w-fit h-fit gap-2 border-[1px] p-4 rounded-md'
    >
      <span
        className='font-semibold'
      >
        USUARIO
      </span>
      <div
        className='flex items-center gap-2'
      >
        <Image
          src={userInfo?.avatarUrl ?? ''}
          alt='Avatar'
          width={100}
          height={100}
          className='w-10 h-10 rounded-full'
        />
        <div
          className='flex flex-col gap-1'
        >
          <span
            className='font-semibold'
          >
            @{userInfo?.nickname}
          </span>
          <span>
            {userInfo?.displayMoney && `${userInfo.money} € - `}{formatNumber(userInfo?.popularity ?? 0)}
          </span>
        </div>
      </div>
    </div>
  )
}

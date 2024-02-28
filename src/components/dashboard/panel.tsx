'use client'

import { fetchMe } from '@/lib/api'
import { getLocalItem, setLocalItem } from '@/lib/storage'
import { User } from '@/types/User'
import { useEffect, useState } from 'react'

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
    <>
    </>
  )
}

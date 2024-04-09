import { useEffect, useState } from 'react'
import { fetchRanking } from '@/lib/api'
import { getLocalItem, setLocalItem } from '@/lib/storage'
import { User } from '@/types/User'

export default function Ranking () {
  const [ranking, setRanking] = useState<User[]>([])

  useEffect(() => {
    const storedMe = getLocalItem('me', true)
    const storedRanking = getLocalItem('ranking', true)

    if (storedMe == null) {
      return
    }

    if (storedRanking != null) {
      setRanking(storedRanking)
      return
    }

    const abortController = new AbortController()
    const fetch = async () => {
      const fetchedRanking = await fetchRanking(storedMe.defaultCommunityId, abortController.signal)
      console.log(fetchedRanking.items)
      if (fetchedRanking != null) {
        setLocalItem('ranking', fetchedRanking.items, true)
        setRanking(fetchedRanking.items)
      }
    }

    fetch()

    return () => {
      abortController.abort()
    }
  }, [])
  
  return (
    <div>
      <ul>
      </ul>
    </div>
  )
}

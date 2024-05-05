import { useEffect, useState } from 'react'
import { fetchRanking } from '@/lib/api'
import { getLocalItem, setLocalItem } from '@/lib/storage'
import { UserRank } from '@/types/User'
import Ranker from './ranker'

export default function Ranking () {
  const [ranking, setRanking] = useState<UserRank[]>([])

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
        RANKING
      </span>
      {
        ranking.map((user, index) => (
          <Ranker
            key={index}
            user={user}
          />
        ))
      }
    </div>
  )
}

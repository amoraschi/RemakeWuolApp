import { useEffect, useState } from 'react'
import { fetchRanking } from '@/lib/api'
import { UserRank } from '@/types/User'
import RankingUser from '@/components/ranking/ranking-user'
import { useUserContext } from '@/app/dashboard/layout'

export default function Ranking () {
  const userInfo = useUserContext()
  const [ranking, setRanking] = useState<UserRank[]>([])

  useEffect(() => {
    if (userInfo == null) {
      return
    }

    const abortController = new AbortController()
    const fetch = async () => {
      const fetchedRanking = await fetchRanking(userInfo.defaultCommunityId, abortController.signal)
      console.log(fetchedRanking.items)
      if (fetchedRanking != null) {
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
          <RankingUser
            key={index}
            rank={user.rank}
            user={user.user}
          />
        ))
      }
    </div>
  )
}

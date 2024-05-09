import { useEffect, useState } from 'react'
import { fetchRanking } from '@/lib/api'
import { getLocalItem, setLocalItem } from '@/lib/storage'
import { UserRank } from '@/types/User'
import RankingUser from '@/components/ranking/ranking-user'

export default function Ranking () {
  const [ranking, setRanking] = useState<UserRank[]>([])

  useEffect(() => {
    const storedUserInfo = getLocalItem('userInfo', true)
    const storedRanking = getLocalItem('ranking', true)

    if (storedUserInfo == null) {
      return
    }

    if (storedRanking != null) {
      setRanking(storedRanking)
      return
    }

    const abortController = new AbortController()
    const fetch = async () => {
      const fetchedRanking = await fetchRanking(storedUserInfo.defaultCommunityId, abortController.signal)
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
          <RankingUser
            key={index}
            rank={user.rank}
            avatarUrl={user.user.avatarUrl}
            nickname={user.user.nickname}
            displayMoney={user.user.displayMoney}
            totalMoney={user.user.totalMoney}
            value={user.value}
          />
        ))
      }
    </div>
  )
}

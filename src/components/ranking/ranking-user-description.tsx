import { formatNumber } from '@/lib/utils'
import { User } from '@/types/User'
import { Check } from 'lucide-react'

interface RankingUserDescriptionProps {
  user: User
}

export default function RankingUserDescription ({
  user
}: RankingUserDescriptionProps) {
  return (
    <div
      className='flex flex-col'
    >
      <span
        className='text-xs font-semibold'
      >
        {user.nickname}
      </span>
      <span
        className='text-xs'
      >
        {user.displayMoney && `${user.totalMoney} € - `}{formatNumber(user.popularity)}
      </span>
    </div>
  )
}

import { formatNumber } from '@/lib/utils'

interface RankingUserDescriptionProps {
  nickname: string
  displayMoney: boolean
  totalMoney: number | undefined
  value: number
}

export default function RankingUserDescription ({
  nickname,
  displayMoney,
  totalMoney,
  value
}: RankingUserDescriptionProps) {
  return (
    <div
      className='flex flex-col'
    >
      <span
        className='text-xs font-semibold'
      >
        {nickname}
      </span>
      <span
        className='text-xs'
      >
        {displayMoney && `${totalMoney} € - `}{formatNumber(value)}
      </span>
    </div>
  )
}

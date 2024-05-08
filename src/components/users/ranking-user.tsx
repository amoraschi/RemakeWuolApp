import { open } from '@tauri-apps/api/shell'
import RankingUserDescription from '@/components/users/ranking-user-description'
import RankingUserAvatar from '@/components/users/ranking-user-avatar'

interface RankingUserProps {
  rank: number
  avatarUrl: string
  nickname: string
  displayMoney: boolean
  totalMoney: number | undefined
  value: number
}

export default function RankingUser ({
  rank,
  nickname,
  avatarUrl,
  displayMoney,
  totalMoney,
  value
}: RankingUserProps) {
  const onProfileClick = () => {
    open(`https://wuolah.com/profile/${nickname}`)
  }

  return (
    <div
      className='flex gap-2 p-2 rounded-md cursor-pointer transition hover:bg-gray-100 dark:hover:bg-gray-800'
      onClick={onProfileClick}
    >
      <RankingUserAvatar
        rank={rank}
        avatarUrl={avatarUrl}
        nickname={nickname}
      />
      <RankingUserDescription
        nickname={nickname}
        displayMoney={displayMoney}
        totalMoney={totalMoney}
        value={value}
      />
    </div>
  )
}

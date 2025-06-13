import { open } from '@tauri-apps/api/shell'
import RankingUserDescription from '@/components/ranking/ranking-user-description'
import RankingUserAvatar from '@/components/ranking/ranking-user-avatar'
import { User } from '@/types/User'

interface RankingUserProps {
  rank: number
  user: User
}

export default function RankingUser ({
  rank,
  user
}: RankingUserProps) {
  const onProfileClick = () => {
    open(`https://wuolah.com/profile/${user.nickname}`)
  }

  return (
    <div
      className='flex gap-2 p-2 rounded-md cursor-pointer transition hover:bg-gray-100 dark:hover:bg-gray-800'
      onClick={onProfileClick}
    >
      <RankingUserAvatar
        rank={rank}
        user={user}
      />
      <RankingUserDescription
        user={user}
      />
    </div>
  )
}

import { open } from '@tauri-apps/api/shell'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserRank } from '@/types/User'
import { formatNumber } from '@/lib/utils'

interface RankerProps {
  user: UserRank
}

export default function Ranker ({ user }: RankerProps) {
  const onProfileClick = () => {
    open(`https://wuolah.com/profile/${user.user.nickname}`)
  }

  return (
    <div
      className='flex gap-2 p-2 rounded-md cursor-pointer transition hover:bg-gray-100 dark:hover:bg-gray-800'
      onClick={onProfileClick}
    >
      <Avatar
        className={`my-auto w-7 h-7 border-2 ${user.rank === 1 ? 'border-yellow-500' : user.rank === 2 ? 'border-gray-500' : user.rank === 3 ? 'border-yellow-700' : ''}`}
      >
        <AvatarImage
          src={user.user.avatarUrl}
        />
        <AvatarFallback
          className='text-xs font-semibold'
        >
          {user.user.nickname.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div
        className='flex flex-col'
      >
        <span
          className='text-xs font-semibold'
        >
          {user.user.nickname}
        </span>
        <span
          className='text-xs'
        >
          {user.user.displayMoney && `${user.user.totalMoney} € - `}{formatNumber(user.value)}
        </span>
      </div>
    </div>
  )
}

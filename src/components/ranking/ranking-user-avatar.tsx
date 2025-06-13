import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from '@/types/User'

interface RankingUserAvatarProps {
  rank: number
  user: User
}

export default function RankingUserAvatar ({
  rank,
  user
}: RankingUserAvatarProps) {
  return (
    <Avatar
      className={`my-auto w-7 h-7 border-2 ${rank === 1 ? 'border-yellow-500' : rank === 2 ? 'border-gray-500' : rank === 3 ? 'border-yellow-700' : ''}`}
    >
      <AvatarImage
        src={user.avatarUrl}
      />
      <AvatarFallback
        className='text-xs font-semibold'
      >
        {user.nickname.slice(0, 2)}
      </AvatarFallback>
    </Avatar>
  )
}

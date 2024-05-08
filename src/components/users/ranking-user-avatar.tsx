import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface RankingUserAvatarProps {
  rank: number
  avatarUrl: string
  nickname: string
}

export default function RankingUserAvatar ({
  rank,
  avatarUrl,
  nickname
}: RankingUserAvatarProps) {
  return (
    <Avatar
      className={`my-auto w-7 h-7 border-2 ${rank === 1 ? 'border-yellow-500' : rank === 2 ? 'border-gray-500' : rank === 3 ? 'border-yellow-700' : ''}`}
    >
      <AvatarImage
        src={avatarUrl}
      />
      <AvatarFallback
        className='text-xs font-semibold'
      >
        {nickname.slice(0, 2)}
      </AvatarFallback>
    </Avatar>
  )
}

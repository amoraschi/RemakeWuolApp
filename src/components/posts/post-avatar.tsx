import { open } from '@tauri-apps/api/shell'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface PostAvatarProps {
  avatarUrl: string
  nickname: string
}

export default function PostAvatar ({
  avatarUrl,
  nickname
}: PostAvatarProps) {
  const onProfileClick = () => {
    open(`https://wuolah.com/profile/${nickname}`)
  }

  return (
    <Avatar
      className='w-4 h-4 border-2 cursor-pointer hover:scale-110 transition'
      onClick={onProfileClick}
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

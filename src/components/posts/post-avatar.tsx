import { open } from '@tauri-apps/api/shell'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Avatar
            className='w-5 h-5 border-2 cursor-pointer hover:scale-110 transition'
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
        </TooltipTrigger>
        <TooltipContent>
          {nickname}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

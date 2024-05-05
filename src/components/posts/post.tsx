import { CommunityPost } from '@/types/Community'
import { MessageCircleMore, MessageCircleQuestion } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const subTypes = [
  {
    name: 'publication',
    icon: <MessageCircleMore
      className='w-4 h-4 text-blue-500'
    />
  },
  {
    name: 'doubt',
    icon: <MessageCircleQuestion
      className='w-4 h-4 text-yellow-500'
    />
  }
]

interface PostProps {
  post: CommunityPost
}

export default function Post ({ post }: PostProps) {
  return (
    <div
      className='flex flex-col gap-2 p-4 rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-800'
    >
      <span
        className='flex items-center gap-1 font-semibold text-sm'
      >
        {subTypes.find(i => i.name === post.entitySubtype)?.icon}
        {post.entitySubtype.toUpperCase()}{post.title != null ? ` - ${post.title}` : ''}
      </span>
      <div
        className='flex flex-row gap-1 text-xs'
      >
        <Avatar
          className='w-4 h-4 border-2'
        >
          <AvatarImage
            src={post.profile.avatarUrl}
          />
          <AvatarFallback
            className='text-xs font-semibold'
          >
            {post.profile.nickname.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <span
          className='font-semibold'
        >
          {post.profile.nickname}
        </span>
        {' | '}
        <span
          className='truncate'
        >
          {post.description}
        </span>
      </div>
    </div>
  )
}

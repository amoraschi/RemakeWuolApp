import { CommunityPost } from '@/types/Community'

interface PostProps {
  post: CommunityPost
}

export default function Post ({ post }: PostProps) {
  return (
    <div
      className='flex flex-col gap-2 p-2 rounded-md transition hover:bg-gray-100 dark:hover:bg-gray-800'
    >
      <span
        className='font-semibold text-sm'
      >
        {post.entitySubtype.toUpperCase()}{post.title != null ? ` - ${post.title}` : ''}
      </span>
      <div
        className='flex flex-row gap-2 text-xs'
      >
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

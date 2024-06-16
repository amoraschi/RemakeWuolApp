import PostAvatar from './post-avatar'

interface PostCommentProps {
  nickname: string
  text: string
  avatarUrl: string
}

export default function PostComment ({
  nickname,
  text,
  avatarUrl
}: PostCommentProps) {
  return (
    <div
      className='flex flex-col text-sm'
    >
      <div
        className='flex flex-row gap-2 mb-1 items-center'
      >
        <PostAvatar
          avatarUrl={avatarUrl}
          nickname={nickname}
        />
        <span
          className='font-bold'
        >
          {nickname}
        </span>
      </div>
      <span>
        {text}
      </span>
    </div>
  )
}

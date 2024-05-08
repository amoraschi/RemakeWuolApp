interface PostDescriptionProps {
  nickname: string
  description: string
}

export default function PostDescription ({
  nickname,
  description
}: PostDescriptionProps) {
  return (
    <div
      className='truncate'
    >
      <span
        className='font-semibold'
      >
        {nickname}
      </span>
      {' | '}
      {description}
    </div>
  )
}

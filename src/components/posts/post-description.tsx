interface PostDescriptionProps {
  description: string
}

export default function PostDescription ({
  description
}: PostDescriptionProps) {
  return (
    <div
      className='truncate'
    >
      {description}
    </div>
  )
}

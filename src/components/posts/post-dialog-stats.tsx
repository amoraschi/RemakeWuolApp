import { MessageCircle, ThumbsUp } from 'lucide-react'

interface PostDialogStatsProps {
  numLikes: number
  numComments: number
}

export default function PostDialogStats ({
  numLikes,
  numComments
}: PostDialogStatsProps) {
  return (
    <div
      className='flex items-center mr-auto text-gray-500 text-sm'
    >
      <ThumbsUp
        className='w-4 h-4 mr-1'
      />
      {numLikes}
      <MessageCircle
        className='w-4 h-4 ml-4 mr-1'
      />
      {numComments}
    </div>
  )
}

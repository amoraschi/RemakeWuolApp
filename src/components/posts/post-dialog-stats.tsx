import { ThumbsUp } from 'lucide-react'
import PostCommentsDialog from '@/components/posts/post-comments-dialog'

interface PostDialogStatsProps {
  numLikes: number
  numComments: number
  entityId: number
}

export default function PostDialogStats ({
  numLikes,
  numComments,
  entityId
}: PostDialogStatsProps) {
  return (
    <div
      className='flex items-center mr-auto text-gray-500 text-sm'
    >
      <ThumbsUp
        className='w-4 h-4 mr-1'
      />
      {numLikes}
      {/* <MessageCircle
        className='w-4 h-4 ml-4 mr-1'
      /> */}
      <PostCommentsDialog
        entityId={entityId}
      />
      {numComments}
    </div>
  )
}

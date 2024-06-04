import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import PostAvatar from '@/components/posts/post-avatar'
import PostDialogStats from '@/components/posts/post-dialog-stats'
import PostCommentsDialog from './post-comments-dialog'

interface PostDialogProps {
  hasTitle: boolean
  title: string | undefined
  hasSubject: boolean
  subject: string | undefined
  description: string
  nickname: string
  avatarUrl: string
  numLikes: number
  numComments: number
  entityId: number
}

export default function PostDialog ({
  hasTitle,
  title,
  hasSubject,
  subject,
  description,
  nickname,
  avatarUrl,
  numLikes,
  numComments,
  entityId
}: PostDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        {
          hasTitle && (
            <DialogTitle>
              {title}
            </DialogTitle>
          )
        }
        {
          hasSubject && (
            <DialogDescription>
              {subject}
            </DialogDescription>
          )
        }
      </DialogHeader>
      <span>
        {description}
      </span>
      <DialogFooter
        className='items-center'
      >
        <PostDialogStats
          numLikes={numLikes}
          numComments={numComments}
          entityId={entityId}
        />
        <PostAvatar
          avatarUrl={avatarUrl}
          nickname={nickname}
        />
      </DialogFooter>
    </DialogContent>
  )
}

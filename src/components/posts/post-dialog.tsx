import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CommunityPost } from '@/types/Community'

interface PostDialogProps {
  post: CommunityPost
}

export default function PostDialog ({ post }: PostDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {post.title}
        </DialogTitle>
        {
          post.subject != null && (
            <DialogDescription>
              {post.subject.name}
            </DialogDescription>
          )
        }
      </DialogHeader>
      {post.description}
      <DialogFooter
        className='items-center'
      >
        <span
          className='text-xs font-semibold'
        >
          {post.profile.nickname}
        </span>
        <Avatar
          className='w-5 h-5 border-2'
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
      </DialogFooter>
    </DialogContent>
  )
}

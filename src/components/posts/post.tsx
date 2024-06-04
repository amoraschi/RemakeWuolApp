import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import PostDialog from '@/components/posts/post-dialog'
import PostAvatar from '@/components/posts/post-avatar'
import PostTitle from '@/components/posts/post-title'
import PostDescription from '@/components/posts/post-description'
import PostDate from '@/components/posts/post-date'

interface PostProps {
  entitySubtype: string
  hasTitle: boolean
  title: string | undefined
  hasSubject: boolean
  subject: string | undefined
  description: string
  nickname: string
  avatarUrl: string
  numLikes: number
  numComments: number
  createdAt: string
  entityId: number
}

export default function Post ({
  entitySubtype,
  hasTitle,
  title,
  hasSubject,
  subject,
  description,
  nickname,
  avatarUrl,
  numLikes,
  numComments,
  createdAt,
  entityId
}: PostProps) {
  return (
    <Dialog>
      <DialogTrigger
        asChild
      >
        <div
          className='flex flex-col gap-2 p-2 rounded-md cursor-pointer transition hover:bg-gray-100 dark:hover:bg-gray-800'
        >
          <div
            className='flex justify-between'
          >
            <PostTitle
              entitySubtype={entitySubtype}
              hasTitle={hasTitle}
              title={title}
            />
            <PostDate
              createdAt={createdAt}
            />
          </div>
          <div
            className='flex flex-row gap-2 text-xs items-center'
          >
            <PostAvatar
              avatarUrl={avatarUrl}
              nickname={nickname}
            />
            <PostDescription
              description={description}
              nickname={nickname}
            />
          </div>
        </div>
      </DialogTrigger>
      <PostDialog
        hasTitle={hasTitle}
        title={title}
        hasSubject={hasSubject}
        subject={subject}
        description={description}
        nickname={nickname}
        avatarUrl={avatarUrl}
        numLikes={numLikes}
        numComments={numComments}
        entityId={entityId}
      />
    </Dialog>
  )
}

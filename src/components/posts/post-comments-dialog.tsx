import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { getLocalItem, setLocalItem } from '@/lib/storage'
import { fetchPostComments } from '@/lib/api'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Loader from '@/components/loader'
import PostComment from '@/components/posts/post-comment'

interface PostCommentsDialogProps {
  entityId: number
}

export default function PostCommentsDialog ({
  entityId
}: PostCommentsDialogProps) {
  const [comments, setComments] = useState<any[]>([])

  useEffect(() => {
    const storedComments = getLocalItem(`comments-${entityId}`, true)

    if (storedComments != null) {
      setComments(storedComments)
      return
    }

    const abortController = new AbortController()
    const fetch = async () => {
      const fetchedComments = await fetchPostComments(`${entityId}`, abortController.signal)
      if (fetchedComments != null) {
        setLocalItem(`comments-${entityId}`, fetchedComments.items, true)
        setComments(fetchedComments.items)
      }
    }

    fetch()

    return () => {
      abortController.abort('Component unmounted')
    }
  }, [])

  return (
    <Dialog>
      <DialogTrigger>
        <MessageCircle
          className='w-4 h-4 ml-4 mr-1 text-gray-500 text-sm'
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Comentarios
          </DialogTitle>
        </DialogHeader>
        {
          comments == null ? (
            <Loader />
          ) : (
            comments.map((comment, index) => (
              <PostComment
                key={index}
                nickname={comment.author.nickname}
                text={comment.text}
                avatarUrl={comment.author.avatarUrl}
              />
            ))
          )
        }
      </DialogContent>
    </Dialog>
  )
}

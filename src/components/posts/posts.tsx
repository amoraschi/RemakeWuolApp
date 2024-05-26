import { useEffect, useState } from 'react'
import { fetchPosts } from '@/lib/api'
import { getLocalItem } from '@/lib/storage'
import { CommunityPost } from '@/types/Community'
import Post from '@/components/posts/post'

export default function Posts () {
  const [posts, setPosts] = useState<CommunityPost[]>([])

  useEffect(() => {
    const storedUserInfo = getLocalItem('userInfo', true)

    if (storedUserInfo == null) {
      return
    }

    const abortController = new AbortController()
    const fetch = async () => {
      const fetchedPosts = await fetchPosts(storedUserInfo.defaultCommunityId, abortController.signal)
      if (fetchedPosts != null) {
        setPosts(fetchedPosts.items)
      }
    }

    fetch()

    return () => {
      abortController.abort('Component unmounted')
    }
  }, [])

  return (
    <div
      className='flex flex-col w-1/2 gap-2 border-[1px] p-4 rounded-md'
    >
      <span
        className='font-semibold'
      >
        NUEVAS PUBLICACIONES
      </span>
      {
        posts.map((post, index) => (
          <Post
            key={index}
            entitySubtype={post.entitySubtype}
            hasTitle={post.title != null}
            title={post.title}
            hasSubject={post.subject != null}
            subject={post.subject?.name}
            description={post.description}
            nickname={post.profile.nickname}
            avatarUrl={post.profile.avatarUrl}
            numLikes={post.stats.numLikes}
            numComments={post.stats.numComments}
            createdAt={post.createdAt}
          />
        ))
      }
    </div>
  )
}

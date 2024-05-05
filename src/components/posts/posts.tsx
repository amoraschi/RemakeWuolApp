import { useEffect, useState } from 'react'
import { fetchPosts } from '@/lib/api'
import { getLocalItem, setLocalItem } from '@/lib/storage'
import { CommunityPost } from '@/types/Community'
import Post from '@/components/posts/post'

export default function Posts () {
  const [posts, setPosts] = useState<CommunityPost[]>([])

  useEffect(() => {
    const storedMe = getLocalItem('me', true)
    const storedPosts = getLocalItem('posts', true)

    if (storedMe == null) {
      return
    }

    if (storedPosts != null) {
      setPosts(storedPosts)
      return
    }

    const abortController = new AbortController()
    const fetch = async () => {
      const fetchedPosts = await fetchPosts(storedMe.defaultCommunityId, abortController.signal)
      console.log(fetchedPosts.items)
      if (fetchedPosts != null) {
        setLocalItem('posts', fetchedPosts.items, true)
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
      className='flex flex-col flex-grow col-span-2 gap-2 border-[1px] p-4 rounded-md'
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
            post={post}
          />
        ))
      }
    </div>
  )
}

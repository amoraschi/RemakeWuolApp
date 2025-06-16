import { User } from '@/types/User'
import { getConfig } from '@/lib/storage'

export async function fetchMe (signal?: AbortSignal): Promise<User | null> {
  const storedTokens = await getConfig()

  if (storedTokens == null) {
    return null
  }

  const response = await fetch('https://api.wuolah.com/v2/me', {
    signal,
    headers: {
      Authorization: `Bearer ${storedTokens.accessToken}`
    }
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}

export async function fetchRanking (communityId: string | number, signal?: AbortSignal): Promise<any | null> {
  const storedTokens = await getConfig()

  if (storedTokens == null) {
    return null
  }

  const parameters = `populate[0]=user&pagination[page]=0&pagination[pageSize]=5&filter[communityId]=${communityId}&filter[criteria]=community`
  const response = await fetch(`https://api.wuolah.com/v2/rankings/users?${parameters}`, {
    signal,
    headers: {
      Authorization: `Bearer ${storedTokens.accessToken}`
    }
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}

export async function fetchPosts (communityId: string, signal?: AbortSignal): Promise<any | null> {
  const storedTokens = await getConfig()

  if (storedTokens == null) {
    return null
  }

  const parameters = 'filter[entityType][0]=social&populate[0]=profile&populate[1]=subject&pagination[size]=6&pagination[offset]=0'
  const response = await fetch(`https://api.wuolah.com/v2/search/communities/${communityId}/artifacts?${parameters}`, {
    signal,
    headers: {
      Authorization: `Bearer ${storedTokens.accessToken}`
    }
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}

export async function fetchPostComments (postId: string, signal?: AbortSignal): Promise<any | null> {
  const storedTokens = await getConfig()

  if (storedTokens == null) {
    return null
  }

  const parameters = 'sort=-created&populate[0]=author&pagination[page]=0&pagination[pageSize]=100'
  const response = await fetch(`https://api.wuolah.com/v2/socials/${postId}/comments?${parameters}`, {
    signal,
    headers: {
      Authorization: `Bearer ${storedTokens.accessToken}`
    }
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}

export async function fetchSubjects (communityId: string | number, signal?: AbortSignal): Promise<any | null> {
  const storedTokens = await getConfig()

  if (storedTokens == null) {
    return null
  }

  const parameters = `populate[0]=subject&populate[1]=community&pagination[page]=0&pagination[pageSize]=9999`
  const response = await fetch(`https://api.wuolah.com/v2/communities/${communityId}/subjects?${parameters}`, {
    signal,
    headers: {
      Authorization: `Bearer ${storedTokens.accessToken}`
    }
  })

  if (!response.ok) {
    return null
  }

  return response.json()
}

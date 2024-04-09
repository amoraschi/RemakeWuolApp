import { getLocalItem } from '@/lib/storage'
import { User } from '@/types/User'

export async function fetchMe (signal?: AbortSignal): Promise<User | null> {
  const storedTokens = getLocalItem('tokens', true)
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

export async function fetchRanking (communityId: string, signal?: AbortSignal): Promise<any | null> {
  const storedTokens = getLocalItem('tokens', true)
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

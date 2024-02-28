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

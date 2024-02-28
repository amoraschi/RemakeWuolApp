import { LoginReponse } from '@/types/Shared'

export async function getTokens (username: string, password: string): Promise<LoginReponse | null> {
  const response = await fetch('https://api.wuolah.com/login', {
    method: 'POST',
    body: JSON.stringify({
      account: username,
      password: password
    }),
    cache: 'no-store'
  })

  if (response.status !== 200) {
    return null
  }

  return response.json()
}

export async function isTokenValid (tokens: LoginReponse): Promise<boolean> {
  const tokenExpiration = new Date(tokens.expires)

  if (tokenExpiration < new Date()) {
    return false
  }

  return true
}

import { LoginReponse } from '@/types/Shared'
// import { invoke } from '@tauri-apps/api/tauri'

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

  // return await invoke('fetch_auth_tokens', { username, password })
}

export async function isTokenValid (tokens: LoginReponse): Promise<boolean> {
  const tokenExpiration = new Date(tokens.expires)

  if (tokenExpiration < new Date()) {
    return false
  }

  return true
}

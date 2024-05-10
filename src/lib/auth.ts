import { LoginReponse } from '@/types/Shared'
import { invoke } from '@tauri-apps/api/tauri'

export async function getTokens (username: string, password: string): Promise<LoginReponse | null> {
  try {
    return await invoke<LoginReponse>('fetch_auth_tokens', { username, password })
  } catch (e) {
    return null
  }
}

// export async function isTokenValid (tokens: LoginReponse): Promise<boolean> {
//   // return await invoke('is_token_valid', { tokens })
//   try {
//     const result = await invoke<{ expired: boolean }>('is_token_valid', { tokens })
//     return result.expired
//   } catch (e) {
//     return false
//   }
// }

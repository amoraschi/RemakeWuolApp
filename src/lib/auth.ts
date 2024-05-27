import { LoginReponse } from '@/types/Shared'
import { invoke } from '@tauri-apps/api/tauri'

export async function getTokens (username: string, password: string): Promise<LoginReponse | null> {
  try {
    return await invoke<LoginReponse>('fetch_auth_tokens', { username, password })
  } catch (e) {
    return null
  }
}

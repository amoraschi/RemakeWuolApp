import { Config } from '@/types/Shared'
import { invoke } from '@tauri-apps/api/tauri'

export async function getConfig (): Promise<Config | null> {
  try {
    const config = await invoke<Config>('get_config')
    return config
  } catch (e) {
    return null
  }
}

export async function setConfig (config: Config): Promise<void> {
  try {
    await invoke('set_config', { config })
  } catch (e) {
    console.log(e)
  }
}

import { Config } from '@/types/Shared'
import { invoke } from '@tauri-apps/api/tauri'

export function setLocalItem (key: string, value: any, stringify: boolean = false): void {
  if (stringify) {
    localStorage.setItem(key, JSON.stringify(value))
    return
  }

  localStorage.setItem(key, value)
}

export function getLocalItem (key: string, parse: boolean = false): any | null {
  const item = localStorage.getItem(key)
  if (item == null) {
    return null
  }

  if (parse) {
    return JSON.parse(item)
  }

  return item
}

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

import { Config } from '@/types/Shared'
// import { BaseDirectory, exists, readTextFile, writeTextFile } from '@tauri-apps/api/fs'
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
  // const existsFile = await exists('wuolapp.json', {
  //   dir: BaseDirectory.LocalData
  // })

  // if (!existsFile) {
  //   await writeTextFile('wuolapp.json', '{}', {
  //     dir: BaseDirectory.LocalData
  //   })
  // }

  // const config = await readTextFile('wuolapp.json', {
  //   dir: BaseDirectory.LocalData
  // })

  try {
    const config = await invoke<Config>('get_config')
    return config
  } catch (e) {
    return null
  }
}

export async function setConfig (config: Config): Promise<void> {
  // console.log('Config:', 'Local')

  // await writeTextFile('wuolapp.json', JSON.stringify(config), {
  //   dir: BaseDirectory.LocalData
  // })

  try {
    await invoke('set_config', { config })
  } catch (e) {
    // console.error(e)
  }
}

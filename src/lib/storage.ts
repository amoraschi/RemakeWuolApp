import { Config } from '@/types/Shared'
import { BaseDirectory, exists, readTextFile, writeTextFile } from '@tauri-apps/api/fs'

export function setLocaItem (key: string, value: any, stringify: boolean = false): void {
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

export async function getConfig (): Promise<Config> {
  const existsFile = await exists('wuolapp.json', {
    dir: BaseDirectory.LocalData
  })

  if (!existsFile) {
    await writeTextFile('wuolapp.json', '{}', {
      dir: BaseDirectory.LocalData
    })
  }

  const config = await readTextFile('wuolapp.json', {
    dir: BaseDirectory.LocalData
  })

  return JSON.parse(config)
}

export async function setConfig (config: Config): Promise<void> {
  console.log('Config:', 'Local')

  await writeTextFile('wuolapp.json', JSON.stringify(config), {
    dir: BaseDirectory.LocalData
  })
}

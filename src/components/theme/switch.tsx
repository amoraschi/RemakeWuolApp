'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function ThemeSwitch () {
  const { theme, setTheme } = useTheme()

  return (
    <div
      className='fixed bottom-4 right-4 z-50'
    >
      {
        theme === 'light' ? (
          <Button
            variant='outline'
            onClick={() => setTheme('dark')}
          >
            <Moon
              size={24}
            />
          </Button>
        ) : (
          <Button
            variant='outline'
            onClick={() => setTheme('light')}
          >
            <Sun
              size={24}
            />
          </Button>
        )
      }
    </div>
  )
}

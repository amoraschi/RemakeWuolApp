'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export function ThemeProvider ({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export default function ThemeSwitch () {
  const { theme, setTheme } = useTheme()
  const [hasMounted, setHasMounted] = useState(false)


  useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <div
      className='fixed bottom-4 right-4 z-50'
    >
      {
        hasMounted && theme === 'light' ? (
          <Button
            variant='outline'
            className='px-2 py-1'
            onClick={() => setTheme('dark')}
          >
            <Moon
              className='w-6 h-6'
            />
          </Button>
        ) : (
          <Button
            variant='outline'
            className='px-2 py-1'
            onClick={() => setTheme('light')}
          >
            <Sun
              className='w-6 h-6'
            />
          </Button>
        )
      }
    </div>
  )
}

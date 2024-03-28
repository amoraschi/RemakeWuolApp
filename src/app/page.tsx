'use client'

import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home () {
  const router = useRouter()
  const [isStarting, setIsStarting] = useState(false)

  const onClick = () => {
    setIsStarting(true)
    router.push('/login')
  }

  return (
    <main
      className='grid place-items-center h-screen w-screen'
    >
      <Button
        disabled={isStarting}
        onClick={onClick}
      >
        {
          isStarting && (
            <Loader2
              className='mr-2 h-4 w-4 animate-spin'
            />
          )
        }
        Entrar
      </Button>
    </main>
  )
}

'use client'

import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Home () {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  }, [])

  return (
    <main
      className='grid place-items-center h-screen w-screen'
    >
      <Button
        disabled
      >
        <Loader2
          className='mr-2 h-4 w-4 animate-spin'
        /> Cargando
      </Button>
    </main>
  )
}

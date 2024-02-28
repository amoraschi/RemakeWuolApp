'use client'

import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home () {
  const router = useRouter()
  const [hasMounted, setHasMounted] = useState(false)

  const onClick = () => {
  }

  useEffect(() => {
    setHasMounted(true)
    router.push('/login')
  }, [])

  return (
    <main
      className='grid place-items-center h-screen w-screen'
    >
      {
        !hasMounted && (
          <Button
            disabled
            onClick={onClick}
          >
            <Loader2
              className='mr-2 h-4 w-4 animate-spin'
            /> Cargando
          </Button>
        )
      }
    </main>
  )
}

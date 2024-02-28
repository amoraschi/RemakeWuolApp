'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getLocalItem } from '@/lib/storage'
import { useRouter } from 'next/navigation'

export default function NotFound () {
  const router = useRouter()

  const onClick = () => {
    const user = getLocalItem('user')
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  return (
    <main
      className='grid place-items-center h-screen w-screen'
    >
      <Card>
        <CardHeader>
          <CardTitle>
            Página no encontrada
          </CardTitle>
          <CardDescription>
            La página que buscas no existe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={onClick}
          >
            Volver al inicio
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}

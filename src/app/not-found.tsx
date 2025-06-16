'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function NotFound () {
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
          <Link
            href='/'
            className={buttonVariants()}
          >
            Volver al inicio
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}

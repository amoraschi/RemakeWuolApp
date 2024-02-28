'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getTokens } from '@/lib/auth'
import { useToast } from '@/components/ui/use-toast'
import { getConfig, getLocalItem, setConfig, setLocalItem } from '@/lib/storage'

const schema = z.object({
  username: z.string().email('Correo electrónico inválido'),
  password: z.string().min(8, {
    message: 'La contraseña debe tener entre 8 y 32 caracteres'
  }).max(32, {
    message: 'La contraseña debe tener entre 8 y 32 caracteres'
  })
})

export default function AuthLogin () {
  const [isDisabled, setIsDisabled] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsDisabled(true)

    const tokens = await getTokens(data.username, data.password)
    if (tokens == null) {
      showErrorToast()
      setIsDisabled(false)
      return
    }

    setLocalItem('tokens', tokens, true)
    setLocalItem('user', data, true)
    setConfig({
      ...data,
      ...tokens
    })

    showSuccessToast()

    router.push('/dashboard')
  }

  const showErrorToast = () => {
    toast({
      variant: 'destructive',
      title: 'Error al iniciar sesión',
      description: 'No se ha podido iniciar sesión, revisa tus credenciales e inténtalo de nuevo',
    })
  }

  const showSuccessToast = () => {
    toast({
      title: 'Inicio de sesión exitoso',
      description: 'Has iniciado sesión correctamente'
    })
  }

  useEffect(() => {
    const user = getLocalItem('user', true)
    if (user != null) {
      form.setValue('username', user.username)
      form.setValue('password', user.password)
    }

    const setFromConfig = async () => {
      const config = await getConfig()

      if (config != null) {
        form.setValue('username', config.username)
        form.setValue('password', config.password)
      }
    }

    setFromConfig()
  }, [])

  return (
    <Card
      className='w-96'
    >
      <CardHeader>
        <CardTitle>
          Iniciar sesión
        </CardTitle>
        <CardDescription>
          Inicia sesión con tu cuenta de Wuolah
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form
          {...form}
        >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Correo electrónico
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='wuoler@gmail.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Contraseña
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='********'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              disabled={isDisabled}
            >
              {
                isDisabled && (
                  <Loader2
                    className='mr-2 h-4 w-4 animate-spin'
                  />
                )
              }
              Iniciar sesión
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
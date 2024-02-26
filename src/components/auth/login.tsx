'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormItem
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    setIsDisabled(true)
    router.push('/dashboard')
    setIsDisabled(false)
  }

  return (
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
          Submit
        </Button>
      </form>
    </Form>
  )
}
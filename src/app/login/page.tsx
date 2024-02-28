import AuthLogin from '@/components/auth/login'
import { Toaster } from '@/components/ui/toaster'

export default function Login () {
  return (
    <main
      className='flex justify-center items-center h-screen w-screen'
    >
      <AuthLogin />
      <Toaster />
    </main>
  )
}

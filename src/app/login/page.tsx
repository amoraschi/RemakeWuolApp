import AuthLogin from '@/components/auth/login'
import ThemeSwitch from '@/components/theme/switch'

export default function Login () {
  return (
    <main
      className='grid place-items-center h-screen w-screen'
    >
      <AuthLogin />
      <div
        className='fixed bottom-4 right-4'
      >
        <ThemeSwitch />
      </div>
    </main>
  )
}

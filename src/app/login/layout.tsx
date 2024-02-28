import { Toaster } from '@/components/ui/toaster'

export default function DashboardLayout ({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section
      className='flex'
    >
      {children}
      <Toaster />
    </section>
  )
}

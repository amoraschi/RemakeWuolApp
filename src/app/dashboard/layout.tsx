import SidebarTabs from '@/components/sidebar/tabs'
import { Toaster } from '@/components/ui/toaster'

export default function DashboardLayout ({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section
      className='flex'
    >
      <SidebarTabs />
      {children}
      <Toaster />
    </section>
  )
}

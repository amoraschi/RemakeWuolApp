import SidebarTabs from '@/components/sidebar/tabs'
import { Separator } from '@/components/ui/separator'

export default function RootLayout ({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section
      className='flex'
    >
      <SidebarTabs />
      {children}
    </section>
  )
}

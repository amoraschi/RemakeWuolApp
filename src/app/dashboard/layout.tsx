import SidebarTabs from '@/components/sidebar/tabs'

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

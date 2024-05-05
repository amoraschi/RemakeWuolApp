import SidebarTabs from '@/components/sidebar/tabs'

export default function DashboardLayout ({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <SidebarTabs />
      {children}
    </section>
  )
}

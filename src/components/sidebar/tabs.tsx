import Link from 'next/link'
import { File, Gift, GraduationCap, Home, UserRound, UsersRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SidebarProfile from '@/components/sidebar/profile'

const tabs = [
  {
    name: 'Inicio',
    path: '/dashboard',
    icon: <Home className='mr-2 h-5 w-5' />
  },
  {
    name: 'Asignaturas',
    path: '/dashboard/subjects',
    icon: <GraduationCap className='mr-2 h-5 w-5' />
  },
  {
    name: 'Archivos',
    path: '/dashboard/files',
    icon: <File className='mr-2 h-5 w-5' />
  },
  {
    name: 'Profesores',
    path: '/dashboard/teachers',
    icon: <UsersRound className='mr-2 h-5 w-5' />
  },
  {
    name: 'Sorteos',
    path: '/dashboard/giveaways',
    icon: <Gift className='mr-2 h-5 w-5' />
  }
]

export default function SidebarTabs () {
  return (
    <nav
      className='flex flex-col w-1/6 h-screen'
    >
      <ul>
        {
          tabs.map((tab, index) => (
            <Button
              key={index}
              variant='ghost'
              className='w-full justify-start rounded-none py-7'
              asChild
            >
              <Link
                href={tab.path}
              >
                {tab.icon}
                {tab.name}
              </Link>
            </Button>
          ))
        }
      </ul>
      <SidebarProfile />
    </nav>
  )
}

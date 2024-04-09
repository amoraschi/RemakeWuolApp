import Link from 'next/link'
import { ChevronRight, File, Gift, GraduationCap, Home, PanelLeftOpen, UsersRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SidebarProfile from '@/components/sidebar/profile'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

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
    <Sheet>
      <SheetTrigger
        asChild
      >
        <Button
          variant='outline'
          className='fixed bottom-4 left-4 p-2'
        >
          <PanelLeftOpen
            className='h-6 w-6'
          />
        </Button>
      </SheetTrigger>
      <SheetContent
        side='left'
      >
        <ul
          className='mt-4'
        >
          {
            tabs.map((tab, index) => (
              <Button
                key={index}
                variant='ghost'
                className='w-full justify-start rounded-none py-7 text-lg'
                asChild
              >
                <Link
                  href={tab.path}
                >
                  {tab.icon}
                  {tab.name}
                  <ChevronRight
                    className='ml-auto h-5 w-5'
                  />
                </Link>
              </Button>
            ))
          }
        </ul>
      </SheetContent>
    </Sheet>
  )
}

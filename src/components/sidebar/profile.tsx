import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { UserRound } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export default function SidebarProfile () {
  return (
    <div
      className='flex mt-auto px-1 mb-1 w-full'
    >
      <Card
        className='flex items-center p-2 gap-2 w-full'
      >
        <Avatar
          className='grid place-items-center w-fit'
        >
          <AvatarImage
            src='https://avatars.githubusercontent.com/u/68395930?v=4'
            alt='Avatar'
            className='h-7 w-7 rounded-full'
          />
          <AvatarFallback>
            <UserRound
              className='h-5 w-5'
            />
          </AvatarFallback>
        </Avatar>
        <div
          className='flex flex-col w-full overflow-hidden'
        >
          <span
            className='text-sm font-semibold pt-1'
          >
            Usuario
          </span>
          <Popover>
            <PopoverTrigger
              asChild
            >
              <Button
                variant='link'
                className='text-xs text-gray-500 h-fit w-fit p-0 pb-1'
              >
                Grado en Ingeniería Informática - Ingeniería del Software
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div
                className='flex'
              >
                <Avatar
                  className='flex items-center'
                >
                  <AvatarImage
                    src='https://avatars.githubusercontent.com/u/68395930?v=4'
                    alt='Avatar'
                    className='h-7 w-7 rounded-full'
                  />
                  <AvatarFallback>
                    <UserRound className='h-5 w-5' />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <span
                    className='text-md font-semibold'
                  >
                    Universidad de Sevilla
                  </span>
                  <br />
                  <span
                    className='text-sm'
                  >
                    Escuela Técnica Superior de Ingeniería Informática
                  </span>
                  <br />
                  <span
                    className='text-xs'
                  >
                    Grado en Ingeniería Informática - Ingeniería del Software
                  </span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Card>
    </div>
  )
}

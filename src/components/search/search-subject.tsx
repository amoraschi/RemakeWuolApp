import { Community } from '@/types/Community'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight, FolderInput } from 'lucide-react'
import { MouseEvent } from 'react'

interface SearchSubjectProps {
  subject: Community
}

export default function SearchSubject ({
  subject
}: SearchSubjectProps) {

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    localStorage.setItem('subject', JSON.stringify(subject))
  }

  return (
    <Link
      onClick={handleClick}
      href={`/dashboard/subjects`}
      className={buttonVariants({
        variant: 'outline',
        className: 'flex items-center justify-between'
      })}
    >
      <div
        className='flex justify-start gap-2'
      >
        <FolderInput
          className='w-5 h-5 text-gray-500'
          strokeWidth={1.5}
        />
        <span>
          {subject.name}
        </span>
      </div>
      <ArrowRight
        className='w-5 h-5 text-gray-500'
        strokeWidth={1.5}
      />
    </Link>
  )
}

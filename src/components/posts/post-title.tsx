import { MessageCircleMore, MessageCircleQuestion } from 'lucide-react'

const subTypes = [
  {
    name: 'publication',
    icon: <MessageCircleMore
      className='w-4 h-4 text-blue-500'
    />
  },
  {
    name: 'doubt',
    icon: <MessageCircleQuestion
      className='w-4 h-4 text-yellow-500'
    />
  }
]

interface PostTitleProps {
  entitySubtype: string
  hasTitle: boolean
  title: string | undefined
}

export default function PostTitle ({
  entitySubtype,
  hasTitle,
  title
}: PostTitleProps) {
  return (
    <span
      className='flex items-center gap-1 font-semibold text-sm'
    >
      {subTypes.find(i => i.name === entitySubtype)?.icon}
      {entitySubtype.toUpperCase()}{hasTitle ? ` - ${title}` : ''}
    </span>
  )
}

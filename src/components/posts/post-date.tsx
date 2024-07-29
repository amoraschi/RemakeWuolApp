interface PostDateProps {
  createdAt: string
}

export default function PostDate ({
  createdAt
}: PostDateProps) {
  return (
    <span
      className='text-xs w-fit p-1 rounded-sm bg-gray-100 dark:bg-gray-800'
    >
      {new Date(createdAt).toLocaleDateString()}
    </span>
  )
}

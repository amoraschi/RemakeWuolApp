interface PostDateProps {
  createdAt: string
}

export default function PostDate ({
  createdAt
}: PostDateProps) {
  return (
    <span
      className='text-xs p-1 w-fit rounded-md bg-gray-100 dark:bg-gray-800'
    >
      {new Date(createdAt).toLocaleDateString()}
    </span>
  )
}

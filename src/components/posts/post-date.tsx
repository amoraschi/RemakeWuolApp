interface PostDateProps {
  createdAt: string
}

export default function PostDate ({
  createdAt
}: PostDateProps) {
  return (
    <span
      className='text-xs py-1 px-2 w-fit rounded-md bg-gray-100 dark:bg-gray-800'
    >
      {new Date(createdAt).toLocaleDateString()}
    </span>
  )
}

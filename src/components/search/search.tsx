import { useEffect, useState } from 'react'
import { ArrowRight, FolderInput } from 'lucide-react'
import { fetchCommunity } from '@/lib/api'
import { getLocalItem, setLocalItem } from '@/lib/storage'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Community } from '@/types/Community'

export default function Search () {
  const [courses, setCourses] = useState<Community[]>([])

  useEffect(() => {
    const storedUserInfo = getLocalItem('userInfo', true)
    const storedCourses = getLocalItem('courses', true)

    if (storedUserInfo == null) {
      return
    }

    if (storedCourses != null) {
      setCourses(storedCourses)
      return
    }

    const abortController = new AbortController()
    const fetch = async () => {
      const fetchedCourses = await fetchCommunity(storedUserInfo.defaultCommunityId, abortController.signal)
      console.log(fetchedCourses.data)
      if (fetchedCourses != null) {
        setLocalItem('courses', fetchedCourses.data, true)
        setCourses(fetchedCourses.data)
      }
    }

    fetch()

    return () => {
      abortController.abort('Component unmounted')
    }
  }, [])

  return (
    <div
      className='flex flex-col w-1/2 h-fit gap-2 border-[1px] p-4 rounded-md'
    >
      <span
        className='font-semibold'
      >
        BUSCAR ARCHIVOS
      </span>
      <Input
        placeholder='Buscar documentos, asignaturas o profesores'
      />
      <Button
        className='flex items-center justify-between'
        variant='outline'
      >
        <div
          className='flex justify-start gap-2'
        >
          <FolderInput
            className='w-5 h-5'
          />
          <span
            className='font-semibold'
          >
            {courses.length} ASIGNATURAS
          </span>
        </div>
        <ArrowRight
          className='w-5 h-5'
        />
      </Button>
    </div>
  )
}

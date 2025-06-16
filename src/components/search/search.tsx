import { useEffect, useState } from 'react'
import { fetchSubjects } from '@/lib/api'
import { Input } from '@/components/ui/input'
import { Community } from '@/types/Community'
import { useUserContext } from '@/app/dashboard/layout'
import SearchSubject from './search-subject'

export default function Search () {
  const userInfo = useUserContext()
  const [subjects, setSubjects] = useState<Community[]>([])

  useEffect(() => {
    if (userInfo == null) {
      return
    }

    const abortController = new AbortController()
    const fetch = async () => {
      const fetchedSubjects = await fetchSubjects(userInfo.defaultCommunityId, abortController.signal)
      console.log(fetchedSubjects.data)
      if (fetchedSubjects != null) {
        setSubjects(fetchedSubjects.data)
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
      <div
        className='flex flex-col gap-2 overflow-y-auto max-h-[400px]'
      >
        {
          subjects.map((subject, index) => (
            <SearchSubject
              key={index}
              subject={subject}
            />
          ))
        }
      </div>
    </div>
  )
}

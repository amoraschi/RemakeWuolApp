'use client'

import { fetchSubjects } from '@/lib/api'
import { CommunitySubject } from '@/types/Community'
import { useEffect, useState } from 'react'
import { useUserContext } from '@/app/dashboard/layout'

export default function Subjects () {
  const userInfo = useUserContext()
  const [subjects, setSubjects] = useState<CommunitySubject[]>([])

  useEffect(() => {
    if (userInfo == null) {
      return
    }

    console.log('Fetching subjects for community:', userInfo.defaultCommunityId)
    const abortController = new AbortController()
    const fetch = async () => {
      const fetchedSubjects = await fetchSubjects(userInfo.defaultCommunityId, abortController.signal)
      if (fetchedSubjects != null) {
        console.log(fetchedSubjects)
        setSubjects(fetchedSubjects.data)
      }
    }

    fetch()

    return () => {
      abortController.abort('Component unmounted')
    }
  }, [])

  return (
    <main
      className='h-full w-full p-4'
    >
      <span
        className='font-semibold'
      >
        ASIGNATURAS
      </span>
      <div
        className='flex flex-col justify-center gap-2'
      >
        {
          subjects.map((subject, index) => (
            <span
              key={index}
              className='p-2 border-[1px] rounded-md w-fit hover:bg-gray-100 cursor-pointer'
            >
              {subject.subject.name}
            </span>
          ))
        }
      </div>
    </main>
  )
}

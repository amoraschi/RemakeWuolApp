'use client'

import SidebarTabs from '@/components/sidebar/sidebar-tabs'
import { fetchMe } from '@/lib/api'
import { User } from '@/types/User'
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext<User | null>(null)

export const useUserContext = () => useContext(UserContext)
export default function DashboardLayout ({ children }: Readonly<{ children: React.ReactNode }>) {
  const [userInfo, setUserInfo] = useState<User | null>(null)
  
  useEffect(() => {
    const abortController = new AbortController()
    const fetch = async () => {
      const fetchedUserInfo = await fetchMe(abortController.signal)
      if (fetchedUserInfo != null) {
        setUserInfo(fetchedUserInfo)
      }
    }

    fetch()

    return () => {
      abortController.abort('Component unmounted')
    }
  }, [])
  
  return (
    <UserContext.Provider
      value={userInfo}
    >
      <section>
        <SidebarTabs />
        {children}
      </section>
    </UserContext.Provider>
  )
}

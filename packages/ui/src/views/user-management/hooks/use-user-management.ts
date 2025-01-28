import { useMemo } from 'react'

import { filterItems } from '@/views/user-management/utils'

export const useUserManagement = (userData: any[], searchQuery: string) => {
  const filteredUsers = useMemo(() => {
    return filterItems(userData, searchQuery)
  }, [userData, searchQuery])

  return {
    filteredUsers
  }
}

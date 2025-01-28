import { useMemo } from 'react'

import { filterItems } from '../utils'

export const useUserManagement = (userData: any[], searchQuery: string) => {
  const filteredUsers = useMemo(() => {
    return filterItems(userData, searchQuery)
  }, [userData, searchQuery])

  return {
    filteredUsers
  }
}

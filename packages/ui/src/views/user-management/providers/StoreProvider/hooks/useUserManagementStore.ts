import { useContext } from 'react'

import { StoreContext } from '@views/user-management/providers/StoreProvider'

export const useUserManagementStore = () => {
  const context = useContext(StoreContext)

  if (!context) {
    throw new Error('useUserManagementStore must be used within UserManagementStoreProvider')
  }

  return context
}

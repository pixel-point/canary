import { createContext } from 'react'

import { StoreContextType, StoreProviderProps } from './types'

export const StoreContext = createContext<StoreContextType | undefined>(undefined)

export const UserManagementStoreProvider = ({
  children,
  useAdminListUsersStore,
  useTranslationStore
}: StoreProviderProps) => {
  return (
    <StoreContext.Provider value={{ useAdminListUsersStore, useTranslationStore }}>{children}</StoreContext.Provider>
  )
}

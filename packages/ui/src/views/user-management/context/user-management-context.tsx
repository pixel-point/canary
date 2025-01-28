import { createContext, useContext } from 'react'

import { IAdminListUsersStore, UsersProps } from '@/views/user-management/types'

interface UserManagementContextType {
  useAdminListUsersStore: () => IAdminListUsersStore
  handleDialogOpen: (user: UsersProps | null, dialogLabel: string) => void
  handleUpdateUser: (data: { email: string; displayName: string; userID: string }) => void
  handleDeleteUser: (userUid: string) => void
  handleUpdatePassword: (userId: string) => void
  updateUserAdmin: (userUid: string, isAdmin: boolean) => void
}

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined)

export const UserManagementProvider = ({
  children,
  value
}: {
  children: React.ReactNode
  value: UserManagementContextType
}) => {
  return <UserManagementContext.Provider value={value}>{children}</UserManagementContext.Provider>
}

export const useUserManagement = () => {
  const context = useContext(UserManagementContext)

  if (!context) {
    throw new Error('useUserManagement must be used within UserManagementProvider')
  }

  return context
}

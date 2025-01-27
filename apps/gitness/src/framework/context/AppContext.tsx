import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'

import { noop } from 'lodash-es'

import {
  getUser,
  GetUserErrorResponse,
  membershipSpaces,
  TypesSpace,
  TypesUser,
  updateUser,
  UpdateUserErrorResponse
} from '@harnessio/code-service-client'
import { ProfileSettingsErrorType } from '@harnessio/ui/views'

import useLocalStorage from '../hooks/useLocalStorage'

interface AppContextType {
  spaces: TypesSpace[]
  setSpaces: (value: TypesSpace[]) => void
  addSpaces: (newSpaces: TypesSpace[]) => void
  currentUser?: TypesUser
  setCurrentUser: (value: TypesUser) => void
  fetchUser: () => Promise<void>
  updateUserProfile: (data: { display_name?: string; email?: string }) => Promise<void>
  updateUserPassword: (newPassword: string) => Promise<void>
  isUpdateUserLoading: boolean
  updateUserLoadingError: {
    type: ProfileSettingsErrorType
    message: string
  } | null
}

const AppContext = createContext<AppContextType>({
  spaces: [],
  setSpaces: noop,
  addSpaces: noop,
  currentUser: undefined,
  setCurrentUser: noop,
  fetchUser: async () => {},
  updateUserProfile: async () => {},
  updateUserPassword: async () => {},
  isUpdateUserLoading: false,
  updateUserLoadingError: null
})

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [spaces, setSpaces] = useState<TypesSpace[]>([])
  const [currentUser, setCurrentUser] = useLocalStorage<TypesUser>('currentUser', {})
  const [isUpdateUserLoading, setIsUpdateUserLoading] = useState(false)
  const [updateUserLoadingError, setUpdateUserLoadingError] = useState<{
    type: ProfileSettingsErrorType
    message: string
  } | null>(null)

  const fetchUser = async (): Promise<void> => {
    setIsUpdateUserLoading(true)
    setUpdateUserLoadingError(null)
    try {
      const userResponse = await getUser({})
      setCurrentUser(userResponse.body)
      setIsUpdateUserLoading(false)
    } catch (error) {
      const typedError = error as GetUserErrorResponse
      setUpdateUserLoadingError({
        type: ProfileSettingsErrorType.PROFILE,
        message: typedError.message || 'An unknown fetch user error occurred.'
      })
      setIsUpdateUserLoading(false)
    }
  }

  const updateUserProfile = async (data: { display_name?: string; email?: string }): Promise<void> => {
    setIsUpdateUserLoading(true)
    setUpdateUserLoadingError(null)
    try {
      const response = await updateUser({ body: data })
      setCurrentUser(response.body)
      setIsUpdateUserLoading(false)
    } catch (error) {
      const typedError = error as UpdateUserErrorResponse
      setUpdateUserLoadingError({
        type: ProfileSettingsErrorType.PROFILE,
        message: typedError.message || 'An unknown update user error occurred.'
      })
      setIsUpdateUserLoading(false)
    }
  }

  const updateUserPassword = async (newPassword: string): Promise<void> => {
    setIsUpdateUserLoading(true)
    setUpdateUserLoadingError(null)
    try {
      const response = await updateUser({ body: { password: newPassword } })
      setCurrentUser(response.body)
      setIsUpdateUserLoading(false)
    } catch (error) {
      const typedError = error as UpdateUserErrorResponse
      setUpdateUserLoadingError({
        type: ProfileSettingsErrorType.PASSWORD,
        message: typedError.message || 'An unknown update password error occurred.'
      })
      setIsUpdateUserLoading(false)
    }
  }

  useEffect(() => {
    Promise.all([
      membershipSpaces({
        queryParams: { page: 1, limit: 100, sort: 'identifier', order: 'asc' }
      }),
      fetchUser()
    ])
      .then(([membershipResponse]) => {
        setSpaces(membershipResponse.body.filter(item => item?.space).map(item => item.space as TypesSpace))
      })
      .catch(() => {
        // Optionally handle error or show toast
      })
  }, [])

  const addSpaces = (newSpaces: TypesSpace[]): void => {
    setSpaces([...spaces, ...newSpaces])
  }

  return (
    <AppContext.Provider
      value={{
        spaces,
        setSpaces,
        addSpaces,
        currentUser,
        setCurrentUser,
        fetchUser,
        updateUserProfile,
        updateUserPassword,
        isUpdateUserLoading,
        updateUserLoadingError
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

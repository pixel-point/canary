import { useEffect } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import {
  useAdminCreateUserMutation,
  useAdminDeleteUserMutation,
  useAdminListUsersQuery,
  useAdminUpdateUserMutation,
  useUpdateUserAdminMutation
} from '@harnessio/code-service-client'
import { UserManagementPage } from '@harnessio/ui/views'

import { parseAsInteger, useQueryState } from '../../framework/hooks/useQueryState'
import { useTranslationStore } from '../../i18n/stores/i18n-store'
import { useAdminListUsersStore } from './stores/admin-list-store'

export const UserManagementPageContainer = () => {
  const [queryPage, setQueryPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const { setUsers, setTotalPages, setPage, page, password } = useAdminListUsersStore()
  const queryClient = useQueryClient()

  // TODO: add search functionality by query parameter
  const { data: { body: userData, headers } = {} } = useAdminListUsersQuery({
    queryParams: {
      page: queryPage
    }
  })

  useEffect(() => {
    if (userData) {
      setUsers(userData)
    }
    if (headers) {
      setTotalPages(headers)
    }
  }, [userData, setUsers, setTotalPages, headers])

  useEffect(() => {
    setQueryPage(page)
  }, [queryPage, page, setPage, setQueryPage])

  const {
    mutate: updateUser,
    isLoading: isUpdatingUser,
    error: updateUserError
  } = useAdminUpdateUserMutation(
    {},
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['adminListUsers'] })
      },
      onError: error => {
        console.error(error)
      }
    }
  )

  const {
    mutate: deleteUser,
    isLoading: isDeletingUser,
    error: deleteUserError
  } = useAdminDeleteUserMutation(
    {},
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['adminListUsers'] })
      },
      onError: error => {
        console.error(error)
      }
    }
  )

  const {
    mutate: updateUserAdmin,
    isLoading: isUpdatingUserAdmin,
    error: updateUserAdminError
  } = useUpdateUserAdminMutation(
    {},
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['adminListUsers'] })
      },
      onError: error => {
        console.error(error)
      }
    }
  )

  const {
    mutate: createUser,
    isLoading: isCreatingUser,
    error: createUserError
  } = useAdminCreateUserMutation(
    {},
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['adminListUsers'] })
      },
      onError: error => {
        console.error(error)
      }
    }
  )

  const handleCreateUser = (data: { uid: string; email: string; display_name: string }) => {
    return createUser({
      body: {
        uid: data.uid,
        email: data.email,
        display_name: data.display_name,
        password: password ?? ''
      }
    })
  }

  const handleUpdateUser = (data: { email: string; displayName: string; userID: string }) => {
    return updateUser({
      user_uid: data.userID,
      body: {
        email: data.email,
        display_name: data.displayName
      }
    })
  }

  const handleDeleteUser = (userUid: string) => {
    return deleteUser({
      user_uid: userUid
    })
  }

  const handleUpdateUserAdmin = (userUid: string, isAdmin: boolean) => {
    return updateUserAdmin({
      user_uid: userUid,
      body: {
        admin: isAdmin
      }
    })
  }

  const handleUpdatePassword = (userId: string) => {
    return updateUser({
      user_uid: userId,
      body: {
        password: password
      }
    })
  }

  const handlers = {
    handleUpdateUser,
    handleDeleteUser,
    handleUpdateUserAdmin,
    handleUpdatePassword,
    handleCreateUser
  }

  const loadingStates = {
    isUpdatingUser,
    isDeletingUser,
    isUpdatingUserAdmin,
    isCreatingUser
  }

  const errorStates = {
    updateUserError: updateUserError?.message?.toString() ?? '',
    deleteUserError: deleteUserError?.message?.toString() ?? '',
    updateUserAdminError: updateUserAdminError?.message?.toString() ?? '',
    createUserError: createUserError?.message?.toString() ?? ''
  }

  return (
    <>
      <UserManagementPage
        useAdminListUsersStore={useAdminListUsersStore}
        useTranslationStore={useTranslationStore}
        handlers={handlers}
        loadingStates={loadingStates}
        errorStates={errorStates}
      />
    </>
  )
}

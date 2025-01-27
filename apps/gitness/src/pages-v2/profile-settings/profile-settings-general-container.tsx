import { FC, useEffect, useState } from 'react'

import {
  GetUserErrorResponse,
  UpdateUserErrorResponse,
  UpdateUserRequestBody,
  useGetUserQuery,
  useUpdateUserMutation
} from '@harnessio/code-service-client'
import {
  PasswordFields,
  ProfileFields,
  ProfileSettingsErrorType,
  SettingsAccountGeneralPage
} from '@harnessio/ui/views'

import { useAppContext } from '../../framework/context/AppContext.tsx'
import { useTranslationStore } from '../../i18n/stores/i18n-store'
import { useProfileSettingsStore } from './stores/profile-settings-store'

export const SettingsProfileGeneralPage: FC = () => {
  const { updateUserProfile, updateUserPassword, isUpdateUserLoading, updateUserLoadingError } = useAppContext()
  const { setUserData } = useProfileSettingsStore()
  const [apiError, setApiError] = useState<{ type: ProfileSettingsErrorType; message: string } | null>(null)

  const { data: { body: userData } = {}, isLoading: isLoadingUserData } = useGetUserQuery(
    {},
    {
      onError: (error: GetUserErrorResponse) => {
        const message = error.message || 'An unknown error occurred.'
        setApiError({ type: ProfileSettingsErrorType.PROFILE, message: message })
      }
    }
  )

  const isLoadingUser = isLoadingUserData || isUpdateUserLoading

  const updateUserMutation = useUpdateUserMutation(
    {},
    {
      onSuccess: ({ body: data }) => {
        setUserData({
          name: data.display_name || '',
          username: data.uid || '',
          email: data.email || ''
        })
      },
      onError: (error: UpdateUserErrorResponse) => {
        const message = error.message || 'An unknown error occurred.'
        setApiError({ type: ProfileSettingsErrorType.PROFILE, message: message })
      }
    }
  )

  const updatePasswordMutation = useUpdateUserMutation(
    {},
    {
      onSuccess: ({ body: data }) => {
        setUserData({
          name: data.display_name || '',
          username: data.uid || '',
          email: data.email || ''
        })
      },
      onError: (error: UpdateUserErrorResponse) => {
        const message = error.message || 'An unknown error occurred.'
        setApiError({ type: ProfileSettingsErrorType.PASSWORD, message: message })
      }
    }
  )

  const handleUpdateUser = (updatedUserData: Omit<ProfileFields, 'username'>) => {
    const updateUserBody: UpdateUserRequestBody = {
      display_name: updatedUserData.name,
      email: updatedUserData.email
    }

    updateUserProfile({
      display_name: updatedUserData.name,
      email: updatedUserData.email
    }).then(() => {
      updateUserMutation.mutate({
        body: updateUserBody
      })
    })
  }

  const handleUpdatePassword = (updatedPasswordData: PasswordFields) => {
    if (updatedPasswordData.newPassword !== updatedPasswordData.confirmPassword) {
      setApiError({ type: ProfileSettingsErrorType.PASSWORD, message: 'Passwords do not match' })
      return
    }

    const updatePasswordBody: UpdateUserRequestBody = {
      password: updatedPasswordData.newPassword
    }

    updateUserPassword(updatedPasswordData.newPassword).then(() => {
      updatePasswordMutation.mutate({
        body: updatePasswordBody
      })
    })
  }

  useEffect(() => {
    if (userData) {
      setUserData({
        name: userData.display_name || '',
        username: userData.uid || '',
        email: userData.email || ''
      })
    }
  }, [userData, setUserData])

  return (
    <>
      <SettingsAccountGeneralPage
        useProfileSettingsStore={useProfileSettingsStore}
        useTranslationStore={useTranslationStore}
        isLoadingUser={isLoadingUser}
        isUpdatingUser={isLoadingUser}
        isUpdatingPassword={isLoadingUser}
        error={apiError || updateUserLoadingError}
        onUpdateUser={handleUpdateUser}
        onUpdatePassword={handleUpdatePassword}
        profileUpdateSuccess={!isLoadingUser && !apiError && !updateUserLoadingError}
        passwordUpdateSuccess={!isLoadingUser && !apiError && !updateUserLoadingError}
      />
    </>
  )
}

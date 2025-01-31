import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, ButtonGroup, Dialog, Input } from '@/components'
import { editUserSchema } from '@/views/user-management/components/dialogs/components/edit-user/schemas'
import {
  IEditUserDialogProps,
  IEditUserFormType
} from '@/views/user-management/components/dialogs/components/edit-user/types'
import { useStates } from '@/views/user-management/providers/state-provider'
import { useUserManagementStore } from '@/views/user-management/providers/store-provider'
import { zodResolver } from '@hookform/resolvers/zod'

export function EditUserDialog({ handleUpdateUser, open, onClose }: IEditUserDialogProps) {
  const { useTranslationStore, useAdminListUsersStore } = useUserManagementStore()

  const { t } = useTranslationStore()
  const { user } = useAdminListUsersStore()

  const { loadingStates, errorStates } = useStates()
  const { isUpdatingUser } = loadingStates
  const { updateUserError } = errorStates

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IEditUserFormType>({
    resolver: zodResolver(editUserSchema),
    mode: 'onChange'
  })

  useEffect(() => {
    if (user) {
      reset({
        userID: user.uid,
        email: user.email,
        displayName: user.display_name
      })
    }
  }, [user, reset])

  const onSubmit: SubmitHandler<IEditUserFormType> = data => {
    handleUpdateUser(data)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="max-w-xl">
        <Dialog.Header>
          <Dialog.Title>{t('views:userManagement.updateUser', 'Update user')}</Dialog.Title>
        </Dialog.Header>

        <div className="flex flex-col gap-y-7">
          <Input
            id="userID"
            {...register('userID')}
            readOnly
            className="cursor-not-allowed"
            caption={t('views:userManagement.userIdHint', 'User ID cannot be changed once created')}
            error={errors.userID?.message?.toString()}
          />

          <Input
            id="email"
            {...register('email')}
            label={t('views:userManagement.email', 'Email')}
            error={errors.email?.message?.toString()}
          />

          <Input
            id="displayName"
            {...register('displayName')}
            label={t('views:userManagement.displayName', 'Display name')}
            error={errors.displayName?.message?.toString()}
          />

          {updateUserError && <span className="text-xs text-destructive">{updateUserError}</span>}
        </div>

        <Dialog.Footer>
          <ButtonGroup className="justify-end">
            <Button type="button" variant="outline" onClick={onClose} disabled={isUpdatingUser}>
              {t('views:userManagement.cancel', 'Cancel')}
            </Button>
            <Button type="button" onClick={handleSubmit(onSubmit)} disabled={isUpdatingUser}>
              {isUpdatingUser ? t('views:userManagement.saving', 'Saving...') : t('views:userManagement.save', 'Save')}
            </Button>
          </ButtonGroup>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

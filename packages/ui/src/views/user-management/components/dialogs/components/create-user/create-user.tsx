import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, ButtonGroup, Dialog, Icon, Input } from '@/components'
import { useStates } from '@/views/user-management/providers/state-provider'
import { useUserManagementStore } from '@/views/user-management/providers/store-provider'
import { zodResolver } from '@hookform/resolvers/zod'

import { newUserSchema } from './schemas'
import { ICreateUserDialogProps, NewUserFields } from './types'

export function CreateUserDialog({ handleCreateUser, open, onClose }: ICreateUserDialogProps) {
  const { useTranslationStore } = useUserManagementStore()
  const { t } = useTranslationStore()

  const { loadingStates, errorStates } = useStates()
  const { isCreatingUser } = loadingStates
  const { createUserError } = errorStates

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NewUserFields>({
    resolver: zodResolver(newUserSchema),
    mode: 'onChange',
    defaultValues: { uid: '', email: '', display_name: '' }
  })

  const onSubmit: SubmitHandler<NewUserFields> = data => {
    handleCreateUser(data)
  }

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Content className="max-w-xl">
        <Dialog.Header>
          <Dialog.Title>{t('views:userManagement.addNewUser', 'Add a new user')}</Dialog.Title>
        </Dialog.Header>

        <div className="flex flex-col gap-y-7">
          <div className="relative">
            <span className="absolute -top-0.5 left-16 flex items-center">
              <Icon name="info-circle" height={15} className="text-tertiary-background" />
              <span className="ml-1 text-xs">
                {t('views:userManagement.userIdHint', 'User ID cannot be changed once created')}
              </span>
            </span>

            <Input
              id="memberName"
              {...register('uid')}
              label={t('views:userManagement.userId', 'User ID')}
              placeholder={t('views:userManagement.enterUsername', 'Enter user name')}
              error={errors.uid?.message?.toString()}
            />
          </div>

          <Input
            id="email"
            {...register('email')}
            placeholder={t('views:userManagement.enterEmail', 'Enter email address')}
            label={t('views:userManagement.email', 'Email')}
            error={errors.email?.message?.toString()}
          />

          <Input
            id="displayName"
            {...register('display_name')}
            placeholder={t('views:userManagement.enterDisplayName', 'Enter display name')}
            label={t('views:userManagement.displayName', 'Display name')}
            error={errors.display_name?.message?.toString()}
          />

          {createUserError && <span className="text-xs text-destructive">{createUserError}</span>}
        </div>

        <Dialog.Footer>
          <ButtonGroup className="justify-end">
            <Button size="sm" variant="outline" type="button" onClick={onClose} disabled={isCreatingUser}>
              {t('views:userManagement.cancel', 'Cancel')}
            </Button>
            <Button size="sm" type="button" onClick={handleSubmit(onSubmit)} disabled={isCreatingUser}>
              {isCreatingUser
                ? t('views:userManagement.inviting', 'Inviting...')
                : t('views:userManagement.inviteNewUser', 'Invite new user')}
            </Button>
          </ButtonGroup>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

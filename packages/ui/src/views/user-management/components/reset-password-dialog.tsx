import { FC } from 'react'

import { AlertDialog, Button, CopyButton, Input } from '@/components'

import { IResetPasswordDialogProps } from '../types'

export const ResetPasswordDialog: FC<IResetPasswordDialogProps> = ({
  open,
  useAdminListUsersStore,
  onClose,
  handleUpdatePassword,
  useTranslationStore
}) => {
  const { t } = useTranslationStore()
  const { user, generatePassword, setGeteneratePassword, password } = useAdminListUsersStore()

  const handleResetPassword = () => {
    handleUpdatePassword(user?.uid ?? '')
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Trigger asChild></AlertDialog.Trigger>
      <AlertDialog.Content onOverlayClick={onClose}>
        <AlertDialog.Header>
          {generatePassword ? (
            <AlertDialog.Title>{t('views:userManagement.resetPassword', 'Reset password')}</AlertDialog.Title>
          ) : (
            <AlertDialog.Title>
              {t(
                'views:userManagement.areYouSureYouWantToResetPasswordFor',
                'Are you sure you want to reset password for '
              )}
              {user?.display_name}?
            </AlertDialog.Title>
          )}
          <AlertDialog.Description>
            {generatePassword ? (
              <span className="text-14 font-normal text-foreground-3 mb-4">
                {t(
                  'views:userManagement.yourPasswordHasBeenGeneratedPleaseMakeSureToCopyAndStoreYourPasswordSomewhereSafe',
                  'Your password has been generated. Please make sure to copy and store your password somewhere safe, you wont be able to see it again.'
                )}
              </span>
            ) : (
              <span className="text-14 font-normal text-tertiary-background mb-4">
                {t('views:userManagement.newPasswordWillBeGeneratedTo', 'A new password will be generated to ')}
                {user?.display_name}
              </span>
            )}
            {generatePassword && (
              <Input
                id="identifier"
                className="truncate"
                size="md"
                value={password ?? ''}
                readOnly
                rightElement={<CopyButton className="absolute right-2.5 bg-background-1" name={password ?? ''} />}
              />
            )}
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <Button variant="outline" onClick={onClose}>
            {t('views:userManagement.cancel', 'Cancel')}
          </Button>
          {!generatePassword && (
            <Button
              className="self-start"
              onClick={() => {
                handleResetPassword()
                setGeteneratePassword(true)
              }}
            >
              {t('views:userManagement.confirm', 'Confirm')}
            </Button>
          )}
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

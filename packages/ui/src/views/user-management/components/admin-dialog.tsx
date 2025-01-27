import { FC } from 'react'

import { AlertDialog, Button } from '@/components'

import { IRemoveAdminDialogProps } from '../types'

// Form Remove/Add Admin Dialog
export const AdminDialog: FC<IRemoveAdminDialogProps> = ({
  useAdminListUsersStore,
  open,
  onClose,
  updateUserAdmin,
  useTranslationStore
}) => {
  const { t } = useTranslationStore()
  const { user } = useAdminListUsersStore()
  const isAdmin = user?.admin ?? false

  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Trigger asChild></AlertDialog.Trigger>
      <AlertDialog.Content onOverlayClick={onClose}>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {isAdmin
              ? t('views:userManagement.areYouSureYouWantToRemove', 'Are you sure you want to remove ')
              : t('views:userManagement.areYouSureYouWantToGrant', 'Are you sure you want to grant ')}
            {user?.display_name}
            {isAdmin
              ? t('views:userManagement.asAnAdmin', ' as an admin?')
              : t('views:userManagement.adminPrivileges', ' admin privileges?')}
          </AlertDialog.Title>
          <AlertDialog.Description>
            {isAdmin
              ? t('views:userManagement.thisWillRemoveTheAdminTagFor', 'This will remove the admin tag for ')
              : t('views:userManagement.thisWillGrantAdminPrivilegesTo', 'This will grant admin privileges to ')}
            {user?.display_name}.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <Button variant="outline" onClick={onClose}>
            {t('views:userManagement.cancel', 'Cancel')}
          </Button>
          <Button
            theme={isAdmin ? 'error' : 'primary'}
            className="self-start"
            onClick={() => {
              updateUserAdmin(user?.uid ?? '', !isAdmin)
            }}
          >
            {isAdmin
              ? t('views:userManagement.yesRemoveAdmin', 'Yes, remove admin')
              : t('views:userManagement.yesGrantAdmin', 'Yes, grant admin')}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

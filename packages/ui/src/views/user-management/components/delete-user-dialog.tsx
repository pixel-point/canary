import { FC } from 'react'

import { AlertDialog, Button } from '@/components'

import { IDeleteDialogProps } from '../types'

export const DeleteUserDialog: FC<IDeleteDialogProps> = ({
  useAdminListUsersStore,
  onClose,
  isDeleting,
  handleDeleteUser,
  open,
  useTranslationStore
}) => {
  const { t } = useTranslationStore()
  const { user } = useAdminListUsersStore()

  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Trigger asChild></AlertDialog.Trigger>
      <AlertDialog.Content onOverlayClick={onClose}>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {t('views:userManagement.areYouSureYouWantToDelete', 'Are you sure you want to delete ')}
            {user?.display_name}?
          </AlertDialog.Title>
          <AlertDialog.Description>
            {t('views:userManagement.thisWillPermanentlyDeleteTheUser', 'This will permanently delete the user ')}
            &quot;{user?.display_name}&quot;
            {t('views:userManagement.fromTheSystem', 'from the system.')}
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <Button variant="outline" onClick={onClose}>
            {t('views:userManagement.cancel', 'Cancel')}
          </Button>
          <Button
            theme="error"
            className="self-start"
            onClick={() => {
              handleDeleteUser(user!.uid ?? '')
            }}
            disabled={isDeleting}
          >
            {t('views:userManagement.yesDeleteUser', 'Yes, delete user')}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

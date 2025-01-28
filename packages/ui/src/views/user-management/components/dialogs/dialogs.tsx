import { useDialogHandlers } from '@/views/user-management/components/dialogs/hooks'
import { DialogLabels, IDialogsProps } from '@/views/user-management/components/dialogs/types'
import { useDialogs } from '@views/user-management/providers/DialogsProvider'

import { CreateUserDialog } from './components/create-user'
import { DeleteUserDialog } from './components/delete-user'
import { EditUserDialog } from './components/edit-user'
import { AdminDialog } from './components/remove-admin'
import { ResetPasswordDialog } from './components/reset-password'

export const Dialogs = ({ handlers, loadingStates, errorStates }: IDialogsProps) => {
  const { dialogsOpenState, closeDialog } = useDialogs()

  const { handleDeleteUser, handleUpdateUser, handleUpdatePassword, handleUpdateUserAdmin, handleCreateUser } =
    useDialogHandlers(handlers)
  const { isDeletingUser, isUpdatingUser, isUpdatingUserAdmin, isCreatingUser } = loadingStates
  const { createUserError } = errorStates

  return (
    <>
      <DeleteUserDialog
        open={dialogsOpenState[DialogLabels.DELETE_USER]}
        onClose={() => closeDialog(DialogLabels.DELETE_USER)}
        isDeleting={isDeletingUser}
        handleDeleteUser={handleDeleteUser}
      />
      <EditUserDialog
        open={dialogsOpenState[DialogLabels.EDIT_USER]}
        isSubmitting={isUpdatingUser}
        onClose={() => closeDialog(DialogLabels.EDIT_USER)}
        handleUpdateUser={handleUpdateUser}
      />
      <AdminDialog
        open={dialogsOpenState[DialogLabels.TOGGLE_ADMIN]}
        onClose={() => closeDialog(DialogLabels.TOGGLE_ADMIN)}
        isLoading={isUpdatingUserAdmin}
        updateUserAdmin={handleUpdateUserAdmin}
      />
      <ResetPasswordDialog
        open={dialogsOpenState[DialogLabels.RESET_PASSWORD]}
        onClose={() => closeDialog(DialogLabels.RESET_PASSWORD)}
        handleUpdatePassword={handleUpdatePassword}
      />
      <CreateUserDialog
        open={dialogsOpenState[DialogLabels.CREATE_USER]}
        onClose={() => closeDialog(DialogLabels.CREATE_USER)}
        isLoading={isCreatingUser}
        apiError={createUserError}
        handleCreateUser={handleCreateUser}
      />
    </>
  )
}

import { useDialogHandlers } from '@/views/user-management/components/dialogs/hooks'
import { useDialogs } from '@/views/user-management/context/dialogs'
import {
  DialogLabels,
  IDialogErrorStates,
  IDialogHandlers,
  IDialogLoadingStates,
  IUserManagementPageProps
} from '@/views/user-management/types'

import { CreateUserDialog } from './components/create-user'
import { DeleteUserDialog } from './components/delete-user'
import { EditUserDialog } from './components/edit-user'
import { AdminDialog } from './components/remove-admin'
import { ResetPasswordDialog } from './components/reset-password'

export const Dialogs = ({
  useAdminListUsersStore,
  handlers,
  loadingStates,
  errorStates
}: Pick<IUserManagementPageProps, 'useAdminListUsersStore'> & {
  handlers: IDialogHandlers
  loadingStates: IDialogLoadingStates
  errorStates: IDialogErrorStates
}) => {
  const { dialogsOpenState, closeDialog } = useDialogs()
  const { handleDeleteUser, handleUpdateUser, handleUpdatePassword, handleUpdateUserAdmin, handleCreateUser } =
    useDialogHandlers(handlers)
  const { isDeletingUser, isUpdatingUser, isUpdatingUserAdmin, isCreatingUser } = loadingStates
  const { createUserError } = errorStates

  return (
    <>
      <DeleteUserDialog
        open={dialogsOpenState[DialogLabels.DELETE_USER]}
        useAdminListUsersStore={useAdminListUsersStore}
        onClose={() => closeDialog(DialogLabels.DELETE_USER)}
        isDeleting={isDeletingUser}
        handleDeleteUser={handleDeleteUser}
      />
      <EditUserDialog
        open={dialogsOpenState[DialogLabels.EDIT_USER]}
        useAdminListUsersStore={useAdminListUsersStore}
        isSubmitting={isUpdatingUser}
        onClose={() => closeDialog(DialogLabels.EDIT_USER)}
        handleUpdateUser={handleUpdateUser}
      />
      <AdminDialog
        open={dialogsOpenState[DialogLabels.TOGGLE_ADMIN]}
        useAdminListUsersStore={useAdminListUsersStore}
        onClose={() => closeDialog(DialogLabels.TOGGLE_ADMIN)}
        isLoading={isUpdatingUserAdmin}
        updateUserAdmin={handleUpdateUserAdmin}
      />
      <ResetPasswordDialog
        open={dialogsOpenState[DialogLabels.RESET_PASSWORD]}
        useAdminListUsersStore={useAdminListUsersStore}
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

import React, { useReducer } from 'react'
import { Spacer, Text, Button } from '@harnessio/canary'
import { SandboxLayout } from '..'
import { UsersList } from '../components/user-management/users-list'
import { useNavigate } from 'react-router-dom'
import {
  dialogStateReducer,
  initialDialogState
} from '../components/user-management/user-reducers/dialog-state-reducers'
import { FormUserEditDialog } from '../components/user-management/form-user-edit-dialog'
import { FormDeleteUserDialog } from '../components/user-management/form-user-delete-dialog'
import { FormRemoveAdminDialog } from '../components/user-management/form-admin-remove-dialog'
import { FormResetPasswordDialog } from '../components/user-management/form-user-reset-password'
import { FormAddAdminDialog } from '../components/user-management/form-admin-add-dialog'
import { DialogActionType, DialogType } from '../components/user-management/interfaces'
import { UsersProps } from '../components/user-management/interfaces'
import { Filter } from '..'
import { PaginationComponent } from '../components/pagination'
const sortOptions = [
  { name: 'Date', value: 'created' },
  { name: 'Email', value: 'email' },
  { name: 'Name', value: 'id' },
  { name: 'Last Modified', value: 'updated' }
]

function SandboxSettingsUserManagementPage({
  userData,
  handleUpdateUser,
  handleDeleteUser,
  handleUpdatePassword,
  updateUserAdmin,
  currentPage,
  totalPages,
  setPage
}: {
  userData: UsersProps[] | null
  handleUpdateUser: (data: { email: string; displayName: string; userID: string }) => void
  handleDeleteUser: (userUid: string) => void
  handleUpdatePassword: (userId: string, password: string) => void
  updateUserAdmin: (userUid: string, isAdmin: boolean) => void
  currentPage: number
  totalPages: number
  setPage: (pageNum: number) => void
}) {
  const navigate = useNavigate()
  const [dialogState, dispatch] = useReducer(dialogStateReducer, initialDialogState)

  const openDialog = (dialogType: DialogType, user: UsersProps) => {
    dispatch({ type: DialogActionType.OPEN_DIALOG, dialogType, user })
  }

  const closeDialog = (dialogType: DialogType) => {
    dispatch({ type: DialogActionType.CLOSE_DIALOG, dialogType })
  }

  // Handler for user deletion
  const handleDelete = () => {
    dispatch({ type: DialogActionType.START_DELETING })
    closeDialog(DialogType.DELETE)
    dispatch({ type: DialogActionType.DELETE_SUCCESS })
    dispatch({ type: DialogActionType.RESET_DELETE })
  }

  // Handler for form submission
  const handleFormSave = () => {
    dispatch({ type: DialogActionType.START_SUBMITTING })
    closeDialog(DialogType.EDIT)
    dispatch({ type: DialogActionType.SUBMIT_SUCCESS })
    dispatch({ type: DialogActionType.RESET_SUBMIT })
  }

  // Handler for admin removal
  const handleRemove = () => {
    dispatch({ type: DialogActionType.START_REMOVING })
    closeDialog(DialogType.REMOVE_ADMIN)
    dispatch({ type: DialogActionType.REMOVE_SUCCESS })
    dispatch({ type: DialogActionType.RESET_REMOVE })
  }

  const handleAdd = () => {
    dispatch({ type: DialogActionType.START_REMOVING })
    closeDialog(DialogType.SET_ADMIN)
    dispatch({ type: DialogActionType.REMOVE_SUCCESS })
    dispatch({ type: DialogActionType.RESET_REMOVE })
  }

  const renderUserListContent = () => {
    return (
      <>
        <UsersList
          onEdit={user => openDialog(DialogType.EDIT, user)}
          onDelete={user => openDialog(DialogType.DELETE, user)}
          onRemoveAdmin={user => openDialog(DialogType.REMOVE_ADMIN, user)}
          onResetPassword={user => openDialog(DialogType.RESET_PASSWORD, user)}
          onSetAdmin={user => openDialog(DialogType.SET_ADMIN, user)}
          users={userData as UsersProps[]}
        />
        {/* Delete Dialog */}
        {dialogState.isDialogDeleteOpen && (
          <FormDeleteUserDialog
            isDeleting={dialogState.isDeleting}
            deleteSuccess={dialogState.deleteSuccess}
            onDelete={handleDelete}
            user={dialogState.selectedUser!}
            onClose={() => {
              closeDialog(DialogType.DELETE)
              dispatch({ type: DialogActionType.RESET_DELETE })
            }}
            handleDeleteUser={handleDeleteUser}
          />
        )}
        {/* Edit Dialog */}
        {dialogState.isDialogEditOpen && (
          <FormUserEditDialog
            isSubmitting={dialogState.isSubmitting}
            submitted={dialogState.submitted}
            user={dialogState.selectedUser!}
            onSave={handleFormSave}
            onClose={() => {
              closeDialog(DialogType.EDIT)
              dispatch({ type: DialogActionType.RESET_SUBMIT })
            }}
            handleUpdateUser={handleUpdateUser}
          />
        )}
        {dialogState.isDialogRemoveAdminOpen && (
          <FormRemoveAdminDialog
            isRemoving={dialogState.isRemoving}
            removeSuccess={dialogState.removeSuccess}
            user={dialogState.selectedUser!}
            onRemove={handleRemove}
            onClose={() => {
              closeDialog(DialogType.REMOVE_ADMIN)
              dispatch({ type: DialogActionType.RESET_REMOVE })
            }}
            updateUserAdmin={updateUserAdmin}
          />
        )}
        {dialogState.isDialogResetPasswordOpen && (
          <FormResetPasswordDialog
            user={dialogState.selectedUser!}
            onClose={() => {
              closeDialog(DialogType.RESET_PASSWORD)
              dispatch({ type: DialogActionType.RESET_PASSWORD_RESET })
            }}
            handleUpdatePassword={handleUpdatePassword}
          />
        )}
        {dialogState.isDialogSetAdminOpen && (
          <FormAddAdminDialog
            isRemoving={dialogState.isRemoving}
            removeSuccess={dialogState.removeSuccess}
            user={dialogState.selectedUser!}
            onRemove={handleAdd}
            onClose={() => {
              closeDialog(DialogType.SET_ADMIN)
              dispatch({ type: DialogActionType.RESET_REMOVE })
            }}
            updateUserAdmin={updateUserAdmin}
          />
        )}
      </>
    )
  }

  const handleInviteClick = () => {
    navigate('../users/create')
  }

  return (
    <SandboxLayout.Main hasLeftPanel>
      <SandboxLayout.Content maxWidth="3xl">
        <Spacer size={10} />
        <Text size={5} weight={'medium'}>
          Users
        </Text>
        <Spacer size={6} />
        <div className="flex justify-between gap-5 items-center">
          <div className="flex-1">
            <Filter sortOptions={sortOptions} />
          </div>
          <Button variant="default" onClick={handleInviteClick}>
            Invite New Users
          </Button>
        </div>

        <Spacer size={5} />
        {renderUserListContent()}
        <Spacer size={8} />
        <PaginationComponent
          totalPages={totalPages}
          currentPage={currentPage}
          goToPage={(pageNum: number) => setPage(pageNum)}
        />
      </SandboxLayout.Content>
    </SandboxLayout.Main>
  )
}

export { SandboxSettingsUserManagementPage }
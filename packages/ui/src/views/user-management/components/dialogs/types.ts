export interface IDialogHandlers {
  handleUpdateUser: (data: { email: string; displayName: string; userID: string }) => void
  handleDeleteUser: (userUid: string) => void
  handleUpdateUserAdmin: (userUid: string, isAdmin: boolean) => void
  handleUpdatePassword: (userId: string) => void
  handleCreateUser: (data: { uid: string; email: string; display_name: string }) => void
}

export interface IDialogLoadingStates {
  isUpdatingUser: boolean
  isDeletingUser: boolean
  isUpdatingUserAdmin: boolean
  isCreatingUser: boolean
}

export interface IDialogErrorStates {
  updateUserError: string
  deleteUserError: string
  updateUserAdminError: string
  createUserError: string
}

export enum DialogLabels {
  DELETE_USER = 'deleteUser',
  EDIT_USER = 'editUser',
  TOGGLE_ADMIN = 'toggleAdmin',
  RESET_PASSWORD = 'resetPassword',
  CREATE_USER = 'createUser'
}

export interface IDialogsProps {
  handlers: IDialogHandlers
  loadingStates: IDialogLoadingStates
  errorStates: IDialogErrorStates
}

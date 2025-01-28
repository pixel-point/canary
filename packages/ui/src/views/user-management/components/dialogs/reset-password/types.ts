import { IAdminListUsersStore } from 'dist/views'

export interface IResetPasswordDialogProps {
  onClose: () => void
  open: boolean
  handleUpdatePassword: (userId: string) => void
  useAdminListUsersStore: () => IAdminListUsersStore
}

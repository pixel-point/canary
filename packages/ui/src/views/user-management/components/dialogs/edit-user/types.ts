import { IAdminListUsersStore } from 'dist/views'

export interface IEditUserDialogProps {
  isSubmitting: boolean
  onClose: () => void
  handleUpdateUser: (data: { email: string; displayName: string; userID: string }) => void
  open: boolean
  useAdminListUsersStore: () => IAdminListUsersStore
}

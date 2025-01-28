import { IAdminListUsersStore } from '@views/user-management/types'

export interface IDeleteDialogProps {
  open: boolean
  onClose: () => void
  isDeleting: boolean
  handleDeleteUser: (userUid: string) => void
  useAdminListUsersStore: () => IAdminListUsersStore
}

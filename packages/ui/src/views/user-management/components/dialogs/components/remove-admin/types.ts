export interface IRemoveAdminDialogProps {
  open: boolean
  onClose: () => void
  isLoading: boolean
  updateUserAdmin: (uid: string, admin: boolean) => void
}

export interface IDeleteDialogProps {
  open: boolean
  onClose: () => void
  isDeleting: boolean
  handleDeleteUser: (userUid: string) => void
}

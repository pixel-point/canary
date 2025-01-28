export interface IResetPasswordDialogProps {
  onClose: () => void
  open: boolean
  handleUpdatePassword: (userId: string) => void
}

import { NewUserFields } from '../../create-user-dialog'

export interface ICreateUserDialogProps {
  handleCreateUser: (data: NewUserFields) => void
  isLoading: boolean
  apiError: string | null
  open: boolean
  onClose: () => void
}

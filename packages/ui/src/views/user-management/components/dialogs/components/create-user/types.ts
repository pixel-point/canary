import { newUserSchema } from '@views/user-management/components/dialogs/components/create-user/schemas'
import { z } from 'zod'

export type NewUserFields = z.infer<typeof newUserSchema>

export interface ICreateUserDialogProps {
  handleCreateUser: (data: NewUserFields) => void
  isLoading: boolean
  apiError: string | null
  open: boolean
  onClose: () => void
}

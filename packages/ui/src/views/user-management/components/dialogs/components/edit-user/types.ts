import { editUserSchema } from '@/views/user-management/components/dialogs/components/edit-user/schemas'
import { z } from 'zod'

export type IEditUserFormType = z.infer<typeof editUserSchema>

export interface IEditUserFormProps {
  handleUpdateUser: (data: IEditUserFormType) => void
  onClose: () => void
}

export interface IEditUserDialogProps {
  open: boolean
  onClose: () => void
  handleUpdateUser: (data: IEditUserFormType) => void
}

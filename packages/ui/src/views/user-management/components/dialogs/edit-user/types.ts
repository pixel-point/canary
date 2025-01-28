import { IAdminListUsersStore } from '@/views'
import { newUserSchema } from '@/views/user-management/components/dialogs/edit-user/schemas'
import { z } from 'zod'

export type MemberFields = z.infer<typeof newUserSchema>

export interface IEditUserDialogProps {
  isSubmitting: boolean
  onClose: () => void
  handleUpdateUser: (data: { email: string; displayName: string; userID: string }) => void
  open: boolean
  useAdminListUsersStore: () => IAdminListUsersStore
}

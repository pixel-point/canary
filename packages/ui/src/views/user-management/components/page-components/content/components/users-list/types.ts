import { DialogLabels } from '@/views/user-management/components/dialogs'
import { UsersProps } from '@/views/user-management/types'

export interface PageProps {
  users: UsersProps[]
  handleDialogOpen: (user: UsersProps | null, dialogLabel: DialogLabels) => void
}

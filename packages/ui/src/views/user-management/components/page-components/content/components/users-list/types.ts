import { UsersProps } from '@views/user-management/types'

export interface PageProps {
  users: UsersProps[]
  handleDialogOpen: (user: UsersProps | null, dialogLabel: string) => void
}

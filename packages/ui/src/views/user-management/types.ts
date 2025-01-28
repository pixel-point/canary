import { TranslationStore } from '@/views'
import { IDialogErrorStates, IDialogHandlers, IDialogLoadingStates } from '@/views/user-management/components/dialogs'
import { IAdminListUsersStore } from '@/views/user-management/providers/StoreProvider'

export interface UsersProps {
  admin?: boolean
  uid?: string
  display_name?: string | undefined
  email?: string
  created?: number
  updated?: number
  avatarUrl?: string
  blocked?: boolean
}

export interface IUserManagementPageProps {
  useAdminListUsersStore: () => IAdminListUsersStore
  useTranslationStore: () => TranslationStore
  handlers: IDialogHandlers
  loadingStates: IDialogLoadingStates
  errorStates: IDialogErrorStates
}

import { TranslationStore } from '@/views'
import { IAdminListUsersStore } from '@views/user-management/types'

export interface StoreProviderProps {
  useAdminListUsersStore: () => IAdminListUsersStore
  useTranslationStore: () => TranslationStore
  children: React.ReactNode
}

export interface StoreContextType {
  useAdminListUsersStore: () => IAdminListUsersStore
  useTranslationStore: () => TranslationStore
}

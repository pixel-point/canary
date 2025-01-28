import { TranslationStore } from '@/views'
import { IAdminListUsersStore, UsersProps } from '@/views/user-management/types'

export interface ContentProps {
  userData: UsersProps[] | null
  filteredUsers: UsersProps[]
  searchQuery: string
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  filterOptions: any[]
  sortOptions: any[]
  sortDirections: any[]
  filterHandlers: any
  totalPages: number
  currentPage: number
  setPage: (page: number) => void
  useTranslationStore: () => TranslationStore
  useAdminListUsersStore: () => IAdminListUsersStore
}

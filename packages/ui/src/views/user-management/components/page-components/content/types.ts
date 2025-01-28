import { TranslationStore } from '@/views'

import { UsersProps } from '../../../types'

export interface ContentProps {
  userData: UsersProps[] | null
  filteredUsers: UsersProps[]
  searchQuery: string
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleDialogOpen: (user: UsersProps | null, dialogLabel: string) => void
  filterOptions: any[]
  sortOptions: any[]
  sortDirections: any[]
  filterHandlers: any
  totalPages: number
  currentPage: number
  setPage: (page: number) => void
  useTranslationStore: () => TranslationStore
}

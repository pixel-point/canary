import { UsersProps } from '@/views/user-management/types'

export interface ContentProps {
  userData: UsersProps[] | null
  filteredUsers: UsersProps[]
  searchQuery: string
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  totalPages: number
  currentPage: number
  setPage: (page: number) => void
}

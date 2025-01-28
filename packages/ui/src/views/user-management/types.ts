import { TranslationStore } from '@/views'

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
  handleDialogOpen: (user: UsersProps | null, dialogLabel: string) => void
}
export interface IAdminListUsersStore {
  users: UsersProps[]
  totalPages: number
  page: number
  password: string | null
  user: UsersProps | null
  searchQuery: string
  activeTab: EActiveTab
  generatePassword: boolean
  setSearchQuery: (searchQuery: string) => void
  setPassword: (password: string) => void
  setUser: (user: UsersProps) => void
  setPage: (data: number) => void
  setUsers: (data: UsersProps[]) => void
  setTotalPages: (data: Headers) => void
  setGeteneratePassword: (data: boolean) => void
  setActiveTab: (data: EActiveTab) => void
}

export enum DialogLabels {
  DELETE_USER = 'deleteUser',
  EDIT_USER = 'editUser',
  TOGGLE_ADMIN = 'toggleAdmin',
  RESET_PASSWORD = 'resetPassword',
  CREATE_USER = 'createUser'
}

export enum EActiveTab {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}
